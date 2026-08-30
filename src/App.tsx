import React, { useEffect, useRef } from 'react';
import { CursorProvider } from './contexts/CursorContext';
import { SystemGraph } from './components/three/SystemGraph';
import { CustomCursor } from './components/ui/CustomCursor';
import { Nav } from './components/ui/Nav';
import { Footer } from './components/ui/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Exploring } from './sections/Exploring';
import { Experiments } from './sections/Experiments';
import { Skills } from './sections/Skills';
import { Journey } from './sections/Journey';
import { Contact } from './sections/Contact';
import { initScroll, setupCameraScrollTrigger } from './lib/scroll';

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Init Lenis smooth scroll
    initScroll();

    // Setup GSAP ScrollTrigger for camera movement
    if (scrollContainerRef.current) {
      setupCameraScrollTrigger(scrollContainerRef.current);
    }

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <CursorProvider>
      {/* Custom cursor — above everything */}
      <CustomCursor />

      {/* Fixed Three.js canvas — z-index 0 */}
      <SystemGraph />

      {/* Fixed nav — z-index 100 */}
      <Nav />

      {/* Scrollable HTML content — z-index 10 */}
      <div
        ref={scrollContainerRef}
        className="scroll-container"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Hero />
        <About />
        <Projects />
        <Exploring />
        <Experiments />
        <Skills />
        <Journey />
        <Contact />
        <Footer />
      </div>
    </CursorProvider>
  );
};

export default App;
