const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jobsHistorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 70
    },
    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true
    },
    location: {
        type: String
    },
    company: {
        type: String,
        default: ""
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    interviewDate: {
        type: Date
    },
    applicationStatus: {
        type: String,
        enum: ["pending", "accepted", "rejected", "reviewing", "shortlisted", "interview"],
        default: "pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        maxlength: 32,
        default: ""
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 32,
        default: ""
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "E-mail is required"],
        unique: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must have at least 6 characters"]
    },
    roleNum: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["seeker", "recruiter", "admin"],
        default: "seeker"
    },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    skills: [String],
    experienceYears: { type: Number, default: 0 },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    jobsHistory: [jobsHistorySchema],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Auto-sync name and firstName/lastName before save
userSchema.pre("save", function () {
    if (!this.name && (this.firstName || this.lastName)) {
        this.name = `${this.firstName || ""} ${this.lastName || ""}`.trim();
    } else if (this.name && (!this.firstName || !this.lastName)) {
        const parts = this.name.split(" ");
        this.firstName = parts[0] || "";
        this.lastName = parts.slice(1).join(" ") || "";
    }

    if (this.role === "admin") this.roleNum = 1;
    else if (this.role === "recruiter") this.roleNum = 2;
    else this.roleNum = 0;
});

// Compare password helper
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT helper
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET || "jobconnect_secret_key_12345", {
        expiresIn: "7d"
    });
};

module.exports = mongoose.model("User", userSchema);
