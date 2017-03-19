/**
 * File Name: contact.js
 * Author: Mohammed Juned Ahmed
 * Website Name: https://comp308-assignment2.herokuapp.com/
 * File Description: The model class for the mongoDB collection.
 */

// import the mongoose npm package
let mongoose = require('mongoose');

// create a model class
let contactSchema = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contact', contactSchema);
