const router = require("express").Router();
const { getProfile, updateProfile, saveJob, unsaveJob } = require("../controllers/profileController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.post("/saved-jobs/:jobId", protect, saveJob);
router.delete("/saved-jobs/:jobId", protect, unsaveJob);

module.exports = router;
