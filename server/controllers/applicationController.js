const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        const existing = await Application.findOne({ jobId: req.params.jobId, candidateId: req.user._id });
        if (existing) return res.status(400).json({ success: false, message: "Already applied" });
        const application = await Application.create({
            jobId: job._id,
            jobTitle: job.title,
            company: job.company,
            candidateId: req.user._id,
            candidate: {
                name: req.user.name,
                email: req.user.email,
                skills: req.user.skills || [],
                experience: (req.user.experienceYears || 0) + " yrs",
                resumeUrl: req.body.resumeUrl || ""
            },
            status: "applied",
            appliedAt: new Date(),
            statusHistory: [{ status: "applied", date: new Date(), note: "Application submitted" }]
        });
        await Job.findByIdAndUpdate(job._id, { $inc: { applicantsCount: 1 } });
        res.status(201).json({ success: true, message: "Application submitted successfully!", application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ candidateId: req.user._id }).sort({ appliedAt: -1 });
        res.json({ applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getJobApplications = async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId }).sort({ appliedAt: -1 });
        res.json({ applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ success: false, message: "Application not found" });
        application.status = status;
        application.statusHistory.push({ status, date: new Date(), note: notes || "Status updated to " + status });
        await application.save();
        res.json({ success: true, status });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
