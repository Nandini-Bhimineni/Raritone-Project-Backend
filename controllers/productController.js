const Product = require("../models/product");

const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinaryUpload");

// ==========================================
// ADD PRODUCT
// ==========================================

exports.addProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    // VALIDATION
    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "title, description, price, category required",
      });
    }

    // CLOUDINARY IMAGE HANDLING
    const images = [];
    const imagePublicIds = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer, {
            folder: "raritone/products",
            resource_type: "auto",
          });

          images.push(result.secure_url);
          imagePublicIds.push(result.public_id);

        } catch (error) {
          console.error(
            "Failed to upload product image:",
            error.message
          );

          // CLEANUP IF FAILED
          for (const publicId of imagePublicIds) {
            try {
              await deleteFromCloudinary(publicId);
            } catch (deleteError) {
              console.warn(
                "Failed to cleanup image:",
                deleteError.message
              );
            }
          }

          throw error;
        }
      }
    }

    // CREATE PRODUCT
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

// ==========================================
// GET ALL PRODUCTS
// ==========================================

exports.getProducts = async (req, res) => {
  try {

    console.time("products");

    const products = await Product.find()
      .select(
        "title price category stock images createdAt updatedAt"
      )
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

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

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

// ==========================================
// UPDATE PRODUCT
// ==========================================

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

    // IF NEW IMAGES ARE UPLOADED
    if (req.files && req.files.length > 0) {

      // DELETE OLD IMAGES
      if (
        product.imagePublicIds &&
        product.imagePublicIds.length > 0
      ) {
        for (const publicId of product.imagePublicIds) {
          try {
            await deleteFromCloudinary(publicId);
          } catch (error) {
            console.warn(
              "Failed to delete old product image:",
              error.message
            );
          }
        }
      }

      // UPLOAD NEW IMAGES
      const newImages = [];
      const newPublicIds = [];

      for (const file of req.files) {
        try {

          const result = await uploadToCloudinary(file.buffer, {
            folder: "raritone/products",
            resource_type: "auto",
          });

          newImages.push(result.secure_url);
          newPublicIds.push(result.public_id);

        } catch (error) {

          console.error(
            "Failed to upload product image:",
            error.message
          );

          // CLEANUP
          for (const publicId of newPublicIds) {
            try {
              await deleteFromCloudinary(publicId);
            } catch (deleteError) {
              console.warn(
                "Failed to cleanup image:",
                deleteError.message
              );
            }
          }

          throw error;
        }
      }

      updatedData.images = newImages;
      updatedData.imagePublicIds = newPublicIds;
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
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

// ==========================================
// DELETE PRODUCT
// ==========================================

exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // DELETE IMAGES FROM CLOUDINARY
    if (
      product.imagePublicIds &&
      product.imagePublicIds.length > 0
    ) {
      for (const publicId of product.imagePublicIds) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (error) {
          console.warn(
            "Failed to delete product image:",
            error.message
          );
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

// ==========================================
// SEARCH + FILTER PRODUCTS
// ==========================================

exports.searchProducts = async (req, res) => {
  try {

    const {
      keyword,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    let query = {};

    // KEYWORD SEARCH
    if (keyword) {
      query.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          category: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    // CATEGORY FILTER
    if (category) {
      query.category = category;
    }

    // PRICE FILTER
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
      .select(
        "title price category stock images createdAt updatedAt"
      )
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