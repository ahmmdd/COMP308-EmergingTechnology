/**
 * Name: Mohammed Juned Ahmed
 * Student ID: 300833356
 * File: server.js
 * Description: Express server.
 */

// imported third party module 'express'
let express = require('express');
let app = express();

// assigned a port to constant
//const port = 3000;

// setup a event loop - create port 3000
app.listen(() => {
    console.log(`Server started...`);
});

/* ROUTING - mounted routes */

// second route is /hello 
app.use('/hello', (req, res, next) =>{
    res.send('Hello World!');
});

// first route is '/' root of my website
app.use('/', (req, res, next) =>{
    res.send('Welcome!');
});

module.exports = app;