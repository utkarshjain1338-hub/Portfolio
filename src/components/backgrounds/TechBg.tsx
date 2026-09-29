import { motion, useTransform } from 'framer-motion';
import { useGlobalMouse } from '../../contexts/MouseContext';

export const TechBg = () => {
  const { smoothMouseX, smoothMouseY } = useGlobalMouse();

  const xLevel3 = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const yLevel3 = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      {/* Network / System Diagram */}
      <motion.div 
        style={{ position: 'absolute', top: '10%', left: '10%', x: xLevel3, y: yLevel3, opacity: 0.04, willChange: 'transform' }}
      >
        <svg width="300" height="400" viewBox="0 0 300 400" fill="none" stroke="var(--text-color)" strokeWidth="1">
          <circle cx="150" cy="50" r="8" />
          <path d="M150,58 L150,150" />
          
          <circle cx="50" cy="150" r="8" />
          <circle cx="150" cy="150" r="8" />
          <circle cx="250" cy="150" r="8" />
          <path d="M58,150 L142,150 M158,150 L242,150" />

          <path d="M150,158 L150,250" />
          <circle cx="150" cy="250" r="8" />
        </svg>
      </motion.div>

      {/* Tiny Hex Data */}
      <motion.div 
        style={{ position: 'absolute', bottom: '15%', right: '15%', x: xLevel3, y: yLevel3, opacity: 0.03, fontFamily: 'monospace', fontSize: '0.75rem', textAlign: 'right', willChange: 'transform' }}
      >
        0x00F8A<br />
        0x01B2C<br />
        SYS_OK
      </motion.div>

    </div>
  );
};
