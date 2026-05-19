const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mapping routes straight to Controller functions
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword); // Uses a route parameter (:token)
router.post('/logout', authController.logout);

module.exports = router;