import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { PROOF_STATS, WINS_VIDEOS } from '@/lib/cinemaContent';

function CountUp({ value, suffix, isZero, active }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced || isZero) { setCount(value); return; }
    let frame;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value, isZero, reduced]);

  return <>{isZero ? '0' : count}{suffix}</>;
}

function StatItem({ stat, index, active }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const lineScaleX = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Each stat has a dark clip behind it
  const clipVideo = WINS_VIDEOS[index + 2];

  return (
    <motion.div
      ref={ref}
      className="relative group"
      style={{ y: reduced ? 0 : y }}
      data-cursor="play"
      data-cursor-label={stat.label}
    >
      {/* Dark clip behind stat — reveals on hover */}
      {clipVideo && (
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
          <img src={clipVideo.thumb} alt="" className="w-full h-full object-cover blur-sm scale-110" />
          <div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.6)' }} />
        </div>
      )}

      {/* Drawing line */}
      <motion.div
        className="h-px mb-4"
        style={{
          scaleX: reduced ? 1 : lineScaleX,
          transformOrigin: '0% 50%',
          background: 'linear-gradient(90deg, #4F9DFF, transparent)',
        }}
      />

      {/* Number */}
      <div className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl leading-none mb-2"
        style={{ color: '#fff' }}
      >
        <CountUp value={stat.value} suffix={stat.suffix} isZero={stat.isZero} active={active} />
      </div>

      {/* Label */}
      <div className="font-heading font-semibold text-base sm:text-lg text-white/80 mb-1">{stat.label}</div>
      <div className="font-body text-sm text-white/35">{stat.sub}</div>
    </motion.div>
  );
}

export default function ProofSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} data-chapter className="relative py-24 sm:py-32 px-4 sm:px-8" style={{ background: '#050508' }}>
      {/* Thin grid lines texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(79,157,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(79,157,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Section label — left aligned, editorial */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(79,157,255,0.5)' }}>
            01 — Proof
          </span>
        </motion.div>

        {/* Stats grid — editorial, no boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {PROOF_STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}