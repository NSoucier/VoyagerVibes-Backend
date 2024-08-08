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
        // console.log('~~~~~~~~~~~~~~~~~', req.body)
        // check if username is already taken
        const duplicates = await db.query(`
            SELECT username
            FROM users
            WHERE username = $1`,
            [username]);
        // console.log('~~~~~~~~d~~~~~~~~~', duplicates)
        if (duplicates.rows[0]) {
            // throw new ExpressError(`Duplicate username: ${username}`, 401)
            return res.status(400).send('Username already taken.')
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
        // console.log('~~~~~~~~r~~~~~~~~~', result)

        const user = result.rows[0];

        res.send(user)
    } catch (err) {
        return next(err)
    }
});

// get user details
router.get('/:username', async function (req, res, next) {
    try {
        // retrieves users profile
        const result = await db.query(
            `SELECT email, first_name AS "firstName", last_name AS "lastName", picture FROM users
            WHERE username = $1`,
            [req.params.username]
        );

        const user = result.rows[0];

        if (!user) res.status(404).send('User does not exist.')

        // console.log('-----------------------', result, user, req.params.username)
        res.send(user)
    } catch (err) {
        return next(err)
    }
});

// update user details
router.patch('/:username', async function (req, res, next) {
    console.log('made it')
    try {
        const { username, email, firstName, lastName, picture } = req.body;

        // updates user columns in db 
        const result = await db.query(
            `UPDATE users
            SET email = $1, first_name = $2, last_name = $3, picture = $4
            WHERE username = $5
            RETURNING username`,
            [email, firstName, lastName, picture, username]
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

// add trip itinerary to user profile
router.post('/:username/trips', async function (req, res, next) {
    try {
        const { username } = req.params;
        const { destination, duration, itinerary } = req.body;
        console.log(req.params.username, req.body)

        // insert trip details into db
        const result = await db.query(
            `INSERT INTO mytrips
             (username, destination, duration, itinerary)
             VALUES ($1, $2, $3, $4)
             RETURNING username`,
          [username, destination, duration, itinerary],
        );

        const user = result.rows[0];

        res.send(user)
    } catch (err) {
        return next(err)
    }
});

// get all trips associated with user profile 
router.get('/:username/trips', async function (req, res, next) {
    try {
        const { username } = req.params;

        const result = await db.query(
            `SELECT * FROM mytrips
            WHERE username = $1
            ORDER BY destination`,
            [username]
        );
        console.log('backend', result.rows)
        res.send(result.rows);
    } catch (err) {
        return next(err)
    }
});

// delete trip itinerary from user profile 
router.get('/trips/:tripID', async function (req, res, next) {
    try {
        const { tripID } = req.params;

        const result = await db.query(
            `DELETE FROM myTrips
            WHERE id = $1`,
            [tripID]
        );
        res.send('deleted');
    } catch (err) {
        return next(err)
    }
});
module.exports = router;
