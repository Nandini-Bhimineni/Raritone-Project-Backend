const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, try again later."
  })
);

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const measurementRoutes = require("./routes/measurementRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/measurement", measurementRoutes);

// ================= DB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ================= ERROR HANDLERS =================
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: "Server error" });
});

// ================= START =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));