const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  },

  publicId: {
    type: String,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Image",
  imageSchema
);