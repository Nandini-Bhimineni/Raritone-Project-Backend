const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is mandatory"]
    },
    email: {
        type: String,
        required: [true, "Email field is mandatory"],
        unique: true, // Core Rule: Email uniqueness validation
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password field is mandatory"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    avatar: {
        type: String,
        default: "" // Can hold a URL string later when Profile team connects Multer
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);