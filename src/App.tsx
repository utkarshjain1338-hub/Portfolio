import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Framer motion hooks for the 3D bend effect
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Map the velocity to a 3D rotation on the X-axis (bending forward)
  const rotateX = useTransform(smoothVelocity, [-2000, 0, 2000], [1.5, 0, -1.5]);
  // Add a slight push back (scale down) when scrolling fast to enhance the 3D curve illusion
  const scale = useTransform(smoothVelocity, [-2000, 0, 2000], [0.99, 1, 0.99]);

  useEffect(() => {
    // Normal free-scrolling Lenis configuration
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className="app-container" style={{ perspective: '1200px' }}>
      <LoadingScreen />
      <Navbar />
      
      {/* Apply the 3D transformations to the main wrapper */}
      <motion.main
        style={{
          rotateX,
          scale,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Contact />
      </motion.main>
    </div>
  );
}

export default App;
