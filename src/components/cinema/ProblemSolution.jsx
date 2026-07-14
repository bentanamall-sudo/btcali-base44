import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { RevealWords } from '@/lib/motion/RevealText';

const PROBLEMS = [
  'Random exercises',
  'No clear progression',
  'No technique feedback',
  'Repeating mistakes',
  'Training for months without progress',
];

const SOLUTIONS = [
  'A personalised roadmap',
  'Technique analysis',
  'A program built around you',
  'Ongoing feedback',
  'Program changes as you improve',
];

export default function ProblemSolution() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Divider moves from left (problem dominates) to right (solution opens)
  const dividerPosition = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ['25%', '50%', '75%']);
  const solutionWidth = useTransform(dividerPosition, (v) => `${100 - parseFloat(v)}%`);
  const problemOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2]);
  const solutionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 1]);
  const problemScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const solutionScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // Final statement reveal
  const statementOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const statementScale = useTransform(scrollYProgress, [0.75, 0.95], [0.9, 1]);

  return (
    <section ref={ref} data-chapter className="relative" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center" style={{ background: '#050508' }}>
        {/* Section label */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 text-center">
          <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(79,157,255,0.5)' }}>
            03 — The Problem
          </span>
        </div>

        {/* Split screen */}
        <div className="relative w-full h-full flex">
          {/* Problem side — left */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 overflow-hidden"
            style={{
              width: reduced ? '50%' : dividerPosition,
              opacity: problemOpacity,
              scale: reduced ? 1 : problemScale,
              transformOrigin: 'left center',
            }}
          >
            <div className="h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24" style={{ background: 'rgba(20,12,8,0.3)' }}>
              <p className="font-heading font-bold text-xs uppercase tracking-[0.25em] mb-8" style={{ color: 'rgba(255,100,80,0.5)' }}>
                Without Direction
              </p>
              <div className="space-y-4">
                {PROBLEMS.map((p, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ opacity: 1 - i * 0.05 }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,100,80,0.4)' }} />
                    <span className="font-body text-lg sm:text-xl text-white/40 line-through decoration-white/10">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Divider line */}
          <motion.div
            className="absolute top-0 bottom-0 w-px z-10"
            style={{ left: reduced ? '50%' : dividerPosition, background: 'linear-gradient(to bottom, transparent, rgba(79,157,255,0.4), transparent)' }}
          />

          {/* Solution side — right */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 overflow-hidden"
            style={{
              width: reduced ? '50%' : solutionWidth,
              opacity: solutionOpacity,
              scale: reduced ? 1 : solutionScale,
              transformOrigin: 'right center',
            }}
          >
            <div className="h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 text-right" style={{ background: 'rgba(8,16,28,0.3)' }}>
              <p className="font-heading font-bold text-xs uppercase tracking-[0.25em] mb-8" style={{ color: 'rgba(79,157,255,0.6)' }}>
                With BTCALI
              </p>
              <div className="space-y-4">
                {SOLUTIONS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 justify-end" style={{ opacity: 0.5 + i * 0.08 }}>
                    <span className="font-body text-lg sm:text-xl text-white/85 font-medium">{s}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#5EEBFF', boxShadow: '0 0 6px rgba(94,235,255,0.5)' }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final statement overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ opacity: statementOpacity, scale: statementScale }}
          >
            <div className="text-center px-4">
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl" style={{ color: '#fff', textShadow: '0 0 40px rgba(0,0,0,0.8)' }}>
                <RevealWords text="TRAINING HARD WAS NEVER THE PROBLEM." delay={0} stagger={0.1} />
              </h2>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl leading-tight mt-2" style={{ color: '#5EEBFF' }}>
                <RevealWords text="KNOWING WHAT TO DO NEXT WAS." delay={0.5} stagger={0.1} />
              </h2>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}