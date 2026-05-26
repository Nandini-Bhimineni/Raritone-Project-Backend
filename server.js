const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Load ENV
dotenv.config();

// App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// Static Folder
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});