const Wardrobe = require('../models/Wardrobe');



// ADD CLOTHING ITEM
const addClothingItem = async (req, res) => {

    try {

        const {
            clothingName,
            category,
            color,
            brand,
            image
        } = req.body;

        const wardrobeItem = new Wardrobe({

            userId: null,

            clothingName,
            category,
            color,
            brand,
            image
        });

        await wardrobeItem.save();

        res.status(201).json({

            message: 'Clothing item added successfully',

            wardrobeItem
        });

    } catch (error) {

        res.status(500).json({
            message: 'Server Error'
        });
    }
};



// GET ALL CLOTHING ITEMS
const getWardrobeItems = async (req, res) => {

    try {

        const items = await Wardrobe.find();

        res.json(items);

    } catch (error) {

        res.status(500).json({
            message: 'Server Error'
        });
    }
};



// DELETE CLOTHING ITEM
const deleteWardrobeItem = async (req, res) => {

    try {

        const item = await Wardrobe.findById(req.params.id);

        if (!item) {

            return res.status(404).json({
                message: 'Item Not Found'
            });
        }

        await Wardrobe.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Item Deleted Successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Server Error'
        });
    }
};


module.exports = {

    addClothingItem,
    getWardrobeItems,
    deleteWardrobeItem
};