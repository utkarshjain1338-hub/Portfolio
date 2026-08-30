import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setCameraState } from './cameraStore';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initScroll() {
  // Init Lenis smooth scroll (v1.1.x API)
  lenis = new Lenis({
    lerp: 0.072,          // silky drag — lower = more float
    smoothWheel: true,
    syncTouch: false,
  });

  // Bridge Lenis scroll events → ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Tell ScrollTrigger to use Lenis's virtual scroll position
  // so camera triggers fire at the right moments
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value?: number) {
      if (value !== undefined && lenis) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis?.scroll ?? 0;
    },
    getBoundingClientRect() {
      return {
        top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: 'transform',
  });

  // Drive Lenis via GSAP ticker so they share the same clock
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyScroll() {
  lenis?.destroy();
  lenis = null;
  ScrollTrigger.killAll();
}

// Camera states mapped to overall scroll progress (0 → 1)
export function setupCameraScrollTrigger(scrollContainer: HTMLElement) {
  const totalTransitions = 5; // 6 states, 5 transitions

  ScrollTrigger.create({
    trigger: scrollContainer,
    scroller: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 2.2,           // higher = silkier camera lag
    onUpdate: (self) => {
      const progress = self.progress;
      const stateProgress = progress * totalTransitions;
      const stateIndex = Math.floor(Math.min(stateProgress, totalTransitions - 0.001));
      const t = stateProgress - stateIndex;
      setCameraState(stateIndex, t);
    },
  });
}

export function getLenis() {
  return lenis;
}
