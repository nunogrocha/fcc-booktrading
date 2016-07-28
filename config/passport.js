var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/main');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  
  var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies.token) {
        token = req.cookies.token.substring(4);
    } 
    return token;
  };

  var opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._doc._id, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};