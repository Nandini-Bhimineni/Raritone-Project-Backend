const express = require("express");

const router = express.Router();

const {
    testWardrobe
} = require("../controllers/wardrobeController");

router.get("/", testWardrobe);

module.exports = router;