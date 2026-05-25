const TryOn = require("../models/TryOn");

exports.uploadTryOn = async (req, res) => {

  try {

    if (!req.files || req.files.length < 2) {

      return res.status(400).json({
        success: false,
        message: "Please upload original and generated images",
      });

    }

    const originalImage = req.files[0].path;

    const generatedImage = req.files[1].path;

    const tryOn = await TryOn.create({

      userId: req.user.id,

      originalImage,

      generatedImage,

    });

    res.status(201).json({
      success: true,
      message: "Try-on images uploaded successfully",
      tryOn,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
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

    const TryOn = require("../models/TryOn");

    const tryOn = await TryOn.findById(req.params.id);

    if (!tryOn) {
      return res.status(404).json({
        success: false,
        message: "Try-on not found"
      });
    }

    await tryOn.deleteOne();

    res.status(200).json({
      success: true,
      message: "Try-on deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};