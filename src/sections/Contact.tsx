import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LINKS = [
  { id: 'contact-email', label: 'EMAIL', href: 'mailto:your@email.com' },
  { id: 'contact-github', label: 'GITHUB', href: 'https://github.com/', external: true },
  { id: 'contact-linkedin', label: 'LINKEDIN', href: 'https://linkedin.com/in/', external: true },
];

export const Contact: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
      <div className="container" ref={ref}>
        <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>07 — CONTACT</motion.div>
        <motion.h2 id="contact-heading" className="section-heading" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}>Let's build something.</motion.h2>

        <div className="contact-links">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.id}
              id={link.id}
              href={link.href}
              className="contact-link"
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
            >
              <span className="contact-label">{link.label}</span>
              <span className="contact-dots" aria-hidden="true">···············································</span>
              <span className="contact-arrow">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
