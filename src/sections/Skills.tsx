import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILL_GROUPS = [
  {
    id: 'skills-programming',
    name: 'PROGRAMMING',
    color: '#00d4ff',
    skills: ['python', 'c++', 'java', 'javascript', 'typescript'],
  },
  {
    id: 'skills-ai',
    name: 'AI / DATA',
    color: '#7b2fff',
    skills: ['numpy', 'pandas', 'matplotlib', 'scikit-learn', 'pytorch'],
  },
  {
    id: 'skills-web',
    name: 'WEB / BACKEND',
    color: '#00ff88',
    skills: ['react', 'next.js', 'spring boot', 'postgresql', 'rest apis'],
  },
  {
    id: 'skills-systems',
    name: 'SYSTEMS / SECURITY',
    color: '#f0a500',
    skills: ['linux', 'networking', 'git', 'bash', 'cybersecurity'],
  },
];

export const Skills: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-heading">
      <div className="container" ref={ref}>
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>05 — SKILLS</motion.div>
        <motion.h2 id="skills-heading" className="section-heading" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}>Tools currently in the toolbox.</motion.h2>
        <motion.p className="section-subtext" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>A working set, not a scoreboard.</motion.p>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.id}
              id={group.id}
              className="skill-group"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.12 + 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="skill-group-name" style={{ color: group.color }}>{group.name}</h3>
              <ul className="skill-tags">
                {group.skills.map((skill, si) => (
                  <motion.li
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.12 + si * 0.06 + 0.4, duration: 0.4 }}
                    whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                    style={{ '--tag-color': group.color } as React.CSSProperties}
                  >
                    [ {skill} ]
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
