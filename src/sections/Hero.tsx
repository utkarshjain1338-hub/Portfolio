import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import '../styles/global.css';

export const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollY } = useScroll();
  
  // Subtle Parallax
  const utkarshX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const jainX = useTransform(mouseX, [-1, 1], [15, -15]);
  const jainScrollY = useTransform(scrollY, [0, 1000], [0, -200]);
  
  // Combine mouse and scroll for JAIN
  const combinedJainY = useTransform(() => jainScrollY.get() + (mouseY.get() * -8));
  
  const metaX = useTransform(mouseX, [-1, 1], [-4, 4]);
  const metaY = useTransform(mouseY, [-1, 1], [-4, 4]);

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="grid-12 hero-grid">
          
          {/* Top metadata */}
          <motion.div 
            className="hero-meta" 
            style={{ gridColumn: '8 / 12', x: metaX, y: metaY, zIndex: 10, paddingTop: '10vh' }}
          >
            AI / ML<br/>
            SYSTEMS<br/>
            OPEN SOURCE
          </motion.div>

          {/* Massive Display Name */}
          <motion.div 
            className="hero-name-part" 
            style={{ gridColumn: '1 / 13', x: utkarshX, zIndex: 2, marginTop: '4vh' }}
          >
            UTKARSH
          </motion.div>
          
          <motion.div 
            className="hero-name-part" 
            style={{ gridColumn: '2 / 13', x: jainX, y: combinedJainY, zIndex: 1 }}
          >
            JAIN
          </motion.div>

          {/* Bottom metadata */}
          <motion.div 
            className="hero-meta" 
            style={{ gridColumn: '8 / 12', x: metaX, y: metaY, marginTop: '8vh', zIndex: 10 }}
          >
            EXPLORING HOW<br/>
            COMPUTERS THINK,<br/>
            BREAK, AND WORK.
          </motion.div>

        </div>
      </div>

      <motion.div 
        className="hero-scroll" 
        animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }} 
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        SCROLL<br/>↓
      </motion.div>
    </section>
  );
};
