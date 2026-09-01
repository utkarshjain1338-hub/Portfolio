import React from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '#projects', label: 'WORK' },
  { href: '#about', label: 'ABOUT' },
  { href: '#contact', label: 'CONTACT' },
];

export const Nav: React.FC = () => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="nav"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: 'none' }}
    >
      <div 
        className="nav-id"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        UJ
      </div>

      <ul className="nav-links" style={{ pointerEvents: 'auto' }}>
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
    </motion.nav>
  );
};
