import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';

const VIDEOS = RESULTS_VIDEOS.slice(0, 8);

// ── Shared thumbnail hook ──────────────────────────────────────────────────────
function useThumb(src) {
  const [thumb, setThumb] = useState(null);
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const v = document.createElement('video');
    v.crossOrigin = 'anonymous';
    v.muted = true;
    v.playsInline = true;
    v.preload = 'metadata';
    v.src = src;
    v.addEventListener('loadedmetadata', () => { v.currentTime = 0.01; }, { once: true });
    v.addEventListener('seeked', () => {
      try {
        const c = document.createElement('canvas');
        c.width = v.videoWidth || 360; c.height = v.videoHeight || 640;
        c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
        setThumb(c.toDataURL('image/jpeg', 0.7));
      } catch { setThumb('__fb__'); }
      v.src = '';
    }, { once: true });
    v.addEventListener('error', () => setThumb('__fb__'), { once: true });
  }, [src]);
  return thumb;
}

// ── Thumbnail-only card ────────────────────────────────────────────────────────
function ThumbCard({ src, onClick, className = '', style = {} }) {
  const thumb = useThumb(src);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      style={style}
      onClick={onClick}
    >
      {thumb && thumb !== '__fb__'
        ? <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
        : <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#1c1c1c,#111,#1c1c1c)', backgroundSize: '200% 200%', animation: 'shimmer-bg 1.8s ease infinite' }} />
      }
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}

// ── Active card (plays video) ──────────────────────────────────────────────────
function ActiveCard({ src }) {
  const thumb = useThumb(src);
  const [ready, setReady] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Thumbnail always present */}
      {thumb && thumb !== '__fb__'
        ? <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: ready ? 0 : 1, transition: 'opacity 0.35s' }} />
        : <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#1c1c1c,#111,#1c1c1c)', backgroundSize: '200% 200%', animation: 'shimmer-bg 1.8s ease infinite' }} />
      }
      {/* Live video fades in over thumbnail */}
      <video
        key={src}
        src={src}
        autoPlay muted loop playsInline preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.35s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none" style={{ border: '1.5px solid hsl(var(--glow-primary)/0.5)' }} />
    </div>
  );
}

export default function ResultsCarousel() {
  const [active, setActive] = useState(0);
  const total = VIDEOS.length;
  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(i => (i + 1) % total), [total]);

  const prevIdx = (active - 1 + total) % total;
  const nextIdx = (active + 1) % total;

  return (
    <section className="relative py-10 sm:py-14 px-4 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(var(--glow-primary)/0.07) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-1">
          Real Athletes · Real Results
        </p>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          Student <span className="gradient-text">Results</span>
        </h2>
      </div>

      {/* Carousel row */}
      <div className="relative flex items-center justify-center">

        {/* Prev ghost — desktop only */}
        <motion.div
          className="hidden sm:block absolute cursor-pointer"
          style={{ right: 'calc(50% + 160px)', width: '110px', aspectRatio: '9/16', zIndex: 1 }}
          whileHover={{ opacity: 0.6 }}
          onClick={prev}
        >
          <ThumbCard
            src={VIDEOS[prevIdx].src}
            className="w-full h-full"
            style={{ opacity: 0.4, filter: 'blur(1.5px)', transform: 'scale(0.88) translateX(20px)', borderRadius: '16px', border: '1px solid hsl(var(--glow-primary)/0.15)' }}
          />
        </motion.div>

        {/* Main card container */}
        <div
          className="relative flex-shrink-0 z-10"
          style={{ width: 'min(300px, 78vw)', aspectRatio: '9/16' }}
        >
          {/* Gold glow behind active card */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: '0 0 60px hsl(var(--glow-primary)/0.35), 0 0 120px hsl(var(--glow-primary)/0.12)', zIndex: 0 }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <ActiveCard src={VIDEOS[active].src} />
            </motion.div>
          </AnimatePresence>

          {/* Arrow: left */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full sm:-translate-x-12 z-20 w-10 h-10 rounded-full glass border border-primary/30 flex items-center justify-center hover:border-primary/70 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          {/* Arrow: right */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full sm:translate-x-12 z-20 w-10 h-10 rounded-full glass border border-primary/30 flex items-center justify-center hover:border-primary/70 transition-all"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Next ghost — desktop only */}
        <motion.div
          className="hidden sm:block absolute cursor-pointer"
          style={{ left: 'calc(50% + 160px)', width: '110px', aspectRatio: '9/16', zIndex: 1 }}
          whileHover={{ opacity: 0.6 }}
          onClick={next}
        >
          <ThumbCard
            src={VIDEOS[nextIdx].src}
            className="w-full h-full"
            style={{ opacity: 0.4, filter: 'blur(1.5px)', transform: 'scale(0.88) translateX(-20px)', borderRadius: '16px', border: '1px solid hsl(var(--glow-primary)/0.15)' }}
          />
        </motion.div>
      </div>

      {/* Dots + counter */}
      <div className="flex flex-col items-center gap-3 mt-5">
        <div className="flex items-center gap-1.5">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all rounded-full"
              style={{
                width: i === active ? '22px' : '6px',
                height: '6px',
                background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.35)',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground/50 font-body">
          {active + 1} / {total}
        </span>
      </div>

      {/* View All CTA */}
      <div className="flex justify-center mt-5">
        <Link to="/results">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl glass border border-primary/40 text-foreground font-heading font-semibold text-sm hover:border-primary/70 transition-all"
          >
            View All Results <ArrowRight className="w-4 h-4 text-primary" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}