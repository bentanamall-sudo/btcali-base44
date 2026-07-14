import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { COACHING_STEPS, WINS_VIDEOS } from '@/lib/cinemaContent';

export default function HowCoachingWorks() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const total = COACHING_STEPS.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setActiveStep(Math.min(Math.floor(v * total), total - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  const bgLighting = useTransform(scrollYProgress, [0, 0.5, 1], ['rgba(79,157,255,0.03)', 'rgba(94,235,255,0.02)', 'rgba(79,157,255,0.04)']);

  return (
    <section ref={ref} data-chapter className="relative" style={{ height: `${total * 80}vh` }}>
      <motion.div className="absolute inset-0" style={{ background: bgLighting }} />

      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Pinned heading + step visual */}
          <div>
            <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em] block mb-3" style={{ color: 'rgba(79,157,255,0.5)' }}>
              07 — The Process
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-8">
              How BTCALI<br />Coaching Works
            </h2>

            {/* Step number — large */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-heading font-black text-[7rem] sm:text-[10rem] leading-none block"
                  style={{ color: 'transparent', WebkitTextStroke: '1px rgba(79,157,255,0.3)' }}
                >
                  {COACHING_STEPS[activeStep].num}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Step indicator dots */}
            <div className="flex gap-2 mt-4">
              {COACHING_STEPS.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-300"
                  style={{ width: i === activeStep ? '32px' : '8px', background: i === activeStep ? '#5EEBFF' : 'rgba(255,255,255,0.1)' }}
                />
              ))}
            </div>
          </div>

          {/* Right — Active step content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-heading font-black text-2xl sm:text-4xl text-white mb-4">
                  {COACHING_STEPS[activeStep].title}
                </h3>
                <p className="font-body text-base sm:text-lg text-white/50 leading-relaxed mb-8 max-w-md">
                  {COACHING_STEPS[activeStep].body}
                </p>

                {/* Visual representation per step */}
                <div className="relative h-32 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {/* Step-specific visual */}
                  {activeStep === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center gap-2 p-4">
                      {[0, 1, 2, 3].map(i => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          className="h-2 rounded-full flex-1" style={{ background: 'rgba(79,157,255,0.3)' }} />
                      ))}
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1 p-4">
                      {[0, 1, 2, 3, 4].map(i => (
                        <motion.div key={i} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: i * 0.08 }}
                          className="h-8 rounded flex-1" style={{ background: 'rgba(79,157,255,0.15)', border: '1px solid rgba(79,157,255,0.2)' }} />
                      ))}
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-12 h-16 rounded-lg flex items-center justify-center" style={{ background: 'rgba(79,157,255,0.1)', border: '1px solid rgba(79,157,255,0.3)' }}>
                        <span className="text-xs font-heading text-white/40">VIDEO</span>
                      </motion.div>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0" style={{ background: 'rgba(79,157,255,0.05)' }} />
                        {[0, 1, 2].map(i => (
                          <motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.15 }}
                            className="absolute h-px" style={{ left: '15%', right: '15%', top: `${30 + i * 20}%`, background: '#5EEBFF', transformOrigin: '0% 50%' }} />
                        ))}
                      </motion.div>
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1 p-4">
                      {[0, 1, 2, 3, 4].map(i => (
                        <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                          className="h-6 rounded flex-1" style={{ background: `rgba(79,157,255,${0.1 + i * 0.05})`, border: '1px solid rgba(79,157,255,0.15)' }} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}