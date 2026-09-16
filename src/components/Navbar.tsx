import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const navLinks = [
  { num: '01', name: 'ABOUT', href: '#about' },
  { num: '02', name: 'WORK', href: '#projects' },
  { num: '03', name: 'CONTACT', href: '#contact' },
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
      <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '3vw', alignItems: 'center', fontSize: isMobile ? '0.7rem' : '0.85rem', fontWeight: 600, letterSpacing: '0.1em' }}>
        {navLinks.map((link, i) => (
          <motion.a 
            key={link.num} 
            href={link.href}
            initial="initial"
            whileHover="hover"
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '0.5rem',
              overflow: 'hidden', 
              padding: '0.5rem 0',
              cursor: 'pointer'
            }}
          >
            <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>{link.num}</span>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <motion.span 
                variants={{ initial: { y: 0 }, hover: { y: '-100%' } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.name}
              </motion.span>
              <motion.span 
                variants={{ initial: { y: '100%' }, hover: { y: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', top: 0, left: 0, color: 'var(--text-color)', fontWeight: 800 }}
              >
                {link.name}
              </motion.span>
            </div>
          </motion.a>
        ))}
        
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
