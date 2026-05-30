const mongoose = require("mongoose");

const productMappingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    clothType: {
      type: String,
      required: true,
    },

    supportedBodyTypes: [
      {
        type: String,
      },
    ],

    compatibility: {
      type: String,
      default: "compatible",
    },

    avatarCompatibility: [
      {
        type: String,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model(
  "ProductMapping",
  productMappingSchema
);