"use strict"

//  Routes for users

const express = require('express');
// const User = require('../models/user'); // todo

const router = express.Router();

// register new user
router.post('/register', async function (req, res, next) {
    try {
        res.send('registering')
    } catch (err) {
        return next(err)
    }
});

// get user details
router.get('/', async function (req, res, next) {
    try {
        res.send('registering')
    } catch (err) {
        return next(err)
    }
});

// update user details
router.patch('/', async function (req, res, next) {
    try {
        res.send('registering')
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
