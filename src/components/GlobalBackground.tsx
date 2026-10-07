import { motion, useScroll, useTransform } from 'framer-motion';

export const GlobalBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Accelerated Zoom effect on scroll
  // Maps scroll progress [0, 50%, 80%, 100%] to scale [1x, 1.2x, 1.6x, 2.5x]
  // This creates the illusion of accelerating into the background as you scroll down
  const scaleBg = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1.2, 1.6, 2.5]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2,
      pointerEvents: 'none',
      overflow: 'hidden',
      background: 'var(--bg-tone-1)', // Fallback
    }}>
      {/* Light Mode Background */}
      <motion.img
        src="/white.webp"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          objectFit: 'cover',
          scale: scaleBg,
          transformOrigin: 'center center',
          opacity: 'var(--bg-light-opacity, 1)',
          transition: 'opacity 0.8s ease',
          mixBlendMode: 'luminosity', // Helps mask sharp frame cuts by blending colors
          filter: 'blur(2px)', // Slight blur hides video compression artifacts and loop jerks
        }}
      />
      
      {/* Dark Mode Background */}
      <motion.img
        src="/black.webp"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          objectFit: 'cover',
          scale: scaleBg,
          transformOrigin: 'center center',
          opacity: 'var(--bg-dark-opacity, 0)',
          transition: 'opacity 0.8s ease',
          mixBlendMode: 'screen', // Makes dark loops feel more ethereal and endless
          filter: 'blur(2px)',
        }}
      />
      
      {/* Global Vignette/Darken overlay for contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--bg-vignette)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
    </div>
  );
};
