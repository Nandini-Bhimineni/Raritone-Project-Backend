const express = require('express');

const router = express.Router();

const {

    getProfile,
    updateProfile,
    updatePreferences,

    uploadProfileImage,
    uploadAvatarImage,
    deleteProfileImage

} = require('../controllers/profileController');

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');



// GET PROFILE
router.get(

    '/',

    authMiddleware,

    getProfile
);



// UPDATE PROFILE
router.put(

    '/update',

    authMiddleware,

    updateProfile
);



// UPDATE PREFERENCES
router.put(

    '/preferences',

    authMiddleware,

    updatePreferences
);



// PROFILE IMAGE
router.post(

    '/images/profile',

    authMiddleware,

    upload.single('image'),

    uploadProfileImage
);



// AVATAR IMAGE
router.post(

    '/images/avatar',

    authMiddleware,

    upload.single('image'),

    uploadAvatarImage
);



// DELETE PROFILE IMAGE
router.delete(

    '/images/profile',

    authMiddleware,

    deleteProfileImage
);



module.exports = router;