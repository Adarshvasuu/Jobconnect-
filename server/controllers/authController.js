const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "jobconnect_secret_key_12345", { expiresIn: "7d" });
};

// Register / Sign up
exports.signup = async (req, res) => {
    try {
        const { name, firstName, lastName, email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "E-mail already registered" });
        }

        const fullName = name || `${firstName || ""} ${lastName || ""}`.trim() || "JobConnect User";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const assignedRole = role === 1 ? "admin" : (role === "recruiter" ? "recruiter" : "seeker");

        const user = await User.create({
            name: fullName,
            firstName: firstName || fullName.split(" ")[0],
            lastName: lastName || fullName.split(" ").slice(1).join(" "),
            email,
            password: hashedPassword,
            role: assignedRole,
            roleNum: assignedRole === "admin" ? 1 : (assignedRole === "recruiter" ? 2 : 0)
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            role: user.role,
            user: {
                id: user._id,
                _id: user._id,
                name: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Log in / Sign in
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        const user = await User.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, "i") } });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            role: user.role,
            user: {
                id: user._id,
                _id: user._id,
                name: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                jobsHistory: user.jobsHistory || []
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Current authenticated user profile
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    res.status(200).json({ success: true, message: "Logged out successfully" });
};
