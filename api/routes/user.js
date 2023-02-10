const router = require('express').Router();

const userController = require('../controllers/user');

// product routes
router.get('/v1/product/:id?', userController.getProduct);
router.get('/v1/available', userController.getAvailableProduct);

module.exports = router;
