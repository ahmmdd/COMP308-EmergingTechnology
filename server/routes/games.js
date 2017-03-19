// import the express object
let express = require('express');
// create the router for our application
let router = express.Router();

// import mongoose NPM package
let mongoose = require('mongoose');

// create the game object - represents a document in the
// games collection
let game = require('../models/games');

/* GET main games page. */
router.get('/', (req, res, next) => {
  // find all games in the games collection

  game.find((err, games) => {

    if (err) {
      return console.error(err);
    }
    else {
      res.render('games/index', {
        title: 'Games',
        games: games
      });

    }

  });

});

// GET add page - show the blank details page
router.get('/add', (req, res, next) => {
    res.render('games/details', {
      title: 'Add a new Game',
      games: ''
    });
});

// POST add page - save the Game to the db
router.post('/add', (req, res, next) => {
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

/* GET edit - show current game to edit */
router.get('/:id', (req, res, next) => {

  // get a reference to the id of the game to edit
  let id = req.params.id;

  // find the game to edit by it's id in the games collection
  game.findById(id, (err, games) => {

    if (err) {
      console.error(err);
      res.end(error);
    }
    else {
      // show the edit view
      res.render('games/details', {
        title: 'Game Details',
        games: games
      });

    }

  });

});

/* POST edit - process the game to edit */
router.post('/:id', (req, res, next) => {

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
    }
    else {
      // refresh the games list
      res.redirect('/games');
    }
  });

});

//GET delete - should delete by id
router.get('/delete/:id', (req, res, next) => {

  // get a reference to the id of the game to edit
  let id = req.params.id;

  game.remove({_id: id}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/games');
    }
  });

});




module.exports = router;
