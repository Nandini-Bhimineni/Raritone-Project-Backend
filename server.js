require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB safely
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

/* ========================
   ROUTES (ALL MODULES)
======================== */
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// Auth Module
app.use("/api/auth", authRoutes);

// Product Module
app.use("/api/products", productRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get("/", (req, res) => {
    res.json({
        message: "Raritone Backend API is running successfully 🚀",
        modules: ["auth", "products"]
    });
});

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});