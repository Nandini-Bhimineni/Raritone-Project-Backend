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

  originalImagePublicId: {
    type: String,
  },

  generatedImage: {
    type: String,
    required: true,
  },

  generatedImagePublicId: {
    type: String,
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