// HeroSection.jsx - Full viewport WebGL Hero with Signature brand mark, Metallic Buttons, and Scroll-Shrink motion
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileUp, Search, Sparkles, ChevronDown, Briefcase, Users, ShieldCheck } from "lucide-react";
import HeroBackground from "./HeroBackground";
import { Signature } from "./Signature";
import { MetallicButton } from "./MetallicButton";

export function HeroSection({ onExploreClick }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.95]);

  const goToResumeUpload = () => {
    navigate('/analyze-resume');
  };

  const goToJobSearch = () => {
    navigate('/jobs');
  };

  return (
    <section ref={heroRef} className="hero-section" style={{ minHeight: "100vh", height: "135vh", position: "relative" }}>
      {/* Dynamic 3D WebGL Shader / Gradient Canvas */}
      <HeroBackground />

      <div className="hero-sticky-wrap">
        {/* Scroll-Shrinking Hero Content */}
        <motion.div className="hero-content" style={{ scale, y, opacity, width: "100%", margin: "0 auto", textAlign: "center", alignItems: "center" }}>
          {/* High-Contrast Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hero-badge"
            style={{ margin: "0 auto" }}
          >
            <Sparkles size={14} color="#2563EB" />
            <span>Verified Tech Recruitment Platform</span>
          </motion.div>

          {/* Clean Centered Signature Wordmark */}
          <div className="hero-signature-wrap" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
            <Signature text="JobConnect" color="#1D4ED8" fontSize={76} delay={0.15} duration={1.2} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="hero-subtext"
            style={{ margin: "0 auto", textAlign: "center", maxWidth: "640px" }}
          >
            Direct connection between skilled technical talent and hiring teams. Transparent salary ranges, automated ATS resume diagnostics, and real-time candidate pipelines.
          </motion.p>

          {/* Metallic Button CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hero-cta-row"
            style={{ justifyContent: "center", margin: "10px auto 0" }}
          >
            <MetallicButton icon={<FileUp size={18} />} onClick={goToResumeUpload} variant="primary">
              Analyze My Resume
            </MetallicButton>
            <MetallicButton icon={<Search size={18} />} onClick={goToJobSearch} variant="metallic">
              Explore Open Roles
            </MetallicButton>
          </motion.div>

          {/* Live Verified Hiring Stats Pill Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
              padding: "10px 22px",
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(12px)",
              borderRadius: "9999px",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
              <Briefcase size={15} color="#2563EB" />
              <span>4,800+ Verified Openings</span>
            </div>
            <div style={{ width: "1px", height: "16px", backgroundColor: "#CBD5E1" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
              <Users size={15} color="#10B981" />
              <span>98.4% Recruiter Response</span>
            </div>
            <div style={{ width: "1px", height: "16px", backgroundColor: "#CBD5E1" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
              <ShieldCheck size={15} color="#3B82F6" />
              <span>100% Salary Transparency</span>
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hero-scroll-indicator"
            style={{ marginTop: "16px" }}
          >
            <span>Scroll to explore</span>
            <ChevronDown size={16} className="scroll-arrow" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
