var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Book', BookSchema);