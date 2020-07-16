const router = require('express').Router()
const controller = require('../controller')
const user = require('../models/user')
const item = require('../models/item');
const { count } = require('../models/item');
const stripe = require('stripe')('sk_test_51GwCfaFyetTzufDNv2wI6vceoV1US5FtEfYZ4L9JJpZdt5YyG8vQ58zuAqUk9ivD8USC8wF3ynFQS541HvOmCmXX00p6NeLLG9');

router.get('/check', (req,res) => res.send('hello world'))
router.post('/signup', controller.signUp(user))
router.post('/signin', controller.signIn(user))
router.get('/cart', controller.getCart)
router.post('/additem', controller.addToCart)
router.post('/checkout', async (req, res) => {
  let counter = 0
  console.log(req.body.items)
  const records = await item.find().where('_id').in(req.body.items).exec();
  records.forEach(i =>{
    counter = counter + i.price
  console.log(counter)
  console.log(i.price)

  })
  console.log(counter)
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'clothes',
        },
        unit_amount: counter,
      },
      quantity: records.length,
    }],
    mode: 'payment',
    success_url: 'http://localhost:8080/',
    cancel_url: 'http://localhost:8080/',
  });
  res.json({session_id: session.id});
});

module.exports = router
