const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    logo: { type: String, default: "" },
    location: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Remote", "Contract", "Part-time"], required: true },
    category: { type: String, required: true },
    experience: { type: String, required: true },
    salary: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        currency: { type: String, default: "₹" }
    },
    skillsRequired: [String],
    description: { type: String, required: true },
    applicantsCount: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "pending", "closed"], default: "active" },
    postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
