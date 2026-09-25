const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/job", require("./routes/jobRoutes"));
app.use("/api/type", require("./routes/jobTypeRoutes"));
app.use("/api/categories", require("./routes/jobTypeRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Health check route
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "JOBConnect Full-Stack API is running!",
        features: ["JWT Auth", "Job Management", "Job Categories (JobType)", "Jobs History", "CSV Export", "MongoDB Aggregations"]
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`JOBConnect Server running on port ${PORT}`);
});
