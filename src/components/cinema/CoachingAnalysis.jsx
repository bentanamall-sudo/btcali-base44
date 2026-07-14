import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { WINS_VIDEOS } from '@/lib/cinemaContent';

// Scroll-linked coaching analysis — video progresses with scroll, observations appear
const OBSERVATIONS = [
  { time: 0.1, label: 'Shoulder position', desc: 'Stacked over wrists for optimal balance' },
  { time: 0.25, label: 'Core compression', desc: 'Active compression maintains the lean' },
  { time: 0.4, label: 'Straight-arm strength', desc: 'Biceps and shoulder doing the work' },
  { time: 0.55, label: 'Hip height', desc: 'Hips aligned with shoulders — level hold' },
  { time: 0.7, label: 'Balance line', desc: 'Weight distributed through the fingertips' },
  { time: 0.85, label: 'Range of motion', desc: 'Full protraction at the top of the movement' },
];

export default function CoachingAnalysis() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [activeObs, setActiveObs] = useState(0);

  const videoScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = OBSERVATIONS.reduce((best, obs, i) => Math.abs(obs.time - v) < Math.abs(OBSERVATIONS[best].time - v) ? i : best, 0);
      setActiveObs(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const analysisVideo = WINS_VIDEOS[3];

  return (
    <section ref={ref} data-chapter className="relative" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center" style={{ background: '#050508' }}>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Video with animated guide lines */}
          <div>
            <div className="mb-4">
              <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(79,157,255,0.5)' }}>
                06 — The Method
              </span>
            </div>

            <motion.div
              className="relative aspect-[9/16] max-w-[300px] sm:max-w-[360px] mx-auto overflow-hidden rounded-2xl"
              style={{ scale: reduced ? 1 : videoScale }}
            >
              <img src={analysisVideo.thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.15)' }} />

              {/* Animated guide lines — appear based on active observation */}
              {OBSERVATIONS.map((obs, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{
                    left: '8%', right: '8%',
                    top: `${10 + i * 13}%`,
                    height: '1px',
                    background: 'rgba(94,235,255,0.5)',
                    boxShadow: '0 0 8px rgba(94,235,255,0.4)',
                  }}
                  animate={{
                    opacity: activeObs === i ? 1 : 0,
                    scaleX: activeObs === i ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}

              {/* Label on video */}
              <motion.div
                key={activeObs}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(94,235,255,0.2)' }}>
                  <span className="font-heading font-bold text-xs uppercase tracking-wider block" style={{ color: '#5EEBFF' }}>
                    {OBSERVATIONS[activeObs].label}
                  </span>
                  <span className="font-body text-[10px] text-white/50">{OBSERVATIONS[activeObs].desc}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — Explanation */}
          <div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Every set is reviewed.<br />
              <span style={{ color: '#5EEBFF' }}>Every detail matters.</span>
            </h2>

            <div className="space-y-3 mb-8">
              {[
                'Every set you send is reviewed in depth',
                'Technique problems are identified precisely',
                'Feedback is specific — not generic advice',
                'Your program is adjusted based on performance',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1 h-6 rounded-full" style={{ background: 'rgba(94,235,255,0.4)' }} />
                  <span className="font-body text-base text-white/70">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Active observation highlight */}
            <motion.div
              key={activeObs}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl"
              style={{ background: 'rgba(79,157,255,0.06)', border: '1px solid rgba(79,157,255,0.15)' }}
            >
              <span className="font-heading font-bold text-sm text-white block">{OBSERVATIONS[activeObs].label}</span>
              <span className="font-body text-xs text-white/50">{OBSERVATIONS[activeObs].desc}</span>
            </motion.div>

            {/* Observation timeline */}
            <div className="mt-6 flex gap-1">
              {OBSERVATIONS.map((_, i) => (
                <div key={i} className="h-1 rounded-full flex-1 transition-all duration-300"
                  style={{ background: i === activeObs ? '#5EEBFF' : 'rgba(255,255,255,0.08)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}