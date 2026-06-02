import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RESULTS = [
  { label: 'Haejun', result: '5 Week Progress', skill: 'Handstand Push-Up', id: 'JIOPPWpEds8' },
  { label: 'Adrian', result: '1 Hour Session', skill: 'Front Lever', id: 'D4llYbwGojs' },
  { label: 'Haegun', result: '30 Min Session', skill: 'Pike Press', id: 'xCHxH-oVO0s' },
  { label: 'Cardea', result: '< 1 Month', skill: 'Muscle-Up', id: 'lAz9QY81SkI' },
  { label: 'Andreas', result: '1 Week', skill: 'L-Sit to HS', id: 'j8PrFLzyAcc' },
  { label: 'Haegun', result: '5 Weeks', skill: 'Planche Lean', id: 'ljX0zJJn0Q4' },
];

function ResultCard({ item }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleClick = () => navigate('/results');

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="flex-shrink-0 w-36 h-52 rounded-2xl overflow-hidden relative cursor-pointer"
      style={{ border: '1px solid hsl(var(--glow-primary)/0.2)' }}
    >
      {visible ? (
        <iframe
          src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&loop=1&playlist=${item.id}&controls=0&rel=0&modestbranding=1&playsinline=1`}
          title={item.label}
          allow="autoplay; encrypted-media"
          className="w-full h-full border-0 pointer-events-none"
          style={{ transform: 'scale(1.4)', transformOrigin: 'center center' }}
        />
      ) : (
        <img
          src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
          alt={item.label}
          className="w-full h-full object-cover brightness-50"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-2.5 pointer-events-none">
        <p className="font-heading font-bold text-xs text-white leading-tight">{item.label}</p>
        <p className="text-[10px] font-body text-primary mt-0.5">{item.result}</p>
        <p className="text-[10px] font-body text-white/60">{item.skill}</p>
      </div>
    </div>
  );
}

export default function ScrollingResultsStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const doubled = [...RESULTS, ...RESULTS];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden select-none">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

      {/* Section label */}
      <div className="text-center mb-8 relative z-10">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em]">
          Real Athletes · Real Results
        </p>
        <p className="text-xs text-muted-foreground/40 font-body mt-1">Click any video to see all results</p>
      </div>

      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="flex gap-3 mb-3 px-8">
        {doubled.map((item, i) => (
          <ResultCard key={`r1-${i}`} item={item} />
        ))}
      </motion.div>

      {/* Row 2 — offset start */}
      <motion.div style={{ x: x2 }} className="flex gap-3 px-8" initial={{ x: '-4%' }}>
        {[...RESULTS].reverse().concat([...RESULTS].reverse()).map((item, i) => (
          <ResultCard key={`r2-${i}`} item={item} />
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--glow-primary)/0.04) 0%, transparent 70%)' }} />
    </section>
  );
}