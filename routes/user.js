const router = require('express').Router()
const controller = require('../controller')
const user = require('../models/user')
const stripe = require('stripe')('pk_live_51GwCfaFyetTzufDNcpEmglcKUNAVrgJIBTA9Itkxkq5qgDl0fRY5YDSfzs1P7CndIDKbJEiqIqC3WqmeUeTYbDRO00FQxgmv4i');

router.get('/check', (req,res) => res.send('hello world'))
router.post('/signup', controller.signUp(user))
router.post('/signin', controller.signIn(user))
router.get('/cart', controller.getCart)
router.post('/id', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'clothes',
        },
        unit_amount: req.query.amount,
      },
      quantity: req.query,quantity,
    }],
    mode: 'payment',
    success_url: 'http:localhost:8080/',
    cancel_url: 'http:localhost:8080/',
  });
  res.json({session_id: session.id});
});

module.exports = router
