require("dotenv").config();

const connectDB =
require("./config/db");

const app =
require("./app");


// DATABASE
connectDB();


// PORT
const PORT =
process.env.PORT || 5000;


// SERVER
app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});