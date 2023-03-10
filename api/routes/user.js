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

// favourites routes
router.get('/v1/favourites', authorization('user'), userController.getFavourites);
router.get('/v1/favourites/toggle/:id', authorization('user'), userController.toggleFavourite);

// order routes
router.get('/v1/order/create', authorization('user'), userController.createOrder);
router.get('/v1/order/cancel/:id', authorization('user'), userController.cancelOrder);

// transaction routes
router.get('/v1/payment/:id', authorization('user'), userController.makePayment);
router.post('/v1/txn-callback', authorization('user'), userController.handleCallback);

module.exports = router;
