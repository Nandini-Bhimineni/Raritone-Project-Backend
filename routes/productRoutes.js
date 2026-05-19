const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


// ADD PRODUCT
router.post(
    "/",
    protect,
    upload.array("images", 5),
    addProduct
);


// GET PRODUCTS
router.get("/", getProducts);


// SEARCH PRODUCTS
router.get("/search", searchProducts);


// GET SINGLE PRODUCT
router.get("/:id", getProductById);


// UPDATE PRODUCT
router.put("/:id", protect, updateProduct);


// DELETE PRODUCT
router.delete("/:id", protect, deleteProduct);

module.exports = router;