const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/authController");

const verifyToken = require("../middleware/verifyToken");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  loginUser
);


router.get("/profile", verifyToken, getProfile);


module.exports = router;