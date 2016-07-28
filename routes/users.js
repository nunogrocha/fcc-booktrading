var express = require('express');
var router = express.Router();
var google = require('googleapis');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('./../models/user');
var config = require('./../config/main');

// Register new users
router.post('/register', function(req, res) {
  if(!req.body.username || !req.body.password) {
    res.json({ success: false, message: 'Please enter username and password.', cod: 400 });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err, user) {
      if (err) {
        throw err;
      }
      var token = jwt.sign(user, config.secret, {
          expiresIn: config.tokenexpire 
      });
      res.json({ success: true, token: token, message: 'OK', cod: 200 });
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user, config.secret, {
            expiresIn: config.tokenexpire
          });
          res.json({ success: true, token: 'JWT ' + token, message: 'OK', cod: 200 });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.', cod: 400 });
        }
      });
    }
  });
});

// Update user profile.
router.post('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
  User.findById(req.user._id,function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({ success: false, message: 'User not found.' });
    } else {
      user.fullName = req.body.fullName;
      user.city = req.body.city;
      user.state = req.body.state;
      user.save(function(err) {
        if (err){
          return next(err);
        } else {
          res.json({ success: true, message: 'OK', cod: 200 });
        }
      });
    }
  });
});

// Get a users profile.
router.get('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err){
      return next(err);
    } else {
      console.log(user)
      var output = {
        user: user.username,
        fullName: user.fullName,
        city: user.city,
        state: user.state
      };
      res.json({ success: true, message: 'OK', cod: 200, item: output });
    }
  });  
});

module.exports = router;
