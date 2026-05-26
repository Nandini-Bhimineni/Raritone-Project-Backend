const mongoose = require('mongoose');

const wardrobeSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    clothingName: {
        type: String,
        required: true
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
        default: null
    },

    image: {
        type: String,
        default: null
    },

    imagePublicId: {
        type: String,
        default: null
    },

    size: {
        type: String,
        default: null
    },

    condition: {
        type: String,
        enum: ['new', 'like-new', 'good', 'fair'],
        default: 'good'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Wardrobe', wardrobeSchema);