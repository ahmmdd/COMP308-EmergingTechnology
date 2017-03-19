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

// import "mongoose" NPM Module
let mongoose = require('mongoose');

// import the config module
let config = require('./config/db');

// connect to the Mongo db using the URI above
mongoose.connect(process.env.URI || config.URI);

// create a db object and make a reference to the connection
let db = mongoose.connection;

// listen for a successful connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Conneced to MongoDB...");
});

let index = require('./routes/index'); // top level routes
let games = require('./routes/games'); // routes for games
let users = require('./routes/users'); // routes for users and auth

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use('/', index); // top level links
app.use('/games', games); // games links - start with /games
app.use('/users', users); // users links - start with /users

// Passsport User Configuration
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

module.exports = app;
