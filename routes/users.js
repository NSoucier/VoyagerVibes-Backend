"use strict"

//  Routes for users

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db.js');
// const User = require('../models/user'); // todo
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const ExpressError = require('../expressError.js');

const router = express.Router();

// register new user
router.post('/', async function (req, res, next) {
    try {
        const { username, email, firstName, lastName, password } = req.body;

        // check if username is already taken
        const duplicates = await db.query(`
            SELECT username
            FROM users
            WHERE username = $1`,
            [username]);
        if (duplicates.rows[0]) {
            // throw new ExpressError(`Duplicate username: ${username}`, 401)
            return res.send('Username already taken.')
        } 

        // hash password before storing in db
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // insert user details into db
        const result = await db.query(
            `INSERT INTO users
             (username, email, first_name, last_name, password)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING username`,
          [username,
            email,
            firstName,
            lastName,
            hashedPassword],
        );

        const user = result.rows[0];

        res.send(user)
    } catch (err) {
        return next(err)
    }
});

// get user details
router.get('/:username', async function (req, res, next) {
    console.log('~~~~~~~~~~~~4~~~~~~~~~~~~~~', req.params)
    try {
        // retrieves users profile
        const result = await db.query(
            `SELECT email, first_name AS "firstName", last_name AS "lastName" FROM users
            WHERE username = $1`,
            [req.params.username]
        );

        const user = result.rows[0];
        console.log('-----------------------', user)
        res.send(user)
    } catch (err) {
        return next(err)
    }
});

// update user details
router.patch('/', async function (req, res, next) {
    try {
        const { username, email, firstName, lastName } = req.body;

        // updates user columns in db 
        const result = await db.query(
            `UPDATE users
            SET email = $1, first_name = $2, last_name = $3
            WHERE username = $4
            RETURNING username`,
            [email, firstName, lastName, username]
        );

        const user = result.rows[0];

        res.send(user)
    } catch (err) {
        return next(err)
    }
});

// login user; authenticate credentials
router.post('/login', async function (req, res, next) {
    try {
        const { username, password } = req.body;

        // hashes password
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `SELECT username, password FROM users
            WHERE username = $1`,
            [username]
        );

        const user = result.rows[0];
        console.log('////////////////////////////////', user)

        // if username is in db, check against hashed password
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
              delete user.password;
              res.send(user);
            }
        }

        res.send('Invalid login credentials.')
    } catch (err) {
        return next(err)
    }
});




// router.get('/', async function (req, res, next) {
//     try {
//     } catch (err) {
//         return next(err)
//     }
// });

module.exports = router;
