const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Company = require("../models/Company");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPendingJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "pending" });
        res.json({ jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.moderateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json({ success: true, jobId: req.params.id, status: req.body.status });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const hiringFunnel = await Application.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const topSkillsDemand = await Job.aggregate([
            { $match: { status: "active" } },
            { $unwind: "$skillsRequired" },
            { $group: { _id: "$skillsRequired", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 6 }
        ]);
        const totalUsers = await User.countDocuments();
        const activeJobs = await Job.countDocuments({ status: "active" });
        const totalApplications = await Application.countDocuments();
        const totalCompanies = await Company.countDocuments();
        res.json({
            analytics: {
                totalUsers,
                activeJobs,
                totalApplications,
                totalCompanies,
                hiringFunnel: hiringFunnel.map(h => ({ stage: h._id, count: h.count })),
                topSkillsDemand: topSkillsDemand.map(s => ({ skill: s._id, count: s.count }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
