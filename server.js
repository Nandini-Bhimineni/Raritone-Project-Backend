require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const Product = require("./models/product");

const app = express();

// DB
connectDB();

// Sync Product Indexes
Product.syncIndexes()
  .then(() => console.log("Product indexes synced"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

/* NEW MODULES */
app.use("/api/wardrobe", require("./routes/wardrobeRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/tryOnRoutes", require("./routes/tryOnRoutes"));

/* IMAGE STORAGE MODULE */
app.use("/api/images", require("./routes/imageRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Raritone API Running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});