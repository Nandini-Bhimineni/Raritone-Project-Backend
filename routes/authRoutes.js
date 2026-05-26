const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get(
  "/admin",
  protect,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted"
    });
  }
);

module.exports = router;