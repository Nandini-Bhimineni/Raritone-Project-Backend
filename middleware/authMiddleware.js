const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {

    const authHeader = req.header("Authorization");

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });

    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }

};