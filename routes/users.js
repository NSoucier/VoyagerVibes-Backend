"use strict"

//  Routes for users

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db.js');
// const User = require('../models/user'); // todo
const { BCRYPT_WORK_FACTOR } = require("../config.js");

const router = express.Router();

// register new user
router.post('/', async function (req, res, next) {
    try {
        const { username, email, firstName, lastName, password } = req.body;
        // insert into db
        // const duplicates = await db.query(`
        //     SELECT username
        //     FROM users
        //     WHERE username = $1`,
        //     [])
        res.send(`post user ${username}`)
    } catch (err) {
        return next(err)
    }
});

// get user details
router.get('/', async function (req, res, next) {
    try {
        res.send('get user')
    } catch (err) {
        return next(err)
    }
});

// update user details
router.patch('/', async function (req, res, next) {
    try {
        res.send('patch user')
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
