const User = require("../models/User");
const Resume = require("../models/Resume");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        const resume = await Resume.findOne({ userId: req.user._id }).sort({ uploadedAt: -1 });
        res.json({
            profile: {
                name: user.name,
                email: user.email,
                title: user.title,
                bio: user.bio,
                location: user.location,
                experienceYears: user.experienceYears,
                skills: user.skills,
                savedJobs: user.savedJobs,
                completionPercentage: calculateCompletion(user),
                resume: resume ? { fileName: resume.fileName, uploadedAt: resume.uploadedAt, fileSize: resume.fileSize } : null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("-password");
        res.json({ success: true, profile: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.saveJob = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.savedJobs.includes(req.params.jobId)) {
            user.savedJobs.push(req.params.jobId);
            await user.save();
        }
        res.json({ success: true, savedJobs: user.savedJobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.unsaveJob = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.savedJobs = user.savedJobs.filter(id => id.toString() !== req.params.jobId);
        await user.save();
        res.json({ success: true, savedJobs: user.savedJobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

function calculateCompletion(user) {
    let score = 0;
    if (user.name) score += 15;
    if (user.email) score += 15;
    if (user.title) score += 15;
    if (user.bio) score += 10;
    if (user.location) score += 10;
    if (user.skills && user.skills.length > 0) score += 20;
    if (user.experienceYears > 0) score += 15;
    return score;
}
