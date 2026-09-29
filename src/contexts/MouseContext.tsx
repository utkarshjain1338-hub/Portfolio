import { createContext, useContext, useEffect, ReactNode } from 'react';
import { motion, MotionValue, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface MouseContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}

const MouseContext = createContext<MouseContextType | null>(null);

export const MouseProvider = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery parallax
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    if (isMobile) return; // Disable on mobile for performance

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 based on screen center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY, smoothMouseX, smoothMouseY }}>
      {children}
    </MouseContext.Provider>
  );
};

export const useGlobalMouse = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useGlobalMouse must be used within a MouseProvider');
  }
  return context;
};
