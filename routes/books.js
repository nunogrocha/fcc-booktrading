var express = require('express');
var router = express.Router();
var google = require('googleapis');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('./../models/user');
var Book = require('./../models/book');
var config = require('./../config/main');
var books = google.books('v1');

var API_KEY = 'AIzaSyCp6TeBmn43CwAoM-_E8judP6-LuUoiAuo';

// Get a book by name.
router.get('/search/:name', passport.authenticate('jwt', { session: false }), function(req, res) {
  if(!req.params.name) {
    res.json({ success: false, item: null, cod: 500, error: err });
  } else {
    books.volumes.list({
      auth: API_KEY,
      q: req.params.name
    }, function(err, data) {
      User.findById(req.user._id, function(err, user) {
        if (err){
          res.json({ success: false, item: null, cod: 500, error: err });
        } else {
          var newBook = new Book({
            title: data.items[0].volumeInfo.title,
            owner: req.params.id,
            cover: data.items[0].volumeInfo.imageLinks === undefined ? '' : data.items[0].volumeInfo.imageLinks.thumbnail,
            requested: false
          });
          newBook.save(function(err) {
            console.log(err)
            if (err){
              res.json({ success: false, item: null, cod: 500, error: err });
            } 
          });
          user._books.push(newBook._id);
          user.save(function(err) {
            if (err){
              res.json({ success: false, item: null, cod: 500, error: err });
            } 
          });
          res.json({ success: true, item: newBook, cod: 200 });
        }
      });
    });
  } 
});

// Get a book by id.
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  if(!req.params.id) {
    res.json({ success: false, item: null, cod: 500, error: err });
  } else {
    Book.findById(req.params.id, function(err, book) {
      if (err){
        res.json({ success: false, item: null, cod: 500, error: err });
      } else {
        res.json({ success: true, item: book, cod: 200 });
      }
    });
  } 
});

module.exports = router;
