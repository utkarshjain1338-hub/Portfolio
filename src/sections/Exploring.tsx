import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const DOMAINS = [
  {
    id: 'explore-aiml',
    title: 'AI / ML',
    color: '#00d4ff',
    desc: 'Learning how machines extract patterns, make predictions, and eventually reason from data.',
    topics: ['MATHEMATICS', 'MACHINE LEARNING', 'DEEP LEARNING', 'COMPUTER VISION', 'TRANSFORMERS'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" />
        <line x1="11" y1="13" x2="15" y2="18" stroke="currentColor" strokeWidth="1" />
        <line x1="29" y1="13" x2="25" y2="18" stroke="currentColor" strokeWidth="1" />
        <line x1="11" y1="27" x2="15" y2="22" stroke="currentColor" strokeWidth="1" />
        <line x1="29" y1="27" x2="25" y2="22" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'explore-security',
    title: 'CYBERSECURITY',
    color: '#ff3c5c',
    desc: 'Learning how systems fail, how they can be attacked, and how they can be made harder to break.',
    topics: ['LINUX', 'NETWORKING', 'OFFENSIVE SECURITY', 'REVERSE ENGINEERING', 'CTFs'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 4 L34 10 L34 22 C34 30 27 36 20 38 C13 36 6 30 6 22 L6 10 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 20 L18 24 L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'explore-systems',
    title: 'SYSTEMS',
    color: '#f0a500',
    desc: 'Going below the application layer to understand what the operating system and machine are actually doing.',
    topics: ['DSA', 'LINUX INTERNALS', 'OPERATING SYSTEMS', 'NETWORKING', 'SYSTEM DESIGN'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 18 L16 14 L20 18 L24 14 L28 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'explore-backend',
    title: 'BACKEND',
    color: '#00ff88',
    desc: 'Understanding the infrastructure underneath applications — APIs, databases, services, and the systems connecting them.',
    topics: ['REST APIs', 'DATABASES', 'SPRING BOOT', 'NEXT.JS', 'DISTRIBUTED SYSTEMS'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="4" y="6" width="32" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="18" width="32" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="30" width="32" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="30" cy="10" r="1.5" fill="currentColor" />
        <circle cx="30" cy="22" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export const Exploring: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="exploring" className="section exploring-section" aria-labelledby="exploring-heading">
      <div className="container" ref={ref}>
        <motion.div className="section-label" variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'}>03 — EXPLORING</motion.div>
        <motion.h2 id="exploring-heading" className="section-heading" variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}>Where I'm going deeper.</motion.h2>
        <motion.p className="section-subtext" variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}>I'm not trying to collect technologies. I'm trying to understand the systems underneath them.</motion.p>

        <div className="explore-grid">
          {DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.id}
              id={domain.id}
              className="explore-card"
              variants={fadeUp}
              custom={i + 3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{ '--domain-color': domain.color } as React.CSSProperties}
            >
              <div className="explore-icon" style={{ color: domain.color }} aria-hidden="true">
                {domain.icon}
              </div>
              <h3 className="explore-domain" style={{ color: domain.color }}>{domain.title}</h3>
              <p className="explore-desc">{domain.desc}</p>
              <ul className="explore-topics">
                {domain.topics.map((t) => <li key={t}>[ {t} ]</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
