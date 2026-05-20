const express = require("express");

const router = express.Router();

const {
    testWishlist
} = require("../controllers/wishlistController");

router.get("/", testWishlist);

module.exports = router;