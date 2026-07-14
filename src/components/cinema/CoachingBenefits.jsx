import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { BENEFITS } from '@/lib/cinemaContent';

export default function CoachingBenefits() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = BENEFITS.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setActive(Math.min(Math.floor(v * total), total - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  return (
    <section ref={ref} data-chapter className="relative" style={{ height: `${total * 50}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ background: '#050508' }}>
        {/* Central pinned message */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em] block mb-4" style={{ color: 'rgba(79,157,255,0.5)' }}>
            09 — What You Get
          </span>

          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-6xl text-white leading-tight mb-12">
            Everything built around<br />
            <span style={{ color: '#5EEBFF' }}>your progress.</span>
          </h2>

          {/* Benefits — active one moves toward centre and brightens */}
          <div className="relative h-[280px] flex items-center justify-center overflow-hidden">
            {BENEFITS.map((benefit, i) => {
              const distance = Math.abs(i - active);
              const isActive = i === active;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    y: (i - active) * 44,
                    opacity: isActive ? 1 : Math.max(0, 0.5 - distance * 0.12),
                    scale: isActive ? 1 : Math.max(0.8, 1 - distance * 0.05),
                    zIndex: isActive ? 10 : 10 - distance,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3">
                    {/* Line icon */}
                    <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                      style={{
                        border: `1px solid ${isActive ? '#5EEBFF' : 'rgba(255,255,255,0.15)'}`,
                        background: isActive ? 'rgba(94,235,255,0.1)' : 'transparent',
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? '#5EEBFF' : 'rgba(255,255,255,0.2)' }} />
                    </div>
                    <span
                      className="font-heading font-bold transition-all"
                      style={{
                        fontSize: isActive ? '1.75rem' : '1.1rem',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {benefit}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="mt-12 flex items-center justify-center gap-2">
            {BENEFITS.map((_, i) => (
              <div key={i} className="h-1 rounded-full transition-all duration-300"
                style={{ width: i === active ? '24px' : '6px', background: i === active ? '#5EEBFF' : 'rgba(255,255,255,0.08)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}