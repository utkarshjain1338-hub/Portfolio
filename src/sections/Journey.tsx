import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/global.css';

const TIMELINE = [
  { year: '2024 —', title: 'B.Tech Computer Science & Engineering', subtitle: 'G.L. Bajaj Institute of Technology & Management' },
  { year: '2023', title: 'High School', subtitle: 'Pioneer Montessori Inter College, Lucknow' },
  { year: '2021', title: 'Secondary School', subtitle: 'St. Fidelis College, Lucknow' },
];

export const Journey: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="journey" className="journey-section" ref={ref}>
      <div className="container">
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          06 — JOURNEY
        </motion.div>
        
        <div className="grid-12">
          <div style={{ gridColumn: '1 / 6' }}>
            <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
              THE<br/>TIMELINE.
            </motion.h2>
          </div>
          
          <div style={{ gridColumn: '7 / 13', paddingTop: '1vw' }}>
            <div className="timeline-list">
              {TIMELINE.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="timeline-row"
                  initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 + 0.1 }}
                >
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-subtitle">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
