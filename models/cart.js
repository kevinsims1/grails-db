const mongoose = require('mongoose');
const Schema = mongoose.Schema

var cartSchema = new Schema({
  items: {type: [mongoose.Schema.Types.ObjectId], required: true},
  quantity: {type: Number, required: true},
  price: {type: Number, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

var Cart = mongoose.model('cart', cartSchema)


module.exports = Cart
