const Profile = require('../models/Profile');

const User = require('../models/User');

const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUpload');



// GET PROFILE
const getProfile = async (req, res) => {

    try {

        const profile = await Profile.findOne({

            userId: req.user.id

        });

        if (!profile) {

            return res.status(404).json({

                message: 'Profile Not Found'
            });
        }

        res.json(profile);

    } catch (error) {

        res.status(500).json({

            message: 'Server Error'
        });
    }
};



// UPDATE PROFILE
const updateProfile = async (req, res) => {

    try {

        const { bio } = req.body;

        const profile = await Profile.findOneAndUpdate(

            { userId: req.user.id },

            {
                bio,
                updatedAt: Date.now()
            },

            { new: true }
        );

        res.json({

            message: 'Profile Updated Successfully',

            profile
        });

    } catch (error) {

        res.status(500).json({

            message: 'Server Error'
        });
    }
};



// UPDATE PREFERENCES
const updatePreferences = async (req, res) => {

    try {

        const {

            theme,
            language,
            notifications

        } = req.body;

        const profile = await Profile.findOneAndUpdate(

            { userId: req.user.id },

            {

                preferences: {

                    theme,
                    language,
                    notifications
                },

                updatedAt: Date.now()
            },

            { new: true }
        );

        res.json({

            message: 'Preferences Updated Successfully',

            profile
        });

    } catch (error) {

        res.status(500).json({

            message: 'Server Error'
        });
    }
};



// PROFILE IMAGE UPLOAD
const uploadProfileImage = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image uploaded'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete old image from Cloudinary if it exists
        if (user.profileImagePublicId) {
            try {
                await deleteFromCloudinary(user.profileImagePublicId);
            } catch (error) {
                console.warn("Failed to delete old profile image:", error.message);
            }
        }

        // Upload new image to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, {
            folder: 'raritone/profile',
            resource_type: 'auto',
        });

        user.profileImage = result.secure_url;
        user.profileImagePublicId = result.public_id;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile image uploaded successfully',
            imageUrl: result.secure_url,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};



// AVATAR IMAGE UPLOAD
const uploadAvatarImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No avatar uploaded'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete old avatar from Cloudinary if it exists
        if (user.avatarImagePublicId) {
            try {
                await deleteFromCloudinary(user.avatarImagePublicId);
            } catch (error) {
                console.warn("Failed to delete old avatar image:", error.message);
            }
        }

        // Upload new avatar to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, {
            folder: 'raritone/avatar',
            resource_type: 'auto',
        });

        user.avatarImage = result.secure_url;
        user.avatarImagePublicId = result.public_id;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded successfully',
            imageUrl: result.secure_url,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};



// DELETE PROFILE IMAGE
const deleteProfileImage = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete from Cloudinary if publicId exists
        if (user.profileImagePublicId) {
            try {
                await deleteFromCloudinary(user.profileImagePublicId);
            } catch (error) {
                console.warn("Failed to delete profile image from Cloudinary:", error.message);
            }
        }

        user.profileImage = null;
        user.profileImagePublicId = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile image deleted successfully'
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

    getProfile,
    updateProfile,
    updatePreferences,

    uploadProfileImage,
    uploadAvatarImage,
    deleteProfileImage
};