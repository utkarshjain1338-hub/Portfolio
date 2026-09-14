import { motion } from 'framer-motion';
import Button from '../components/Button';
import SectionLayout from '../components/SectionLayout';
import { useScrollDirection } from '../hooks/useScrollDirection';

const Contact = () => {
  const isUp = useScrollDirection();
  const durationMult = isUp ? 0.3 : 1;

  return (
    <SectionLayout id="contact" number="03" title="Contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 * durationMult }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '600px', padding: '3rem', textAlign: 'center' }}
      >
        <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6 }}>
          Whether you have a question or just want to say hi, my inbox is always open. Let's build something amazing together.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', outline: 'none' }} />
          <input type="email" placeholder="Your Email" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', outline: 'none' }} />
          <textarea placeholder="Message" rows={5} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', outline: 'none', resize: 'vertical' }}></textarea>
          <div style={{ marginTop: '1rem', width: '100%', display: 'flex' }}>
            <Button onClick={() => alert('Message sent!')}>Send Message</Button>
          </div>
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default Contact;
