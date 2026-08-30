import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'utkarsh_jain' },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'AI/ML | SYSTEMS | SECURITY | BACKEND', accent: 'cyan' },
  { type: 'cmd', text: 'cat philosophy.txt' },
  { type: 'out', text: 'BUILD → BREAK → UNDERSTAND', accent: 'green' },
  { type: 'cmd', text: 'git status' },
  { type: 'out', text: 'On branch: main' },
  { type: 'out', text: 'Status: learning...', accent: 'yellow' },
  { type: 'cursor', text: '' },
];

export const About: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-label"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          01 — ABOUT
        </motion.div>

        <div className="about-grid">
          <div className="about-text">
            <motion.h2
              id="about-heading"
              className="section-heading"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={1}
            >
              I build things to understand them.
            </motion.h2>

            {[
              `I'm exploring computer science by building rather than staying inside one specialization. AI and machine learning are where I want to go deepest, while systems, cybersecurity, backend engineering, and the fundamentals keep pulling me closer to how computers actually work.`,
              `I like taking an idea from a blank page, figuring out what it requires, building a prototype, breaking it, and then understanding why it broke.`,
              `Right now I'm strengthening the foundations — mathematics, programming, algorithms, Linux, systems, and machine learning — one project at a time.`,
            ].map((p, i) => (
              <motion.p
                key={i}
                className="about-para"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 2}
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              className="philosophy-line"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={5}
              aria-label="Philosophy: Build, Break, Understand"
            >
              <span className="phi-word">BUILD</span>
              <span className="phi-arrow">→</span>
              <span className="phi-word">BREAK</span>
              <span className="phi-arrow">→</span>
              <span className="phi-word">UNDERSTAND</span>
            </motion.div>
          </div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <div className="terminal-window">
              <div className="terminal-bar">
                <span className="t-dot t-dot--red" />
                <span className="t-dot t-dot--yellow" />
                <span className="t-dot t-dot--green" />
                <span className="t-title">uj@lab ~ $</span>
              </div>
              <div className="terminal-body">
                {TERMINAL_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`t-line ${
                      line.type === 'out' ? 't-output' : ''
                    } ${
                      line.accent === 'green'
                        ? 'accent-green'
                        : line.accent === 'cyan'
                        ? 'accent-cyan'
                        : line.accent === 'yellow'
                        ? 'accent-yellow'
                        : ''
                    }`}
                  >
                    {line.type === 'cmd' && (
                      <><span className="t-prompt">$</span> <span className="t-cmd">{line.text}</span></>
                    )}
                    {line.type === 'out' && line.text}
                    {line.type === 'cursor' && (
                      <><span className="t-prompt">$</span> <span className="t-cursor">█</span></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
