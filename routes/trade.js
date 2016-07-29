var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('./../models/user');
var Book = require('./../models/book');
var Trade = require('./../models/trade');
var config = require('./../config/main');

// Remove a book request
router.post('/remove', passport.authenticate('jwt', { session: false }), function(req, res) {
  if(!req.body.trade) {
    res.json({ success: false, message: 'Invalid Parameters', cod: 400 });
  } else {
    Trade.findByIdAndRemove(req.body.trade._id,function(err, trade) {
      if (err) throw err;
    });
    Book.findById(req.body.trade._book,function(err, book) {
      if (err) throw err;
      book.requested = false;
      book.save(function(err) {
        if (err) return next(err);
      });
    });
    res.json({ success: true, message: 'OK', cod: 200 });
  }  
});

// Aprove a book request
router.post('/aprove', passport.authenticate('jwt', { session: false }), function(req, res) {
  if(!req.body.trade) {
    res.json({ success: false, message: 'Invalid Parameters', cod: 400 });
  } else {
    Book.findById(req.body.trade._book,function(err, book) {
      if (err) throw err;
      book._owner = req.body.trade._owner;
      book.requested = false;
      book.save(function(err) {
        if (err) return next(err);
        console.log(book)
      });
    });
    Trade.findById(req.body.trade._id,function(err, trade) {
      if (err) throw err;
      trade.approved = true;
      trade.save(function(err) {
        if (err) return next(err);
      });
    });
    User.update(
      { 
        _id: req.body.trade._owner
      },
      { 
        $pull: { '_books': req.body.trade._book } 
      }, function(err, user) {
      if (err) return next(err);
    }); 
    User.update(
      { 
        _id: req.body.trade._target
      },
      { 
        $push: { '_books': req.body.trade._book } 
      }, function(err, user) {
      if (err) return next(err);
    }); 
    res.json({ success: true, message: 'OK', cod: 200 });
  }  
});

// Send a book request
router.post('/request', passport.authenticate('jwt', { session: false }), function(req, res) {
  if(!req.body.ownerId || !req.body.bookId || req.body.ownerId == req.user._id) {
    res.json({ success: false, message: 'Invalid Parameters', owner: req.body.ownerId, book: req.body.bookId,user: req.user._id,  cod: 400 });
  } else {
    Book.findById(req.body.bookId,function(err, book) {
      if (err) throw err;
      if (!book) {
        res.send({ success: false, message: 'Book not found.' });
      } else {
        if (!book.requested) {
          var newTrade = new Trade({
            bookTitle: book.title,
            _book: req.body.bookId,
            _owner: req.body.ownerId,
            _target: req.user.id
          });
          newTrade.save(function(err) {
            if (err){
              res.json({ success: false, item: null, cod: 500, error: err });
            } 
          });
          book.requested = true;
          book.save(function(err) {
            if (err){
              return next(err);
            } else {
              res.json({ success: true, message: 'OK', cod: 200 });
            }
          });
        } else {
          res.json({ success: false, message: 'Book already requested.', cod: 400 });
        }
        
      }
    });
  }
});

module.exports = router;