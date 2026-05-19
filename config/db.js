const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully to Raritone Local instance");
    } catch (error) {
        console.error("Database Connection Failure: ", error.message);
        process.exit(1); // Kill the server process if database fails
    }
};

module.exports = connectDB;