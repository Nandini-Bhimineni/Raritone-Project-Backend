exports.uploadProfileImage = async (req, res) => {
  res.status(200).json({
    message: "Profile image upload route",
  });
};

exports.uploadProductImage = async (req, res) => {
  res.status(200).json({
    message: "Product image upload route",
  });
};

exports.uploadTryOnImage = async (req, res) => {
  res.status(200).json({
    message: "Try-on image upload route",
  });
};