const router = require('express').Router();

const userController = require('../controllers/user');
const authorization = require('../middlewares/authorization');

// product routes
router.get('/v1/product/:category?', userController.getProduct);
router.get('/v1/available', userController.getAvailableProduct);

// cart routes
router.get('/v1/cart', authorization('user'), userController.getCart);
router.post('/v1/cart', authorization('user'), userController.postCart);
router.get('/v1/cart/add/:id', authorization('user'), userController.addToCart);


module.exports = router;
