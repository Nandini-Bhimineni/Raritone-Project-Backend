const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    preferences: {
      theme: {
        type: String,
        default: "light",
      },

      notifications: {
        type: Boolean,
        default: true,
      },
    },

    personalDetails: {
      fullName: String,
      phone: String,
      location: String,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);