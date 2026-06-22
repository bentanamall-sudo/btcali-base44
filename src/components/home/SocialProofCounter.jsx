import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ACHIEVEMENTS = [
  'Full Front Lever',
  'Full Planche',
  '90° HSPU',
  'Multiple HSPU',
  'Front Lever Pullups',
  'Front Lever Touch',
  'No-Dip Muscle Ups',
  'L-Sit to Handstand',
  'Freestanding Handstand',
  'Straddle Planche',
  'Tuck Planche Press',
];

function AchievementCard({ delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [particles, setParticles] = useState([]);

  // Spawn random particles
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-6),
        { id: Date.now(), x: 20 + Math.random() * 60, y: 20 + Math.random() * 60, size: 2 + Math.random() * 3 }
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, [inView]);

  // Typewriter cycle
  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    const runCycle = async () => {
      while (!cancelled) {
        const target = ACHIEVEMENTS[currentIdx % ACHIEVEMENTS.length];
        setIsTyping(true);

        // Type out
        for (let i = 0; i <= target.length; i++) {
          if (cancelled) return;
          setDisplayText(target.slice(0, i));
          await new Promise(r => setTimeout(r, 55 + Math.random() * 30));
        }

        // Hold
        await new Promise(r => setTimeout(r, 1800));

        // Erase
        for (let i = target.length; i >= 0; i--) {
          if (cancelled) return;
          setDisplayText(target.slice(0, i));
          await new Promise(r => setTimeout(r, 28));
        }

        await new Promise(r => setTimeout(r, 250));
        if (!cancelled) setCurrentIdx(prev => (prev + 1) % ACHIEVEMENTS.length);
      }
    };

    runCycle();
    return () => { cancelled = true; };
  }, [inView, currentIdx]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 18 });
  const scale = useSpring(1, { stiffness: 350, damping: 28 });

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
      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 2.5, y: -20 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          onAnimationComplete={() => setParticles(prev => prev.filter(x => x.id !== p.id))}
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: Math.random() > 0.5 ? '#4F9DFF' : '#FCD34D',
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
          }}
        />
      ))}

      {/* Card shell */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }} />

      {/* Animated glow border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
        border: '1px solid transparent',
        background: 'linear-gradient(rgba(8,11,22,0), rgba(8,11,22,0)) padding-box, linear-gradient(135deg, rgba(79,157,255,0.3), rgba(252,211,77,0.3), rgba(79,157,255,0.3)) border-box',
      }} />

      {/* Top light edge */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(252,211,77,0.5), rgba(79,157,255,0.5), transparent)' }} />

      {/* Content */}
      <div style={{ transform: 'translateZ(24px)', position: 'relative' }}>
        <p className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: 'rgba(166,212,255,0.5)' }}>
          Helped my students unlock
        </p>

        <div className="min-h-[2.5rem] flex items-center justify-center mb-1">
          <span
            className="font-heading font-black text-xl sm:text-2xl"
            style={{
              color: '#FCD34D',
              textShadow: '0 0 20px rgba(252,211,77,0.6), 0 0 40px rgba(252,211,77,0.2)',
            }}
          >
            {displayText}
            <span
              className="inline-block w-0.5 h-6 ml-0.5 align-middle"
              style={{
                background: '#4F9DFF',
                boxShadow: '0 0 8px rgba(79,157,255,0.8)',
                animation: 'cursorBlink 1s step-end infinite',
              }}
            />
          </span>
        </div>

        <p className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.4)' }}>
          And many more...
        </p>
      </div>
    </motion.div>
  );
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

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame;
    const duration = 1800;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

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
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
        background: useTransform([glowX, glowY], ([x, y]) =>
          `radial-gradient(circle at ${x}% ${y}%, ${color}25 0%, transparent 60%)`),
      }} />
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
      <div style={{ transform: 'translateZ(24px)', position: 'relative' }}>
        <div className="font-heading font-black text-4xl sm:text-5xl mb-1.5"
          style={{ color, textShadow: `0 0 30px ${color}80, 0 0 60px ${color}30`, filter: 'drop-shadow(0 0 12px currentColor)' }}>
          {count}{suffix}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ transformStyle: 'preserve-3d' }}>
          <StatCard3D value={50} suffix="+" label="Athletes Coached" sub="From beginners to advanced" color="#4F9DFF" delay={0} />
          <AchievementCard delay={0.12} />
          <StatCard3D value={2} suffix=" yrs" label="of Coaching" sub="Proven results worldwide" color="#A6D4FF" delay={0.24} />
        </div>
      </div>
    </section>
  );
}