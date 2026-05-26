const Product = require("../models/Product");

/**
 * CREATE PRODUCT
 */
exports.createProduct = async (req, res) => {

  try {

    const {
      name,
      price,
      description
    } = req.body;

    const files = req.files;

    const product = new Product({

      name,

      price,

      description,

      images: {

        main:
          files?.main?.[0]?.path || "",

        thumbnails:
          files?.thumbnails?.map(
            (file) => file.path
          ) || [],

        banners:
          files?.banners?.map(
            (file) => file.path
          ) || []
      }
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * UPDATE PRODUCT IMAGES
 */
exports.updateProductImages = async (req, res) => {

  try {

    const productId = req.params.id;

    const files = req.files;

    const product =
      await Product.findById(productId);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Update main image
    if (files?.main) {

      product.images.main =
        files.main[0].path;
    }

    // Add thumbnails
    if (files?.thumbnails) {

      product.images.thumbnails.push(
        ...files.thumbnails.map(
          (file) => file.path
        )
      );
    }

    // Add banners
    if (files?.banners) {

      product.images.banners.push(
        ...files.banners.map(
          (file) => file.path
        )
      );
    }

    await product.save();

    res.json({
      success: true,
      message: "Product images updated",
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * DELETE PRODUCT IMAGE
 */
exports.deleteProductImage = async (req, res) => {

  try {

    const {
      productId,
      type,
      imageUrl
    } = req.body;

    const product =
      await Product.findById(productId);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Delete main image
    if (type === "main") {

      product.images.main = "";

    } else {

      // Delete thumbnail/banner
      product.images[type] =
        product.images[type].filter(
          (img) => img !== imageUrl
        );
    }

    await product.save();

    res.json({
      success: true,
      message: "Image deleted successfully",
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * GET ALL PRODUCTS
 */
exports.getAllProducts = async (req, res) => {

  try {

    const products =
      await Product.find();

    res.json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};