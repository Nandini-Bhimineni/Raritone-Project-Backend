const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const errorMiddleware =
require("./middleware/errorMiddleware");

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(compression());

app.use(morgan("dev"));

app.use(
  "/uploads",
  express.static("uploads")
);


// AUTH ROUTES
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);


// PROFILE ROUTES
app.use(
  "/api/profile",
  require("./routes/profileRoutes")
);


// PRODUCT ROUTES
app.use(
  "/api/products",
  require("./routes/productRoutes")
);


/* NEW MODULES */


// WARDROBE
app.use(
  "/api/wardrobe",
  require("./routes/wardrobeRoutes")
);


// WISHLIST
app.use(
  "/api/wishlist",
  require("./routes/wishlistRoutes")
);


// TRY-ON
app.use(
  "/api/tryOnRoutes",
  require("./routes/tryOnRoutes")
);


// MEASUREMENTS
app.use(
  "/api/measurements",
  require("./routes/measurementRoutes")
);


// CART
app.use(
  "/api/cart",
  require("./routes/cartRoutes")
);


// ORDERS
app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);


/* IMAGE STORAGE MODULE */


app.use(
  "/api/images",
  require("./routes/imageRoutes")
);


// ROOT ROUTE
app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Raritone API Running 🚀"
  });

});


// 404 HANDLER
app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route not found"

  });

});


// ERROR MIDDLEWARE
app.use(errorMiddleware);


module.exports = app;