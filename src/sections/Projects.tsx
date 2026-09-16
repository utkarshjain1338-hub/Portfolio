import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLayout from '../components/SectionLayout';
import { useScrollDirection } from '../hooks/useScrollDirection';

const projects = [
  { title: 'DIGITAL TRIPWIRE', category: 'SECURITY', tags: ['REACT', 'THREE.JS'] },
  { title: 'NEURAL FORGE', category: 'AI / ML', tags: ['PYTHON', 'TENSORFLOW'] },
  { title: 'SILICON ARCHIVE', category: 'SYSTEMS', tags: ['RUST', 'WEBSOCKETS'] },
  { title: 'ECHO PROTOCOL', category: 'NETWORKS', tags: ['GO', 'DOCKER'] },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isUp = useScrollDirection();
  const durationMult = isUp ? 0.3 : 1;
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Desktop X mappings (Unpack horizontally: split into 2, then split into 4)
  const x1Desk = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["0%", "-55%", "-165%", "-165%"]);
  const x2Desk = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["0%", "-55%", "-55%", "-55%"]);
  const x3Desk = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["0%", "55%", "55%", "55%"]);
  const x4Desk = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["0%", "55%", "165%", "165%"]);

  // Desktop Y mappings (Keep strictly horizontal)
  const y1Desk = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const y2Desk = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const y3Desk = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const y4Desk = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  // Mobile X mapping (strictly vertical stack)
  const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  
  // Mobile Y mappings (peel off one by one)
  const y1Mob = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "-110%", "-110%", "-110%", "-110%"]);
  const y2Mob = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "-35%", "-35%", "-35%"]);
  const y3Mob = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "0%", "35%", "35%"]);
  const y4Mob = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "0%", "0%", "110%"]);

  // Axis line scale
  const axisScale = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

  const motifElement = (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '2rem' }}
    >
      {/* Vertical Kanji */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        {['開', '発'].map((char, i) => (
          <span key={i} style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>{char}</span>
        ))}
      </div>
      
      {/* Vertical Hiragana */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', color: 'rgba(0,0,0,0.7)', gap: '0.2rem' }}>
        {['か', 'い', 'は', 'つ'].map((char, i) => (
          <span key={i} style={{ fontSize: '1rem', lineHeight: 1 }}>{char}</span>
        ))}
      </div>
    </motion.div>
  );

  const kunaiElement = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', marginLeft: '-60px', marginTop: '-1rem' }}>
      {/* Thread */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 * durationMult, delay: isUp ? 0 : 0.2 }}
        style={{
          width: '1px',
          height: '100px',
          background: 'var(--text-color)',
          opacity: 0.4,
          transformOrigin: 'top'
        }}
      />
      {/* Kunai */}
      <motion.img 
        src="/Kunai.png"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 * durationMult, delay: isUp ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '120px',
          maxHeight: '600px',
          objectFit: 'contain',
          objectPosition: 'top center',
          zIndex: 0,
          pointerEvents: 'none',
          marginTop: '-5px'
        }}
      />
    </div>
  );

  return (
    <SectionLayout id="projects" number="02" title="Projects" leftRailContent={kunaiElement} rightRailContent={motifElement}>
      {/* 300vh scroll track */}
      <div ref={containerRef} style={{ height: '300vh', position: 'relative', marginTop: '-4rem' }}>
        
        {/* Sticky stage */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Horizontal Axis Line */}
          {!isMobile && (
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '50%', left: '-10%', right: '-10%', 
                height: '1px', 
                background: 'var(--border-color)', 
                scaleX: axisScale,
                transformOrigin: 'center',
                zIndex: 0
              }} 
            />
          )}

          {/* Center Stack / Cards */}
          <div style={{ position: 'relative', width: '320px', height: '600px' }}>
            {projects.map((p, i) => {
              const xs = [x1Desk, x2Desk, x3Desk, x4Desk];
              const ys = [y1Desk, y2Desk, y3Desk, y4Desk];
              const yMob = [y1Mob, y2Mob, y3Mob, y4Mob];

              return (
                <motion.div
                  key={i}
                  initial={{ borderWidth: '1px', borderColor: 'var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                  whileHover={{ scale: 1.03, borderWidth: '2px', borderColor: 'var(--text-color)', boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute', inset: 0,
                    x: isMobile ? xMobile : xs[i],
                    y: isMobile ? yMob[i] : ys[i],
                    background: 'var(--bg-color)',
                    padding: '2rem', display: 'flex', flexDirection: 'column',
                    zIndex: 4 - i, // Project 01 on top initially
                    cursor: 'pointer'
                  }}
                >
                  {/* Card Index */}
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, fontFamily: 'monospace' }}>
                    0{i + 1}
                  </span>

                  {/* Image Placeholder */}
                  <div style={{ marginTop: '2rem', height: '180px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.5 }}>VISUAL</span>
                  </div>

                  {/* Spacer */}
                  <div style={{ flexGrow: 1 }} />

                  {/* Title (Splits into 2 lines based on space) */}
                  <h3 style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                    {p.title.replace(' ', '\n')}
                  </h3>

                  {/* Divider Line */}
                  <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', marginBottom: '1rem' }} />

                  {/* Category */}
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    {p.category}
                  </span>

                  {/* Tags (Vertical Stack) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '2rem' }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.8rem', opacity: 0.7, letterSpacing: '0.05em' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em' }}>VIEW PROJECT</span>
                    <span style={{ fontSize: '1.2rem' }}>↗</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </SectionLayout>
  );
};

export default Projects;
