const router = require("express").Router();
const { getUsers, toggleUserStatus, getPendingJobs, moderateJob, getAnalytics } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

router.get("/users", protect, authorize("admin"), getUsers);
router.patch("/users/:id/status", protect, authorize("admin"), toggleUserStatus);
router.get("/jobs/pending", protect, authorize("admin"), getPendingJobs);
router.patch("/jobs/:id/moderate", protect, authorize("admin"), moderateJob);
router.get("/analytics", protect, authorize("admin"), getAnalytics);

module.exports = router;
