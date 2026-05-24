const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const protect = require("../middleware/authMiddleware");

const {
  uploadImage,
  getImages,
  getSingleImage,
  updateImage,
  deleteImage,
  uploadProfileImage,
  uploadAvatarImage,
  uploadBodyImage,
} = require("../controllers/imageController");



// GENERAL IMAGE ROUTES

router.post(
  "/upload",
  protect,
  upload.single("image"),
  uploadImage
);

router.get(
  "/",
  protect,
  getImages
);

router.get(
  "/:id",
  protect,
  getSingleImage
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateImage
);

router.delete(
  "/:id",
  protect,
  deleteImage
);



// USER IMAGE STORAGE ROUTES

router.post(
  "/upload/profile",
  protect,
  upload.single("image"),
  uploadProfileImage
);

router.post(
  "/upload/avatar",
  protect,
  upload.single("image"),
  uploadAvatarImage
);

router.post(
  "/upload/body",
  protect,
  upload.single("image"),
  uploadBodyImage
);

module.exports = router;