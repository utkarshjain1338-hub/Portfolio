import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit' }}>
        UX<span style={{ color: 'var(--accent-color)' }}>.</span>
      </div>
      <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
        {[
          { num: '01', name: 'ABOUT', href: '#about' },
          { num: '02', name: 'WORK', href: '#projects' },
          { num: '03', name: 'CONTACT', href: '#contact' },
        ].map((link) => (
          <a key={link.num} href={link.href} style={{ transition: 'opacity 0.3s', opacity: 0.7 }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.7'}>
            <span style={{ color: 'var(--accent-color)', marginRight: '6px', opacity: 0.5 }}>{link.num}</span> 
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
