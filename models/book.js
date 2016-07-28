var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  title:{
    type: String
  },
  owner:{
    type: String
  },
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