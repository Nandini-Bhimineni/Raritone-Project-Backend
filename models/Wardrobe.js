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
        default: ''
    },

    image: {
        type: String,
        default: ''
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Wardrobe', wardrobeSchema);