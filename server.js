const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();


// MIDDLEWARE
app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));


// ROUTES
app.use("/api/products", require("./routes/productRoutes"));


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});