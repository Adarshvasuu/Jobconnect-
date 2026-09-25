const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const User = require("./models/User");
const JobType = require("./models/JobType");
const Job = require("./models/Job");
const Application = require("./models/Application");

const initialCategories = [
    { jobTypeName: "Technology", description: "Software development, cloud architecture, cybersecurity, and DevOps." },
    { jobTypeName: "Healthcare & Medicine", description: "Clinical roles, medical tech, and healthcare administration." },
    { jobTypeName: "Finance & Banking", description: "Investment analysis, quantitative finance, fintech, and accounting." },
    { jobTypeName: "Design & Creative", description: "UI/UX, product design, brand identity, and motion design." },
    { jobTypeName: "Marketing & Growth", description: "Performance marketing, growth engineering, SEO, and content strategy." },
    { jobTypeName: "Human Resources", description: "Technical recruiting, people operations, and talent development." },
    { jobTypeName: "Education & EdTech", description: "Curriculum development, instructional design, and tutoring." },
    { jobTypeName: "Data Science & AI", description: "Machine learning, LLMs, NLP, and data engineering." }
];

const initialJobs = [
    {
        title: "Senior Full Stack Engineer",
        company: "Stripe",
        location: "San Francisco, CA (Hybrid)",
        type: "Full-time",
        category: "Technology",
        experience: "3-5 years",
        salary: { min: 140000, max: 190000, currency: "$" },
        skillsRequired: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
        description: "Build global payment infrastructure used by millions of businesses. You will work on real-time transaction processing, high-scale APIs, and intuitive user experiences.",
        status: "active"
    },
    {
        title: "Machine Learning Engineer (LLMs)",
        company: "OpenAI Labs",
        location: "Remote",
        type: "Remote",
        category: "Data Science & AI",
        experience: "2-4 years",
        salary: { min: 160000, max: 220000, currency: "$" },
        skillsRequired: ["Python", "PyTorch", "Transformers", "Distributed Systems", "CUDA"],
        description: "Join our frontier research team to train, fine-tune, and deploy large-scale reasoning models. Experience with distributed training pipelines is highly valued.",
        status: "active"
    },
    {
        title: "Product Designer (Design Systems)",
        company: "Figma",
        location: "New York, NY",
        type: "Full-time",
        category: "Design & Creative",
        experience: "2-5 years",
        salary: { min: 120000, max: 165000, currency: "$" },
        skillsRequired: ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "HTML/CSS"],
        description: "Craft world-class design systems that empower millions of creative professionals. Collaborate directly with engineers to ship accessible, delightful components.",
        status: "active"
    },
    {
        title: "Cloud Infrastructure Architect",
        company: "Datadog",
        location: "Seattle, WA",
        type: "Full-time",
        category: "Technology",
        experience: "4-7 years",
        salary: { min: 150000, max: 200000, currency: "$" },
        skillsRequired: ["Kubernetes", "AWS", "Terraform", "Go", "Observability"],
        description: "Architect and scale multi-region Kubernetes clusters handling trillions of telemetry events daily.",
        status: "active"
    },
    {
        title: "Quantitative Financial Analyst",
        company: "Citadel",
        location: "Chicago, IL",
        type: "Full-time",
        category: "Finance & Banking",
        experience: "2-4 years",
        salary: { min: 175000, max: 250000, currency: "$" },
        skillsRequired: ["Python", "Financial Modeling", "C++", "Statistics", "SQL"],
        description: "Develop mathematical models to identify market opportunities and optimize algorithmic portfolio execution.",
        status: "active"
    },
    {
        title: "Technical Talent Acquisition Lead",
        company: "Vercel",
        location: "Remote",
        type: "Remote",
        category: "Human Resources",
        experience: "3-6 years",
        salary: { min: 110000, max: 145000, currency: "$" },
        skillsRequired: ["Technical Recruiting", "Sourcing", "Candidate Experience", "LinkedIn Recruiter"],
        description: "Scale our globally distributed engineering org. Lead hiring pipelines for frontend infrastructure and cloud platform teams.",
        status: "active"
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Atlas for seeding...");

        // 1. Seed Categories
        const catMap = {};
        for (const cat of initialCategories) {
            let existing = await JobType.findOne({ jobTypeName: cat.jobTypeName });
            if (!existing) {
                existing = await JobType.create(cat);
                console.log(`Created JobType: ${cat.jobTypeName}`);
            }
            catMap[cat.jobTypeName] = existing._id;
        }

        // 2. Seed Default Admin User
        const salt = await bcrypt.genSalt(10);
        const adminPass = await bcrypt.hash("Admin@123", salt);
        let adminUser = await User.findOne({ email: "admin@jobconnect.io" });
        if (!adminUser) {
            adminUser = await User.create({
                name: "Platform Administrator",
                firstName: "Platform",
                lastName: "Administrator",
                email: "admin@jobconnect.io",
                password: adminPass,
                role: "admin",
                roleNum: 1
            });
            console.log("Created Admin User: admin@jobconnect.io");
        }

        // 3. Seed Default Seeker User
        const userPass = await bcrypt.hash("User@123", salt);
        let demoUser = await User.findOne({ email: { $in: ["gokul@example.com", "Gokul@example.com", "adarsh@example.com"] } });
        if (!demoUser) {
            demoUser = await User.create({
                name: "Gokul Sharma",
                firstName: "Gokul",
                lastName: "Sharma",
                email: "Gokul@example.com",
                password: userPass,
                role: "seeker",
                roleNum: 0,
                skills: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"],
                experienceYears: 3,
                title: "Full Stack Developer",
                jobsHistory: [
                    {
                        title: "Senior Full Stack Engineer",
                        description: "Built microservices and modern React UI.",
                        salary: "$140,000 - $190,000",
                        location: "San Francisco, CA (Hybrid)",
                        company: "Stripe",
                        applicationStatus: "accepted",
                        interviewDate: new Date(Date.now() + 86400000 * 2)
                    },
                    {
                        title: "Frontend Developer",
                        description: "Developed customer facing dashboards.",
                        salary: "$110,000 - $130,000",
                        location: "Remote",
                        company: "Datadog",
                        applicationStatus: "pending"
                    }
                ]
            });
            console.log("Created Demo Seeker User: adarsh@example.com");
        } else if (!demoUser.jobsHistory || demoUser.jobsHistory.length === 0) {
            demoUser.jobsHistory = [
                {
                    title: "Senior Full Stack Engineer",
                    description: "Built microservices and modern React UI.",
                    salary: "$140,000 - $190,000",
                    location: "San Francisco, CA (Hybrid)",
                    company: "Stripe",
                    applicationStatus: "accepted",
                    interviewDate: new Date(Date.now() + 86400000 * 2)
                },
                {
                    title: "Frontend Developer",
                    description: "Developed customer facing dashboards.",
                    salary: "$110,000 - $130,000",
                    location: "Remote",
                    company: "Datadog",
                    applicationStatus: "pending"
                }
            ];
            await demoUser.save();
            console.log("Updated jobsHistory on demoUser");
        }

        // 4. Seed Jobs
        for (const job of initialJobs) {
            const existingJob = await Job.findOne({ title: job.title, company: job.company });
            if (!existingJob) {
                await Job.create({
                    ...job,
                    jobType: catMap[job.category] || undefined,
                    user: adminUser._id
                });
                console.log(`Created Job: ${job.title} at ${job.company}`);
            }
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
}

seed();
