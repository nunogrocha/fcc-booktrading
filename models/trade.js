var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Book = require('./book');
var User = require('./user');

var TradeSchema = new mongoose.Schema({
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  _book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  _owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  _target: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Trade', TradeSchema);