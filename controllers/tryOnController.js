const TryOn = require("../models/TryOn");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinaryUpload");

exports.uploadTryOn = async (req, res) => {

  try {

    if (!req.files || req.files.length < 2) {

      return res.status(400).json({
        success: false,
        message: "Please upload original and generated images",
      });

    }

    // Upload original image
    const originalResult = await uploadToCloudinary(req.files[0].buffer, {
      folder: 'raritone/tryon',
      resource_type: 'auto',
    });

    // Upload generated image
    const generatedResult = await uploadToCloudinary(req.files[1].buffer, {
      folder: 'raritone/tryon',
      resource_type: 'auto',
    });

    const tryOn = await TryOn.create({

      userId: req.user.id,

      originalImage: originalResult.secure_url,
      originalImagePublicId: originalResult.public_id,

      generatedImage: generatedResult.secure_url,
      generatedImagePublicId: generatedResult.public_id,

    });

    res.status(201).json({
      success: true,
      message: "Try-on images uploaded successfully",
      tryOn,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload try-on images",
    });

  }

};

exports.getTryOnHistory = async (req, res) => {

  try {

    const history = await TryOn.find({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.deleteTryOn = async (req, res) => {
  try {

    const tryOn = await TryOn.findById(req.params.id);

    if (!tryOn) {
      return res.status(404).json({
        success: false,
        message: "Try-on not found"
      });
    }

    // Delete images from Cloudinary
    if (tryOn.originalImagePublicId) {
      try {
        await deleteFromCloudinary(tryOn.originalImagePublicId);
      } catch (error) {
        console.warn("Failed to delete original image from Cloudinary:", error.message);
      }
    }

    if (tryOn.generatedImagePublicId) {
      try {
        await deleteFromCloudinary(tryOn.generatedImagePublicId);
      } catch (error) {
        console.warn("Failed to delete generated image from Cloudinary:", error.message);
      }
    }

    await tryOn.deleteOne();

    res.status(200).json({
      success: true,
      message: "Try-on deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete try-on"
    });
  }
};