const Admin = require('../models/admin')
const Item = require('../models/item')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')

module.exports = {
  signUp: (model) => async(req,res) => {
    try{
      const {email,password} = req.body
      console.log(email, password)

      if(!email || !password){
        throw new Error('check email and password')
      }



      bcrypt.hash(password, 12, async function(err, hash) {
        try{
          const user =  await model.create({ ...req.body, password: hash })
          console.log(user)
          res.status(200).json({ user })
        }catch(err){
          res.status(404).json({ err })
        }
      })
    }catch(err){
      res.status(500).json({ err })
    }
  },
  signIn: (model) => async(req,res) => {
    try{
      const {email,password} = req.body
      if(email && password){
        const valid = model.findOne({email})
        res.status(200).json({ message: 'success', user: valid })
      }
      throw new Error('check email and password')
    }catch(err){
      res.status(404).json({ err })
    }
  },
  createItem: async(req, res) => {
    try{
      const newItem = await Item.create({user: req.query.id, ...req.body})
      res.status(200).json({newItem})
    }catch(err){
      res.status(500).json({err})
    }
  },
  updateItem: async(req, res) => {
    try{
      const updatedItem = await Item.findByIdAndUpdate({_id: req.query.id}, req.body, {new:true}).lean().exec()
      res.status(200).json({ updatedItem })
    }catch(err){
      res.status(500).json({err})
    }
  },
  getItems: async(req, res) => {
    try{
      const items = await Item.find( { sold: false } )
      console.log(items)
      res.status(200).json({doc : items})
    }catch(err){
      res.status(500).json({err})
    }
  },
  getItem: async(req, res) => {
    try{
      const item = await Item.findById( { _id: req.query.id } )
      res.status(200).json({item})
    }catch(err){
      res.status(500).json({err})
    }
  },
  deleteItem: async(req, res) => {
    try{
      const item = await Item.findByIdAndDelete({_id: req.query.id}).lean().exec()
      res.status(200).json({item})
    }catch(err){
      res.status(500).json({err})
    }
  },
  getCart: async(req, res) => {
    try{
      const cart = await Cart.find( { user: req.query.id} )
      console.log(cart)
      res.status(200).json({doc : cart})
    }catch(err){
      res.status(500).json({err})
    }
  },
  
}
