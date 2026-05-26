const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
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

    images: [String],

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

productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Product", productSchema);