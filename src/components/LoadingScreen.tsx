import { motion, AnimatePresence } from 'framer-motion';
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

const LoadingScreen = () => {
  const [step, setStep] = useState(0);
  const [kanji, setKanji] = useState(() => scrambleStr(KANJI_TARGET, 0));
  const [hira, setHira]   = useState(() => scrambleStr(HIRA_TARGET,  0));
  const [latin, setLatin] = useState(() => scrambleStr(LATIN_TARGET, 0));
  const rafRef = useRef<number>(0);

  const kVecs = useRef<Vec[]>(genVecs(KANJI_TARGET.length, 500, 900));
  const hVecs = useRef<Vec[]>(genVecs(HIRA_TARGET.length,  250, 550));
  const lVecs = useRef<Vec[]>(genVecs(LATIN_TARGET.length, 250, 550));

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);   // init logs
    const t2 = setTimeout(() => setStep(2), 1400);  // scan type
    const t3 = setTimeout(() => setStep(3), 2000);  // scan viz
    const t4 = setTimeout(() => setStep(4), 3800);  // detect
    const t5 = setTimeout(() => setStep(5), 4500);  // lock
    const t6 = setTimeout(() => setStep(6), 5200);  // tankyu scramble
    const t7 = setTimeout(() => setStep(7), 6200);  // tankyu settle
    const t8 = setTimeout(() => setStep(8), 6900);  // tankyu scatter
    const t9 = setTimeout(() => setStep(9), 7500);  // explore
    const t10 = setTimeout(() => setStep(10), 8300); // done

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8);
      clearTimeout(t9); clearTimeout(t10);
    };
  }, []);

  // Run scramble when step === 6
  useEffect(() => {
    if (step === 6) {
      const SCRAMBLE_MS = 1000;
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
      return () => cancelAnimationFrame(rafRef.current);
    }
  }, [step]);

  if (step === 10) return null;

  const isScattering = step >= 8;

  const renderLine = (text: string, vecs: Vec[], lineStyle: React.CSSProperties, baseDelay = 0) => (
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
      style={{
        position: 'fixed', inset: 0, background: '#000', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', pointerEvents: 'all',
      }}
    >
      {/* Cinematic Terminal */}
      <AnimatePresence>
        {(step < 6 || step === 9) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              padding: '24px',
              fontFamily: '"Fira Code", "Courier New", monospace', 
              color: '#999', 
              fontSize: '15px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px' 
            }}
          >
            {/* Phase 1: Init */}
            {(step >= 0 && step !== 9) && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}>
                <span style={{color: '#fff'}}>utkarsh@portfolio:~$</span> ./init
              </motion.div>
            )}
            
            {step >= 1 && step !== 9 && (
              <motion.div 
                initial="hidden" animate="show" 
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.1 } } }}>[ OK ] kernel</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.1 } } }}>[ OK ] filesystem</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.1 } } }}>[ OK ] network</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.1 } } }}>[ OK ] environment</motion.div>
              </motion.div>
            )}

            {/* Phase 2: Scan */}
            {step >= 2 && step !== 9 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }} style={{ marginTop: '8px' }}>
                <span style={{color: '#fff'}}>utkarsh@portfolio:~$</span> ./scan
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial="hidden" animate="show" 
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                style={{ marginTop: '8px' }}
              >
                <motion.pre variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.1 } } }} style={{ margin: 0, lineHeight: 1.2, color: '#ccc', fontFamily: 'inherit' }}>
{`                 ○
                 │
        ○────────●────────○
                 │
                 ○`}
                </motion.pre>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.1 } } }} style={{ marginTop: '8px' }}>scanning network...</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.1 } } }}>[████████████████████░░░░] 82%</motion.div>
              </motion.div>
            )}

            {/* Phase 3: Detect & Lock */}
            {step >= 4 && step !== 9 && (
              <div style={{ marginTop: '8px' }}>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }} style={{ color: '#fff', fontWeight: 'bold' }}>[!] SIGNAL DETECTED</motion.div>
                
                {step >= 5 && (
                  <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
                    <motion.pre variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.1 } } }} style={{ margin: '8px 0', lineHeight: 1.2, color: '#ccc', fontFamily: 'inherit' }}>
{`○──────○──────○──────●
                     ↑
                 DETECTED`}
                    </motion.pre>
                    <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.1 } } }} style={{ color: '#fff' }}>&gt; SIGNAL LOCKED</motion.div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Phase 4: Explore */}
            {step === 9 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span style={{color: '#fff'}}>utkarsh@portfolio:~$</span> ./explore<motion.span animate={{opacity: [1,0]}} transition={{repeat: Infinity, duration: 0.8}}>_</motion.span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TANKYŪ Typography */}
      <AnimatePresence>
        {(step >= 6 && step <= 8) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              userSelect: 'none',
              gap: '16px',
            }}
          >
            {renderLine(kanji, kVecs.current, {
              fontFamily: 'system-ui, "Hiragino Sans", "Noto Sans CJK JP", sans-serif',
              fontSize: 'clamp(5.5rem, 17vw, 12rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            })}

            {renderLine(hira, hVecs.current, {
              fontFamily: 'system-ui, "Hiragino Sans", "Noto Sans CJK JP", sans-serif',
              fontSize: 'clamp(1.5rem, 3.8vw, 2.8rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.08em',
            }, 0.05)}

            {renderLine(latin, lVecs.current, {
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(0.7rem, 1.3vw, 1.1rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.32)',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
            }, 0.1)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  );
};

export default LoadingScreen;
