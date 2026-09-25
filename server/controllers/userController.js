const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// Load all users with pagination
exports.allUsers = async (req, res) => {
    try {
        const pageSize = Number(req.query.pageSize) || 10;
        const page = Number(req.query.pageNumber) || 1;
        const count = await User.countDocuments();

        const users = await User.find()
            .sort({ createdAt: -1 })
            .select("-password")
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize) || 1,
            count,
            total: count
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Find single user
exports.singleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Edit user
exports.editUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user, message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully", id: req.params.id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add applied job to user's jobsHistory array
exports.createUserJobsHistory = async (req, res) => {
    const { title, description, salary, location, jobId, company } = req.body;

    try {
        const currentUser = await User.findById(req.user._id);
        if (!currentUser) {
            return res.status(401).json({ success: false, message: "You must log in" });
        }

        const newJobHistory = {
            title,
            description,
            salary: typeof salary === "object" ? `${salary.currency || "$"}${salary.min} - ${salary.currency || "$"}${salary.max}` : salary,
            location: location || "Remote",
            company: company || "",
            jobId: jobId || undefined,
            user: req.user._id,
            applicationStatus: "pending",
            appliedAt: new Date()
        };

        currentUser.jobsHistory.unshift(newJobHistory);
        await currentUser.save();

        // Also create/sync Application document if jobId is provided
        if (jobId) {
            try {
                const existingApp = await Application.findOne({ jobId, candidateId: req.user._id });
                if (!existingApp) {
                    await Application.create({
                        jobId,
                        jobTitle: title || "Job Opportunity",
                        company: company || "Hiring Partner",
                        candidateId: req.user._id,
                        candidate: {
                            name: req.user.name,
                            email: req.user.email,
                            skills: req.user.skills || []
                        },
                        status: "applied",
                        appliedAt: new Date()
                    });
                }
            } catch (err) {
                console.info("Syncing application note:", err.message);
            }
        }

        res.status(200).json({
            success: true,
            currentUser,
            jobsHistory: currentUser.jobsHistory,
            message: "Applied job added to your history"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get current user's job history
exports.getUserJobsHistory = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id).select("jobsHistory name email");
        if (!currentUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            jobsHistory: currentUser.jobsHistory || []
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update status of applied job in user history
exports.updateUserJobsHistoryStatus = async (req, res) => {
    try {
        const { historyId, applicationStatus, interviewDate } = req.body;
        const user = await User.findOne({ "jobsHistory._id": historyId });

        if (!user) {
            return res.status(404).json({ success: false, message: "Job history entry not found" });
        }

        const historyItem = user.jobsHistory.id(historyId);
        if (historyItem) {
            if (applicationStatus) historyItem.applicationStatus = applicationStatus;
            if (interviewDate) historyItem.interviewDate = interviewDate;
            await user.save();
        }

        res.status(200).json({ success: true, historyItem, message: "Job history status updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
