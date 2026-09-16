import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const greetings = ["はじめまして.", "Namaste.", "Welcome."];
const quotes = ['"A BUG IS AN UNDOCUMENTED FEATURE"', '"このバグは文書化されていない機能です"'];

const QuoteCycler = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', height: '80px', width: isMobile ? '90vw' : '400px', left: isMobile ? '0' : '20%' }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'monospace',
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            fontWeight: 600,
            color: 'var(--text-color)',
            opacity: 0.8,
            letterSpacing: '0.05em',
            lineHeight: 1.4,
            margin: 0,
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {quotes[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const Typewriter = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (subIndex === greetings[index].length + 1 && !reverse) {
      const wait = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(wait);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % greetings.length);
      return;
    }

    const typingSpeed = reverse ? 50 : 100 + Math.random() * 50;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ width: isMobile ? '30px' : '60px', height: '3px', background: 'var(--text-color)' }} />
      <span style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {greetings[index].substring(0, subIndex)}
        <span style={{ opacity: blink ? 1 : 0 }}>_</span>
      </span>
    </div>
  );
};

const Hero = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
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

      {/* 1. Name typography */}
      <div style={{ position: 'absolute', top: isMobile ? '12vh' : '15vh', left: '5vw', zIndex: 10, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0' : '3vw', pointerEvents: 'none' }}>
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.0, type: 'spring', bounce: 0.3 }}
          style={{ fontSize: isMobile ? 'clamp(3rem, 12vw, 6rem)' : 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: isMobile ? 0.9 : 1 }}
        >
          Utkarsh
        </motion.h1>
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.1, type: 'spring', bounce: 0.3 }}
          style={{ fontSize: isMobile ? 'clamp(3rem, 12vw, 6rem)' : 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: isMobile ? 0.9 : 1, color: 'transparent', WebkitTextStroke: '2px var(--text-color)' }}
        >
          Jain
        </motion.h1>
      </div>

      {/* 2. Image anchored to the right */}
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
          right: isMobile ? '0' : '5vw',
          left: isMobile ? '0' : 'auto',
          margin: isMobile ? '0 auto' : '0',
          zIndex: 20,
          width: '100%',
          maxWidth: isMobile ? '100vw' : '750px',
          height: isMobile ? '85vh' : '92vh',
          opacity: isMobile ? 0.8 : 1
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

      {/* 3. Accent Quote Cycler */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 4.8 }}
        style={{
          position: 'absolute',
          top: isMobile ? '35vh' : '45vh',
          left: '5vw',
          zIndex: 30,
          maxWidth: isMobile ? '90vw' : '400px',
        }}
      >
        <QuoteCycler />
      </motion.div>

      {/* 4. Typewriter Greetings */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: isMobile ? '28vh' : 'auto',
          bottom: isMobile ? 'auto' : '15vh',
          left: '5vw',
          zIndex: 30,
        }}
      >
        <Typewriter />
      </motion.div>

    </section>
  );
};

export default Hero;
