// Signature.jsx — plain React with opentype.js glyph stroke animation & SVG mask reveal
import React, { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import * as opentype from "opentype.js";

export function Signature({
  text = "JobConnect",
  color = "#3B82F6",       // matches --color-primary
  fontSize = 64,
  duration = 1.6,
  delay = 0.2,
  className = "",
  fontUrl = null,
}) {
  const [paths, setPaths] = useState([]);
  const [width, setWidth] = useState(420);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const height = fontSize * 2.2;
  const horizontalPadding = fontSize * 0.1;
  const baseline = fontSize * 1.4;
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function loadFont() {
      if (!fontUrl) {
        setIsFontLoaded(false);
        return;
      }
      try {
        const loadFn = opentype.load;
        if (!loadFn) {
          setIsFontLoaded(false);
          return;
        }
        const font = await loadFn(fontUrl);
        if (!isMounted) return;

        let x = horizontalPadding;
        const newPaths = [];
        for (const char of text) {
          const glyph = font.charToGlyph(char);
          const path = glyph.getPath(x, baseline, fontSize);
          newPaths.push(path.toPathData(3));
          const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
          x += advanceWidth * (fontSize / font.unitsPerEm);
        }
        setPaths(newPaths);
        setWidth(x + horizontalPadding);
        setIsFontLoaded(true);
      } catch (err) {
        console.info("Signature: Using SVG procedural signature path.", err?.message || err);
        setIsFontLoaded(false);
      }
    }

    loadFont();
    return () => { isMounted = false; };
  }, [text, fontSize, fontUrl, baseline, horizontalPadding]);

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  // If opentype font is loaded, render dynamic glyph paths with mask
  if (isFontLoaded && paths.length > 0) {
    return (
      <motion.svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className={`signature-svg ${className}`}
        initial="hidden"
        animate="visible"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {paths.map((d, i) => (
              <motion.path
                key={`mask-${i}`}
                d={d}
                stroke="white"
                strokeWidth={fontSize * 0.22}
                fill="none"
                variants={variants}
                transition={{
                  pathLength: { delay: delay + i * 0.12, duration, ease: "easeInOut" },
                  opacity: { delay: delay + i * 0.12, duration: 0.01 },
                }}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={`stroke-${i}`}
            d={d}
            stroke={color}
            strokeWidth={2}
            fill="none"
            variants={variants}
            transition={{
              pathLength: { delay: delay + i * 0.12, duration, ease: "easeInOut" },
              opacity: { delay: delay + i * 0.12, duration: 0.01 },
            }}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
        ))}
        <g mask={`url(#${maskId})`}>
          {paths.map((d, i) => (
            <path key={`fill-${i}`} d={d} fill={color} />
          ))}
        </g>
      </motion.svg>
    );
  }

  // Fallback high-fidelity cursive animated stroke SVG for "JobConnect"
  return (
    <motion.svg
      width={Math.max(340, fontSize * 5.8)}
      height={fontSize * 1.8}
      viewBox="0 0 460 120"
      fill="none"
      className={`signature-svg ${className}`}
      initial="hidden"
      animate="visible"
      style={{ overflow: 'visible', maxWidth: '100%' }}
    >
      {/* Decorative cursive flourish underline */}
      <motion.path
        d="M 30 100 Q 150 115, 260 95 T 430 85"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        variants={variants}
        transition={{ pathLength: { delay: delay + 0.6, duration: 1.2, ease: "easeInOut" }, opacity: { delay: delay + 0.6, duration: 0.1 } }}
      />
      {/* Dynamic Animated Text */}
      <motion.text
        x="35"
        y="78"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "62px",
          fontWeight: "800",
          letterSpacing: "-0.03em",
        }}
        variants={variants}
        transition={{ pathLength: { delay, duration: 1.4, ease: "easeInOut" }, opacity: { delay, duration: 0.2 } }}
      >
        JobConnect
      </motion.text>
      {/* Solid fill reveal on completion */}
      <motion.text
        x="35"
        y="78"
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.2, duration: 0.6, ease: "easeOut" }}
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "62px",
          fontWeight: "800",
          letterSpacing: "-0.03em",
        }}
      >
        JobConnect
      </motion.text>
    </motion.svg>
  );
}

export default Signature;
