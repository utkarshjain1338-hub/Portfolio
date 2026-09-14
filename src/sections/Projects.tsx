import { motion } from 'framer-motion';
import SectionLayout from '../components/SectionLayout';
import { useScrollDirection } from '../hooks/useScrollDirection';

const projects = [
  { title: 'Project One', desc: 'An interactive web app with 3D elements.', tags: ['React', 'Three.js'] },
  { title: 'Project Two', desc: 'A stunning e-commerce platform with smooth animations.', tags: ['Vue', 'GSAP'] },
  { title: 'Project Three', desc: 'A modern landing page with glassmorphism design.', tags: ['HTML/CSS', 'Framer Motion'] },
];

const Projects = () => {
  const isUp = useScrollDirection();
  const durationMult = isUp ? 0.3 : 1;
  const staggerMult = isUp ? 0 : 1;

  return (
    <SectionLayout id="projects" number="02" title="Work">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {projects.map((p, i) => (
          <motion.div
            key={i}
            className="glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 * durationMult, delay: i * 0.2 * staggerMult }}
            whileHover={{ y: -10, scale: 1.02 }}
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}
          >
            <div style={{ height: '150px', background: 'var(--bg-color)', borderRadius: '8px', opacity: 0.5 }}></div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{p.title}</h3>
            <p style={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.6, flexGrow: 1 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {p.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'var(--text-color)', color: 'var(--bg-color)', borderRadius: '20px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default Projects;
