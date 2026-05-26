const bcrypt = require("bcryptjs");

const User = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/generateToken");

/**
 * REGISTER
 */
exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // Existing user check
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken =
      generateAccessToken(user);

    const refreshToken =
      generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};