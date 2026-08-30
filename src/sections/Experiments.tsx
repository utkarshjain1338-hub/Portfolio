import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERIMENTS = [
  { index: '01', name: 'EVENT ANALYZER', desc: "A computer agent that learns whether I'm actually studying.", status: 'WIP', color: '#00d4ff' },
  { index: '02', name: 'ML EXPERIMENTS', desc: 'Small models built to understand the mathematics and mechanics behind machine learning.', status: 'ACTIVE', color: '#00d4ff' },
  { index: '03', name: 'CYBERSECURITY LAB', desc: 'Controlled experiments for understanding networks, vulnerabilities, and defensive mechanisms.', status: 'WIP', color: '#ff3c5c' },
  { index: '04', name: 'DSA LAB', desc: 'Algorithms and data structures implemented to understand how they actually work.', status: 'ACTIVE', color: '#f0a500' },
];

export const Experiments: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experiments" className="section experiments-section" aria-labelledby="experiments-heading">
      <div className="container" ref={ref}>
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>04 — EXPERIMENTS</motion.div>
        <motion.h2 id="experiments-heading" className="section-heading" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}>Things I'm currently trying to make work.</motion.h2>
        <motion.p className="section-subtext" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>Not everything needs to become a product. Some things exist because I wanted to know if I could build them.</motion.p>

        <div className="experiments-list">
          {EXPERIMENTS.map((exp, i) => (
            <motion.div
              key={exp.name}
              className="experiment-item"
              id={`exp-${exp.name.toLowerCase().replace(/ /g, '-')}`}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
            >
              <div className="exp-left">
                <span className="exp-index" style={{ color: exp.color }}>{exp.index}</span>
              </div>
              <div className="exp-body">
                <div className="exp-top">
                  <h3 className="exp-name">{exp.name}</h3>
                  <span className={`exp-status exp-status--${exp.status.toLowerCase()}`}>[ {exp.status} ]</span>
                </div>
                <p className="exp-desc">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
