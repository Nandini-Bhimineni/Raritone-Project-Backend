const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const protect = require("../middleware/authMiddleware");

const {
  uploadTryOn,
  getTryOnHistory,
  deleteTryOn
} = require("../controllers/tryOnController");

router.post(
  "/upload/tryon",
  protect,
  upload.array("image", 2),
  uploadTryOn
);

router.get(
  "/tryon/history",
  protect,
  getTryOnHistory
);

router.delete(
  "/tryon/:id",
  protect,
  deleteTryOn
);

module.exports = router;