const Wishlist = require("../models/Wishlist");


// Add Product to Wishlist
exports.addToWishlist = async (req, res) => {

    try {

        const { productId } = req.body;
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({ userId });

        // Create wishlist if not exists
        if (!wishlist) {
            wishlist = new Wishlist({
                userId,
                products: []
            });
        }

        // Prevent duplicate products
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        wishlist.products.push(productId);
        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};



// Remove Product from Wishlist
exports.removeFromWishlist = async (req, res) => {

    try {

        const { productId } = req.params;
        const userId = req.user.id;

        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        wishlist.products = wishlist.products.filter(
            (item) => item.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};



// Fetch User Wishlist
exports.getWishlist = async (req, res) => {

    try {

        const userId = req.user.id;

        const wishlist = await Wishlist.findOne({ userId }).populate("products");

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        res.status(200).json({
            success: true,
            wishlist
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};