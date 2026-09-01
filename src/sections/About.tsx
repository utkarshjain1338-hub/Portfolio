import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/global.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TERMINAL_COMMANDS = [
  { cmd: 'whoami', out: 'utkarsh_jain' },
  { cmd: 'cat focus.txt', out: 'AI/ML | SYSTEMS | SECURITY | BACKEND' },
  { cmd: 'cat philosophy.txt', out: 'BUILD → BREAK → UNDERSTAND' },
  { cmd: 'git status', out: 'On branch: main\nStatus: learning...' },
];

export const About: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  
  // Terminal Logic
  const [terminalState, setTerminalState] = useState(0); // 0: idle, 1: executing
  const [typedLines, setTypedLines] = useState<{type: string, text: string}[]>([]);
  const terminalHovered = useRef(false);

  useEffect(() => {
    let timeoutId: number;

    if (terminalState === 1) {
      let currentCmd = 0;
      
      const typeNext = () => {
        if (!terminalHovered.current) return;
        
        if (currentCmd >= TERMINAL_COMMANDS.length) {
          return; // Done executing
        }

        const cmd = TERMINAL_COMMANDS[currentCmd];
        setTypedLines(prev => [...prev, { type: 'cmd', text: cmd.cmd }]);
        
        timeoutId = window.setTimeout(() => {
          if (!terminalHovered.current) return;
          setTypedLines(prev => [...prev, { type: 'out', text: cmd.out }]);
          currentCmd++;
          timeoutId = window.setTimeout(typeNext, 400);
        }, 600);
      };

      typeNext();
    }

    return () => clearTimeout(timeoutId);
  }, [terminalState]);

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        
        <motion.div className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          01 — ABOUT
        </motion.div>
        
        <div className="grid-12">
          {/* Left Column: Massive Heading & Philosophy */}
          <div style={{ gridColumn: '1 / 7' }}>
            <motion.h2 
              className="about-heading"
              custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              I BUILD<br/>
              THINGS TO<br/>
              UNDERSTAND<br/>
              THEM.
            </motion.h2>

            <motion.div className="philosophy-stack" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <span>BUILD</span>
              <span className="phi-arrow">↓</span>
              <span>BREAK</span>
              <span className="phi-arrow">↓</span>
              <span>UNDERSTAND</span>
            </motion.div>
          </div>

          {/* Right Column: Paragraphs & Terminal */}
          <div style={{ gridColumn: '8 / 13', paddingTop: '1vw' }}>
            <motion.p className="about-para" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              I'm exploring computer science by building rather than staying inside one specialization. AI and machine learning are where I want to go deepest, while systems, cybersecurity, backend engineering, and the fundamentals keep pulling me closer to how computers actually work.
            </motion.p>
            <motion.p className="about-para" custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              I like taking an idea from a blank page, figuring out what it requires, building a prototype, breaking it, and then understanding why it broke.
            </motion.p>
            <motion.p className="about-para" custom={5} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              Right now I'm strengthening the foundations — mathematics, programming, algorithms, Linux, systems, and machine learning — one project at a time.
            </motion.p>

            <motion.div 
              className="terminal-interactive"
              custom={6} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              onMouseEnter={() => {
                terminalHovered.current = true;
                if (terminalState === 0) setTerminalState(1);
              }}
              onMouseLeave={() => {
                terminalHovered.current = false;
                setTerminalState(0);
                setTypedLines([]);
              }}
            >
              <div className="term-header">
                <span className="term-dot" style={{background: '#ff5f57'}}/>
                <span className="term-dot" style={{background: '#ffbd2e'}}/>
                <span className="term-dot" style={{background: '#28c840'}}/>
              </div>
              <div className="term-body">
                {typedLines.map((line, i) => (
                  <div key={i} className={line.type === 'cmd' ? 'term-cmd' : 'term-out'}>
                    {line.type === 'cmd' ? (
                      <><span className="term-prompt">$</span> {line.text}</>
                    ) : (
                      line.text.split('\n').map((str, j) => <div key={j}>{str}</div>)
                    )}
                  </div>
                ))}
                <div className="term-cmd">
                  <span className="term-prompt">$</span> <span className="term-cursor">_</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
