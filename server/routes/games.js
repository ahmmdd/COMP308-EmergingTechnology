// import the express object
let express = require('express');
// create the router for our application
let router = express.Router();

// import mongoose NPM package
let mongoose = require('mongoose');
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
    return res.redirect('auth/login');
  }
  next();
}

/* GET games List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all games in the games collection
  game.find((err, games) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('games/index', {
        title: 'Games',
        games: games
      });
    }
  });
});

// GET the Game Details page in order to add a new Game
router.get('/add', requireAuth, (req, res, next) => {
    res.render('games/details', {
      title: 'Add a new Game',
      games: ''
    });
});

// POST process the Game Details page and create a new Game - CREATE
router.post('/add', requireAuth, (req, res, next) => {
    game.create({
      "name": req.body.name,
      "cost": req.body.cost,
      "rating": req.body.rating
    }, (err, game) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/games');
      }
    });
});

 // GET the Game Details page in order to edit a new Game
router.get('/:id', requireAuth, (req, res, next) => {
  // get a reference to the id of the game to edit
  let id = req.params.id;
  // find the game to edit by it's id in the games collection
  game.findById(id, (err, games) => {
    if (err) {
      console.error(err);
      res.end(error);
    } else {
      // show the edit view
      res.render('games/details', {
        title: 'Game Details',
        games: games
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  // get a reference to the id of the game to edit
  let id = req.params.id;
  // create a new games object to hold the changes
  let games = new game({
    "_id": id,
    "name": req.body.name,
    "cost": req.body.cost,
    "rating": req.body.rating
  });
  game.update({ _id: id}, games, (err) => {
    if(err) {
      console.log(err);
      res.end(error);
    } else {
      // refresh the games list
      res.redirect('/games');
    }
  });
});

 // GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
  // get a reference to the id of the game to edit
  let id = req.params.id;
  game.remove({_id: id}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/games');
    }
  });
});

module.exports = router;
