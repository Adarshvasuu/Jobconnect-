// Signature.jsx — Crisp animated signature brand mark with SVG draw-on effect
import React from "react";
import { motion } from "framer-motion";

export function Signature({
  text = "JobConnect",
  color = "#3B82F6",
  fontSize = 64,
  delay = 0.2,
  duration = 1.4,
  className = "",
}) {
  return (
    <div
      className={`signature-container ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <motion.svg
        width={Math.max(300, fontSize * 5)}
        height={fontSize * 1.5}
        viewBox="0 0 400 100"
        fill="none"
        initial="hidden"
        animate="visible"
        style={{ overflow: "visible" }}
      >
        {/* Animated Brand Typography */}
        <motion.text
          x="50%"
          y="62"
          textAnchor="middle"
          fill={color}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.1, duration: 0.8, ease: "easeOut" }}
          style={{
            fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
            fontSize: "56px",
            fontWeight: "900",
            letterSpacing: "-0.03em",
          }}
        >
          Job<tspan fill="#1D4ED8">Connect</tspan>
        </motion.text>

        {/* Dynamic Cursive Flourish Stroke Underline */}
        <motion.path
          d="M 60 78 Q 200 95, 340 76"
          stroke="#3B82F6"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: delay + 0.4, duration: 1.0, ease: "easeInOut" },
            opacity: { delay: delay + 0.4, duration: 0.2 },
          }}
        />
      </motion.svg>
    </div>
  );
}

export default Signature;
