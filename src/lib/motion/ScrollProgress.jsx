import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { CHAPTERS } from '@/lib/cinemaContent';

// Thin progress line at top + vertical chapter indicator (desktop only)
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeChapter, setActiveChapter] = useState(0);
  const lineColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    ['#4F9DFF', '#4F9DFF', '#5EEBFF', '#4F9DFF', '#5EEBFF', '#4F9DFF', '#5EEBFF', '#4F9DFF']
  );

  useEffect(() => {
    const handler = () => {
      const sections = document.querySelectorAll('[data-chapter]');
      if (!sections.length) return;
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let currentSection = 0;
      sections.forEach((s, i) => {
        if (s.offsetTop <= scrollPos) currentSection = i;
      });
      // Map section index to chapter index (7 chapters across all sections)
      const chapterIdx = Math.min(
        Math.floor((currentSection / sections.length) * CHAPTERS.length),
        CHAPTERS.length - 1
      );
      setActiveChapter(chapterIdx);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Top progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
        style={{
          scaleX: reduced ? 1 : progress,
          transformOrigin: '0% 50%',
          background: reduced ? '#4F9DFF' : lineColor,
        }}
      />

      {/* Vertical chapter indicator — desktop only */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none">
        {CHAPTERS.map((ch, i) => (
          <div key={ch} className="flex items-center gap-3">
            <span
              className="font-heading font-semibold text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                color: activeChapter === i ? '#5EEBFF' : 'rgba(255,255,255,0.2)',
                opacity: activeChapter === i ? 1 : 0.4,
                transform: activeChapter === i ? 'translateX(0)' : 'translateX(8px)',
              }}
            >
              {ch}
            </span>
            <div
              className="h-px transition-all duration-300"
              style={{
                width: activeChapter === i ? '24px' : '12px',
                background: activeChapter === i ? '#5EEBFF' : 'rgba(255,255,255,0.15)',
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}