import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/global.css';

const DOMAINS = [
  { id: 'ai', title: 'AI / ML', desc: 'Learning how machines extract patterns, make predictions, and eventually reason from data.', topics: ['MATHEMATICS', 'MACHINE LEARNING', 'DEEP LEARNING', 'COMPUTER VISION', 'TRANSFORMERS'] },
  { id: 'cyber', title: 'CYBERSECURITY', desc: 'Learning how systems fail, how they can be attacked, and how they can be made harder to break.', topics: ['LINUX', 'NETWORKING', 'OFFENSIVE SECURITY', 'REVERSE ENGINEERING', 'CTFs'] },
  { id: 'systems', title: 'SYSTEMS', desc: 'Going below the application layer to understand what the operating system and machine are actually doing.', topics: ['DSA', 'LINUX INTERNALS', 'OPERATING SYSTEMS', 'NETWORKING', 'SYSTEM DESIGN'] },
  { id: 'backend', title: 'BACKEND', desc: 'Understanding the infrastructure underneath applications — APIs, databases, services, and the systems connecting them.', topics: ['REST APIs', 'DATABASES', 'SPRING BOOT', 'NEXT.JS', 'DISTRIBUTED SYSTEMS'] },
];

export const Exploring: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  return (
    <section id="exploring" className="exploring-section" ref={ref}>
      <div className="container">
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          03 — EXPLORING
        </motion.div>
        
        <div className="grid-12">
          <div style={{ gridColumn: '1 / 13' }}>
            <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              GOING DEEPER.
            </motion.h2>
          </div>
          
          <div style={{ gridColumn: '1 / 13' }}>
            <motion.div 
              className="quadrant-map"
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            >
              {DOMAINS.map(domain => {
                const isHovered = hoveredDomain === domain.id;
                const isOtherHovered = hoveredDomain !== null && !isHovered;
                
                return (
                  <div
                    key={domain.id}
                    className={`quadrant ${isHovered ? 'quadrant--active' : ''} ${isOtherHovered ? 'quadrant--receded' : ''}`}
                    onMouseEnter={() => setHoveredDomain(domain.id)}
                    onMouseLeave={() => setHoveredDomain(null)}
                  >
                    <h3 className="quad-title">{domain.title}</h3>
                    <p className="quad-desc">{domain.desc}</p>
                    <ul className="quad-topics">
                      {domain.topics.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
