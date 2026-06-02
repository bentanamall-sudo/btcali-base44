import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';

const VIDEOS = RESULTS_VIDEOS.slice(0, 8);

// ── Warm dark placeholder ─────────────────────────────────────────────────────
function WarmPlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(160deg, #1e1a12 0%, #141210 50%, #0d0d0d 100%)' }}
    />
  );
}

// ── Side ghost card — video at frame 0 as thumbnail ───────────────────────────
function GhostCard({ src, onClick, side }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoadedData = useCallback(() => {
    const v = videoRef.current;
    if (v) v.currentTime = 0.01;
  }, []);

  const handleSeeked = useCallback(() => setLoaded(true), []);

  return (
    <motion.div
      className="hidden lg:block absolute cursor-pointer overflow-hidden rounded-2xl"
      style={{
        width: '130px',
        aspectRatio: '9/16',
        [side]: 'calc(50% - 330px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        opacity: 0.45,
        filter: 'blur(1.5px)',
        border: '1px solid hsl(var(--glow-primary)/0.15)',
        background: '#141210',
      }}
      whileHover={{ opacity: 0.7, filter: 'blur(0.5px)' }}
      onClick={onClick}
    >
      {!loaded && <WarmPlaceholder />}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        onLoadedData={handleLoadedData}
        onSeeked={handleSeeked}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: loaded ? 1 : 0 }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </motion.div>
  );
}

// ── Active card — video plays, shows first frame until canplay ────────────────
function ActiveCard({ src }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  const handleCanPlay = useCallback(() => {
    setReady(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl bg-[#141210]">
      <video
        ref={videoRef}
        key={src}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s' }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <WarmPlaceholder />
          <div className="relative z-10 w-5 h-5 border-2 border-primary/50 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" style={{ zIndex: 2 }} />
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

  const touchStart = useRef(null);
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    touchStart.current = null;
  };

  return (
    <section
      className="relative py-8 sm:py-12 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--glow-primary)/0.08) 0%, transparent 70%)' }} />

      <div className="text-center mb-6 px-4">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-1">
          Real Athletes · Real Results
        </p>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl">
          Student <span className="gradient-text">Results</span>
        </h2>
      </div>

      <div className="relative flex items-center justify-center" style={{ height: 'calc(min(380px, 88vw) * 16 / 9)' }}>
        <GhostCard src={VIDEOS[prevIdx].src} onClick={prev} side="right" />
        <GhostCard src={VIDEOS[nextIdx].src} onClick={next} side="left" />

        <button
          onClick={prev}
          className="absolute left-4 lg:left-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-all"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <div
          className="relative flex-shrink-0 z-10"
          style={{ width: 'min(340px, 72vw)', aspectRatio: '9/16' }}
        >
          <div className="absolute pointer-events-none" style={{
            inset: '-16px', borderRadius: '32px',
            boxShadow: '0 0 80px hsl(var(--glow-primary)/0.45), 0 0 160px hsl(var(--glow-primary)/0.15)',
            zIndex: 0,
          }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.88, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ zIndex: 1 }}
            >
              <ActiveCard src={VIDEOS[active].src} />
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0 rounded-2xl lg:rounded-3xl pointer-events-none"
            style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)', zIndex: 2 }}
          />
        </div>

        <button
          onClick={next}
          className="absolute right-4 lg:right-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-all"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2.5 mt-5">
        <div className="flex gap-1.5">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all"
              style={{
                width: i === active ? '22px' : '6px',
                height: '6px',
                background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.3)',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground/50 font-body">{active + 1} / {total}</span>
      </div>

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