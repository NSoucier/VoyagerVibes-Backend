"use strict"

// Express backend API for Voyager Vibes

const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);

/** Handle 404 */
app.use(function (req, res, next) {
  return res.status(404).json({error: "404 - page not found."})
})

/** Generic error handler; */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;
