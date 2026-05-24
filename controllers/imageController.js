const Image = require("../models/Image");
const User = require("../models/User");


// ================= UPLOAD GENERAL IMAGE =================

exports.uploadImage = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const image = await Image.create({

      userId: req.user.id,

      imageUrl: req.file.path || req.file.filename,

      publicId: req.file.filename,

      imageType: req.body.imageType,

    });

    res.status(201).json({
      success: true,
      image,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
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

      image.imageUrl = req.file.path || req.file.filename;

      image.publicId = req.file.filename;

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
      message: error.message,
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

    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// ================= UPLOAD PROFILE IMAGE =================

exports.uploadProfileImage = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No profile image uploaded",
      });

    }

    console.log(req.user);

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    user.profileImage = req.file.filename;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
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

    const user = await User.findByIdAndUpdate(

      req.user.id,

      {
        avatarImage: req.file.path || req.file.filename,
      },

      {
        new: true,
      }

    );

    res.status(200).json({
      success: true,
      message: "Avatar image uploaded successfully",
      avatarImage: user.avatarImage,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
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

    const user = await User.findByIdAndUpdate(

      req.user.id,

      {
        bodyImage: req.file.path || req.file.filename,
      },

      {
        new: true,
      }

    );

    res.status(200).json({
      success: true,
      message: "Body image uploaded successfully",
      bodyImage: user.bodyImage,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};