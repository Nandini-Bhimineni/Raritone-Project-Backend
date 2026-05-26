const express = require("express");
const router = express.Router();

// Controllers
const productController = require("../controllers/productController");

// Middleware
const upload = require("../middlewares/uploadMiddleware");

const {
  protect
} = require("../middlewares/authMiddleware");

const {
  authorizeRoles
} = require("../middlewares/roleMiddleware");

/**
 * CREATE PRODUCT
 * ADMIN & SUPER_ADMIN ONLY
 */
router.post(
  "/images/product",

  protect,

  authorizeRoles("ADMIN", "SUPER_ADMIN"),

  upload.fields([
    {
      name: "main",
      maxCount: 1
    },
    {
      name: "thumbnails",
      maxCount: 10
    },
    {
      name: "banners",
      maxCount: 5
    }
  ]),

  productController.createProduct
);

/**
 * UPDATE PRODUCT IMAGES
 * ADMIN & SUPER_ADMIN ONLY
 */
router.put(
  "/images/product/:id",

  protect,

  authorizeRoles("ADMIN", "SUPER_ADMIN"),

  upload.fields([
    {
      name: "main",
      maxCount: 1
    },
    {
      name: "thumbnails",
      maxCount: 10
    },
    {
      name: "banners",
      maxCount: 5
    }
  ]),

  productController.updateProductImages
);

/**
 * DELETE PRODUCT IMAGE
 * ADMIN & SUPER_ADMIN ONLY
 */
router.delete(
  "/images/product",

  protect,

  authorizeRoles("ADMIN", "SUPER_ADMIN"),

  productController.deleteProductImage
);

/**
 * GET ALL PRODUCTS
 * PUBLIC ROUTE
 */
router.get(
  "/products",
  productController.getAllProducts
);

module.exports = router;