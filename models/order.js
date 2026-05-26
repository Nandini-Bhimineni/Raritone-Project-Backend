const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    products: [

        {

            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            },

            price: {
                type: Number,
                required: true
            }

        }

    ],

    totalAmount: {
        type: Number,
        required: true
    },

    shippingAddress: {

        fullName: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        }

    },

    paymentMethod: {
        type: String,
        enum: [
            "COD",
            "CARD",
            "UPI"
        ],
        default: "COD"
    },

    orderStatus: {

        type: String,

        enum: [
            "PENDING",
            "PLACED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ],

        default: "PENDING"

    }

}, { timestamps: true });

module.exports = mongoose.model(
   "Order",
   orderSchema
);