/**
 * Name: Mohammed Juned Ahmed
 * Student ID: 300833356
 * File: app.js
 * Description: 
 * 
 */

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Goodbye, cruel world!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});