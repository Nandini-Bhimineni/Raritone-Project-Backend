const express = require('express');

const router = express.Router();

const {

    addClothingItem,
    getWardrobeItems,
    deleteWardrobeItem

} = require('../controllers/wardrobeController');

const authMiddleware = require('../middleware/authMiddleware');



// ADD ITEM
router.post('/add', authMiddleware, addClothingItem);



// GET ITEMS
router.get('/', authMiddleware, getWardrobeItems);



// DELETE ITEM
router.delete('/:id', authMiddleware, deleteWardrobeItem);


module.exports = router;