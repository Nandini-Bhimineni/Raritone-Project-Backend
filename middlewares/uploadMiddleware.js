const multer = require("multer");

// Storage configuration
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  }
});

// File validation
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error("Only JPG, PNG, WEBP allowed"),
      false
    );
  }
};

// Multer upload config
const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;