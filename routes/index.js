/**
 * File Name: index.js
 * Author: Mohammed Juned Ahmed
 * Website Name: https://comp308assignment1.herokuapp.com/
 * File Description:
 */

var express = require('express');
var router = express.Router();
//++++++++++++++++++++++++++++ Templates +++++++++++++++++++++++++++++++++++
/* 1. GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', 
                        name: 'Mohammed Juned Ahmed' });
});

/* 2. GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', 
                        name: 'Mohammed Juned Ahmed' });
});

/* 3. GET contact me page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', 
                        name: 'Mohammed Juned Ahmed' });
});

/* 4. GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', 
                        name: 'Mohammed Juned Ahmed' });
});

/* 5. GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', 
                        name: 'Mohammed Juned Ahmed' });
});



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
