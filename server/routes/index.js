/**
 * File Name: index.js
 * Author: Mohammed Juned Ahmed
 * Website Name: https://comp308-assignment2.herokuapp.com/
 * File Description:
 */

/* modules required for routing */
// import the express object
let express = require('express');
// create the router for the application
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

// create the contact object - represents a document in the games coollection
let contact = require('../models/contacts');

// Sorting of the list
/*
contact.contactSchema.find({}, null, {sort: {name: 1}}, function (err, contacts) {
    res.send(contacts);
});
*/
// function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/*++++++++++++++++++++++++++++ Five Page Templates ++++++++++++++++++++++++++*/
/* 1. GET services page. */
router.get('/services', (req, res, next) => {
  res.render('content/services', {
    title: 'Services',
    name: 'Mohammed Juned Ahmed' ,
    displayName: req.user ? req.user.displayName : ''
  });
});

/* 2. GET projects page. */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', { 
    title: 'Projects',
    name: 'Mohammed Juned Ahmed' ,
    displayName: req.user ? req.user.displayName : ''
  });
});

/* 3. GET contact me page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', { 
    title: 'Contact', 
    name: 'Mohammed Juned Ahmed' ,
    displayName: req.user ? req.user.displayName : ''
  });
});

/* 4. GET about me page. */
router.get('/about', (req, res, next) => {
  res.render('content/about', { 
    title: 'About',
    name: 'Mohammed Juned Ahmed' ,
    displayName: req.user ? req.user.displayName : ''
  });
});

/* 5. GET home page. */
router.get('/', (req, res, next) => {
  res.render('content/index', { 
    title: 'Home',
    name: 'Mohammed Juned Ahmed' ,
    displayName: req.user ? req.user.displayName : ''
  });
});

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*++++++++++++++++++++++++++++ Login Templates ++++++++++++++++++++++++++*/
/* GET /login - render the login view */
router.get('/login', (req, res, next) => {
  // check to see if the user is already logged in
  if(!req.user){
    // render the login page
    res.render('auth/login', {
      title: 'Login',
      contacts: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    // redirect to contact list
    return res.redirect('/contacts');
  }
});

/* POST /login  */
router.post('/login', passport.authenticate('local',{
  successRedirect: '/contacts',
  failureRedirect: '/login',
  failureflash: true
}));

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*++++++++++++++++++++++++++++ Registration Templates ++++++++++++++++++++++++++*/

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
          res.redirect('/contacts');
        });
      });
});

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*++++++++++++++++++++++++++++ Loogout Templates ++++++++++++++++++++++++++++*/
// GET /logout - logout the user and redirect to the home page
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/'); // redirect to homepage
});
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
module.exports = router;
