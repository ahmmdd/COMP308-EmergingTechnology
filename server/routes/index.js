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
    displayName: req.user ? req.user.displayName : '',
    games: ''
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

// GET /register - render the register page
router.get('/register', (req, res, next) =>{
  // check if the user is not already logged in
  if(!req.user) {
    // render the registration page
    res.render('auth/register', {
      title: 'Register',
      games: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
});

// POST /register - process the registration view
router.post('/register', (req, res, next) => {
  User.register(
    new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
      }),
      req.body.password,
      (err) => {
        if(err) {
          console.log('Error insterting new user');
          if(err.name == 'UserExistsError') {
            req.flash('registerMessage', 'Registration Error: User Already Exists!');
          }
          return res.render('auth/register', {
            title: 'Register',
            games: '',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
          });
        }
        // if registration is successful
        return passport.authenticate('local')(req, res, ()=>{
          res.redirect('/games');
        });
      });
});

// GET /logout - logout the user and redirect to the home page
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/'); // redirect to homepage
});

module.exports = router;
