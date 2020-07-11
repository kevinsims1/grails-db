const mongoose = require('mongoose');
const Schema = mongoose.Schema

var cartSchema = new Schema({
  items: {type: [mongoose.Schema.Types.ObjectId], ref:'item'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

var Cart = mongoose.model('cart', cartSchema)


module.exports = Cart
