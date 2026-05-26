const jwt =
require("jsonwebtoken");

const User =
require("../models/User");


const authMiddleware =
async (req, res, next) => {

  try {

    const authHeader =
    req.header("Authorization");

    // CHECK TOKEN
    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message:
        "No token, authorization denied"

      });

    }

    // EXTRACT TOKEN
    const token =
    authHeader.startsWith("Bearer ")

      ? authHeader.split(" ")[1]

      : authHeader;

    // VERIFY TOKEN
    const decoded =
    jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    // GET USER
    const user =
    await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
        "User not found"

      });

    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message:
      "Invalid or expired token"

    });

  }

};


module.exports =
authMiddleware;