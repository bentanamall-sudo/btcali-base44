import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

// Premium smooth scrolling with controlled inertia — disabled on reduced motion
export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}