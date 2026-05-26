const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    avatar: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
    },

    preferences: {
      theme: {
        type: String,
        default: 'light',
      },

      language: {
        type: String,
        default: 'English',
      },

      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);