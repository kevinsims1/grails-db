const mongoose = require('mongoose');
const Schema = mongoose.Schema

var cartSchema = new Schema({
  category: {type: String, required: true},
  name: {type: String, required: true},
  size: {type: String, required: true},
  condition: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'admin'},
})

var Cart = mongoose.model('cart', cartSchema)


module.exports = Cart