const router = require('express').Router();

const userController = require('../controllers/user');
const adminController = require('../controllers/admin');
const authorization = require('../middlewares/authorization');

// product routes
router.get('/v1/product/:category?', authorization('admin'), userController.getProduct);
router.post('/v1/product/:id?', authorization('admin'), adminController.postProduct);
router.delete('/v1/product/:id', authorization('admin'), adminController.deleteProduct);

router.get('/v1/available', authorization('admin'), userController.getAvailableProduct);
router.get('/v1/available/toggle/:id', authorization('admin'), adminController.toggleAvailableProduct);

module.exports = router;
