import { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export function useScrollDirection() {
  const { scrollY } = useScroll();
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Only trigger if the difference is significant to avoid jitter
    if (previous - latest > 10) {
      setIsScrollingUp(true);
    } else if (latest - previous > 10) {
      setIsScrollingUp(false);
    }
  });

  return isScrollingUp;
}
