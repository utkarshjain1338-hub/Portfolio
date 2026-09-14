import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const KANJI_TARGET = '探究';
const HIRA_TARGET  = 'たんきゅう';
const LATIN_TARGET = 'TANKYŪ';

const KANJI_POOL = '一二三四五六七八九十百千万探求知識智学門道理念想';
const HIRA_POOL  = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほ';
const LATIN_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randFrom(pool: string) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function getPool(char: string): string | null {
  const code = char.charCodeAt(0);
  if (code >= 0x4e00 && code <= 0x9fff) return KANJI_POOL;
  if (code >= 0x3040 && code <= 0x309f) return HIRA_POOL;
  if (/[A-Z]/.test(char)) return LATIN_POOL;
  return null;
}

function scrambleStr(target: string, progress: number): string {
  return target.split('').map((char, i) => {
    const pool = getPool(char);
    if (!pool) return char;
    const local = progress * 1.5 - (i / target.length) * 0.5;
    if (local >= 1) return char;
    if (local > 0 && Math.random() < local) return char;
    return randFrom(pool);
  }).join('');
}

type Vec = { x: number; y: number; rotate: number };

function genVecs(count: number, minDist: number, maxDist: number): Vec[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const dist  = minDist + Math.random() * (maxDist - minDist);
    return {
      x:      Math.cos(angle) * dist,
      y:      Math.sin(angle) * dist,
      rotate: (Math.random() - 0.5) * 540,
    };
  });
}

type Phase = 'scramble' | 'settle' | 'scatter' | 'fade' | 'done';

const LoadingScreen = () => {
  const [phase,  setPhase]  = useState<Phase>('scramble');
  const [kanji,  setKanji]  = useState(() => scrambleStr(KANJI_TARGET, 0));
  const [hira,   setHira]   = useState(() => scrambleStr(HIRA_TARGET,  0));
  const [latin,  setLatin]  = useState(() => scrambleStr(LATIN_TARGET, 0));
  const rafRef = useRef<number>(0);

  // Scatter vectors – generated once, stable across renders
  const kVecs = useRef<Vec[]>(genVecs(KANJI_TARGET.length, 500, 900));
  const hVecs = useRef<Vec[]>(genVecs(HIRA_TARGET.length,  250, 550));
  const lVecs = useRef<Vec[]>(genVecs(LATIN_TARGET.length, 250, 550));

  useEffect(() => {
    const SCRAMBLE_MS = 1600;
    const t0 = Date.now();

    function tick() {
      const p = Math.min((Date.now() - t0) / SCRAMBLE_MS, 1);
      setKanji(scrambleStr(KANJI_TARGET, p));
      setHira(scrambleStr(HIRA_TARGET,  p));
      setLatin(scrambleStr(LATIN_TARGET, p));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setKanji(KANJI_TARGET);
        setHira(HIRA_TARGET);
        setLatin(LATIN_TARGET);
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    // Settled text shows cleanly for ~0.7s, then scatter
    const t1 = setTimeout(() => setPhase('settle'),  1700);
    const t2 = setTimeout(() => setPhase('scatter'), 2400);
    // Black bg fades while chars are still mid-flight
    const t3 = setTimeout(() => setPhase('fade'),    2850);
    const t4 = setTimeout(() => setPhase('done'),    3700);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  if (phase === 'done') return null;

  const isScattering = phase === 'scatter' || phase === 'fade';
  const isFading     = phase === 'fade';

  // Renders a line as individual motion.span chars that can scatter independently
  const renderLine = (
    text: string,
    vecs: Vec[],
    lineStyle: React.CSSProperties,
    baseDelay = 0,
  ) => (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          animate={
            isScattering
              ? { x: vecs[i]?.x ?? 0, y: vecs[i]?.y ?? 0, rotate: vecs[i]?.rotate ?? 0, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={
            isScattering
              ? { duration: 0.55, delay: baseDelay + i * 0.035, ease: [0.2, 0, 0.8, 1] }
              : { duration: 0.01 }
          }
          style={{ display: 'inline-block', ...lineStyle }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );

  return createPortal(
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 0.85, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: isFading ? 'none' : 'all',
      }}
    >
      {/* Corner accent – top left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 5vh, 3rem)',
          left: 'clamp(2rem, 5vw, 4rem)',
          width: '60px', height: '1px',
          background: 'rgba(255,255,255,0.25)',
          transformOrigin: 'left',
        }}
      />

      {/* Text composition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          opacity: { duration: 1.2, ease: 'easeOut' },
          y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '0 clamp(1.5rem, 6vw, 4rem)',
          userSelect: 'none',
          gap: 'clamp(0.3rem, 1.2vw, 1rem)',
        }}
      >
        {/* 探究 */}
        {renderLine(kanji, kVecs.current, {
          fontFamily: 'system-ui, "Hiragino Sans", "Noto Sans CJK JP", sans-serif',
          fontSize: 'clamp(5.5rem, 17vw, 12rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        })}

        {/* たんきゅう */}
        {renderLine(hira, hVecs.current, {
          fontFamily: 'system-ui, "Hiragino Sans", "Noto Sans CJK JP", sans-serif',
          fontSize: 'clamp(1.5rem, 3.8vw, 2.8rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: '0.08em',
        }, 0.05)}

        {/* TANKYŪ */}
        {renderLine(latin, lVecs.current, {
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(0.7rem, 1.3vw, 1.1rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.32)',
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
        }, 0.1)}
      </motion.div>

      {/* Corner accent – bottom right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5vh, 3rem)',
          right: 'clamp(2rem, 5vw, 4rem)',
          width: '60px', height: '1px',
          background: 'rgba(255,255,255,0.25)',
          transformOrigin: 'right',
        }}
      />
    </motion.div>,
    document.body
  );
};

export default LoadingScreen;
