const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  uploadTryOn,
  getTryOnHistory,
  deleteTryOn
} = require("../controllers/tryOnController");

// ================= EXISTING ROUTES =================
router.post(
  "/upload/tryon",
  protect,
  upload.array("image", 2),
  uploadTryOn
);

router.get(
  "/tryon/history",
  protect,
  getTryOnHistory
);

router.delete(
  "/tryon/:id",
  protect,
  deleteTryOn
);

// ================= NEW AI INTEGRATION PLANNING ROUTES =================

// 1. POST /api/tryon (Triggers the AI processing sequence)
// Note: Handled as /api/tryOnRoutes/tryon based on app.js routing configuration
router.post("/tryon", protect, (req, res) => {
  res.status(202).json({
    success: true,
    message: "Virtual try-on AI workflow initiated successfully.",
    sessionId: "try_mock_session_12345",
    status: "processing",
    estimatedTimeSeconds: 15
  });
});

// 2. GET /api/tryon/:id (Retrieves the status/result of the AI operation)
// Note: Handled as /api/tryOnRoutes/tryon/:id based on app.js routing configuration
router.get("/tryon/:id", protect, (req, res) => {
  res.status(200).json({
    success: true,
    sessionId: req.params.id,
    status: "completed",
    result: {
      originalUserImage: "https://res.cloudinary.com/raritone/image/upload/sample_user.jpg",
      apparelImage: "https://res.cloudinary.com/raritone/image/upload/sample_product.jpg",
      outputImage: "https://res.cloudinary.com/raritone/image/upload/generated_tryon_result.jpg"
    }
  });
});

module.exports = router;