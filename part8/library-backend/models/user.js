const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favouriteGenre:
  {
    type: String,
    required: true,
  },
  books: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }
})

module.exports = mongoose.model('User', schema)