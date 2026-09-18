import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface SectionLayoutProps {
  id: string;
  number: string;
  title?: string;
  leftRailContent?: ReactNode;
  rightRailContent?: ReactNode;
  children: ReactNode;
}

const SectionLayout = ({ id, number, title, leftRailContent, rightRailContent, children }: SectionLayoutProps) => {
  const isUp = useScrollDirection();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const durationMult = isUp ? 0.3 : 1;

  return (
    <section id={id} style={{ padding: isMobile ? '4rem 5%' : '8rem 5%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="section-grid">
        
        {/* Left Rail */}
        <div className="left-rail">
          <div style={{ position: 'sticky', top: '20vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 * durationMult, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
                {number}
              </span>
              <div style={{ height: '1px', width: '50px', background: 'var(--border-color)', margin: '0.5rem 0 2rem 0' }} />
            </motion.div>
            {leftRailContent}
          </div>
        </div>

        {/* Center Content */}
        <div className="center-rail">
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 * durationMult, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '4rem' }}
            >
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {title}
              </h2>
            </motion.div>
          )}
          {children}
        </div>

        {/* Right Rail */}
        <div className="right-rail">
          <div style={{ position: 'sticky', top: '20vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {rightRailContent}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SectionLayout;
