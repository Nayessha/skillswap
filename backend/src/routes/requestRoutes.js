const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  sendRequest,
  getMyRequests,
  getRequestsForMe,
  updateRequestStatus,
  completeRequest} = require("../controllers/requestController");

router.post("/send", verifyToken, sendRequest);
router.get("/mine", verifyToken, getMyRequests);
router.get("/for-me", verifyToken, getRequestsForMe);
router.post("/update-status", verifyToken, updateRequestStatus);
router.post("/complete", verifyToken, completeRequest);
module.exports = router;