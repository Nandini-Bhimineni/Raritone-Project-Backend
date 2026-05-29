const express = require("express");

const router = express.Router();

const authController =
  require("../controllers/authController");

const {
  googleLogin,
} = require(
  "../controllers/googleAuthController"
);

const validate = require("../middleware/validate");

const {
  loginSchema,
  signupSchema,
} = require("../validators/authValidator");

// ======================
// AUTH ROUTES
// ======================

// SIGNUP / REGISTER
router.post(
  "/signup",
  validate(signupSchema),
  authController.signup
);

// LOGIN
router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

// VIEW ACTIVE USERS
router.get(
  "/",
  authController.allusers
);

// GOOGLE LOGIN
router.post(
  "/google",
  googleLogin
);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  authController.forgotPassword
);

// RESET PASSWORD
router.post(
  "/reset-password/:token",
  authController.resetPassword
);

// LOGOUT
router.post(
  "/logout",
  authController.logout
);

module.exports = router;