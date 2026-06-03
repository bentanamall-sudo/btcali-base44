import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';

const VIDEOS = RESULTS_VIDEOS.slice(0, 8);

// Static warm placeholder — zero network cost
function WarmCard({ index }) {
  const hue = 30 + (index * 9) % 22;
  return (
    <div className="absolute inset-0" style={{
      background: `linear-gradient(160deg, hsl(${hue} 45% 14%) 0%, hsl(${hue} 30% 9%) 60%, #111 100%)`,
    }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    </div>
  );
}

// Active video — loads only when src changes
function ActiveCard({ src, index }) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setReady(false);
    const v = videoRef.current;
    if (!v) return;
    v.src = src;
    v.load();
    const onCanPlay = () => {
      setReady(true);
      v.play().catch(() => {});
    };
    v.addEventListener('canplay', onCanPlay, { once: true });
    return () => {
      v.pause();
      v.removeAttribute('src');
      v.load();
    };
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl">
      {!ready && <WarmCard index={index} />}
      <video
        ref={videoRef}
        muted loop playsInline preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" style={{ zIndex: 1 }} />
    </div>
  );
}

// Ghost card — pure CSS, zero network
function GhostCard({ index, onClick, side }) {
  const hue = 30 + (index * 9) % 22;
  return (
    <div
      className="hidden lg:block absolute cursor-pointer overflow-hidden rounded-2xl"
      style={{
        width: '130px', aspectRatio: '9/16',
        [side]: 'calc(50% - 330px)',
        top: '50%', transform: 'translateY(-50%)',
        zIndex: 1, opacity: 0.4,
        border: '1px solid hsl(var(--glow-primary)/0.2)',
        background: `linear-gradient(160deg, hsl(${hue} 40% 12%) 0%, #111 100%)`,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
      onMouseLeave={e => e.currentTarget.style.opacity = '0.4'}
      onClick={onClick}
    />
  );
}

export default function ResultsCarousel() {
  const [active, setActive] = useState(0);
  const total = VIDEOS.length;
  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(i => (i + 1) % total), [total]);
  const prevIdx = (active - 1 + total) % total;
  const nextIdx = (active + 1) % total;

  const touchStart = useRef(null);
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  return (
    <section className="relative py-8 sm:py-12 overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="text-center mb-6 px-4">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-1">
          Real Athletes · Real Results
        </p>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl">
          Student <span className="gradient-text">Results</span>
        </h2>
      </div>

      <div className="relative flex items-center justify-center" style={{ height: 'calc(min(380px,88vw) * 16 / 9)' }}>
        <GhostCard index={prevIdx} onClick={prev} side="right" />
        <GhostCard index={nextIdx} onClick={next} side="left" />

        <button onClick={prev}
          className="absolute left-4 lg:left-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-colors"
          style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="relative flex-shrink-0 z-10" style={{ width: 'min(340px,72vw)', aspectRatio: '9/16' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <ActiveCard src={VIDEOS[active].src} index={active} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 rounded-2xl lg:rounded-3xl pointer-events-none"
            style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)', zIndex: 2 }} />
        </div>

        <button onClick={next}
          className="absolute right-4 lg:right-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-colors"
          style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2.5 mt-5">
        <div className="flex gap-1.5">
          {VIDEOS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="rounded-full transition-all" style={{
              width: i === active ? '22px' : '6px', height: '6px',
              background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.3)',
            }} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Link to="/results">
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl glass border border-primary/40 text-foreground font-heading font-semibold text-sm hover:border-primary/70 transition-colors"
          >
            View All Results <ArrowRight className="w-4 h-4 text-primary" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}