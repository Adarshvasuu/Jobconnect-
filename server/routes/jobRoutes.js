const router = require("express").Router();
const {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getRecruiterJobs,
    getLocations
} = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getJobs);
router.get("/locations", getLocations);
router.get("/recruiter/my-listings", protect, authorize("recruiter", "admin"), getRecruiterJobs);
router.get("/:id", getJobById);

// Recruiter & Admin management routes
router.post("/", protect, authorize("recruiter", "admin"), createJob);
router.post("/create", protect, authorize("recruiter", "admin"), createJob);
router.put("/:id", protect, authorize("recruiter", "admin"), updateJob);
router.put("/update/:job_id", protect, authorize("recruiter", "admin"), updateJob);
router.delete("/:id", protect, authorize("recruiter", "admin"), deleteJob);
router.delete("/delete/:job_id", protect, authorize("recruiter", "admin"), deleteJob);

module.exports = router;
