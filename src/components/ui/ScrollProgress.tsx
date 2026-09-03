import React, { useEffect, useState } from 'react';
import { onScrollUpdate } from '../../lib/scroll';

const SECTIONS = [
  '00 / START', // Hero
  '01 / ABOUT',
  '02 / PROJECTS',
  '03 / EXPLORING',
  '04 / EXPERIMENTS',
  '05 / SKILLS',
  '06 / JOURNEY',
  '07 / CONTACT'
];

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = onScrollUpdate((p) => {
      setProgress(p);
      const index = Math.floor(p * (SECTIONS.length - 1));
      setSectionIndex(Math.max(0, Math.min(index, SECTIONS.length - 1)));
    });

    return () => { unsubscribe(); };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '12px',
      left: '12px',
      right: '12px',
      zIndex: 150,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '14px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Track Line */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--muted)',
          opacity: 0.3
        }} />

        {/* The Dot */}
        <div style={{
          position: 'absolute',
          left: `${progress * 100}%`,
          transform: 'translateX(-50%)',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--white)',
          boxShadow: '0 0 10px rgba(255,255,255,0.8)'
        }} />
      </div>

      {/* Section Label */}
      <div 
        className="scroll-section-label"
        style={{
          marginTop: '8px',
          paddingLeft: `calc(${progress * 100}% - 30px)`,
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'var(--muted)',
          transition: 'padding-left 0.1s ease-out'
        }}
      >
        {SECTIONS[sectionIndex]}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .scroll-section-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
