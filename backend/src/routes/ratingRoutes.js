const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const { rateUser } = require("../controllers/ratingController");
const { addRating } = require("../controllers/ratingController");


router.post("/", verifyToken, rateUser);

module.exports = router;



