const Wishlist = require("../models/wishlist");


// Add Product to Wishlist
exports.addToWishlist = async (req, res) => {

    try {

        const { userId, productId } = req.body;

        let wishlist = await Wishlist.findOne({ user: userId });

        // Create wishlist if not exists
        if (!wishlist) {

            wishlist = new Wishlist({
                user: userId,
                products: []
            });
        }

        // Prevent duplicate products
        if (wishlist.products.includes(productId)) {

            return res.status(400).json({
                message: "Product already in wishlist"
            });
        }

        wishlist.products.push(productId);

        await wishlist.save();

        res.status(200).json({
            message: "Product added to wishlist",
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



// Remove Product from Wishlist
exports.removeFromWishlist = async (req, res) => {

    try {

        const { userId } = req.body;

        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {

            return res.status(404).json({
                message: "Wishlist not found"
            });
        }

        wishlist.products = wishlist.products.filter(
            (item) => item.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({
            message: "Product removed from wishlist",
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



// Fetch User Wishlist
exports.getWishlist = async (req, res) => {

    try {

        const { userId } = req.query;

        const wishlist = await Wishlist.findOne({
            user: userId
        }).populate("products");

        if (!wishlist) {

            return res.status(404).json({
                message: "Wishlist not found"
            });
        }

        res.status(200).json(wishlist);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};