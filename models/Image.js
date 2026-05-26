const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    imageType: {
      type: String,
      enum: [
        "profile",
        "avatar",
        "product",
        "tryon",
        "fashion",
      ],
      index: true,
    },

    publicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
imageSchema.index({ createdAt: -1 });

module.exports = mongoose.model(
  "Image",
  imageSchema
);