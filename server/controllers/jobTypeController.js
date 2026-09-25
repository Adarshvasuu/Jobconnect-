const JobType = require("../models/JobType");

// Create job category
exports.createJobType = async (req, res) => {
    try {
        const { jobTypeName, name, description } = req.body;
        const categoryName = jobTypeName || name;

        if (!categoryName) {
            return res.status(400).json({ success: false, message: "Category name is required" });
        }

        const existing = await JobType.findOne({ jobTypeName: categoryName });
        if (existing) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        const jobT = await JobType.create({
            jobTypeName: categoryName,
            description: description || "",
            user: req.user ? req.user._id : undefined
        });

        res.status(201).json({
            success: true,
            jobT,
            category: { id: jobT._id, name: jobT.jobTypeName, description: jobT.description }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch all job categories
exports.allJobsType = async (req, res) => {
    try {
        const jobT = await JobType.find().sort({ createdAt: -1 });
        const categories = jobT.map(c => ({
            id: c._id,
            _id: c._id,
            name: c.jobTypeName,
            jobTypeName: c.jobTypeName,
            description: c.description,
            createdAt: c.createdAt
        }));

        res.status(200).json({
            success: true,
            jobT,
            categories
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update job category
exports.updateJobType = async (req, res) => {
    try {
        const id = req.params.type_id || req.params.id;
        const updateData = {};
        if (req.body.jobTypeName || req.body.name) {
            updateData.jobTypeName = req.body.jobTypeName || req.body.name;
        }
        if (req.body.description !== undefined) {
            updateData.description = req.body.description;
        }

        const jobT = await JobType.findByIdAndUpdate(id, updateData, { new: true });
        if (!jobT) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({
            success: true,
            jobT,
            category: { id: jobT._id, name: jobT.jobTypeName, description: jobT.description }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete job category
exports.deleteJobType = async (req, res) => {
    try {
        const id = req.params.type_id || req.params.id;
        const jobT = await JobType.findByIdAndDelete(id);
        if (!jobT) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({
            success: true,
            message: "Job category deleted successfully",
            categoryId: id
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
