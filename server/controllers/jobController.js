const Job = require("../models/Job");
const JobType = require("../models/JobType");

// Show all jobs with search, category filter, location filter, pagination
exports.getJobs = async (req, res) => {
    try {
        const { search, keyword, type, category, cat, location, pageNumber } = req.query;
        let filter = {};

        // Search query (keyword or search)
        const searchTerm = keyword || search;
        if (searchTerm && searchTerm.trim() !== "") {
            filter.$or = [
                { title: { $regex: searchTerm, $options: "i" } },
                { company: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } },
                { skillsRequired: { $regex: searchTerm, $options: "i" } }
            ];
        }

        // Job type / contract filter
        if (type && type !== "All" && type.trim() !== "") {
            filter.type = type;
        }

        // Category filter (cat or category)
        const categoryFilter = cat || category;
        if (categoryFilter && categoryFilter !== "All" && categoryFilter.trim() !== "") {
            // Check if it's an ObjectId or category name string
            if (/^[0-9a-fA-F]{24}$/.test(categoryFilter)) {
                filter.jobType = categoryFilter;
            } else {
                filter.category = { $regex: categoryFilter, $options: "i" };
            }
        }

        // Location filter
        if (location && location !== "All" && location.trim() !== "") {
            filter.location = { $regex: location, $options: "i" };
        }

        // Get unique locations for dropdown filters
        const allLocations = await Job.distinct("location");
        const setUniqueLocation = allLocations.filter(Boolean);

        // Pagination
        const pageSize = Number(req.query.pageSize) || 12;
        const page = Number(pageNumber) || 1;
        const count = await Job.countDocuments(filter);

        const jobs = await Job.find(filter)
            .sort({ postedAt: -1, createdAt: -1 })
            .populate("jobType", "jobTypeName description")
            .populate("user", "firstName lastName name email")
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            total: count,
            count,
            page,
            pages: Math.ceil(count / pageSize) || 1,
            setUniqueLocation
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id || req.params.job_id)
            .populate("jobType", "jobTypeName description")
            .populate("user", "firstName lastName name email");

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create job (Recruiter / Admin)
exports.createJob = async (req, res) => {
    try {
        const {
            title, description, salary, location, jobType, category,
            company, type, skillsRequired, available, experience
        } = req.body;

        let resolvedJobType = jobType;
        let resolvedCategory = category || "Technology";

        if (resolvedJobType && !category) {
            const jt = await JobType.findById(resolvedJobType);
            if (jt) resolvedCategory = jt.jobTypeName;
        } else if (!resolvedJobType && category) {
            const jt = await JobType.findOne({ jobTypeName: { $regex: `^${category}$`, $options: "i" } });
            if (jt) resolvedJobType = jt._id;
        }

        const job = await Job.create({
            title,
            description,
            salary: salary || { min: 50000, max: 80000, currency: "$" },
            location: location || "Remote",
            company: company || (req.user ? req.user.name : "JobConnect Partner"),
            type: type || "Full-time",
            category: resolvedCategory,
            jobType: resolvedJobType,
            user: req.user ? req.user._id : undefined,
            skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : (skillsRequired ? skillsRequired.split(",").map(s => s.trim()) : []),
            available: available !== undefined ? available : true,
            experience: experience || "1-3 years",
            postedAt: new Date()
        });

        res.status(201).json({
            success: true,
            job,
            message: "Job created successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update job
exports.updateJob = async (req, res) => {
    try {
        const id = req.params.id || req.params.job_id;
        const job = await Job.findByIdAndUpdate(id, req.body, { new: true })
            .populate("jobType", "jobTypeName")
            .populate("user", "firstName lastName name email");

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({
            success: true,
            job,
            updated: job,
            message: "Job updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete job
exports.deleteJob = async (req, res) => {
    try {
        const id = req.params.id || req.params.job_id;
        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({
            success: true,
            id,
            message: "Job deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get recruiter jobs
exports.getRecruiterJobs = async (req, res) => {
    try {
        const filter = req.user ? { $or: [{ user: req.user._id }, { company: req.user.name }] } : {};
        const jobs = await Job.find(filter)
            .sort({ postedAt: -1 })
            .populate("jobType", "jobTypeName");

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Distinct locations list
exports.getLocations = async (req, res) => {
    try {
        const locations = await Job.distinct("location");
        res.status(200).json({ success: true, locations: locations.filter(Boolean) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
