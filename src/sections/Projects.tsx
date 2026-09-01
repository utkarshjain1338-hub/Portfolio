import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/global.css';

const PROJECTS = [
  {
    id: 'PRJ_001',
    name: 'EVENT ANALYZER',
    domain: 'AI / SYSTEMS',
    description: 'A context-aware study assistant that observes computer activity, learns the difference between productive and distracting behavior, and progressively intervenes when focus is lost.',
    tags: ['PYTHON', 'ML', 'CV', 'OS'],
    theme: 'organic'
  },
  {
    id: 'PRJ_002',
    name: 'PACTFLOW',
    domain: 'BACKEND / SYSTEMS',
    description: 'A software system built around backend services, APIs, databases, authentication, and application infrastructure.',
    tags: ['JAVA', 'SPRING BOOT', 'POSTGRESQL', 'NEXT.JS'],
    theme: 'structured'
  },
  {
    id: 'PRJ_003',
    name: 'NEXT SYSTEM',
    domain: 'AI / ML',
    description: 'The next experiment is still taking shape.',
    tags: [],
    theme: 'empty'
  },
];

export const Projects: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    // Dispatch global event for Three.js background to listen to
    if (inView) {
      window.dispatchEvent(new CustomEvent('project-theme', { detail: PROJECTS[activeIdx].theme }));
    } else {
      window.dispatchEvent(new CustomEvent('project-theme', { detail: 'default' }));
    }
  }, [activeIdx, inView]);

  const activePrj = PROJECTS[activeIdx];

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          02 — PROJECTS
        </motion.div>
        
        <div className="grid-12">
          {/* Top Row: Title */}
          <div style={{ gridColumn: '1 / -1', paddingBottom: '4vh' }}>
            <motion.h2 
              className="section-heading" 
              style={{ fontSize: 'clamp(32px, 7vw, 100px)', lineHeight: 0.9 }}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            >
              BUILT TO<br/>UNDERSTAND.
            </motion.h2>
          </div>
          
          {/* Bottom Row: Navigator */}
          <div style={{ gridColumn: '1 / -1' }}>
            <motion.div 
              className="project-navigator"
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            >
              {/* Massive Outline Box */}
              <div className="project-display" style={{ minHeight: '600px' }}>
                <div className="project-domain">{activePrj.domain}</div>
                <h3 className="project-title">{activePrj.name}</h3>
                <p className="project-desc" style={{ maxWidth: '800px', fontSize: '1.25rem' }}>{activePrj.description}</p>
                
                <div className="project-tags">
                  {activePrj.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      {i > 0 && <span className="tag-sep">·</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="project-controls">
                <div className="project-counter">
                  0{activeIdx + 1} / 0{PROJECTS.length}
                </div>
                <div className="project-arrows">
                  <button 
                    onClick={() => setActiveIdx(p => Math.max(0, p - 1))}
                    disabled={activeIdx === 0}
                    onMouseEnter={() => window.dispatchEvent(new CustomEvent('accelerate', { detail: true }))}
                    onMouseLeave={() => window.dispatchEvent(new CustomEvent('accelerate', { detail: false }))}
                  >←</button>
                  <button 
                    onClick={() => setActiveIdx(p => Math.min(PROJECTS.length - 1, p + 1))}
                    disabled={activeIdx === PROJECTS.length - 1}
                    onMouseEnter={() => window.dispatchEvent(new CustomEvent('accelerate', { detail: true }))}
                    onMouseLeave={() => window.dispatchEvent(new CustomEvent('accelerate', { detail: false }))}
                  >→</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
