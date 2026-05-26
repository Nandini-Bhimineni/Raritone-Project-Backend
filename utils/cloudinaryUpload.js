const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

/**
 * Upload file buffer to Cloudinary
 * @param {Buffer} buffer - File buffer from multer memory storage
 * @param {Object} options - Upload options (folder, public_id, etc.)
 * @returns {Promise} Cloudinary upload response
 */
const uploadToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });

        // Convert buffer to stream and pipe to Cloudinary
        Readable.from(buffer).pipe(stream);
    });
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise} Cloudinary deletion response
 */
const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error(`Failed to delete image: ${error.message}`);
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary,
};
