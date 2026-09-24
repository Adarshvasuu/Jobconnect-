const router = require("express").Router();
const { getJobs, getJobById, createJob, updateJob, deleteJob, getRecruiterJobs } = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", getJobs);
router.get("/recruiter/my-listings", protect, authorize("recruiter"), getRecruiterJobs);
router.get("/:id", getJobById);
router.post("/", protect, authorize("recruiter"), createJob);
router.put("/:id", protect, authorize("recruiter"), updateJob);
router.delete("/:id", protect, authorize("recruiter", "admin"), deleteJob);

module.exports = router;
