const express = require("express");
const { createResume, updateResume, updateResumeExperience, updateResumeEducation, updateResumeSkill, getResume } = require("../controllers/createResume");
const router = express.Router();

router.get("/:id", getResume);
router.post("/", createResume);
router.put("/:id", updateResume);
router.put("/:id/experience", updateResumeExperience);
router.put("/:id/education", updateResumeEducation);
router.put("/:id/skill", updateResumeSkill);

module.exports = router;
