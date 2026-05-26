const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true
    },

    images: [{
        type: String,
        required: true
    }],

    imagePublicIds: [{
        type: String,
        required: true
    }],

    stock: {
        type: Number,
        default: 0,
        min: 0
    },

    sellerInfo: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);