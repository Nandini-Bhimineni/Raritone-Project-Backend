const mongoose = require('mongoose');

const wardrobeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    },

    clothingName: {
      type: String,
      required: false
    },

    category: {
      type: String,
      required: true
    },

    color: {
      type: String,
      required: true
    },

    brand: {
      type: String,
      default: ''
    },

    image: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Indexes
wardrobeSchema.index({ category: 1 });
wardrobeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Wardrobe', wardrobeSchema);