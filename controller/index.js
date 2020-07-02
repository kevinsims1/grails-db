const Admin = require('../models/admin')
const Item = require('../models/item')
const bcrypt = require('bcrypt')

module.exports = {
  signUp: async(req,res)=> {
    try{
      const {email,password} = req.body
      if(!email || !password){
        throw new Error('check email and password')
      }

      bcrypt.hash(password, 12, async function(err, hash) {
        try{
          const user =  await Admin.create({ ...req.body, password: hash })
          res.status(200).json({ user })
        }catch(err){
          res.status(404).json({ err })
        }
      })
    }catch(err){
      res.status(500).json({ err })
    }
  },
  signIn: async(req,res)=> {
    try{
      const {email,password} = req.body
      if(email && password){
        const valid = Admin.findOne({email})
        res.status(200).json({ message: 'success' })
      }
      throw new Error('check email and password')
    }catch(err){
      res.status(404).json({ err })
    }
  },
  createItem: async(req, res) => {
    try{
      const newItem = await Item.create({...req.body})
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
      const items = await Item.find( { user: { $in : [req.body.id] } } ).lean().exec()
      res.status(200).json({items})
    }catch(err){
      res.status(500).json({err})
    }
  },
  getItem: async(req, res) => {
    try{
      const item = await Item.findById( { _id: req.body.id } ).lean().exec()
      res.status(200).json({item})
    }catch(err){
      res.status(500).json({err})
    }
  },
  deleteItem: async(req, res) => {
    try{
      const item = await Item.findByIdAndDelete({_id: req.body.id}).lean().exec()
      res.status(200).json({item})
    }catch(err){
      res.status(500).json({err})
    }
  }
}
