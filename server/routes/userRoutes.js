const router = require("express").Router();
const {
    allUsers,
    singleUser,
    editUser,
    deleteUser,
    createUserJobsHistory,
    getUserJobsHistory,
    updateUserJobsHistoryStatus
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

// Applicant / User Job History routes
router.post("/jobhistory", protect, createUserJobsHistory);
router.get("/jobhistory", protect, getUserJobsHistory);
router.patch("/jobhistory/status", protect, authorize("recruiter", "admin"), updateUserJobsHistoryStatus);

// User management routes
router.get("/allusers", protect, authorize("admin"), allUsers);
router.get("/", protect, authorize("admin"), allUsers);
router.get("/:id", protect, singleUser);
router.put("/edit/:id", protect, editUser);
router.put("/:id", protect, editUser);
router.delete("/delete/:id", protect, authorize("admin"), deleteUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
