// import the express object
let express = require('express');
// create the router for our application
let router = express.Router();

// create the game object - represents a document in the
// games collection
let game = require('../models/games');

// require the users controller for authentication
let usersController = require('../controllers/users');

// require the games controller to access games collection in findById
let gamesController = require('../controllers/games');

// GET the Game Details page in order to add a new Game
router.get('/add', usersController.RequireAuth, (req, res, next) => {
  gamesController.DisplayAdd(req, res);
}).post('/add', usersController.RequireAuth, (req, res, next) => {
  // POST process the Game Details page and create a new Game - CREATE
  gamesController.CreateGame(req, res);
});

// GET the Game Details page in order to edit a new Game
router.get('/:id', usersController.RequireAuth, (req, res, next) => {
  gamesController.DisplayEdit(req, res);
}).post('/:id', usersController.RequireAuth, (req, res, next) => {
  // POST - process the information passed from the details form and update the document
  gamesController.UpdateGame(req, res);
});

 // GET - process the delete by user id
router.get('/delete/:id', usersController.RequireAuth, (req, res, next) => {
  gamesController.DeleteGame(req, res);
});

module.exports = router;
