const router = require('express').Router();

const userController = require('../controllers/user');

// product routes
router.get('/v1/product/:id?', userController.getProduct);
router.get('/v1/available', userController.getAvailableProduct);

// cart routes
router.get('/v1/cart', userController.getCart);
router.post('/v1/cart', userController.postCart);
router.get('/v1/cart/add/:id', userController.addToCart);

module.exports = router;
