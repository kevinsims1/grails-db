const Admin = require('../models/admin')
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
          console.log('hellooo')
          const user =  await Admin.create({ ...req.body, password: hash })
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
  signIn: async(req,res)=> {
    try{
      const {email,password} = req.body
      if(email && password){
        const valid = Admin.findOne({email})
        console.log(valid)
        res.status(200).json({ message: 'success' })
      }
      throw new Error('check email and password')
    }catch(err){
      res.status(404).json({ err })
    }
  },
}
