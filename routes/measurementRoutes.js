const router = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  saveMeasurement,
  getMeasurement,
  deleteMeasurement
} = require("../controllers/measurementController");


// CREATE / UPDATE
router.post("/", protect, saveMeasurement);

// GET
router.get("/", protect, getMeasurement);

// DELETE
router.delete("/", protect, deleteMeasurement);

module.exports = router;