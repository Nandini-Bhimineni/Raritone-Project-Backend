const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(cors());
app.use(express.json());


// ======================
// STATIC FOLDER
// ======================

app.use("/uploads", express.static("uploads"));


// ======================
// DATABASE CONNECTION
// ======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


// ======================
// ROUTES
// ======================

app.use("/api/auth", require("./routes/authRoutes"));

app.use(
  "/api/profile",
  require("./routes/profileRoutes")
);


// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});