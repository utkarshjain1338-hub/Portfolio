import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/global.css';

const SKILL_GROUPS = [
  { name: 'PROGRAMMING', skills: ['PYTHON', 'C++', 'JAVA', 'JAVASCRIPT', 'TYPESCRIPT'] },
  { name: 'AI / DATA', skills: ['NUMPY', 'PANDAS', 'MATPLOTLIB', 'SCIKIT-LEARN', 'PYTORCH'] },
  { name: 'WEB / BACKEND', skills: ['REACT', 'NEXT.JS', 'SPRING BOOT', 'POSTGRESQL', 'REST APIS'] },
  { name: 'SYSTEMS / SECURITY', skills: ['LINUX', 'BASH', 'GIT', 'NETWORKING', 'CYBERSECURITY'] },
];

export const Skills: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          05 — SKILLS
        </motion.div>
        
        <div className="grid-12">
          <div style={{ gridColumn: '1 / -1', paddingBottom: '4vh' }}>
            <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
              IN THE<br/>TOOLBOX.
            </motion.h2>
          </div>
          
          {SKILL_GROUPS.map((group, gi) => (
            <div key={group.name} style={{ gridColumn: 'span 6', marginBottom: '2vw' }}>
              <motion.div 
                className="skill-block"
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: gi * 0.15 + 0.1 }}
              >
                <div className="skill-cat-name">{group.name}</div>
                <div className="skill-grid">
                  {group.skills.map((skill) => (
                    <div key={skill} className="skill-item">
                      <span className="skill-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
