import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const navLinks = [
  { num: '01', name: 'ABOUT', href: '#about' },
  { num: '02', name: 'PROJECTS', href: '#projects' },
  { num: '03', name: 'TECH STACK', href: '#tech' },
  { num: '04', name: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: isMobile ? '1rem 5vw' : '1.5rem 3vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: 900, fontFamily: 'Outfit', letterSpacing: '-0.02em', cursor: 'pointer' }}
      >
        UJ<span style={{ color: 'var(--accent-color)' }}>.</span>
      </motion.div>

      {/* Links & Toggle */}
      <div style={{ display: 'flex', gap: isMobile ? '0.6rem' : '3vw', alignItems: 'center', fontSize: isMobile ? '0.65rem' : '0.85rem', fontWeight: 600, letterSpacing: isMobile ? '0.05em' : '0.1em' }}>
        {navLinks.map((link) => {
          let displayName = link.name;
          if (isMobile) {
            if (displayName === 'TECH STACK') displayName = 'TECH';
            if (displayName === 'PROJECTS') displayName = 'WORK';
          }
          return (
            <motion.a
              key={link.num}
              href={link.href}
              whileHover={{ y: -2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0',
                cursor: 'pointer',
                color: 'var(--text-color)',
                textDecoration: 'none'
              }}
            >
              {!isMobile && <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>{link.num}</span>}
              <span>{displayName}</span>
            </motion.a>
          );
        })}

        {/* Dark Mode Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ rotate: 180, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.5, type: 'spring' }}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-color)',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            marginLeft: '1vw'
          }}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? '●' : '○'}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
