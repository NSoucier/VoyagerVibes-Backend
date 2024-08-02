"use strict"

// Express backend API for Voyager Vibes

const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const tripsRoutes = require('./routes/trips');
const ExpressError = require('./expressError');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/trips', tripsRoutes);

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

// app.get('/', (req, res, next) => {
//     try {
//         res.send('heyo runner up')
//     } catch (err) {
//         next(err)
//     }
// })

// app.listen(8080, () => {
//     console.log('Server running on port 8080')
// })

