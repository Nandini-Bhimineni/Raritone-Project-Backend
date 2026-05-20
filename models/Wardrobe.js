const mongoose = require("mongoose");

const wardrobeSchema = new mongoose.Schema({});

module.exports = mongoose.model("Wardrobe", wardrobeSchema);