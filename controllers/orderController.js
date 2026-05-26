const Order = require("../models/order");


// CREATE ORDER
exports.createOrder = async (req, res) => {

    try {

        const {
            products,
            totalAmount
        } = req.body;

        const order =
        await Order.create({

            userId: req.user.id,

            products,

            totalAmount

        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// GET ALL USER ORDERS
exports.getOrders = async (req, res) => {

    try {

        const orders =
        await Order.find({

            userId: req.user.id

        }).populate("products.productId");

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// GET SINGLE ORDER
exports.getSingleOrder =
async (req, res) => {

    try {

        const order =
        await Order.findById(
            req.params.id
        ).populate("products.productId");

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// UPDATE ORDER STATUS
exports.updateOrderStatus =
async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const order =
        await Order.findById(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// DELETE ORDER
exports.deleteOrder =
async (req, res) => {

    try {

        const order =
        await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};