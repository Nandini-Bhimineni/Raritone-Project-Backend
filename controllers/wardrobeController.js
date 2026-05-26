const Wardrobe = require('../models/Wardrobe');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUpload');



// ADD CLOTHING ITEM
const addClothingItem = async (req, res) => {

    try {

        const {
            clothingName,
            category,
            color,
            brand,
            size,
            condition
        } = req.body;

        let imageUrl = null;
        let imagePublicId = null;

        // Upload image if provided
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, {
                folder: 'raritone/wardrobe',
                resource_type: 'auto',
            });
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
        }

        const wardrobeItem = new Wardrobe({
            userId: req.user.id,
            clothingName,
            category,
            color,
            brand,
            image: imageUrl,
            imagePublicId,
            size,
            condition
        });

        await wardrobeItem.save();

        res.status(201).json({
            success: true,
            message: 'Clothing item added successfully',
            wardrobeItem
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};



// GET ALL CLOTHING ITEMS
const getWardrobeItems = async (req, res) => {

    try {

        const items = await Wardrobe.find({ userId: req.user.id });

        res.status(200).json({
            success: true,
            count: items.length,
            items
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};



// DELETE CLOTHING ITEM
const deleteWardrobeItem = async (req, res) => {

    try {

        const item = await Wardrobe.findById(req.params.id);

        if (!item) {

            return res.status(404).json({
                success: false,
                message: 'Item Not Found'
            });
        }

        // Verify user owns this item
        if (item.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this item'
            });
        }

        // Delete image from Cloudinary if it exists
        if (item.imagePublicId) {
            try {
                await deleteFromCloudinary(item.imagePublicId);
            } catch (error) {
                console.warn("Failed to delete wardrobe image from Cloudinary:", error.message);
            }
        }

        await Wardrobe.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Item Deleted Successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};


module.exports = {

    addClothingItem,
    getWardrobeItems,
    deleteWardrobeItem
};