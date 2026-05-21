const Profile = require('../models/Profile');

const User = require('../models/User');

const cloudinary = require('../config/cloudinary');



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

                message: 'No image uploaded'
            });
        }

        const result = await cloudinary.uploader.upload(

            req.file.path,

            {
                folder: 'raritone/profile'
            }
        );

        const user = await User.findByIdAndUpdate(

            req.user.id,

            {
                profileImage: result.secure_url
            },

            { new: true }
        );


        res.status(200).json({

            message: 'Profile image uploaded successfully',

            imageUrl: result.secure_url,

            user
        });

    } catch (error) {

        res.status(500).json({

            message: 'Server Error'
        });
    }
};



// AVATAR IMAGE UPLOAD
const uploadAvatarImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                message: 'No avatar uploaded'
            });
        }

        const result = await cloudinary.uploader.upload(

            req.file.path,

            {
                folder: 'raritone/avatar'
            }
        );

        const user = await User.findByIdAndUpdate(

            req.user.id,

            {
                avatarImage: result.secure_url
            },

            { new: true }
        );


        res.status(200).json({

            message: 'Avatar uploaded successfully',

            imageUrl: result.secure_url,

            user
        });

    } catch (error) {

        res.status(500).json({

            message: 'Server Error'
        });
    }
};



// DELETE PROFILE IMAGE
const deleteProfileImage = async (req, res) => {

    try {

        await User.findByIdAndUpdate(

            req.user.id,

            {
                profileImage: ''
            }
        );

        res.json({

            message: 'Profile image deleted successfully'
        });

    } catch (error) {

        res.status(500).json({

            message: 'Server Error'
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