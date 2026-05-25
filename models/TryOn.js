const mongoose = require("mongoose");

const tryOnSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  originalImage: {
    type: String,
    required: true,
  },

  generatedImage: {
    type: String,
    required: true,
  },

  imageType: {
    type: String,
    default: "tryon",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "TryOn",
  tryOnSchema
);