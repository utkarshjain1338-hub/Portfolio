import { motion } from 'framer-motion';
import SectionLayout from '../components/SectionLayout';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { AboutBg } from '../components/backgrounds/AboutBg';

const About = () => {
  const isUp = useScrollDirection();
  const durationMult = isUp ? 0.2 : 1;
  const staggerMult = isUp ? 0 : 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 * staggerMult }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 * durationMult, ease: [0.16, 1, 0.3, 1] } }
  };

  const pipelineVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 * staggerMult, delayChildren: 0.5 * staggerMult } }
  };

  const pipelineItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 * durationMult } }
  };

  const swordElement = (
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
      {/* Sword */}
      <motion.img
        src="/sword.png"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 * durationMult, delay: isUp ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '140px',
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

  const motifElement = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8 * durationMult, delay: isUp ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '2rem' }}
    >
      {/* Vertical Kanji */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        {['探', '究'].map((char, i) => (
          <span key={i} style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>{char}</span>
        ))}
      </div>

      {/* Vertical Hiragana (Tankyū) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', color: 'var(--text-color)', opacity: 0.7, gap: '0.2rem' }}>
        {['た', 'ん', 'き', 'ゅ', 'う'].map((char, i) => (
          <span key={i} style={{ fontSize: '1rem', lineHeight: 1 }}>{char}</span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <SectionLayout id="about" number="01" title="About" leftRailContent={swordElement} rightRailContent={motifElement} bgTone="var(--bg-tone-2)" bgText="01" bgElement={<AboutBg />}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}
      >
        {/* Philosophy / Bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '800px' }}>
          <motion.p variants={itemVariants} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, lineHeight: 1.4, color: 'var(--text-color)' }}>
            I'm Utkarsh a curious builder exploring the space between AI, cybersecurity, and systems.
          </motion.p>
          <motion.p variants={itemVariants} style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 300, lineHeight: 1.5, color: 'var(--text-color)', opacity: 0.7 }}>
            I like understanding what happens beneath the surface how systems communicate, how they break, and how they can be built better.
          </motion.p>
          <motion.p variants={itemVariants} style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: 300, lineHeight: 1.6, color: 'var(--text-color)', opacity: 0.5 }}>
            I'm currently building my foundations across AI/ML, cybersecurity, Linux, and backend development, while turning what I learn into projects and experiments.
          </motion.p>
        </div>

        {/* Grid: What I Explore & How I Build */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>

          {/* What I Explore */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--accent-color)', borderRadius: '50%' }} />
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 600 }}>WHAT I EXPLORE</h3>
            </div>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: 0, margin: 0 }}>
              {[
                { num: '01', title: 'INTELLIGENCE', sub: 'AI / MACHINE LEARNING' },
                { num: '02', title: 'SECURITY', sub: 'NETWORKS / LINUX' },
                { num: '03', title: 'SYSTEMS', sub: 'BACKEND / SOFTWARE' }
              ].map((item) => (
                <li key={item.num} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <span style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 600 }}>{item.num}</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.1em' }}>{item.title}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-color)', opacity: 0.4, marginLeft: '2.5rem', letterSpacing: '0.05em' }}>{item.sub}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* How I Build */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '8px', height: '8px', border: '1px solid var(--accent-color)', transform: 'rotate(45deg)' }} />
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 600 }}>HOW I BUILD</h3>
            </div>

            <motion.div
              variants={pipelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}
            >
              {['UNDERSTAND', 'EXPERIMENT', 'BREAK', 'BUILD', 'ITERATE'].map((step, i, arr) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <motion.div variants={pipelineItemVariants} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: step === 'BREAK' ? 'var(--accent-color)' : 'var(--text-color)', letterSpacing: '0.1em' }}>
                      {step}
                    </span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <motion.div variants={pipelineItemVariants} style={{ width: '2px', height: '20px', background: 'var(--text-color)', opacity: 0.2, marginLeft: '1rem' }} />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default About;
