// modules required for routing
// import the express object
let express = require('express');
// create the router for our application
let router = express.Router();

// import mongoose NPM package
let mongoose = require('mongoose');

// import passport NPM package
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

// create the game object - represents a document in the
// games collection
let game = require('../models/games');

// function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    displayName: req.user ? req.user.displayName : ''
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    displayName: req.user ? req.user.displayName : ''
   });
});

/* GET /login - render the login view */
router.get('/login', (req, res, next) => {
  // check to see  if the user is not already logged index
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: 'Login',
      games: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/games'); // redirect to the games list
  }
});

// POST /login - process the login page
router.post('/login', passport.authenticate('local', {
  successRedirect: '/games',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
