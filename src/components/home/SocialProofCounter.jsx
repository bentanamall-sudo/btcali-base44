import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 40, suffix: '+', label: 'Athletes Coached', sub: 'From beginners to advanced' },
  { value: 100, suffix: '+', label: 'Skills Unlocked', sub: 'Planche, FL, HS & more' },
  { value: 2, suffix: ' yrs', label: 'of coaching', sub: 'Proven results worldwide' },
];

function CountUp({ target, suffix, start }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame;
    const duration = 1800;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);
  return <>{count}{suffix}</>;
}

function StatCard({ value, suffix, label, sub, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="relative rounded-2xl p-6 text-center cursor-default group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(79,157,255,0.25)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(79,157,255,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #4F9DFF, transparent)', opacity: 0.6 }} />

      <div className="font-heading font-black text-4xl sm:text-5xl mb-1.5 gradient-text gold-glow">
        <CountUp target={value} suffix={suffix} start={inView} />
      </div>
      <div className="font-heading font-semibold text-sm text-foreground mb-1">{label}</div>
      <div className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.45)' }}>{sub}</div>
    </motion.div>
  );
}

export default function SocialProofCounter() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-8"
          style={{ color: 'rgba(79,157,255,0.5)' }}
        >
          Platform Stats
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}