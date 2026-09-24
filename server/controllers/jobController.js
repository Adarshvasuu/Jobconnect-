const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
    try {
        const { search, type, category } = req.query;
        let filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { skillsRequired: { $regex: search, $options: "i" } }
            ];
        }
        if (type && type !== "All") filter.type = type;
        if (category && category !== "All") filter.category = category;
        const jobs = await Job.find(filter).sort({ postedAt: -1 });
        res.json({ jobs, total: jobs.length });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.json({ job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, postedAt: new Date() });
        res.status(201).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.json({ success: true, updated: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.json({ success: true, id: req.params.id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedAt: -1 });
        res.json({ jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
