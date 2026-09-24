// ScrollSplitCards.jsx — plain React, 3D split-and-flip scroll interaction using Framer Motion
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const CARDS = [
  {
    title: "Browse Jobs",
    description: "Explore curated listings matched to your skills and location in real time.",
    bgColor: "#3B82F6",
    textColor: "#FFFFFF",
    icon: <Search size={28} />,
    actionLabel: "Explore Openings",
    route: "/jobs",
    tag: "MATCHMAKING",
  },
  {
    title: "Verify Resume",
    description: "Our integrity checks confirm your resume is consistent and original with automated badges.",
    bgColor: "#18181B",
    textColor: "#F0F9FF",
    icon: <ShieldCheck size={28} />,
    actionLabel: "Start Verification",
    route: "/onboarding/seeker",
    tag: "INTEGRITY",
  },
  {
    title: "Add Skills",
    description: "Keep your profile sharp — skills dynamically boost your recruiter match score.",
    bgColor: "#F0F9FF",
    textColor: "#18181B",
    icon: <Sparkles size={28} color="#3B82F6" />,
    actionLabel: "Manage Skills",
    route: "/profile",
    tag: "PROFILE",
  },
];

export function ScrollSplitCards({ imageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -56, -32]);
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 56, 32]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.94]);
  const rotateY = useTransform(scrollYProgress, [0.35, 0.75], [0, 180]);
  const rotateZLeft = useTransform(scrollYProgress, [0.35, 0.75], [0, 5]);
  const rotateZRight = useTransform(scrollYProgress, [0.35, 0.75], [0, -5]);

  const borderRadiusLeft = useTransform(scrollYProgress, [0, 0.2], ["20px 0px 0px 20px", "20px 20px 20px 20px"]);
  const borderRadiusMiddle = useTransform(scrollYProgress, [0, 0.2], ["0px 0px 0px 0px", "20px 20px 20px 20px"]);
  const borderRadiusRight = useTransform(scrollYProgress, [0, 0.2], ["0px 20px 20px 0px", "20px 20px 20px 20px"]);

  const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.25]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.35]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255,255,255,${borderOpacity}), 0 20px 40px -10px rgba(0,0,0,${shadowOpacity})`;
  const cardsY = useTransform(scrollYProgress, [0.85, 1], [0, -120]);

  return (
    <div ref={containerRef} className="split-scroll-container">
      <div className="split-scroll-sticky">
        {/* Section Heading Tag */}
        <div className="split-scroll-header">
          <span className="split-scroll-badge">CORE CAPABILITIES</span>
          <h2 className="split-scroll-heading">Engineered for frictionless hiring</h2>
          <p className="split-scroll-subheading">Scroll to reveal how JobConnect accelerates your workflow</p>
        </div>

        <motion.div
          style={{ scale, y: cardsY, transformStyle: "preserve-3d" }}
          className="split-scroll-row"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="split-card-slot"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i === 1 ? 2 : 1,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side of Card (Composite Image Split) */}
              <motion.div
                className="split-card-front"
                style={{
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                <div
                  className="split-card-image"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                  }}
                />
                <div className="split-card-front-overlay">
                  <span className="split-card-front-tag">{card.tag}</span>
                  <span className="split-card-front-title">{card.title}</span>
                </div>
              </motion.div>

              {/* Back Side of Card (Flipped Content & Actions) */}
              <motion.div
                className="split-card-back"
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: "rotateY(180deg)",
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                  border: card.bgColor === "#FFFFFF" || card.bgColor === "#F0F9FF" ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className="split-card-icon-wrap" style={{ color: card.textColor }}>
                  {card.icon}
                </div>
                <div className="split-card-content">
                  <div className="split-card-tag" style={{ color: card.bgColor === "#F0F9FF" ? "#3B82F6" : "inherit", opacity: 0.8 }}>
                    {card.tag}
                  </div>
                  <h3 className="split-card-title">{card.title}</h3>
                  <p className="split-card-desc" style={{ color: card.textColor, opacity: 0.9 }}>
                    {card.description}
                  </p>
                </div>
                <button
                  className="split-card-cta"
                  onClick={() => navigate(card.route)}
                  style={{
                    backgroundColor: card.bgColor === "#3B82F6" ? "#FFFFFF" : (card.bgColor === "#18181B" ? "#3B82F6" : "#18181B"),
                    color: card.bgColor === "#3B82F6" ? "#18181B" : "#FFFFFF",
                  }}
                >
                  <span>{card.actionLabel}</span>
                  <ArrowRight size={15} />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ScrollSplitCards;
