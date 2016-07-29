var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
var User = require('./../models/user');
var Book = require('./../models/book');
var Trade = require('./../models/trade');
var config = require('./../config/main');

var router = express.Router();

/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  function(req, res, next) {
    
    Book.find({}, function(err, books) {
      console.log(books)
      if (err) throw err;
      if (books) {
        res.render('index', { title: 'Book Trade Club', books: JSON.stringify(books) });
      } else {
        res.render('index', { title: 'Book Trade Club', books: [] });
      }
    });
});

router.get('/login', 
  function(req, res, next) {
    res.render('login', { title: 'Book Trade Club',  });
});

router.get('/profile', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  function(req, res, next) {
    res.render('profile', { title: 'Book Trade Club' });
});

router.get('/mybooks', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), 
  function(req, res, next) {
    res.render('mybooks', { title: 'Book Trade Club' });
});

module.exports = router;
