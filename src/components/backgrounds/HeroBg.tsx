import { motion, useTransform } from 'framer-motion';
import { useGlobalMouse } from '../../contexts/MouseContext';

export const HeroBg = () => {
  const { smoothMouseX, smoothMouseY } = useGlobalMouse();

  // Parallax mappings
  const xLevel2 = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const yLevel2 = useTransform(smoothMouseY, [-1, 1], [-5, 5]);
  
  const xLevel3 = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const yLevel3 = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const xLevel4 = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const yLevel4 = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      {/* Level 3: Background Geometry (Grid) */}
      <motion.div 
        style={{ position: 'absolute', top: '10%', left: '15%', x: xLevel3, y: yLevel3, opacity: 0.04, willChange: 'transform' }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke="var(--text-color)" strokeWidth="1">
          {/* Partial Grid */}
          <path d="M0,50 L150,50 M0,100 L200,100 M50,150 L200,150" />
          <path d="M50,0 L50,150 M100,0 L100,200 M150,50 L150,200" />
        </svg>
      </motion.div>

      {/* Level 4: Hidden Details (Coordinates) */}
      <motion.div 
        style={{ position: 'absolute', top: '25%', right: '20%', x: xLevel4, y: yLevel4, opacity: 0.03, fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.1em', willChange: 'transform' }}
      >
        [ 35.31° N ]<br />
        [ 78.47° E ]
      </motion.div>

      <motion.div 
        style={{ position: 'absolute', bottom: '20%', left: '10%', x: xLevel4, y: yLevel4, opacity: 0.03, fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.1em', willChange: 'transform' }}
      >
        X: 074<br />
        Y: 218<br />
        AXIS / 01
      </motion.div>

      {/* Tiny Crosshairs */}
      <motion.div style={{ position: 'absolute', top: '15%', right: '10%', x: xLevel3, y: yLevel3, opacity: 0.05, willChange: 'transform' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" stroke="var(--text-color)" strokeWidth="1">
          <path d="M10,0 L10,20 M0,10 L20,10" />
        </svg>
      </motion.div>

    </div>
  );
};
