const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    candidate: {
        name: String,
        email: String,
        skills: [String],
        experience: String,
        resumeUrl: String
    },
    status: {
        type: String,
        enum: ["applied", "reviewing", "shortlisted", "interview", "selected", "rejected"],
        default: "applied"
    },
    appliedAt: { type: Date, default: Date.now },
    statusHistory: [{
        status: String,
        date: { type: Date, default: Date.now },
        note: String
    }]
});

module.exports = mongoose.model("Application", applicationSchema);
