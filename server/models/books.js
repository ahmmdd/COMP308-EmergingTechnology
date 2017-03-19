/**
 * File Name: books.js
 * Author: Mohammed Juned Ahmed
 * Student ID: 300833356
 * Website Name: https://comp308-w17-midterm-300833356.herokuapp.com/
 * Github Repo: https://github.com/ahmmdd/COMP308-W2017-Midterm-300833356
 */

 let mongoose = require('mongoose');

// create a model class
let booksSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', booksSchema);
