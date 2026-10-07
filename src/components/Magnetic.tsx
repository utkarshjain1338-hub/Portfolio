import { motion, useSpring } from 'framer-motion';
import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface MagneticProps {
  children: ReactNode;
  strength?: number; // How far it pulls (pixels)
  damping?: number;
  stiffness?: number;
}

export const Magnetic = ({ children, strength = 20, damping = 15, stiffness = 150 }: MagneticProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for the magnetic pull
  const springX = useSpring(0, { stiffness, damping, mass: 0.1 });
  const springY = useSpring(0, { stiffness, damping, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance from center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Apply strength limiting
    // The closer to the edge, the harder it pulls, up to 'strength' limit
    const pullX = (deltaX / width) * strength;
    const pullY = (deltaY / height) * strength;

    springX.set(pullX);
    springY.set(pullY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    springX.set(0);
    springY.set(0);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: springX,
        y: springY,
        display: 'inline-flex',
        cursor: 'pointer',
      }}
    >
      {children}
    </motion.div>
  );
};
