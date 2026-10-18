import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const HEADER_OFFSET = 64;

let lenis = null;

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lenis drives the scroll position; GSAP's ticker drives Lenis so ScrollTrigger
// and the smooth scroll share a single animation frame.
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ autoRaf: false, lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target, { offset = -HEADER_OFFSET } = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  if (lenis) {
    lenis.scrollTo(element, { offset, duration: 1.4, force: true });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function setScrollLocked(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export { gsap, ScrollTrigger, SplitText };
