import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MILESTONES = [
  {
    year: '2026',
    event: 'FOUNDATIONS',
    detail: 'Rebuilding the fundamentals: Python, C++, DSA, mathematics, Linux, SQL, and computer science fundamentals.',
    ongoing: false,
    color: '#00d4ff',
  },
  {
    year: '2026',
    event: 'SYSTEMS',
    detail: 'Going deeper into operating systems, networking, Linux, backend engineering, and how software behaves underneath the abstractions.',
    ongoing: false,
    color: '#f0a500',
  },
  {
    year: '2026+',
    event: 'MACHINE LEARNING',
    detail: 'Moving from mathematical foundations into machine learning, deep learning, and eventually deeper AI systems.',
    ongoing: false,
    color: '#7b2fff',
  },
  {
    year: 'ONGOING',
    event: 'SECURITY',
    detail: 'Exploring offensive security, Linux, networks, vulnerabilities, and how real systems fail.',
    ongoing: true,
    color: '#ff3c5c',
  },
];

export const Journey: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="journey" className="section journey-section" aria-labelledby="journey-heading">
      <div className="container" ref={ref}>
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>06 — JOURNEY</motion.div>
        <motion.h2 id="journey-heading" className="section-heading" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}>Still under construction.</motion.h2>
        <motion.p className="section-subtext" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>There is no finished version. Just the next thing to understand.</motion.p>

        <div className="timeline">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={`${m.year}-${m.event}`}
              className={`timeline-item ${m.ongoing ? 'timeline-item--ongoing' : ''}`}
              id={`journey-${m.event.toLowerCase().replace(/ /g, '-')}`}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline-marker">
                <span className={`t-year ${m.ongoing ? 'ongoing-label' : ''}`} style={{ color: m.color }}>{m.year}</span>
                <div className={`t-dot-outer ${m.ongoing ? 't-dot-outer--pulse' : ''}`} style={{ borderColor: m.color }}>
                  <div className="t-dot-inner" style={{ background: m.color }} />
                </div>
              </div>
              <div className="timeline-content">
                <h3 className="t-event" style={{ color: m.color }}>{m.event}</h3>
                <p className="t-detail">{m.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
