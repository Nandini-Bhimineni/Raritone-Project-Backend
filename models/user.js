const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        default: null
    },

    profileImagePublicId: {
        type: String,
        default: null
    },

    avatarImage: {
        type: String,
        default: null
    },

    avatarImagePublicId: {
        type: String,
        default: null
    },

    bodyImage: {
        type: String,
        default: null
    },

    bodyImagePublicId: {
        type: String,
        default: null
    }

}, {

    timestamps: true
});

module.exports = mongoose.model('User', userSchema);