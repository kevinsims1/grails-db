const router = require('express').Router()
const controller = require('../controller')
router.get('/check', (req,res) => res.send('hello world'))
router.post('/signup', controller.signUp)
router.post('/signin', controller.signIn)


module.exports = router
