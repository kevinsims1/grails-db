const router = require('express').Router()
const controller = require('../controller')
const user = require('../models/user')
router.get('/check', (req,res) => res.send('hello world'))
router.post('/signup', controller.signUp(user))
router.post('/signin', controller.signIn(user))


module.exports = router
