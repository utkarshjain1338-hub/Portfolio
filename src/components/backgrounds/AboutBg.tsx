import { motion, useTransform } from 'framer-motion';
import { useGlobalMouse } from '../../contexts/MouseContext';

export const AboutBg = () => {
  const { smoothMouseX, smoothMouseY } = useGlobalMouse();

  const xLevel3 = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const yLevel3 = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  const xLevel4 = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const yLevel4 = useTransform(smoothMouseY, [-1, 1], [-12, 12]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      {/* Huge Diagonal Bleed */}
      <motion.div 
        style={{ position: 'absolute', top: '-10%', right: '-5%', x: xLevel3, y: yLevel3, opacity: 0.03, willChange: 'transform' }}
      >
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" stroke="var(--text-color)" strokeWidth="1">
          <path d="M0,0 L600,600 M600,0 L0,600" />
          <circle cx="300" cy="300" r="150" />
          <rect x="250" y="250" width="100" height="100" transform="rotate(45 300 300)" />
        </svg>
      </motion.div>

      {/* Tiny Diamonds */}
      <motion.div 
        style={{ position: 'absolute', bottom: '15%', left: '15%', x: xLevel4, y: yLevel4, opacity: 0.04, willChange: 'transform' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--text-color)" strokeWidth="1">
          <path d="M20,0 L40,20 L20,40 L0,20 Z" />
          <path d="M20,10 L30,20 L20,30 L10,20 Z" />
        </svg>
      </motion.div>

    </div>
  );
};
