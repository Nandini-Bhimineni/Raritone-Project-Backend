require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const connectDB =
require("./config/db");

const Product =
require("./models/product");

const app =
require("./app");


// ================= DATABASE =================
connectDB();


// ================= SOCKET.IO =================

const server =
http.createServer(app);

const io =
new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log("User connected");

  socket.on("tryon-request", (data) => {

    console.log(data);

    socket.emit("tryon-status", {
      status: "processing"
    });

  });

});


// ================= SYNC PRODUCT INDEXES =================
Product.syncIndexes()
  .then(() =>
    console.log("Product indexes synced")
  )
  .catch((err) =>
    console.log(err)
  );


// ================= PORT =================
const PORT =
process.env.PORT || 5000;


// ================= SERVER =================

server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});