import React, { useRef, useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<'normal' | 'link' | 'node'>('normal');
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Don't show on touch devices
  const isTouch = 'ontouchstart' in window;
  if (isTouch) return null;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onNodeHover = (e: CustomEvent) => {
      setCursorType(e.detail.active ? 'node' : 'normal');
    };

    const checkLink = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isLink = el.closest('a, button, [role="button"]') !== null;
      setCursorType(isLink ? 'link' : 'normal');
    };

    const animate = () => {
      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      // Ring follows with lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkLink);
    window.addEventListener('node-hover', onNodeHover as EventListener);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkLink);
      window.removeEventListener('node-hover', onNodeHover as EventListener);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ringSize = cursorType === 'node' ? 64 : cursorType === 'link' ? 28 : 44;
  const ringColor = cursorType === 'node' ? '#7b2fff' : '#00d4ff';
  const dotColor = cursorType === 'node' ? '#7b2fff' : '#00d4ff';

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: dotColor,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background 0.2s',
          boxShadow: `0 0 12px 2px ${dotColor}`,
          mixBlendMode: 'screen',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.2s',
          opacity: cursorType === 'node' ? 0.9 : 0.6,
          boxShadow: `0 0 20px 4px ${ringColor}66, inset 0 0 10px ${ringColor}33`,
          animation: cursorType === 'node' ? 'cursor-pulse 1.4s ease-in-out infinite' : 'none',
        }}
      />
    </>
  );
};
