// Signature.jsx - Crisp animated signature brand mark with SVG draw-on effect
import React from "react";
import { motion } from "framer-motion";

export function Signature({
  text = "JobConnect",
  color = "#1D4ED8",
  fontSize = 74,
  delay = 0.1,
  duration = 1.2,
  className = "",
}) {
  return (
    <div
      className={`signature-container ${className}`}
      style={{
        display: "flex",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        style={{
          fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
          fontSize: `${fontSize}px`,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "#0F172A",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <span>Job</span>
        <span style={{ color: "#2563EB" }}>Connect</span>
      </motion.div>

      {/* Animated Flourish Underline */}
      <svg
        width={Math.min(320, fontSize * 5)}
        height="24"
        viewBox="0 0 320 24"
        fill="none"
        style={{ overflow: "visible", marginTop: "4px", margin: "0 auto", display: "block" }}
      >
        <motion.path
          d="M 20 16 Q 160 26, 300 12"
          stroke="#3B82F6"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: delay + 0.25, duration: 0.9, ease: "easeInOut" },
            opacity: { delay: delay + 0.25, duration: 0.2 },
          }}
        />
      </svg>
    </div>
  );
}

export default Signature;

