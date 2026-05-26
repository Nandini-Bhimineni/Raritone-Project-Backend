const router =
require("express").Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder

} = require(
   "../controllers/orderController"
);


// CREATE ORDER
router.post(
   "/",
   authMiddleware,
   createOrder
);


// GET ALL ORDERS
router.get(
   "/",
   authMiddleware,
   getOrders
);


// GET SINGLE ORDER
router.get(
   "/:id",
   authMiddleware,
   getSingleOrder
);


// UPDATE STATUS
router.put(
   "/:id",
   authMiddleware,
   updateOrderStatus
);


// DELETE ORDER
router.delete(
   "/:id",
   authMiddleware,
   deleteOrder
);

module.exports = router;