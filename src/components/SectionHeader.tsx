import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface SectionHeaderProps {
  number: string;
  title: string;
}

const SectionHeader = ({ number, title }: SectionHeaderProps) => {
  const isUp = useScrollDirection();
  const durationMult = isUp ? 0.3 : 1;

  return (
    <div style={{ position: 'relative', marginBottom: '4rem', display: 'flex', flexDirection: 'column' }}>
      {/* Massive subtle background number */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 * durationMult, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 800,
          lineHeight: 0.8,
          color: 'var(--text-color)',
          opacity: 0.03, // Extremely faint
          letterSpacing: '-0.05em',
          position: 'absolute',
          top: '-20%',
          left: '-5%',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {number}
      </motion.div>

      {/* Foreground structured header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 * durationMult, delay: (isUp ? 0 : 0.2), ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
          {number}
        </span>
        <div style={{ height: '1px', width: '100px', background: 'var(--border-color)', margin: '0.5rem 0' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {title}
        </h2>
      </motion.div>
    </div>
  );
};

export default SectionHeader;
