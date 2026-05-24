const cloudinary = require('cloudinary').v2;

cloudinary.config({
<<<<<<< HEAD

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRET
=======
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
>>>>>>> 4df0be7 (Completed User Image Storage Module)
});

module.exports = cloudinary;