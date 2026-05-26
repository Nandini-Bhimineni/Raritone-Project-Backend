const router =
require("express").Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

    saveMeasurement,
    getMeasurement,
    deleteMeasurement

} = require(
   "../controllers/measurementController"
);


// CREATE/UPDATE
router.post(
   "/",
   authMiddleware,
   saveMeasurement
);


// GET
router.get(
   "/",
   authMiddleware,
   getMeasurement
);


// DELETE
router.delete(
   "/",
   authMiddleware,
   deleteMeasurement
);

module.exports = router;