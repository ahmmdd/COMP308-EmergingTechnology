// Our Express Server
//Imported third party module for epress
let express = require('express');

//created server object
let app = express();

//assign a port to constant
const port = 3000;

// setting the absolute value of the path + the folder where HTML files are kept
let path = __dirname + '/routes/'

// setup event loop 
app.listen(port);
console.log(`Server running at http://localhost: ${port}`);

// About route
app.get('/about', (req, res) =>{
  res.sendFile(path + 'about.html');
});

// Contact route
app.get('/contact', (req, res) =>{
  res.sendFile(path + 'contact.html');
});

// main root for any website
app.get('/', (req, res) =>{
  res.sendFile(path + 'index.html');
});

