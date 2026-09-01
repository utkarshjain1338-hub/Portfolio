import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setCameraState } from './cameraStore';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
const scrollListeners = new Set<(progress: number, scrollY: number) => void>();

export function initScroll() {
  lenis = new Lenis({
    lerp:        0.072,
    smoothWheel: true,
    syncTouch:   false,
  });

  // Bridge Lenis scroll events → ScrollTrigger
  lenis.on('scroll', (e: any) => {
    ScrollTrigger.update();
    scrollListeners.forEach(fn => fn(e.progress, e.scroll));
  });

  // Tell ScrollTrigger to use Lenis's virtual scroll position
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value?: number) {
      if (value !== undefined && lenis) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis?.scroll ?? 0;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: 'transform',
  });

  // Drive Lenis via GSAP ticker (shared clock)
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyScroll() {
  lenis?.destroy();
  lenis = null;
  ScrollTrigger.killAll();
  scrollListeners.clear();
}

// 7 sections → 7 camera states → 6 transitions
export function setupCameraScrollTrigger(scrollContainer: HTMLElement) {
  const TRANSITIONS = 6;

  ScrollTrigger.create({
    trigger:  scrollContainer,
    scroller: document.body,
    start:    'top top',
    end:      'bottom bottom',
    scrub:    2.4,
    onUpdate: (self) => {
      const p     = self.progress;
      const sp    = p * TRANSITIONS;
      const index = Math.floor(Math.min(sp, TRANSITIONS - 0.001));
      const t     = sp - index;
      setCameraState(index, t, p);
    },
  });
}

export function getLenis() {
  return lenis;
}

export function onScrollUpdate(callback: (progress: number, scrollY: number) => void) {
  scrollListeners.add(callback);
  return () => scrollListeners.delete(callback);
}
