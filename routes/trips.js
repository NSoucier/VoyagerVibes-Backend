"use strict"

//  Routes for users trips

const express = require('express');
// const User = require('../models/trips'); // todo

const router = express.Router();

// get users trips details
router.get('/', async function (req, res, next) {
    try {
        res.send('retrieving trip')
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
