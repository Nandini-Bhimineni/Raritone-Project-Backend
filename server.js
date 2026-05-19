require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ======================
// DATABASE
// ======================
connectDB();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static("uploads"));

/* ======================
   ROUTES (ALL MODULES)
====================== */
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const profileRoutes = require("./routes/profileRoutes");

// Auth
app.use("/api/auth", authRoutes);

// Products
app.use("/api/products", productRoutes);

// Profile
app.use("/api/profile", profileRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.json({
    message: "Raritone Backend API running 🚀",
    modules: ["auth", "products", "profile"],
  });
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});