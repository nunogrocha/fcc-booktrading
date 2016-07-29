var mongoose = require('mongoose');
var User = require('./user');

var BookSchema = new mongoose.Schema({
  title:{
    type: String
  },
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cover:{
    type: String
  },
  requested: {
    type: Boolean
  },
  active:{
    type: Boolean
  }
});

module.exports = mongoose.model('Book', BookSchema);