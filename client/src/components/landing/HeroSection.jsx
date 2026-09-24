// HeroSection.jsx — Full viewport WebGL Hero with Signature brand mark, Metallic Buttons, and Scroll-Shrink motion
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileUp, Search, Sparkles, ChevronDown } from "lucide-react";
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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.9]);

  const goToResumeUpload = () => {
    navigate('/analyze-resume');
  };

  const goToJobSearch = () => {
    navigate('/jobs');
  };

  return (
    <section ref={heroRef} className="hero-section" style={{ height: "150vh" }}>
      <div className="hero-sticky-wrap">
        {/* Scroll-Shrinking Hero Content */}
        <motion.div className="hero-content" style={{ scale, y, opacity }}>
          {/* High-Contrast Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hero-badge"
          >
            <Sparkles size={14} color="#2563EB" />
            <span>Next-Generation Career Architecture</span>
          </motion.div>

          {/* Clean Signature Wordmark */}
          <div className="hero-signature-wrap">
            <Signature text="JobConnect" color="#1D4ED8" fontSize={72} delay={0.15} duration={1.2} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="hero-subtext"
          >
            AI conversational onboarding, automated resume integrity checks, and real-time Kanban matchmaking.
          </motion.p>

          {/* Metallic Button CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hero-cta-row"
          >
            <MetallicButton icon={<FileUp size={18} />} onClick={goToResumeUpload} variant="primary">
              Analyze My Resume
            </MetallicButton>
            <MetallicButton icon={<Search size={18} />} onClick={goToJobSearch} variant="metallic">
              Search Jobs
            </MetallicButton>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hero-scroll-indicator"
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
