const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, default: "" },
    location: { type: String, required: true },
    website: { type: String, default: "" },
    description: { type: String, default: "" },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
