const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  type: String,
  uploadedBy: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", imageSchema);