import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const STATS = [
  { value: 40, suffix: '+', label: 'Athletes Coached', sub: 'From beginners to advanced', color: '#4F9DFF' },
  { value: 100, suffix: '+', label: 'Skills Unlocked', sub: 'Planche, FL, HS & more', color: '#5EEBFF' },
  { value: 2, suffix: ' yrs', label: 'of Coaching', sub: 'Proven results worldwide', color: '#A6D4FF' },
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

function StatCard3D({ value, suffix, label, sub, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 18 });
  const scale = useSpring(1, { stiffness: 350, damping: 28 });
  const glowX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(my, [-0.5, 0.5], [0, 100]);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={() => scale.set(1.06)}
      onMouseLeave={() => { mx.set(0); my.set(0); scale.set(1); }}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', perspective: 600 }}
      className="relative rounded-2xl p-6 text-center cursor-default overflow-hidden"
    >
      {/* Cursor-following inner glow */}
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
        background: useTransform([glowX, glowY], ([x, y]) =>
          `radial-gradient(circle at ${x}% ${y}%, ${color}25 0%, transparent 60%)`),
      }} />

      {/* Card shell */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }} />

      {/* Top light edge */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

      {/* Content floats above in Z */}
      <div style={{ transform: 'translateZ(24px)', position: 'relative' }}>
        <div
          className="font-heading font-black text-4xl sm:text-5xl mb-1.5"
          style={{
            color,
            textShadow: `0 0 30px ${color}80, 0 0 60px ${color}30`,
            filter: 'drop-shadow(0 0 12px currentColor)',
          }}
        >
          <CountUp target={value} suffix={suffix} start={inView} />
        </div>
        <div className="font-heading font-semibold text-sm text-foreground mb-1">{label}</div>
        <div className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.45)' }}>{sub}</div>
      </div>
    </motion.div>
  );
}

export default function SocialProofCounter() {
  return (
    <section className="py-16 px-4 sm:px-6" style={{ perspective: 1200 }}>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ transformStyle: 'preserve-3d' }}>
          {STATS.map((stat, i) => (
            <StatCard3D key={i} {...stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}