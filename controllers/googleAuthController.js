const {
  OAuth2Client
} = require(
  "google-auth-library"
);

const User =
require("../models/User");

const {

  generateAccessToken,

  generateRefreshToken

} = require(
  "../utils/generateToken"
);


// GOOGLE CLIENT
const client =
new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);


// GOOGLE LOGIN
exports.googleLogin =
async (req, res) => {

  try {

    const { token } =
    req.body;

    // VERIFY GOOGLE TOKEN
    const ticket =
    await client.verifyIdToken({

      idToken: token,

      audience:
      process.env.GOOGLE_CLIENT_ID

    });

    const payload =
    ticket.getPayload();

    const {
      email,
      name,
      picture
    } = payload;

    // CHECK USER
    let user =
    await User.findOne({
      email
    });

    // CREATE USER IF NOT EXISTS
    if (!user) {

      user =
      await User.create({

        name,

        email,

        password:
        "GOOGLE_AUTH",

        profileImage:
        picture

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
      "Google login successful",

      accessToken,

      refreshToken,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        profileImage:
        user.profileImage

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};