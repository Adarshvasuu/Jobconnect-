const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["seeker", "recruiter", "admin"], default: "seeker" },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    skills: [String],
    experienceYears: { type: Number, default: 0 },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
