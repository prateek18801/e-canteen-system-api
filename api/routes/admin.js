const router = require('express').Router();

const adminController = require('../controllers/admin');

router.get('/product/:id?', adminController.getProduct);
router.post('/product/:id?', adminController.postProduct);
router.delete('/product/:id', adminController.deleteProduct);

module.exports = router;
