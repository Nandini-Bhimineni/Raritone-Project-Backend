const Product = require("../models/product");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinaryUpload");

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    // Validation
    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "title, description, price, category required",
      });
    }

    // ✅ FIX: Upload images to Cloudinary
    const images = [];
    const imagePublicIds = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer, {
            folder: 'raritone/products',
            resource_type: 'auto',
          });
          images.push(result.secure_url);
          imagePublicIds.push(result.public_id);
        } catch (error) {
          console.error("Failed to upload product image:", error.message);
          // Clean up previously uploaded images if one fails
          for (const publicId of imagePublicIds) {
            try {
              await deleteFromCloudinary(publicId);
            } catch (deleteError) {
              console.warn("Failed to cleanup image:", deleteError.message);
            }
          }
          throw error;
        }
      }
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      images,
      imagePublicIds,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add product",
    });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {

    console.time("products");

    const products = await Product.find()
      .select("title price category stock images createdAt updatedAt")
      .lean();

    console.timeEnd("products");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedData = { ...req.body };

    // If new files are uploaded, replace the old ones
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      if (product.imagePublicIds && product.imagePublicIds.length > 0) {
        for (const publicId of product.imagePublicIds) {
          try {
            await deleteFromCloudinary(publicId);
          } catch (error) {
            console.warn("Failed to delete old product image:", error.message);
          }
        }
      }

      // Upload new images
      const newImages = [];
      const newPublicIds = [];

      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer, {
            folder: 'raritone/products',
            resource_type: 'auto',
          });
          newImages.push(result.secure_url);
          newPublicIds.push(result.public_id);
        } catch (error) {
          console.error("Failed to upload product image:", error.message);
          // Cleanup newly uploaded images if one fails
          for (const publicId of newPublicIds) {
            try {
              await deleteFromCloudinary(publicId);
            } catch (deleteError) {
              console.warn("Failed to cleanup image:", deleteError.message);
            }
          }
          throw error;
        }
      }

      updatedData.images = newImages;
      updatedData.imagePublicIds = newPublicIds;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete images from Cloudinary
    if (product.imagePublicIds && product.imagePublicIds.length > 0) {
      for (const publicId of product.imagePublicIds) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (error) {
          console.warn("Failed to delete product image from Cloudinary:", error.message);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};

// SEARCH + FILTER PRODUCTS
exports.searchProducts = async (req, res) => {
  try {

    const { keyword, category, minPrice, maxPrice } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {

      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    console.time("searchProducts");

    const products = await Product.find(query)
      .select("title price category stock images createdAt updatedAt")
      .lean();

    console.timeEnd("searchProducts");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};