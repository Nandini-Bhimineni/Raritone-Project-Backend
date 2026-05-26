const Image = require("../models/Image");
const User = require("../models/User");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinaryUpload");


// ================= UPLOAD GENERAL IMAGE =================

exports.uploadImage = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'raritone/images',
      resource_type: 'auto',
    });

    const image = await Image.create({
      userId: req.user.id,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      imageType: req.body.imageType,
    });

    res.status(201).json({
      success: true,
      image,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image",
    });

  }

};


// ================= GET ALL IMAGES =================

exports.getImages = async (req, res) => {

  try {

    const images = await Image.find({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: images.length,
      images,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// ================= GET SINGLE IMAGE =================

exports.getSingleImage = async (req, res) => {

  try {

    const image = await Image.findById(req.params.id);

    if (!image) {

      return res.status(404).json({
        success: false,
        message: "Image not found",
      });

    }

    res.status(200).json({
      success: true,
      image,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// ================= UPDATE IMAGE =================

exports.updateImage = async (req, res) => {

  try {

    const image = await Image.findById(req.params.id);

    if (!image) {

      return res.status(404).json({
        success: false,
        message: "Image not found",
      });

    }

    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (image.publicId) {
        try {
          await deleteFromCloudinary(image.publicId);
        } catch (error) {
          console.warn("Failed to delete old image:", error.message);
        }
      }

      // Upload new image to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'raritone/images',
        resource_type: 'auto',
      });

      image.imageUrl = result.secure_url;
      image.publicId = result.public_id;
    }

    if (req.body.imageType) {

      image.imageType = req.body.imageType;

    }

    await image.save();

    res.status(200).json({
      success: true,
      image,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update image",
    });

  }

};


// ================= DELETE IMAGE =================

exports.deleteImage = async (req, res) => {

  try {

    const image = await Image.findById(req.params.id);

    if (!image) {

      return res.status(404).json({
        success: false,
        message: "Image not found",
      });

    }

    // Delete from Cloudinary if publicId exists
    if (image.publicId) {
      try {
        await deleteFromCloudinary(image.publicId);
      } catch (error) {
        console.warn("Failed to delete image from Cloudinary:", error.message);
      }
    }

    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete image",
    });

  }

};


// ================= UPLOAD PROFILE IMAGE =================

exports.uploadProfileImage = async (req, res) => {

  try {
    console.log("entered upload profile image controller");
    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No profile image uploaded",
      });

    }

    const user = await User.findById(req.user.id);
    console.log("found user:", user);
    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // Delete old profile image from Cloudinary if it exists
    if (user.profileImagePublicId) {
      try {
        await deleteFromCloudinary(user.profileImagePublicId);
      } catch (error) {
        console.warn("Failed to delete old profile image:", error.message);
      }
    }

    // Upload new profile image
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'raritone/profile',
      resource_type: 'auto',
    });
    console.log("uploaded to Cloudinary:", result);
    user.profileImage = result.secure_url;
    user.profileImagePublicId = result.public_id;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload profile image",
    });

  }

};


// ================= UPLOAD AVATAR IMAGE =================

exports.uploadAvatarImage = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No avatar image uploaded",
      });

    }

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // Delete old avatar image from Cloudinary if it exists
    if (user.avatarImagePublicId) {
      try {
        await deleteFromCloudinary(user.avatarImagePublicId);
      } catch (error) {
        console.warn("Failed to delete old avatar image:", error.message);
      }
    }

    // Upload new avatar image
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'raritone/avatar',
      resource_type: 'auto',
    });

    user.avatarImage = result.secure_url;
    user.avatarImagePublicId = result.public_id;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar image uploaded successfully",
      avatarImage: user.avatarImage,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload avatar image",
    });

  }

};


// ================= UPLOAD BODY IMAGE =================

exports.uploadBodyImage = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No body image uploaded",
      });

    }

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // Delete old body image from Cloudinary if it exists
    if (user.bodyImagePublicId) {
      try {
        await deleteFromCloudinary(user.bodyImagePublicId);
      } catch (error) {
        console.warn("Failed to delete old body image:", error.message);
      }
    }

    // Upload new body image
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'raritone/body',
      resource_type: 'auto',
    });

    user.bodyImage = result.secure_url;
    user.bodyImagePublicId = result.public_id;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Body image uploaded successfully",
      bodyImage: user.bodyImage,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload body image",
    });

  }

};