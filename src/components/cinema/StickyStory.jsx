import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { STORY_CHAPTERS, WINS_VIDEOS } from '@/lib/cinemaContent';

export default function StickyStory() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Determine active chapter based on scroll progress
  const total = STORY_CHAPTERS.length;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * total), total - 1);
      setActiveIdx(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  // Central media transforms with each stage
  const mediaScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.15]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.6]);
  const bgLighting = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['rgba(79,157,255,0.04)', 'rgba(94,235,255,0.03)', 'rgba(79,157,255,0.05)', 'rgba(5,5,8,0)']);

  // Progress line for the story
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Different footage for different stages (cycle through real videos)
  const stageVideo = WINS_VIDEOS[activeIdx % WINS_VIDEOS.length];

  return (
    <section ref={ref} data-chapter className="relative" style={{ height: `${total * 80}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background lighting that changes */}
        <motion.div className="absolute inset-0" style={{ background: bgLighting }} />

        {/* Ambient grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          {/* Left — Central media */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              className="relative aspect-[9/16] max-w-[280px] sm:max-w-[340px] mx-auto overflow-hidden rounded-2xl"
              style={{ scale: reduced ? 1 : mediaScale, opacity: mediaOpacity }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={stageVideo.thumb}
                  alt=""
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.5), transparent 40%)' }} />
              <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid rgba(79,157,255,0.15)' }} />
            </motion.div>
          </div>

          {/* Right — Story text */}
          <div className="relative order-1 lg:order-2">
            {/* Progress line */}
            <div className="absolute left-0 top-0 bottom-0 w-px hidden lg:block" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="w-px" style={{ height: progressHeight, background: 'linear-gradient(to bottom, #4F9DFF, #5EEBFF)' }} />
            </div>

            <div className="lg:pl-8">
              {/* Chapter label */}
              <motion.span
                className="font-heading font-semibold text-xs uppercase tracking-[0.3em] block mb-6"
                style={{ color: 'rgba(79,157,255,0.5)' }}
              >
                02 — Journey
              </motion.span>

              {/* Current statement — bright */}
              <AnimatePresence mode="wait">
                <motion.div key={activeIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 text-white">
                    {STORY_CHAPTERS[activeIdx].text}
                  </h2>
                  <p className="font-body text-base sm:text-lg text-white/50 leading-relaxed max-w-md">
                    {STORY_CHAPTERS[activeIdx].detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Previous statements — faded */}
              <div className="mt-10 space-y-2">
                {STORY_CHAPTERS.slice(Math.max(0, activeIdx - 2), activeIdx).map((ch, i, arr) => (
                  <motion.p
                    key={`${activeIdx}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 - i * 0.06 }}
                    className="font-heading font-semibold text-sm text-white/20"
                  >
                    {ch.text}
                  </motion.p>
                ))}
              </div>

              {/* Stage counter */}
              <div className="mt-10 flex items-center gap-3">
                <span className="font-heading font-black text-2xl text-white">{String(activeIdx + 1).padStart(2, '0')}</span>
                <span className="text-white/20 font-heading">/</span>
                <span className="text-white/30 font-heading text-sm">{String(total).padStart(2, '0')}</span>
                {/* Timeline dots */}
                <div className="flex gap-1.5 ml-4">
                  {STORY_CHAPTERS.map((_, i) => (
                    <div key={i} className="h-1 rounded-full transition-all duration-300"
                      style={{ width: i === activeIdx ? '20px' : '6px', background: i === activeIdx ? '#5EEBFF' : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}