const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware"); // ✅ correct

router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    message: "File uploaded successfully",
    file: req.file
  });
});

module.exports = router;