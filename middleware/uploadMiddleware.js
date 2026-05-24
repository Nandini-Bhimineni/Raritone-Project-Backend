const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "raritone",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    transformation: [
      {
        width: 1000,
        height: 1000,
        crop: "limit",
      },

      {
        quality: "auto",
      },
    ],
  }),
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid File Type"));
    }
  },
});

module.exports = upload;