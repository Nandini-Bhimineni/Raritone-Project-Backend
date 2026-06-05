const Avatar = require("../models/Avatar");

exports.createAvatar = async (req, res) => {
  try {
    const avatar = await Avatar.create(req.body);

    res.status(201).json({
      success: true,
      data: avatar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAvatar = async (req, res) => {
  try {
    const avatar = await Avatar.findById(req.params.id);

    if (!avatar) {
      return res.status(404).json({
        success: false,
        message: "Avatar not found",
      });
    }

    res.status(200).json({
      success: true,
      data: avatar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.find({
      userId: req.params.userId,
    });

    res.status(200).json({
      success: true,
      count: avatars.length,
      data: avatars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAvatar = async (req, res) => {
  try {
    const avatar = await Avatar.findByIdAndDelete(
      req.params.id
    );

    if (!avatar) {
      return res.status(404).json({
        success: false,
        message: "Avatar not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Avatar deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};