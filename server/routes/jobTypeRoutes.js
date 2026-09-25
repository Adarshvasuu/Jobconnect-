const router = require("express").Router();
const { createJobType, allJobsType, updateJobType, deleteJobType } = require("../controllers/jobTypeController");
const { protect, authorize } = require("../middleware/auth");

// Public / seeker endpoints to view categories
router.get("/jobs", allJobsType);
router.get("/all", allJobsType);
router.get("/", allJobsType);

// Protected admin / recruiter endpoints
router.post("/create", protect, authorize("admin", "recruiter"), createJobType);
router.post("/", protect, authorize("admin", "recruiter"), createJobType);
router.put("/update/:type_id", protect, authorize("admin"), updateJobType);
router.put("/:type_id", protect, authorize("admin"), updateJobType);
router.delete("/delete/:type_id", protect, authorize("admin"), deleteJobType);
router.delete("/:type_id", protect, authorize("admin"), deleteJobType);

module.exports = router;
