import { motion, useTransform } from 'framer-motion';
import { useGlobalMouse } from '../../contexts/MouseContext';

export const ProjectsBg = () => {
  const { smoothMouseX, smoothMouseY } = useGlobalMouse();

  const xLevel3 = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const yLevel3 = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      {/* Horizontal Project Axes */}
      <motion.div 
        style={{ position: 'absolute', top: '50%', left: '-10%', right: '-10%', x: xLevel3, y: yLevel3, opacity: 0.04, willChange: 'transform' }}
      >
        <svg width="100%" height="40" preserveAspectRatio="none" fill="none" stroke="var(--text-color)" strokeWidth="1">
          <path d="M0,20 L10000,20" />
          {/* Nodes along the axis */}
          <circle cx="20%" cy="20" r="4" fill="var(--text-color)" />
          <circle cx="40%" cy="20" r="4" fill="var(--text-color)" />
          <circle cx="60%" cy="20" r="4" fill="var(--text-color)" />
          <circle cx="80%" cy="20" r="4" fill="var(--text-color)" />
        </svg>
      </motion.div>

      {/* Tiny annotations */}
      <motion.div 
        style={{ position: 'absolute', top: '52%', left: '20%', x: xLevel3, y: yLevel3, opacity: 0.03, fontFamily: 'monospace', fontSize: '0.6rem', willChange: 'transform' }}
      >
        NODE 1
      </motion.div>
      <motion.div 
        style={{ position: 'absolute', top: '52%', left: '80%', x: xLevel3, y: yLevel3, opacity: 0.03, fontFamily: 'monospace', fontSize: '0.6rem', willChange: 'transform' }}
      >
        NODE 4
      </motion.div>

    </div>
  );
};
