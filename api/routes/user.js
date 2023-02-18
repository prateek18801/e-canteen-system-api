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



module.exports = router;
