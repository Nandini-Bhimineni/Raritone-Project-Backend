const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    bio: {
        type: String,
        default: ''
    },

    phone: {
        type: String,
        default: null
    },

    location: {
        type: String,
        default: null
    },

    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },

        language: {
            type: String,
            default: 'English'
        },

        notifications: {
            type: Boolean,
            default: true
        }
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);