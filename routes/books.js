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

// Remove a book from a user and from the book collection.
router.delete('/user/:bookId', passport.authenticate('jwt', { session: false }), function(req, res) {
  if(!req.params.bookId) {
    res.json({ success: false, message: 'Invalid Parameters', cod: 400 });
  } else {
    User.update(
      { 
        _id: req.user._id
      },
      { 
        $pull: { '_books': req.params.bookId } 
      }, function(err, user) {
      if (err){
          return next(err);
      } else {
        Book.findByIdAndRemove(req.params.bookId, function(err) {
          if (err) {
            return next(err);
          }
        });
        res.json({ success: true, message: 'OK', cod: 200 });
      }
    }); 
  }
});

// Get a users books.
router.get('/user', passport.authenticate('jwt', { session: false }), function(req, res) {
  User.findById(req.user._id)
  .populate('_books')
  .exec(function(err, user){
    if (err){
      res.json({ success: false, item: null, cod: 500, error: err });
    }
    res.json({ success: true, books: user._books, cod: 200 });
  })
});

// Get a book by name.
router.get('/search/:name', passport.authenticate('jwt', { session: false }), function(req, res) {
  if(!req.params.name) {
    res.json({ success: false, item: null, cod: 500, error: err });
  } else {
    books.volumes.list({
      auth: API_KEY,
      q: req.params.name
    }, function(err, data) {
      if (data.totalItems > 0) {
        User.findById(req.user._id, function(err, user) {
          if (err){
            res.json({ success: false, item: null, cod: 500, error: err });
          } else {
            var newBook = new Book({
              title: data.items[0].volumeInfo.title,
              _owner: req.user.id,
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
      } else {
        res.json({ success: false, item: null, cod: 500, error: err });
      }
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
