const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  sendMessage,
  getMessages
} = require("../controllers/messageController");

router.post("/send", verifyToken, sendMessage);
router.get("/:requestId", verifyToken, getMessages);

module.exports = router;