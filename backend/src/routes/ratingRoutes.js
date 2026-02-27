const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const { addRating } = require("../controllers/ratingController");

router.post("/add", verifyToken, addRating);

module.exports = router;