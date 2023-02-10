const router = require('express').Router();

const userController = require('../controllers/user');
const adminController = require('../controllers/admin');

// product routes
router.get('/v1/product/:id?', userController.getProduct);
router.post('/v1/product/:id?', adminController.postProduct);
router.delete('/v1/product/:id', adminController.deleteProduct);

router.get('/v1/available', userController.getAvailableProduct);
router.get('/v1/available/toggle/:id', adminController.toggleAvailableProduct);

module.exports = router;
