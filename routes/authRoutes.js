const express = require("express");

const router = express.Router();

const authController =
require("../controllers/authController");

const {
  googleLogin
} = require(
  "../controllers/googleAuthController"
);


// ======================
// AUTH ROUTES
// ======================


// SIGNUP / REGISTER
router.post(
  "/signup",
  authController.signup
);

router.post(
  "/register",
  authController.signup
);


// LOGIN
router.post(
  "/login",
  authController.login
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