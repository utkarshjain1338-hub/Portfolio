import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiCode, FiGithub, FiLinkedin, FiMail, FiTerminal, FiTwitter } from 'react-icons/fi';
import SectionLayout from '../components/SectionLayout';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Contact = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [emailState, setEmailState] = useState<'DEFAULT' | 'HOVER' | 'COPIED'>('DEFAULT');

  const handleEmailClick = () => {
    // TODO: Replace with your actual email address
    navigator.clipboard.writeText('utkarshjain1338@gmail.com');
    setEmailState('COPIED');
    setTimeout(() => {
      setEmailState((prev) => (prev === 'COPIED' ? 'DEFAULT' : prev));
    }, 2000);
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 2.2 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const motifElement = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '2rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        {['繋', 'が', 'る'].map((char, i) => (
          <span key={i} style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>{char}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', color: 'var(--text-color)', opacity: 0.7, gap: '0.2rem' }}>
        {['つ', 'な', 'が', 'る'].map((char, i) => (
          <span key={i} style={{ fontSize: '1rem', lineHeight: 1, fontWeight: 600 }}>{char}</span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <SectionLayout id="contact" number="04" rightRailContent={motifElement}>
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

        {/* Massive Typography Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}
        >
          <motion.h1 variants={titleVariants} style={{ fontSize: isMobile ? 'clamp(3rem, 15vw, 8rem)' : '8rem', fontWeight: 900, margin: 0, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', willChange: 'transform, opacity' }}>
            LET'S
          </motion.h1>
          <motion.h1 variants={titleVariants} style={{ fontSize: isMobile ? 'clamp(3rem, 15vw, 8rem)' : '8rem', fontWeight: 900, margin: 0, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '2px var(--text-color)', willChange: 'transform, opacity' }}>
            CONNECT.
          </motion.h1>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ width: '100%', height: '2px', background: 'var(--text-color)', transformOrigin: 'left', margin: '3rem 0', willChange: 'transform' }}
        />

        {/* Footer Info Grid */}
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4rem', paddingBottom: '4rem' }}
        >
          {/* Column 1: Open To */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <motion.span variants={listItemVariants} style={{ fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 600, opacity: 0.5, marginBottom: '0.5rem', willChange: 'transform, opacity' }}>
              OPEN TO
            </motion.span>
            {['COLLABORATION', 'CONVERSATION', 'EXPERIMENTATION'].map((item) => (
              <motion.h3 key={item} variants={listItemVariants} style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, letterSpacing: '0.05em', willChange: 'transform, opacity' }}>
                {item}
              </motion.h3>
            ))}
          </div>

          {/* Column 2: Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <motion.span variants={listItemVariants} style={{ fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 600, opacity: 0.5, marginBottom: '0.5rem', willChange: 'transform, opacity' }}>
              AROUND THE WEB
            </motion.span>

            {/* EMAIL ROW */}
            <motion.div
              variants={listItemVariants}
              onMouseEnter={() => emailState !== 'COPIED' && setEmailState('HOVER')}
              onMouseLeave={() => emailState !== 'COPIED' && setEmailState('DEFAULT')}
              onClick={handleEmailClick}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 0', borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer', overflow: 'hidden', willChange: 'transform, opacity'
              }}
            >
              <div style={{ position: 'relative', height: '1.5rem', flexGrow: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FiMail size={20} />
                <AnimatePresence mode="wait">
                  {emailState === 'DEFAULT' && (
                    <motion.span key="default" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', left: '36px', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                      EMAIL
                    </motion.span>
                  )}
                  {emailState === 'HOVER' && (
                    <motion.span key="hover" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', left: '36px', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                      COPY EMAIL
                    </motion.span>
                  )}
                  {emailState === 'COPIED' && (
                    <motion.span key="copied" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', left: '36px', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent-color)' }}>
                      COPIED ✓
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.span animate={{ rotate: emailState === 'HOVER' ? 45 : 0 }} style={{ fontSize: '1.2rem', fontWeight: 600 }}>↗</motion.span>
            </motion.div>

            {/* SPACER */}
            <motion.div variants={listItemVariants} style={{ height: '1rem' }} />

            {/* SOCIAL LINKS */}
            {[
              { name: 'GITHUB', url: 'https://github.com/utkarshjain1338-hub', icon: <FiGithub size={20} /> },
              { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/utkarsh-jain-066086366/', icon: <FiLinkedin size={20} /> },
              { name: 'TRYHACKME', url: 'https://tryhackme.com/p/Utkarsh99', icon: <FiTerminal size={20} /> },
              { name: 'LEETCODE', url: 'https://leetcode.com/u/UtkarshJain99/', icon: <FiCode size={20} /> },
              { name: 'https://x.com/UtkarshJain999', url: '#', icon: <FiTwitter size={20} /> }
            ].map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={listItemVariants}
                whileHover="hover"
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1rem 0', borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer', textDecoration: 'none', color: 'inherit', willChange: 'transform, opacity'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {link.icon}
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em' }}>{link.name}</span>
                </div>
                <motion.span variants={{ hover: { x: 5, y: -5 } }} style={{ fontSize: '1.2rem', fontWeight: 600 }}>↗</motion.span>
              </motion.a>
            ))}

          </div>
        </motion.div>

        {/* Footer Thanks & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 2.5 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.5, paddingBottom: '2rem' }}
        >
          <div style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            THANK YOU — ありがとう
          </div>
          <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            © 2026 — UTKARSH JAIN
          </div>
        </motion.div>

      </div>
    </SectionLayout>
  );
};

export default Contact;
