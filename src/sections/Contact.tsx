import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/global.css';

export const Contact: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ position: 'absolute', top: '100px' }}>
          07 — CONTACT
        </motion.div>
        
        <div className="grid-12">
          <div style={{ gridColumn: '1 / 13' }}>
            <motion.h2 
              className="section-heading" 
              style={{ fontSize: 'clamp(60px, 15vw, 240px)', textAlign: 'center', margin: '0' }}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              CONNECT.
            </motion.h2>
          </div>
          
          <div style={{ gridColumn: '3 / 7', marginTop: '6vw' }}>
            <motion.div className="contact-block" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
              <div className="contact-label">EMAIL</div>
              <a href="mailto:utkarsh.jain.1338@gmail.com" className="contact-link">
                UTKARSH.JAIN.1338<br/>@GMAIL.COM
              </a>
            </motion.div>
          </div>
          
          <div style={{ gridColumn: '9 / 13', marginTop: '10vw' }}>
            <motion.div className="contact-block" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
              <div className="contact-label">NETWORK</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="https://github.com/utkarshjain1338" target="_blank" rel="noreferrer" className="contact-link">GITHUB ↗</a>
                <a href="https://linkedin.com/in/utkarshjain1338" target="_blank" rel="noreferrer" className="contact-link">LINKEDIN ↗</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="footer-bar">
        <span>© 2026 UTKARSH JAIN</span>
        <span>ALL SYSTEMS NOMINAL</span>
      </div>
    </section>
  );
};
