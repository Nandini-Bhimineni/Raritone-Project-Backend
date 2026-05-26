const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    chest: {
      type: Number,
      required: true
    },

    waist: {
      type: Number,
      required: true
    },

    shoulder: {
      type: Number,
      required: true
    },

    hip: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

measurementSchema.index({ createdAt: -1 });

module.exports = mongoose.model(
  "Measurement",
  measurementSchema
);