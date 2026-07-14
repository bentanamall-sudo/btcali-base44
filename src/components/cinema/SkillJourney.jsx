import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { SKILL_JOURNEYS, WINS_VIDEOS } from '@/lib/cinemaContent';

export default function SkillJourney() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  const journey = SKILL_JOURNEYS[activeJourney];
  const stages = journey.stages;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const stageIdx = Math.min(Math.floor(v * stages.length), stages.length - 1);
      setActiveStage(stageIdx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, stages.length]);

  // Media transforms
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const timelineFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const bgHue = useTransform(scrollYProgress, [0, 0.5, 1], ['rgba(79,157,255,0.03)', 'rgba(94,235,255,0.02)', 'rgba(79,157,255,0.04)']);

  const stageVideo = WINS_VIDEOS[(activeJourney * 3 + activeStage) % WINS_VIDEOS.length];

  return (
    <section ref={ref} data-chapter className="relative" style={{ height: `${stages.length * 70}vh` }}>
      <motion.div className="absolute inset-0" style={{ background: bgHue }} />

      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Section label + Journey selector */}
        <div className="pt-24 pb-4 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(79,157,255,0.5)' }}>
                04 — Skill Journey
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl mt-2 text-white">My Progression</h2>
            </div>
            {/* Sticky skill selector */}
            <div className="flex flex-wrap gap-2">
              {SKILL_JOURNEYS.map((j, i) => (
                <button
                  key={j.name}
                  onClick={() => { setActiveJourney(i); setActiveStage(0); }}
                  className="px-4 py-2 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider transition-all duration-300"
                  style={{
                    background: activeJourney === i ? 'rgba(79,157,255,0.15)' : 'transparent',
                    border: `1px solid ${activeJourney === i ? 'rgba(79,157,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: activeJourney === i ? '#5EEBFF' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {j.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 px-4 sm:px-8 max-w-6xl mx-auto w-full items-center pb-8">
          {/* Left — Pinned media */}
          <div className="relative">
            <motion.div
              className="relative aspect-[9/16] max-w-[260px] sm:max-w-[320px] mx-auto overflow-hidden rounded-2xl"
              style={{ scale: reduced ? 1 : mediaScale }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeJourney}-${activeStage}`}
                  src={stageVideo.thumb}
                  alt=""
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.6), transparent 50%)' }} />
              <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid rgba(79,157,255,0.15)' }} />
              {/* Stage name on footage */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-heading font-bold text-sm text-white">{stages[activeStage]}</p>
              </div>
            </motion.div>
          </div>

          {/* Right — Progression list */}
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="w-px" style={{ height: timelineFill, background: 'linear-gradient(to bottom, #4F9DFF, #5EEBFF)' }} />
            </div>

            <div className="pl-6 space-y-3">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage}
                  initial={false}
                  animate={{
                    opacity: i === activeStage ? 1 : i < activeStage ? 0.3 : 0.15,
                    x: i === activeStage ? 0 : i < activeStage ? -4 : 4,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: i === activeStage ? '#5EEBFF' : i < activeStage ? 'rgba(79,157,255,0.4)' : 'rgba(255,255,255,0.15)',
                      boxShadow: i === activeStage ? '0 0 8px rgba(94,235,255,0.6)' : 'none',
                      scale: i === activeStage ? 1.3 : 1,
                    }}
                  />
                  <span
                    className="font-heading font-semibold transition-all duration-300"
                    style={{
                      fontSize: i === activeStage ? '1.5rem' : '1rem',
                      color: i === activeStage ? '#fff' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {stage}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Counter */}
            <div className="mt-8 pl-6">
              <span className="font-heading font-black text-2xl text-white">{String(activeStage + 1).padStart(2, '0')}</span>
              <span className="text-white/20"> / {String(stages.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}