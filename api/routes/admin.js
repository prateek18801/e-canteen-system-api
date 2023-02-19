const router = require('express').Router();

const userController = require('../controllers/user');
const adminController = require('../controllers/admin');
const authorization = require('../middlewares/authorization');

// product routes
router.get('/v1/product/:category?', userController.getProduct);
router.post('/v1/product/:id?', adminController.postProduct);
router.delete('/v1/product/:id', adminController.deleteProduct);

router.get('/v1/available', userController.getAvailableProduct);
router.get('/v1/available/toggle/:id', adminController.toggleAvailableProduct);

router.get('/v1/order/:status?', adminController.getOrder);

module.exports = router;
