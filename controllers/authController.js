const User = require("../models/User");

const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const nodemailer = require("nodemailer");

const {

  generateAccessToken,

  generateRefreshToken

} = require(
  "../utils/generateToken"
);


// ==========================================
// SIGNUP API
// ==========================================

exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
        "All fields are required"

      });

    }

    // CHECK EXISTING USER
    const existingUser =
    await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
        "Email already exists"

      });

    }

    // HASH PASSWORD
    const salt =
    await bcrypt.genSalt(10);

    const hashedPassword =
    await bcrypt.hash(
      password,
      salt
    );

    // CREATE USER
    const user =
    await User.create({

      name,

      email,

      password: hashedPassword

    });

    res.status(201).json({

      success: true,

      message:
      "User registered successfully",

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ==========================================
// LOGIN API
// ==========================================

exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
        "Email and password required"

      });

    }

    // FIND USER
    const user =
    await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        success: false,

        message:
        "Invalid credentials"

      });

    }

    // CHECK PASSWORD
    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message:
        "Invalid credentials"

      });

    }

    // GENERATE TOKENS
    const accessToken =
    generateAccessToken(
      user._id
    );

    const refreshToken =
    generateRefreshToken(
      user._id
    );

    res.status(200).json({

      success: true,

      message:
      "Login successful",

      accessToken,

      refreshToken,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ==========================================
// FORGOT PASSWORD
// ==========================================

exports.forgotPassword =
async (req, res) => {

  try {

    const { email } =
    req.body;

    const user =
    await User.findOne({
      email
    });

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
        "User not found"

      });

    }

    // GENERATE RESET TOKEN
    const resetToken =
    crypto.randomBytes(20)
    .toString("hex");

    user.resetPasswordToken =
    crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    user.resetPasswordExpire =
    Date.now() +
    10 * 60 * 1000;

    await user.save();

    // MAIL TRANSPORT
    const transporter =
    nodemailer.createTransport({

      service: "Gmail",

      auth: {

        user:
        process.env.EMAIL_USER,

        pass:
        process.env.EMAIL_PASS

      }

    });

    const resetUrl =
`http://localhost:5000/api/auth/reset-password/${resetToken}`;

    const mailOptions = {

      to: user.email,

      from:
      process.env.EMAIL_USER,

      subject:
      "Raritone Password Reset",

      text:
`Password reset link:

${resetUrl}

Expires in 10 minutes.`

    };

    await transporter.sendMail(
      mailOptions
    );

    res.status(200).json({

      success: true,

      message:
      "Reset email sent"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ==========================================
// RESET PASSWORD
// ==========================================

exports.resetPassword =
async (req, res) => {

  try {

    const hashedToken =
    crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user =
    await User.findOne({

      resetPasswordToken:
      hashedToken,

      resetPasswordExpire: {
        $gt: Date.now()
      }

    });

    if (!user) {

      return res.status(400).json({

        success: false,

        message:
        "Invalid or expired token"

      });

    }

    // HASH NEW PASSWORD
    const salt =
    await bcrypt.genSalt(10);

    user.password =
    await bcrypt.hash(
      req.body.password,
      salt
    );

    // CLEAR RESET FIELDS
    user.resetPasswordToken =
    undefined;

    user.resetPasswordExpire =
    undefined;

    await user.save();

    res.status(200).json({

      success: true,

      message:
      "Password reset successful"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ==========================================
// LOGOUT API
// ==========================================

exports.logout = async (
  req,
  res
) => {

  res.status(200).json({

    success: true,

    message:
    "Logout successful"

  });

};