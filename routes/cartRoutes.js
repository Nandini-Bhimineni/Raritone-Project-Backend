const router = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");


// ADD TO CART
router.post("/", protect, addToCart);

// GET CART
router.get("/", protect, getCart);

// REMOVE FROM CART
router.delete("/:productId", protect, removeFromCart);

module.exports = router;