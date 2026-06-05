const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    avatarImage: {
        type: String,
        required: true
    },

    bodyType: {
        type: String,
        default: "average"
    },

    skinTone: {
        type: String,
        default: "medium"
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },

    avatarModel: {
        type: String,
        default: "AI-Generated"
    },

    status: {
        type: String,
        enum: ["pending", "processing", "completed", "failed"],
        default: "completed"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "Avatar",
    avatarSchema
);