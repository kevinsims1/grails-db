const mongoose = require('mongoose');
const Schema = mongoose.Schema

var itemSchema = new Schema({
  category: {type: String, required: true},
  name: {type: String, required: true},
  size: {type: String, required: true},
  condition: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'admin'},
  sold: {type: Boolean, required: true},
  image: {type: String, required: true}
})

var Item = mongoose.model('item', itemSchema)


module.exports = Item
