import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

interface StickyCardProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  scrollWidth?: number; // e.g. 200 for 200vw width
}

export const StickyCard = React.forwardRef<HTMLDivElement, StickyCardProps>(({ id, className, children, scrollWidth }, externalRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const wipeTrackerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackerRef = useRef<HTMLDivElement>(null);
  
  // Merge refs so both StickyCard and the parent can access the DOM node.
  const setRefs = (node: HTMLDivElement) => {
    (internalRef as any).current = node;
    if (typeof externalRef === 'function') {
      externalRef(node);
    } else if (externalRef) {
      externalRef.current = node;
    }
  };
  
  // 1. Horizontal Scroll Logic
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalTrackerRef,
    offset: ["start 5vh", "end 5vh"]
  });
  
  const maxScroll = scrollWidth ? scrollWidth - 94 : 0; // 94vw because the section width is 94vw
  const x = useTransform(horizontalProgress, [0, 1], ["0vw", `-${maxScroll}vw`]);

  // 2. Wipe Logic
  // A 0-height div placed at the very end of this component marks the start of the NEXT card.
  // When this div hits the bottom of the viewport ("start end"), the next card is starting to slide up.
  // When this div hits 5vh from the top ("start 5vh"), the next card has fully covered this card.
  const { scrollYProgress: wipeProgress } = useScroll({
    target: wipeTrackerRef,
    offset: ["start end", "start 5vh"]
  });

  const clipBottom = useTransform(wipeProgress, [0.052, 1], [0, 100]);
  const clipPath = useMotionTemplate`inset(0px 0px ${clipBottom}% 0px)`;

  return (
    <>
      <section id={id} ref={setRefs} className={`section ${className || ''}`} style={{ overflow: scrollWidth ? 'hidden' : 'auto' }}>
        <motion.div style={{ clipPath, height: '100%', display: 'flex', flexDirection: 'column' }}>
          
          <motion.div style={{ x, height: '100%', display: 'flex', width: scrollWidth ? `${scrollWidth}vw` : '100%' }}>
            {children}
          </motion.div>
          
        </motion.div>
      </section>

      {/* Horizontal Scroll Spacer */}
      {scrollWidth && (
        <div ref={horizontalTrackerRef} style={{ width: '100%', height: `${scrollWidth}vh`, opacity: 0, pointerEvents: 'none' }} />
      )}

      {/* Tracker for the incoming card wipe */}
      <div ref={wipeTrackerRef} style={{ width: '100%', height: 0, opacity: 0, pointerEvents: 'none' }} />
    </>
  );
});
