const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// ======================
// AUTH ROUTES (Unified)
// ======================

// register / signup
router.post("/signup", authController.signup);
router.post("/register", authController.signup); // backward support

// login
router.post("/login", authController.login);

// forgot / reset password
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

// logout
router.post("/logout", authController.logout);

module.exports = router;