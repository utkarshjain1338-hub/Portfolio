import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const STATEMENT = 'Building systems to understand how they work.';

export const Hero: React.FC = () => {
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < STATEMENT.length) {
          setTyped(STATEMENT.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(interval);
          // After typing, blink cursor then hide it slowly
          setTimeout(() => setShowCursor(false), 2400);
        }
      }, 38);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(delay);
  }, []);

  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      {/* Corner decorations */}
      <div className="corner corner--tl" aria-hidden="true" />
      <div className="corner corner--tr" aria-hidden="true" />
      <div className="corner corner--bl" aria-hidden="true" />
      <div className="corner corner--br" aria-hidden="true" />

      {/* System bar */}
      <motion.div
        className="hero-sys-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="sys-id">[ SYS_ID: UJ-001 ]</span>
        <span className="sys-sep">│</span>
        <span className="sys-status">
          <span className="blink-dot" aria-hidden="true" />
          [ SYSTEM: ONLINE ]
        </span>
      </motion.div>

      {/* Main content */}
      <div className="hero-content">
        <motion.div
          className="hero-domain"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Domain areas"
        >
          AI&nbsp;/&nbsp;ML&nbsp;&nbsp;•&nbsp;&nbsp;SYSTEMS&nbsp;&nbsp;•&nbsp;&nbsp;CYBERSECURITY&nbsp;&nbsp;•&nbsp;&nbsp;BACKEND
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glitch" data-text="UTKARSH JAIN">UTKARSH JAIN</span>
        </motion.h1>

        <motion.p
          className="hero-statement"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <span className="typewriter-text">{typed}</span>
          <span
            className="cursor-blink"
            aria-hidden="true"
            style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.8s' }}
          >
            █
          </span>
        </motion.p>
      </div>

      {/* Scroll prompt */}
      <motion.div
        className="hero-scroll-prompt"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        aria-label="Scroll to explore"
      >
        <span className="scroll-label">SCROLL TO EXPLORE</span>
        <div className="scroll-chevrons" aria-hidden="true">
          <span className="chevron">›</span>
          <span className="chevron">›</span>
          <span className="chevron">›</span>
        </div>
      </motion.div>
    </section>
  );
};
