import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
}

const Button = ({ children, onClick, href, primary = true }: ButtonProps) => {
  const baseStyle: React.CSSProperties = {
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: primary ? 'none' : '1px solid var(--border-color)',
    background: primary ? 'var(--accent-color)' : 'transparent',
    color: 'var(--text-color)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      style={baseStyle}
      whileHover={{ scale: 1.05, backgroundColor: primary ? 'var(--accent-hover)' : 'var(--surface-color)' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
};

export default Button;
