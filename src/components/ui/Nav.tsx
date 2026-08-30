import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#about', label: '01 ABOUT' },
  { href: '#projects', label: '02 PROJECTS' },
  { href: '#exploring', label: '03 EXPLORING' },
  { href: '#experiments', label: '04 EXPERIMENTS' },
  { href: '#skills', label: '05 SKILLS' },
  { href: '#journey', label: '06 JOURNEY' },
  { href: '#contact', label: '07 CONTACT' },
];

export const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,212,255,0.08)' : 'none',
        }}
      >
        <div className="nav-logo">
          <span className="nav-id">UJ-001</span>
          <span className="nav-status">
            <span className="status-dot" aria-hidden="true" />
            ONLINE
          </span>
        </div>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => handleLink(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle ${open ? 'nav-toggle--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={(e) => handleLink(e, link.href)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
