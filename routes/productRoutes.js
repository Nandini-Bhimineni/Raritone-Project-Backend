const express = require("express");

const router = express.Router();

const {

    addProduct,

    getProducts,

    getProductById,

    updateProduct,

    deleteProduct,

    searchProducts

} = require(
    "../controllers/productController"
);

const protect =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const upload =
require("../middleware/uploadMiddleware");


// ==========================================
// ADD PRODUCT
// ADMIN / SUPER_ADMIN ONLY
// ==========================================

router.post(

    "/",

    protect,

    roleMiddleware(
        "ADMIN",
        "SUPER_ADMIN"
    ),

    upload.array("images", 5),

    addProduct

);


// ==========================================
// GET ALL PRODUCTS
// ==========================================

router.get(
    "/",
    getProducts
);


// ==========================================
// SEARCH PRODUCTS
// ==========================================

router.get(
    "/search",
    searchProducts
);


// ==========================================
// GET SINGLE PRODUCT
// ==========================================

router.get(
    "/:id",
    getProductById
);


// ==========================================
// UPDATE PRODUCT
// ADMIN / SUPER_ADMIN ONLY
// ==========================================

router.put(

    "/:id",

    protect,

    roleMiddleware(
        "ADMIN",
        "SUPER_ADMIN"
    ),

    updateProduct

);


// ==========================================
// DELETE PRODUCT
// ADMIN / SUPER_ADMIN ONLY
// ==========================================

router.delete(

    "/:id",

    protect,

    roleMiddleware(
        "ADMIN",
        "SUPER_ADMIN"
    ),

    deleteProduct

);


module.exports = router;