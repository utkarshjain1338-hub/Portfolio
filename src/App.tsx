import React, { useEffect, useRef, useState } from 'react';
import { CursorProvider } from './contexts/CursorContext';
import { CustomCursor } from './components/ui/CustomCursor';
import { SystemGraph } from './components/three/SystemGraph';
import { Nav } from './components/ui/Nav';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ScrollProgress } from './components/ui/ScrollProgress';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Init Lenis smooth scroll
    initScroll();

    // Setup GSAP ScrollTrigger for camera movement
    if (scrollContainerRef.current) {
      setupCameraScrollTrigger(scrollContainerRef.current);
    }
  }, []);

  return (
    <CursorProvider>
      <CustomCursor />
      {/* Loader Sequence */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* Global Scroll Progress */}
      <ScrollProgress />

      {/* Fixed Three.js canvas — z-index 0 */}
      <SystemGraph />

      {/* Fixed nav — z-index 100 */}
      <Nav />

      {/* Scrollable HTML content — z-index 10 */}
      <div
        ref={scrollContainerRef}
        className="scroll-container"
        style={{ 
          position: 'relative', 
          zIndex: 10,
          opacity: isLoaded ? 1 : 0, // only show content when loaded
          transition: 'opacity 1s ease-in-out',
          pointerEvents: isLoaded ? 'auto' : 'none'
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Exploring />
        <Experiments />
        <Skills />
        <Journey />
        <Contact />
      </div>
    </CursorProvider>
  );
};

export default App;
