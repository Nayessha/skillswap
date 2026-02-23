const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const { findMatches } = require("../controllers/matchController");

router.get("/", verifyToken, findMatches);

module.exports = router;