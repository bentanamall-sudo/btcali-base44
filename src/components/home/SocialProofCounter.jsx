import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

function AchievementBlock({ delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const runCycle = async () => {
      while (!cancelled) {
        const target = ACHIEVEMENTS[currentIdx % ACHIEVEMENTS.length];
        for (let i = 0; i <= target.length; i++) {
          if (cancelled) return;
          setDisplayText(target.slice(0, i));
          await new Promise(r => setTimeout(r, 55 + Math.random() * 30));
        }
        await new Promise(r => setTimeout(r, 1800));
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="p-8 flex flex-col justify-center"
      style={{ background: '#1A1A1A', color: '#F4F4F2' }}
    >
      <p className="eyebrow mb-4" style={{ color: 'rgba(244,244,242,0.5)' }}>
        Helped my students unlock
      </p>
      <div className="min-h-[3rem] flex items-center">
        <span className="display-lg" style={{ color: '#FF4D00', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {displayText}
          <span
            className="inline-block w-1 h-6 ml-1 align-middle"
            style={{ background: '#F4F4F2', animation: 'cursorBlink 1s step-end infinite' }}
          />
        </span>
      </div>
      <p className="font-body mt-3" style={{ color: 'rgba(244,244,242,0.4)', fontSize: '18px' }}>
        And many more...
      </p>
    </motion.div>
  );
}

function StatBlock({ value, suffix, label, sub, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="p-8"
      style={{ borderRight: '1px solid #D1D1CB' }}
    >
      <div className="display-xl text-foreground mb-3" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
        {count}{suffix}
      </div>
      <div className="eyebrow text-foreground mb-1">{label}</div>
      <div className="font-body text-foreground/50" style={{ fontSize: '18px' }}>{sub}</div>
    </motion.div>
  );
}

export default function SocialProofCounter() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px" style={{ borderTop: '1px solid #D1D1CB', borderBottom: '1px solid #D1D1CB' }}>
          <div className="lg:col-span-4" style={{ borderRight: '1px solid #D1D1CB' }}>
            <StatBlock value={50} suffix="+" label="Athletes Coached" sub="From beginners to advanced" delay={0} />
          </div>
          <div className="lg:col-span-4" style={{ borderRight: '1px solid #D1D1CB' }}>
            <AchievementBlock delay={0.12} />
          </div>
          <div className="lg:col-span-4">
            <StatBlock value={2} suffix=" yrs" label="of Coaching" sub="Proven results worldwide" delay={0.24} />
          </div>
        </div>
      </div>
    </section>
  );
}