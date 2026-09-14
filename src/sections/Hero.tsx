import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const Hero = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, black 0%, black 100px, transparent 150px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. Name dropping from the top */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-25vh' }}>
        <motion.h1
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.0, type: 'spring', bounce: 0.3 }}
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, textAlign: 'center', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, display: 'flex', justifyContent: 'center', gap: '2vw' }}
        >
          <span>Utkarsh</span>
          <span style={{ color: 'transparent', WebkitTextStroke: '3px var(--text-color)' }}>Jain</span>
        </motion.h1>
      </div>

      {/* 2. Image sliding from the bottom */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          y: { duration: 1.5, delay: 3.7, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.5, delay: 3.7, ease: [0.16, 1, 0.3, 1] }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0,
          right: 0,
          margin: '0 auto',
          zIndex: 20, 
          width: '100%', 
          maxWidth: '600px', 
          height: '74vh' 
        }}
      >
        {/* Grayscale Base */}
        <img 
          src="/profile.png" 
          alt="Utkarsh Jain" 
          style={{ 
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', 
            objectFit: 'contain', objectPosition: 'bottom', 
            filter: 'grayscale(100%)' 
          }} 
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60";
          }}
        />
        {/* Color Spotlight Overlay */}
        <motion.img 
          src="/profile.png" 
          alt="Utkarsh Jain Color Overlay" 
          style={{ 
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', 
            objectFit: 'contain', objectPosition: 'bottom',
            WebkitMaskImage: maskImage,
            maskImage: maskImage
          }} 
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60";
          }}
        />
      </motion.div>

      {/* 3. Left Text - Explorer */}
      <div style={{ position: 'absolute', left: '18vw', bottom: '30vh', zIndex: 25, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 5.0, type: 'spring', bounce: 0.5 }}
          style={{ width: '30px', height: '30px', background: 'var(--accent-color)', borderRadius: '50%' }}
        />
        <div style={{ overflow: 'hidden' }}>
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 5.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', fontSize: '1.2rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em' }}
          >
            Explorer
          </motion.span>
        </div>
      </div>

      {/* 4. Right Text - Curious */}
      <div style={{ position: 'absolute', right: '18vw', bottom: '30vh', zIndex: 25, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 45 }}
          transition={{ duration: 1, delay: 5.2, type: 'spring', bounce: 0.5 }}
          style={{ width: '30px', height: '30px', border: '3px solid var(--accent-color)' }}
        />
        <div style={{ overflow: 'hidden' }}>
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 5.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', fontSize: '1.2rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em' }}
          >
            Curious
          </motion.span>
        </div>
      </div>

    </section>
  );
};

export default Hero;
