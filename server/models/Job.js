const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: 120
    },
    company: {
        type: String,
        default: "JobConnect Partner"
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    logo: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true
    },
    type: {
        type: String,
        enum: ["Full-time", "Remote", "Contract", "Part-time", "Internship", "Hybrid"],
        default: "Full-time"
    },
    category: {
        type: String,
        default: "Technology"
    },
    jobType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobType"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    experience: {
        type: String,
        default: "1-3 years"
    },
    salary: {
        type: mongoose.Schema.Types.Mixed,
        default: { min: 60000, max: 95000, currency: "$" }
    },
    salaryString: {
        type: String,
        default: ""
    },
    available: {
        type: Boolean,
        default: true
    },
    skillsRequired: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    applicantsCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["active", "pending", "closed", "approved", "rejected"],
        default: "active"
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

jobSchema.pre("save", function() {
    if (typeof this.salary === "number") {
        this.salaryString = `$${this.salary}`;
    } else if (typeof this.salary === "string") {
        this.salaryString = this.salary;
    } else if (this.salary && typeof this.salary === "object") {
        const min = this.salary.min || 0;
        const max = this.salary.max || min;
        const curr = this.salary.currency || "$";
        this.salaryString = `${curr}${min.toLocaleString()} - ${curr}${max.toLocaleString()}`;
    }
});

module.exports = mongoose.model("Job", jobSchema);
