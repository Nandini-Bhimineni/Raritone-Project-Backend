const jwt = require("jsonwebtoken");

// Protect routes (authentication)
const protect = (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed"
    });
  }
};

module.exports = { protect };