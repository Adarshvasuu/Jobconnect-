const mongoose = require("mongoose");

const jobTypeSchema = new mongoose.Schema({
    jobTypeName: {
        type: String,
        trim: true,
        required: [true, "Job category name is required"],
        maxlength: 70,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("JobType", jobTypeSchema);
