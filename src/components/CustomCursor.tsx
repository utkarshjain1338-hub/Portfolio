import { motion, useSpring } from 'framer-motion';
import { useGlobalMouse } from '../contexts/MouseContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const { rawMouseX, rawMouseY } = useGlobalMouse();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Track hover state for links and buttons to expand cursor
  const [isHovering, setIsHovering] = useState(false);

  // Smooth the raw pixel coordinates slightly for buttery trailing
  const cursorX = useSpring(rawMouseX, { stiffness: 800, damping: 40, mass: 0.5 });
  const cursorY = useSpring(rawMouseY, { stiffness: 800, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If the target is an anchor, button, or has a pointer cursor, trigger hover state
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        width: 16,
        height: 16,
        backgroundColor: '#FFFFFF', // With difference blend, white inverts underlying colors perfectly
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
      animate={{
        scale: isHovering ? 4 : 1, // Expand massively on hover
        opacity: isHovering ? 1 : 0.8,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    />
  );
};
