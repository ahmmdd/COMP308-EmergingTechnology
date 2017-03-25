/*
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object
*/

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
module.exports.ProcessRegistration = (req, res, next) => {

  // uses admin to setup a new user
  firebaseAdmin.auth().createUser({
    email: req.body.email,
    emailVerified: true,
    password: req.body.password,
    displayName: req.body.displayName,
    disabled: false
  })
  // if user information is entered correctly and nothing goes wrong
  .then((userRecord)=>{
    firebaseAuth.signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(()=>{
      return res.redirect('/games');
    })
    .catch((err) => {
      console.log(err);
      return res.redirect('/login');
    });
  })
  .catch((err) => {
    let errorCode = err.code;
    let errorMessage = err.message;
    if(errorCode == 'auth/weak-password') {
      req.flash('registerMessage', 'The password is too weak');
    }
    if(errorCode == 'auth/email-already-in-use') {
      req.flash('registerMessage', 'The email is already in use');
    }
    if(errorCode == 'auth/invalid-email') {
      req.flash('registerMessage', ' The email address is not valid');
    }

    return res.render('auth/register', {
      title: "Register",
      games: "",
      messages: req.flash('registerMessage'),
      displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ""
    })

  });
}

// Process the Logout request
module.exports.ProcessLogout = (req, res) => {
  firebaseAuth.signOut()
  .then(()=>{
    res.redirect('/'); // redirect to home page
  });
}

  // create a function to check if the user is authenticated
module.exports.RequireAuth = (req, res, next) => {
  // check if the user is logged in
  if(!firebaseAuth.currentUser) {
    return res.redirect('/login');
  }
  next();
}