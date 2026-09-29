import { motion, useTransform } from 'framer-motion';
import { useGlobalMouse } from '../../contexts/MouseContext';

export const ContactBg = () => {
  const { smoothMouseX, smoothMouseY } = useGlobalMouse();

  const xLevel3 = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const yLevel3 = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
      
      {/* Connection Topology / Final Grounding Element */}
      <motion.div 
        style={{ x: xLevel3, y: yLevel3, opacity: 0.04, willChange: 'transform', marginBottom: '-5%' }}
      >
        <svg width="400" height="200" viewBox="0 0 400 200" fill="none" stroke="var(--text-color)" strokeWidth="1">
          <circle cx="100" cy="50" r="8" />
          <circle cx="300" cy="50" r="8" />
          <path d="M108,50 L292,50" />
          
          <path d="M105,55 L195,145 M295,55 L205,145" />
          <circle cx="200" cy="150" r="12" />
          <circle cx="200" cy="150" r="4" fill="var(--text-color)" />
        </svg>
      </motion.div>

    </div>
  );
};
