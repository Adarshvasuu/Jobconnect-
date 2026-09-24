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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.65]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.92]);

  const goToResumeUpload = () => {
    navigate('/onboarding/seeker');
  };

  const goToJobSearch = () => {
    navigate('/jobs');
  };

  return (
    <section ref={heroRef} className="hero-section" style={{ height: "150vh" }}>
      <div className="hero-sticky-wrap" style={{ position: "sticky", top: 0, height: "100vh" }}>
        {/* WebGL Shader Background Plane */}
        <HeroBackground color1="#3B82F6" color2="#F0F9FF" speed={0.9} />

        {/* Scroll-Shrinking Hero Content */}
        <motion.div className="hero-content" style={{ scale, y, opacity }}>
          {/* Subtle Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="hero-badge"
          >
            <Sparkles size={14} color="#3B82F6" />
            <span>Next-Generation Career Architecture</span>
          </motion.div>

          {/* Signature Animated Wordmark */}
          <div className="hero-signature-wrap">
            <Signature text="JobConnect" color="#3B82F6" fontSize={76} delay={0.2} duration={1.6} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hero-subtext"
          >
            AI conversational onboarding, automated resume integrity checks, and real-time Kanban matchmaking.
          </motion.p>

          {/* Metallic Button CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hero-cta-row"
          >
            <MetallicButton icon={<FileUp size={18} />} onClick={goToResumeUpload} variant="primary">
              Upload Resume
            </MetallicButton>
            <MetallicButton icon={<Search size={18} />} onClick={goToJobSearch} variant="metallic">
              Search Jobs
            </MetallicButton>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
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
