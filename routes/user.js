const router = require('express').Router()
const controller = require('../controller')
const user = require('../models/user')
const item = require('../models/item')
const { count } = require('../models/item')

router.get('/check', (req, res) => res.send('hello world'))
router.post('/signup', controller.signUp(user))
router.post('/signin', controller.signIn(user))
router.get('/cart', controller.getCart)
router.post('/additem', controller.addToCart)
router.post('/checkout', controller.checkout)

module.exports = router
