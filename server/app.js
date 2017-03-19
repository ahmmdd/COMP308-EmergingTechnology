/**
 * File Name: app.js
 * Author: Mohammed Juned Ahmed
 * Website Name: https://comp308-assignment2.herokuapp.com/
 * File Description: The Express server configuration file that load up first.
 */

// module inclusion / requirements / dependencies
let express = require('express');
let path = require('path'); // part of node.js core
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// modules for authentication
let session = require("express-session");
let passport = require("passport");
let passportlocal = require("passport-local");
let LocalStrategy = passportlocal.Strategy;
let flash = require("connect-flash"); // display errors / login messages

// import the mongoose NPM module
let mongoose = require("mongoose");

// import the config module
let config = require('./config/db');

//connect to Mongo db using the URI
mongoose.connect(process.env.URI || config.URI);

// create a db object and make a reference to the connection
let db = mongoose.connection;

// Listern for a sucessful connection
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', () => {
    console.log("Connected to MongoDB...");
});


let index = require('./routes/index');
let contacts = require('./routes/contacts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /client
//app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// setup session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: true,
  resave: true
}));

// initialize passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// route redirects
app.use('/', index);
app.use('/contacts', contacts);

// Passport user configuration
let UserModel = require('./models/users');
let User = UserModel.User;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Handle 404 Errors
  app.use(function(req, res) {
    res.status(400);
    res.render('errors/404',{
      title: '404: File Not Found'
    });
  });

  // Handle 500 Errors
  app.use(function(error, req, res, next) {
      res.status(500);
      res.render('errors/500', {
        title:'500: Internal Server Error',
        error: error
      });
  });

// used to return application module
module.exports = app;
