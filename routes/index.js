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
router.get('/',
  function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    if (token) {
      res.render('index', { title: 'Book Trade Club' });
    } else {
      res.render('login', { title: 'Book Trade Club' });
    }
});

router.get('/login', 
  function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    if (token) {
      res.render('index', { title: 'Book Trade Club' });
    } else {
      res.render('login', { title: 'Book Trade Club' });
    }
});

module.exports = router;
