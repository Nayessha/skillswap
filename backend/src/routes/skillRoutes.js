const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  addSkill,
  getAllSkills,
  addWantedSkill,
  getSkillsByCategory,
  getMySkills,
  getMyWantedSkills   // ← add this
} = require("../controllers/skillController");

router.post("/add", verifyToken, addSkill);
router.get("/", getAllSkills);
router.post("/wanted", verifyToken, addWantedSkill);
router.get("/recommend", verifyToken, getRecommendedTeachers);

router.get("/by-category", getSkillsByCategory);
router.get("/my", verifyToken, getMySkills);
router.get("/wanted", verifyToken, getMyWantedSkills);

module.exports = router;