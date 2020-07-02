const router = require('express').Router()
const controller = require('../controller')
router.get('/check', (req,res) => res.send('hello world'))
router.post('/create', controller.createItem)
router.post('/update', controller.updateItem)
router.post('/delete', controller.deleteItem)
router.get('/all', controller.getItems)
router.get('/solo', controller.getItem)


module.exports = router
