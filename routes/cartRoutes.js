const router =
require("express").Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

   addToCart,
   getCart,
   removeFromCart

} = require(
   "../controllers/cartController"
);


// ADD
router.post(
   "/",
   authMiddleware,
   addToCart
);


// GET
router.get(
   "/",
   authMiddleware,
   getCart
);


// REMOVE
router.delete(
   "/:productId",
   authMiddleware,
   removeFromCart
);

module.exports = router;