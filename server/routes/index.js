// modules required for routing
// import the express object
let express = require('express');
// create the router for our application
let router = express.Router();

// require the index controller
let indexController = require('../controllers/index');

// require the users controller
let usersController = require('../controllers/users');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  indexController.DisplayHome(req, res);
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  indexController.DisplayContacts(req, res);
});

/* GET /login - render the login view */
router.get('/login', (req, res, next) => {
  usersController.DisplayLogin(req, res);
  // POST /login - process the login page
}).post('/login', usersController.ProcessLogin());

// GET /register - render the register page
router.get('/register', (req, res, next) =>{
  usersController.DisplayRegistration(req, res);
}).post('/register', (req, res, next)=>{
  // POST / register - process the registration submission
  usersController.ProcessRegistration(req, res);
});

// GET /logout - logout the user and redirect to the home page
router.get('/logout', (req, res, next)=>{
  usersController.ProcessLogout(req, res);
});

module.exports = router;
