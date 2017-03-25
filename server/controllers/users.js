let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// Firebase requirements
let firebase = require('../config/firebase.js');
let firebaseDB = firebase.games; // access to games db
let firebaseAdmin = firebase.admin;
let firebaseAuth = firebase.auth;

module.exports.DisplayLogin = (req, res) => {
// check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      games: '',
      messages: req.flash('error'),
      displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ""
    });
    return;
  } else {
    return res.redirect('/games'); // redirect to games list
  }
}

// Processes the Login Request
module.exports.ProcessLogin = (req, res, next) => {
  firebaseAuth.signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(()=>{
      return res.redirect('/games');
    })
    .catch((err) =>{
      let errorCode = err.code;
      let errorMessage = err.message;
      if(errorCode == 'auth/wrong-password') {
        console.log('auth/wrong-password');
        req.flash('loginMessage', 'Incorrect Password');
      }
      if(errorCode == 'auth/user-not-found') {
        console.log('auth/user-not-found');
        req.flash('loginMessage', 'Incorrect Username');
      }

      return res.render('auth/login', {
        title: "Login",
        games: "",
        messages: req.flash('loginMessage'),
        displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ""
      });
    });
}

// Displays registration page
module.exports.DisplayRegistration = (req, res) => {
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the registration page
      res.render('auth/register', {
      title: "Register",
      games: '',
      messages: req.flash('registerMessage'),
      displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ""
    });
    return;
  } else {
    return res.redirect('/games'); // redirect to games list
  }
}

// Process the registration page
module.exports.ProcessRegistration = (req, res) => {
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
        console.log('Error inserting new user');
        if(err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User Already Exists');
        }
        return res.render('auth/register', {
          title: "Register",
          games: '',
          messages: req.flash('registerMessage'),
          displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ""
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/games');
      });
    });
}

// Process the Logout request
module.exports.ProcessLogout = (req, res) => {
  req.logout();
  res.redirect('/'); // redirect to the home page
}

  // create a function to check if the user is authenticated
module.exports.RequireAuth = (req, res, next) => {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/users/login');
  }
  next();
}