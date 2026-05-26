const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");

const rateLimit =
require("express-rate-limit");

const errorMiddleware =
require("./middleware/errorMiddleware");

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(helmet());

app.use(express.json());


// RATE LIMITER
const limiter = rateLimit({

  windowMs:
  15 * 60 * 1000,

  max: 100,

  message:
  "Too many requests from this IP"

});

app.use(limiter);


app.use(compression());

app.use(morgan("dev"));


// STATIC UPLOADS
app.use(
  "/uploads",
  express.static("uploads")
);


// ================= ROUTES =================


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


// WARDROBE ROUTES
app.use(
  "/api/wardrobe",
  require("./routes/wardrobeRoutes")
);


// WISHLIST ROUTES
app.use(
  "/api/wishlist",
  require("./routes/wishlistRoutes")
);


// TRY-ON ROUTES
app.use(
  "/api/tryOnRoutes",
  require("./routes/tryOnRoutes")
);


// MEASUREMENTS ROUTES
app.use(
  "/api/measurements",
  require("./routes/measurementRoutes")
);


// CART ROUTES
app.use(
  "/api/cart",
  require("./routes/cartRoutes")
);


// ORDER ROUTES
app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);


// IMAGE ROUTES
app.use(
  "/api/images",
  require("./routes/imageRoutes")
);


// ================= ROOT ROUTE =================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message:
    "Raritone API Running 🚀"

  });

});


// ================= 404 HANDLER =================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
    "Route not found"

  });

});


// ================= ERROR MIDDLEWARE =================

app.use(errorMiddleware);


module.exports = app;