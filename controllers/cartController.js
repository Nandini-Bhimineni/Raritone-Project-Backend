const Cart = require("../models/cart");


// ADD TO CART
exports.addToCart = async (req, res) => {

    try {

        const {
            productId,
            quantity
        } = req.body;

        let cart = await Cart.findOne({
            userId: req.user.id
        });

        // CREATE CART
        if (!cart) {

            cart = await Cart.create({

                userId: req.user.id,

                products: [
                    {
                        productId,
                        quantity
                    }
                ]

            });

            return res.status(201).json({
                success: true,
                message: "Cart created",
                data: cart
            });

        }

        // CHECK EXISTING PRODUCT
        const existingProduct =
        cart.products.find(

            item =>
            item.productId.toString()
            === productId

        );

        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.products.push({
                productId,
                quantity
            });

        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// GET CART
exports.getCart = async (req, res) => {

    try {

        const cart =
        await Cart.findOne({
            userId: req.user.id
        }).populate("products.productId");

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart empty"
            });

        }

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// REMOVE FROM CART
exports.removeFromCart =
async (req, res) => {

    try {

        const { productId } = req.params;

        const cart =
        await Cart.findOne({
            userId: req.user.id
        });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });

        }

        cart.products =
        cart.products.filter(

            item =>
            item.productId.toString()
            !== productId

        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed",
            data: cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};