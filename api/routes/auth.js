const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/v1/login', authController.postLogin);
router.post('/v1/signup', authController.postSignup);

module.exports = router;
