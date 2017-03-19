/**
 * Name: Mohammed Juned Ahmed
 * Student ID: 300833356
 * File: server.js
 * Description: Our connect server, imported third party module 'connect'.
 * 
 */

let connect = require('connect');

const http = require('http');

//created server object
let app = connect();

// assigned a port to constant
const port = 3000;

// setup a event loop - create port 3000
app.listen(port);
console.log(`Server running at http://localhost: ${port}`);

/* Mounted 2 routes to server */

// hello route
app.use('/hello', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!');
});

// main route for any website
app.use('/', (req, res, next) =>{
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome:');
});