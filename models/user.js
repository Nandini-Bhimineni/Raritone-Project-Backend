const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

  {

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    role: {

      type: String,

      enum: [
        "USER",
        "ADMIN",
        "SUPER_ADMIN"
      ],

      default: "USER"

    },

    profileImage: {
      type: String,
      default: ""
    },

    avatarImage: {
      type: String,
      default: ""
    },

    bodyScanImage: {
      type: String,
      default: ""
    }

  },

  {
    timestamps: true
  }

);


// INDEX FOR LATEST USERS
userSchema.index({ createdAt: -1 });


module.exports = mongoose.model(
  "User",
  userSchema
);