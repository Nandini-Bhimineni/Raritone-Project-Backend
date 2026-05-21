const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadProfileImage,
  uploadProductImage,
  uploadTryOnImage,
} = require("../controllers/imageController");

router.post(
  "/profile",
  upload.single("image"),
  uploadProfileImage
);

router.post(
  "/product",
  upload.single("image"),
  uploadProductImage
);

router.post(
  "/tryon",
  upload.single("image"),
  uploadTryOnImage
);

module.exports = router;