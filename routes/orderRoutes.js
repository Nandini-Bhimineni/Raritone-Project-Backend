const router = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");


// CREATE ORDER
router.post("/", protect, createOrder);

// GET ALL ORDERS
router.get("/", protect, getOrders);

// GET SINGLE ORDER
router.get("/:id", protect, getSingleOrder);

// UPDATE STATUS
router.put("/:id", protect, updateOrderStatus);

// DELETE ORDER
router.delete("/:id", protect, deleteOrder);

module.exports = router;