const jwt = require("jsonwebtoken");

const token = jwt.sign(
    { id: "123456" },
    "raritoneSecretKey",
    { expiresIn: "7d" }
);

console.log(token);