const mongoose = require('mongoose');
const Schema = mongoose.Schema

var userSchema = new Schema({
  email: String,
  password: String,
  cart: {type: mongoose.Schema.Types.ObjectId, ref: 'cart'},
})

var User = mongoose.model('user', userSchema)


module.exports = User
