const express = require("express");

const router = express.Router();

const authController =
  require("../controllers/authController");

const {
  protect
} = require("../middlewares/authMiddleware");

const {
  authorizeRoles
} = require("../middlewares/roleMiddleware");

// Register
router.post(
  "/register",
  authController.register
);

// Login
router.post(
  "/login",
  authController.login
);

// Admin Route
router.get(
  "/admin",

  protect,

  authorizeRoles("ADMIN", "SUPER_ADMIN"),

  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Admin"
    });
  }
);

module.exports = router;