const router = require("express").Router();
const { applyJob, getMyApplications, getJobApplications, updateApplicationStatus } = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/auth");

router.post("/apply/:jobId", protect, authorize("seeker"), applyJob);
router.get("/my-applications", protect, authorize("seeker"), getMyApplications);
router.get("/job/:jobId", protect, authorize("recruiter", "admin"), getJobApplications);
router.patch("/:id/status", protect, authorize("recruiter", "admin"), updateApplicationStatus);

module.exports = router;
