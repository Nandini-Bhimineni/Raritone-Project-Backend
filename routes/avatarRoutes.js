const express = require("express");

const router = express.Router();

const {
  createAvatar,
  getAvatar,
  getUserAvatars,
  deleteAvatar,
} = require("../controllers/avatarController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

// TEST ROUTE
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Avatar API Working",
  });
});

// CREATE AVATAR
router.post(
  "/",
  authMiddleware,
  createAvatar
);

// GET ALL AVATARS OF A USER
router.get(
  "/user/:userId",
  authMiddleware,
  getUserAvatars
);

// GET SINGLE AVATAR
router.get(
  "/:id",
  authMiddleware,
  getAvatar
);

// DELETE AVATAR
router.delete(
  "/:id",
  authMiddleware,
  deleteAvatar
);

module.exports = router;