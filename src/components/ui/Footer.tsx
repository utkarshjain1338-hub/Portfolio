import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <motion.div
        className="footer-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-primary">[ UTKARSH JAIN — SYSTEM ONLINE ]</div>
        <div className="footer-secondary">[ STATUS: EXPLORING ]</div>
        <div className="footer-phi">[ BUILD → BREAK → UNDERSTAND ]</div>
      </motion.div>
    </footer>
  );
};
