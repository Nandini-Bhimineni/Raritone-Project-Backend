exports.register = (req, res) => {
  res.json({
    success: true,
    message: "User registered"
  });
};

exports.login = (req, res) => {
  res.json({
    success: true,
    message: "User logged in"
  });
};