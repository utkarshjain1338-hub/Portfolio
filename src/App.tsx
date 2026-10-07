import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { MouseProvider } from './contexts/MouseContext';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Contact from './sections/Contact';

import { CustomCursor } from './components/CustomCursor';
import { NoiseOverlay } from './components/NoiseOverlay';
import { GlobalBackground } from './components/GlobalBackground';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

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
    <MouseProvider>
      <GlobalBackground />
      <NoiseOverlay />
      <CustomCursor />
      <div className="app-container">
        <LoadingScreen />
      <Navbar />
      
      {/* Global Construction Lines */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: -1, display: 'flex', justifyContent: 'center', padding: '0 5%' }}>
        <div className="section-grid" style={{ height: '100vh', opacity: 0.5 }}>
          <div style={{ borderRight: '1px solid var(--border-color)' }} />
          <div style={{ borderRight: '1px solid var(--border-color)' }} />
          <div />
        </div>
      </div>

      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Analytics />
      </div>
    </MouseProvider>
  );
}

export default App;
