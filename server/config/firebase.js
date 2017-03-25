// Firebase requirements
let firebase = require('firebase');
let admin = require('firebase-admin');
let serviceAccount = require('./firebase.json');

// Initialize firbase admin for database access
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL: "https://comp308-lessons.firebaseio.com/"
});

// Initialize firebase web
// Initialize firebase 
let config = {
  apiKey: "AIzaSyD0agLvDxCQD-e4ZGaKQIyBteH5swoMhbw",
  authDomain: "comp308-lessons.firebaseapp.com",
  databaseURL: "https://comp308-lessons.firebaseio.com",
  storageBucket: "comp308-lessons.appspot.com",
  messagingSenderId: "880356889223"
};
firebase.initializeApp(config);

let firebaseDB = admin.database();

module.exports.games = firebaseDB.ref("games");

module.exports.admin = admin;

module.exports.auth = firebase.auth();
