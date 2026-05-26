require("dotenv").config();

const connectDB =
require("./config/db");

const Product =
require("./models/product");

const app =
require("./app");


// DATABASE
connectDB();


// SYNC PRODUCT INDEXES
Product.syncIndexes()
  .then(() =>
    console.log("Product indexes synced")
  )
  .catch((err) =>
    console.log(err)
  );


// PORT
const PORT =
process.env.PORT || 5000;


// SERVER
app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});