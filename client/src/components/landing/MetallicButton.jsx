// MetallicButton.jsx — Metallic styled action button with specular highlights and micro-interactions
import React from 'react';
import { motion } from 'framer-motion';

export function MetallicButton({ children, onClick, icon, variant = 'metallic', className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`metallic-btn ${variant === 'primary' ? 'metallic-btn-primary' : ''} ${className}`}
      {...props}
    >
      <span className="metallic-btn-sheen" />
      {icon && <span className="metallic-btn-icon">{icon}</span>}
      <span className="metallic-btn-text">{children}</span>
    </motion.button>
  );
}

export default MetallicButton;
