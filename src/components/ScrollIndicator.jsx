import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const trailRef = useRef([]);
  const [trail, setTrail] = useState([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const p = total > 0 ? Math.min(scrolled / total, 1) : 0;
      setProgress(p);
      setVisible(scrolled > 60);

      // trail: store last 5 positions
      const now = Date.now();
      trailRef.current = [...trailRef.current.filter(t => now - t.time < 400), { p, time: now }].slice(-5);
      setTrail([...trailRef.current]);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const springProgress = useSpring(progress, { stiffness: 280, damping: 32 });

  useEffect(() => { springProgress.set(progress); }, [progress]);

  if (!visible) return null;

  const BAR_HEIGHT = 260; // px height of the track
  const markerY = progress * BAR_HEIGHT;

  return (
    <div
      className="fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
      style={{ height: BAR_HEIGHT, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Track */}
      <div className="relative w-px flex-1" style={{ background: 'rgba(79,157,255,0.08)', borderRadius: 1 }}>

        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            height: `${progress * 100}%`,
            background: 'linear-gradient(180deg, rgba(79,157,255,0.6) 0%, rgba(94,235,255,0.4) 100%)',
            boxShadow: '0 0 6px rgba(79,157,255,0.5)',
            borderRadius: 1,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        />

        {/* Trail particles */}
        {trail.slice(0, -1).map((t, i) => {
          const age = (trail.length - 1 - i) / trail.length;
          const opacity = (1 - age) * 0.35;
          return (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: t.p * BAR_HEIGHT,
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: '#5EEBFF',
                opacity,
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
              }}
            />
          );
        })}

        {/* Gold pulse marker */}
        <motion.div
          className="absolute left-1/2"
          style={{
            top: markerY,
            transform: 'translate(-50%, -50%)',
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FCD34D 0%, #F59E0B 100%)',
            boxShadow: '0 0 8px rgba(252,211,77,0.7), 0 0 16px rgba(252,211,77,0.25)',
            zIndex: 2,
          }}
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              '0 0 6px rgba(252,211,77,0.6), 0 0 12px rgba(252,211,77,0.2)',
              '0 0 12px rgba(252,211,77,0.9), 0 0 24px rgba(252,211,77,0.4)',
              '0 0 6px rgba(252,211,77,0.6), 0 0 12px rgba(252,211,77,0.2)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}