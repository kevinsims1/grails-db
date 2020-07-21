const router = require('express').Router()
const controller = require('../controller')
const user = require('../models/user')
const item = require('../models/item')
const { count } = require('../models/item')
const stripe = require('stripe')(
  'sk_test_51GwCfaFyetTzufDNv2wI6vceoV1US5FtEfYZ4L9JJpZdt5YyG8vQ58zuAqUk9ivD8USC8wF3ynFQS541HvOmCmXX00p6NeLLG9'
)

router.get('/check', (req, res) => res.send('hello world'))
router.post('/signup', controller.signUp(user))
router.post('/signin', controller.signIn(user))
router.get('/cart', controller.getCart)
router.post('/additem', controller.addToCart)
router.post('/checkout', async (req, res) => {
  try{
    const { id, price} = req.body
    console.log('price', price)
    // const charge = price.parseInt(price, 10)
    const payment = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: "usd",
      description: "clothes",
      payment_method: id,
      confirm: true,
      metadata: {integration_check: 'accept_a_payment'},
    })

    console.log(payment)
    return res.status(200).json({
      confirm: 'abc123'
    })
  }catch(err){
    console.log(err)
  }
})

module.exports = router
