const mongoose = require("mongoose");

const tryOnSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
  },
  {
    timestamps: true,
  }
);

// Index for latest try-on records
tryOnSchema.index({ createdAt: -1 });

module.exports = mongoose.model(
  "TryOn",
  tryOnSchema
);