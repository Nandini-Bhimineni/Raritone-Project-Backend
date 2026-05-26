const jwt =
require("jsonwebtoken");


// ACCESS TOKEN
const generateAccessToken =
(id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "15m"
    }

  );

};


// REFRESH TOKEN
const generateRefreshToken =
(id) => {

  return jwt.sign(

    { id },

    process.env.JWT_REFRESH_SECRET,

    {
      expiresIn: "7d"
    }

  );

};


module.exports = {

  generateAccessToken,

  generateRefreshToken

};