import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/global.css';

const EXPERIMENTS = [
  { index: '01', name: 'EVENT ANALYZER', desc: "A computer agent that learns whether I'm actually studying.", status: 'WIP', vis: 'telemetry' },
  { index: '02', name: 'ML EXPERIMENTS', desc: 'Small models built to understand the mathematics and mechanics behind machine learning.', status: 'ACTIVE', vis: 'math-graph' },
  { index: '03', name: 'CYBERSECURITY LAB', desc: 'Controlled experiments for understanding networks, vulnerabilities, and defensive mechanisms.', status: 'WIP', vis: 'network' },
  { index: '04', name: 'DSA LAB', desc: 'Algorithms and data structures implemented to understand how they actually work.', status: 'ACTIVE', vis: 'algo-sort' },
];

export const Experiments: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="experiments" className="experiments-section" ref={ref}>
      <div className="container">
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          04 — EXPERIMENTS
        </motion.div>
        
        <div className="grid-12">
          {/* Left Column: List */}
          <div style={{ gridColumn: '1 / 8' }}>
            <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
              TRYING TO<br/>MAKE WORK.
            </motion.h2>

            <div className="exp-list">
              {EXPERIMENTS.map((exp, i) => (
                <div 
                  key={exp.name} 
                  className={`exp-row ${hoveredIdx === i ? 'exp-row--active' : ''}`}
                  onMouseEnter={() => {
                    setHoveredIdx(i);
                    window.dispatchEvent(new CustomEvent('accelerate', { detail: true }));
                  }}
                  onMouseLeave={() => {
                    setHoveredIdx(null);
                    window.dispatchEvent(new CustomEvent('accelerate', { detail: false }));
                  }}
                >
                  <div className="exp-index">{exp.index}</div>
                  <div className="exp-content">
                    <h3 className="exp-name">{exp.name}</h3>
                    <div className="exp-line"></div>
                    <p className="exp-desc">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visualization Area */}
          <div style={{ gridColumn: '9 / 13' }}>
            <div className="exp-vis-container">
              {hoveredIdx !== null ? (
                <>
                  <div className="exp-vis-indicator">
                    <span className="blink-dot"></span>
                    SIMULATING {EXPERIMENTS[hoveredIdx].vis.toUpperCase()}
                  </div>
                  <div className="vis-area">
                    {/* Abstract visualizations */}
                    {hoveredIdx === 0 && (
                      <motion.div className="vis-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg viewBox="0 0 100 100" style={{ transform: 'rotate(135deg)', width: '100%', height: '100%', position: 'absolute' }}>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="283" strokeDashoffset="70" />
                            <motion.circle 
                              cx="50" cy="50" r="45" fill="none" stroke="var(--cyan)" strokeWidth="4" 
                              strokeDasharray="283" 
                              initial={{ strokeDashoffset: 283 }} 
                              animate={{ strokeDashoffset: [283, 140, 190, 80] }} 
                              transition={{ duration: 1.5, ease: "circOut", repeat: Infinity, repeatType: 'reverse' }}
                            />
                          </svg>
                          <motion.div 
                            style={{ position: 'absolute', top: '50%', left: '50%', width: '50px', height: '2px', background: 'var(--white)', transformOrigin: '0% 50%' }}
                            initial={{ rotate: -45 }}
                            animate={{ rotate: [135, 230, 200, 260] }}
                            transition={{ duration: 1.5, ease: "circOut", repeat: Infinity, repeatType: 'reverse' }}
                          />
                          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '12px', height: '12px', background: 'var(--cyan)', borderRadius: '50%', transform: 'translate(-50%, -50%)', border: '2px solid var(--bg)' }} />
                        </div>
                      </motion.div>
                    )}
                    {hoveredIdx === 1 && (
                      <motion.div className="vis-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ position: 'relative', width: '140px', height: '140px' }}>
                          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                            {/* Neural Network / Math Graph */}
                            <motion.path d="M20,50 L50,20 L80,50 L50,80 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                            <motion.path 
                              d="M20,50 L50,20 L80,50 L50,80 Z" fill="none" stroke="var(--cyan)" strokeWidth="2"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.circle cx="20" cy="50" r="6" fill="var(--white)" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                            <motion.circle cx="80" cy="50" r="6" fill="var(--white)" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} />
                            <motion.circle cx="50" cy="20" r="6" fill="var(--white)" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, delay: 0.25, repeat: Infinity }} />
                            <motion.circle cx="50" cy="80" r="6" fill="var(--cyan)" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, delay: 0.75, repeat: Infinity }} />
                            <motion.line x1="20" y1="50" x2="80" y2="50" stroke="var(--cyan)" strokeWidth="2" strokeDasharray="5" animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                    {hoveredIdx === 2 && (
                      <motion.div className="vis-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ position: 'relative', width: '140px', height: '140px', borderRadius: '50%', border: '2px solid rgba(0, 212, 255, 0.2)', overflow: 'hidden' }}>
                          {/* Radar Ping */}
                          <motion.div 
                            style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: '2px', background: 'linear-gradient(90deg, rgba(0,212,255,0) 0%, var(--cyan) 100%)', transformOrigin: '0% 50%' }}
                            animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          />
                          <motion.div style={{ position: 'absolute', top: '30%', left: '60%', width: '8px', height: '8px', background: 'var(--white)', borderRadius: '50%' }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                          <motion.div style={{ position: 'absolute', top: '70%', left: '30%', width: '8px', height: '8px', background: 'var(--cyan)', borderRadius: '50%' }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
                          {/* Grid Lines */}
                          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }} />
                        </div>
                      </motion.div>
                    )}
                    {hoveredIdx === 3 && (
                      <motion.div className="vis-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px' }}>
                          {/* Sorting Array */}
                          {[40, 80, 20, 100, 60].map((h, j) => (
                            <motion.div 
                              key={j} 
                              style={{ width: '16px', background: j === 2 ? 'var(--cyan)' : 'var(--white)' }}
                              animate={{ height: [`${h}%`, `${120-h}%`, `${h}%`] }} 
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: j * 0.2 }} 
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <div className="exp-vis-empty">
                  HOVER TO VISUALIZE
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
