// Firebase requirements
let firebase = require('../config/firebase.js');
let firebaseDB = firebase.games; //access to firebaseDB
let firebaseAdmin = firebase.admin;
let firebaseAuth = firebase.auth;

// Display the Home Page
module.exports.DisplayHome = (req, res) => {
  res.render('content/index', {
    title: 'Home',
    games: '',
    displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ""
   });
}

// Displays the Contact Page
module.exports.DisplayContact = (req, res) => {
  res.render('content/contact', {
    title: 'Contact',
    games: '',
    displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ""
   });
}
