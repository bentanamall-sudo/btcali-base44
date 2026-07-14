import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { WHO_FOR, WINS_VIDEOS } from '@/lib/cinemaContent';

export default function WhoCoachingIsFor() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section data-chapter className="relative py-24 sm:py-32 px-4 sm:px-8 overflow-hidden" style={{ background: '#050508' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em] block mb-3" style={{ color: 'rgba(79,157,255,0.5)' }}>
            08 — Who This Is For
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-xl">
            Built around<br />where you are.
          </h2>
        </div>

        {/* Interactive layout — categories around central visual */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Category list */}
          <div className="space-y-1">
            {WHO_FOR.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="w-full text-left group"
              >
                <div className="flex items-center gap-4 py-3 transition-all duration-300" style={{ opacity: active === i ? 1 : 0.4 }}>
                  <div className="w-8 h-px transition-all duration-300"
                    style={{ background: active === i ? '#5EEBFF' : 'rgba(255,255,255,0.15)', width: active === i ? '32px' : '16px' }}
                  />
                  <span className="font-heading font-bold text-lg sm:text-2xl transition-all duration-300"
                    style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.3)' }}
                  >
                    {item.title}
                  </span>
                </div>
              </button>
            ))}

            {/* "And many more" */}
            <div className="pt-4 pl-12">
              <p className="font-body text-sm text-white/30">+ Handstand push-ups, L-sit to handstand, back lever, and many more.</p>
            </div>
          </div>

          {/* Right — Central visual + active description */}
          <div className="relative">
            {/* Central athlete visual */}
            <div className="relative aspect-[9/16] max-w-[300px] sm:max-w-[360px] mx-auto overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={WINS_VIDEOS[active % WINS_VIDEOS.length].thumb}
                  alt=""
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.8), transparent 50%)' }} />
              <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid rgba(79,157,255,0.15)' }} />

              {/* Active description on the visual */}
              <div className="absolute bottom-6 left-6 right-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-heading font-bold text-xs uppercase tracking-wider block mb-2" style={{ color: '#5EEBFF' }}>
                      {WHO_FOR[active].title}
                    </span>
                    <p className="font-body text-sm text-white/70 leading-relaxed">{WHO_FOR[active].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}