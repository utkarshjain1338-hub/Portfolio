import { motion } from 'framer-motion';
import SectionLayout from '../components/SectionLayout';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useMediaQuery } from '../hooks/useMediaQuery';

const stackData = [
  {
    category: 'LANGUAGES',
    items: ['C++', 'PYTHON', 'JAVA', 'JAVASCRIPT']
  },
  {
    category: 'AI / DATA',
    items: ['PYTHON', 'NUMPY', 'PANDAS', 'MATPLOTLIB', 'SCIKIT-LEARN']
  },
  {
    category: 'SYSTEMS',
    items: ['LINUX', 'GIT', 'DOCKER', 'POSTGRESQL']
  },
  {
    category: 'BACKEND',
    items: ['FASTAPI', 'NODE.JS', 'REST APIs']
  },
  {
    category: 'SECURITY',
    items: ['NETWORKING', 'WEB SECURITY', 'PENTESTING']
  },
  {
    category: 'TOOLS',
    items: ['NMAP', 'WIRESHARK', 'TCPDUMP', 'JOHN THE RIPPER', 'BURP SUITE', 'GITHUB']
  }
];

const TechStack = () => {
  const isUp = useScrollDirection();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const durationMult = isUp ? 0.3 : 1;

  // Split into two rows for desktop
  const row1 = stackData.slice(0, 3);
  const row2 = stackData.slice(3, 6);

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.2 * durationMult, ease: [0.16, 1, 0.3, 1] } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 * durationMult }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 * durationMult, ease: [0.16, 1, 0.3, 1] } }
  };

  const motifElement = (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 * durationMult, delay: isUp ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '2rem', willChange: 'transform, opacity' }}
    >
      {/* Vertical Kanji */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        {['自', '信'].map((char, i) => (
          <span key={i} style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>{char}</span>
        ))}
      </div>
      
      {/* Vertical Hiragana */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', color: 'var(--text-color)', opacity: 0.7, gap: '0.2rem' }}>
        {['じ', 'し', 'ん'].map((char, i) => (
          <span key={i} style={{ fontSize: '1rem', lineHeight: 1, fontWeight: 600 }}>{char}</span>
        ))}
      </div>
    </motion.div>
  );

  const renderCategory = (data: { category: string, items: string[] }) => (
    <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: isMobile ? '80vw' : 'auto', scrollSnapAlign: 'start' }}>
      <h3 style={{ fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 600 }}>{data.category}</h3>
      <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0 }}>
        {data.items.map((item) => (
          <li key={item} style={{ fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.05em' }}>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <SectionLayout id="techstack" number="03" title="Tech Stack" rightRailContent={motifElement}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        
        {/* Top Border Line */}
        <motion.div 
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ width: '100%', height: '1px', background: 'var(--border-color)', transformOrigin: 'left', marginBottom: '4rem' }} 
        />

        {isMobile ? (
          // Mobile Carousel Layout
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              gap: '2rem', 
              paddingBottom: '2rem', 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {stackData.map(data => (
              <div key={data.category} style={{ flexShrink: 0 }}>
                {renderCategory(data)}
              </div>
            ))}
          </motion.div>
        ) : (
          // Desktop Grid Layout
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
              {row1.map(data => (
                <div key={data.category}>{renderCategory(data)}</div>
              ))}
            </div>

            {/* Middle Divider Line */}
            <motion.div 
              variants={lineVariants}
              style={{ width: '100%', height: '1px', background: 'var(--border-color)', transformOrigin: 'left', margin: '1rem 0' }} 
            />

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw' }}>
              {row2.map(data => (
                <div key={data.category}>{renderCategory(data)}</div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom Border Line */}
        <motion.div 
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ width: '100%', height: '1px', background: 'var(--border-color)', transformOrigin: 'left', marginTop: '4rem' }} 
        />

      </div>
    </SectionLayout>
  );
};

export default TechStack;
