import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const PROJECTS = [
  {
    id: 'PRJ_001',
    name: 'Event Analyzer',
    domain: 'AI / SYSTEMS',
    description:
      'A context-aware study assistant that observes computer activity, learns the difference between productive and distracting behavior, and progressively intervenes when focus is lost.',
    tags: ['python', 'machine learning', 'computer vision', 'os integration'],
    status: 'WIP',
    color: '#00d4ff',
  },
  {
    id: 'PRJ_002',
    name: 'PactFlow',
    domain: 'BACKEND / SYSTEMS',
    description:
      'A software system built around backend services, APIs, databases, authentication, and application infrastructure.',
    tags: ['java', 'spring boot', 'postgresql', 'next.js'],
    status: 'WIP',
    color: '#00ff88',
  },
  {
    id: 'PRJ_003',
    name: 'NEXT SYSTEM',
    domain: 'AI / ML',
    description: 'The next experiment is still taking shape.',
    tags: [],
    status: 'NOT STARTED',
    color: '#7b2fff',
    classified: true,
  },
];

export const Projects: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
      <div className="container" ref={ref}>
        <motion.div className="section-label" variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          02 — PROJECTS
        </motion.div>
        <motion.h2 id="projects-heading" className="section-heading" variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          Things I've built to learn something.
        </motion.h2>
        <motion.p className="section-subtext" variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          Projects are where ideas become systems — and where assumptions usually meet reality.
        </motion.p>

        <div className="projects-grid">
          {PROJECTS.map((prj, i) => (
            <motion.article
              key={prj.id}
              className={`project-card ${prj.classified ? 'project-card--classified' : ''}`}
              id={`prj-${prj.id.toLowerCase().replace('_', '-')}`}
              aria-labelledby={`prj-name-${i}`}
              variants={fadeUp}
              custom={i + 3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{ '--node-color': prj.color } as React.CSSProperties}
            >
              <div className="prj-top">
                <span className="prj-id">[ {prj.id} ]</span>
                <span className={`prj-status prj-status--${prj.status === 'WIP' ? 'wip' : 'ns'}`}>
                  [ {prj.status} ]
                </span>
              </div>
              <div className="prj-domain" style={{ color: prj.color }}>{prj.domain}</div>
              <h3 id={`prj-name-${i}`} className="prj-name">{prj.name}</h3>
              <p className="prj-desc">{prj.description}</p>
              {prj.tags.length > 0 && (
                <div className="prj-tags" aria-label="Technologies used">
                  {prj.tags.map((tag) => (
                    <span key={tag} className="prj-tag">[ {tag} ]</span>
                  ))}
                </div>
              )}
              {prj.classified && (
                <div className="classified-overlay" aria-hidden="true">
                  <span className="classified-text">INITIALIZING</span>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
