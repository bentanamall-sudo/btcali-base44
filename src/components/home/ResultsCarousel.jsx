import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';

// Use same thumb cache exported from ProvenResults module
// (module-level loadThumb already kicked off for all videos there)
const VIDEOS = RESULTS_VIDEOS.slice(0, 8);

// ── Inline thumb cache (mirrors ProvenResults, same module-load kick) ──────────
const _cache = {};
const _subs = {};

function _load(src) {
  if (_cache[src] && _cache[src] !== 'loading') return;
  if (_cache[src] === 'loading') return;
  _cache[src] = 'loading';

  const v = document.createElement('video');
  v.muted = true; v.playsInline = true; v.preload = 'auto'; v.crossOrigin = 'anonymous';

  const notify = (val) => {
    _cache[src] = val;
    _subs[src]?.forEach(fn => fn(val));
  };

  const tryCapture = () => {
    try {
      const c = document.createElement('canvas');
      c.width = v.videoWidth || 360; c.height = v.videoHeight || 640;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      notify(c.toDataURL('image/webp', 0.6));
    } catch {
      notify(src + '#thumb');
    }
    v.src = ''; v.load();
  };

  v.addEventListener('loadedmetadata', () => {
    if (v.readyState >= 2) { tryCapture(); return; }
    v.addEventListener('loadeddata', tryCapture, { once: true });
  }, { once: true });
  v.addEventListener('error', () => notify(null), { once: true });
  v.src = src;
}

VIDEOS.forEach(v => _load(v.src));

function useCarouselThumb(src) {
  const cached = _cache[src];
  const [thumb, setThumb] = useState(cached && cached !== 'loading' ? cached : null);
  useEffect(() => {
    const c = _cache[src];
    if (c && c !== 'loading') { setThumb(c); return; }
    if (!_subs[src]) _subs[src] = new Set();
    _subs[src].add(setThumb);
    _load(src);
    return () => _subs[src]?.delete(setThumb);
  }, [src]);
  return thumb;
}

function WarmBg() {
  return <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#2a2116 0%,#1a150e 50%,#111 100%)' }} />;
}

function FrozenVideo({ src }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    setReady(false); v.src = src; v.currentTime = 0.01;
    const onData = () => { v.currentTime = 0.01; };
    const onSeeked = () => setReady(true);
    v.addEventListener('loadeddata', onData, { once: true });
    v.addEventListener('seeked', onSeeked, { once: true });
    return () => { v.src = ''; };
  }, [src]);
  return (
    <>
      {!ready && <WarmBg />}
      <video ref={ref} muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.25s' }} />
    </>
  );
}

function ThumbDisplay({ src }) {
  const thumb = useCarouselThumb(src);
  if (thumb && thumb !== src + '#thumb') {
    return (
      <>
        {!thumb && <WarmBg />}
        <img src={thumb} alt="" loading="eager" className="absolute inset-0 w-full h-full object-cover" />
      </>
    );
  }
  return <FrozenVideo src={src} />;
}

function GhostCard({ src, onClick, side }) {
  return (
    <motion.div
      className="hidden lg:block absolute cursor-pointer overflow-hidden rounded-2xl"
      style={{
        width: '130px', aspectRatio: '9/16',
        [side]: 'calc(50% - 330px)',
        top: '50%', transform: 'translateY(-50%)',
        zIndex: 1, opacity: 0.45, filter: 'blur(1.5px)',
        border: '1px solid hsl(var(--glow-primary)/0.2)',
      }}
      whileHover={{ opacity: 0.72, filter: 'blur(0.5px)' }}
      onClick={onClick}
    >
      <ThumbDisplay src={src} />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
    </motion.div>
  );
}

function ActiveCard({ src }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setPlaying(false);
    const v = videoRef.current; if (!v) return;
    v.src = src; v.load();
    const onCanPlay = () => { setPlaying(true); v.play().catch(() => {}); };
    v.addEventListener('canplay', onCanPlay, { once: true });
    return () => { v.removeEventListener('canplay', onCanPlay); v.pause(); v.src = ''; };
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl">
      <div className="absolute inset-0" style={{ zIndex: 1, opacity: playing ? 0 : 1, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <ThumbDisplay src={src} />
      </div>
      <video ref={videoRef} muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 2, opacity: playing ? 1 : 0, transition: 'opacity 0.4s' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" style={{ zIndex: 3 }} />
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
    <section className="relative py-8 sm:py-12 overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%,hsl(var(--glow-primary)/0.08) 0%,transparent 70%)' }} />

      <div className="text-center mb-6 px-4">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-1">
          Real Athletes · Real Results
        </p>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl">
          Student <span className="gradient-text">Results</span>
        </h2>
      </div>

      <div className="relative flex items-center justify-center" style={{ height: 'calc(min(380px,88vw) * 16 / 9)' }}>
        <GhostCard src={VIDEOS[prevIdx].src} onClick={prev} side="right" />
        <GhostCard src={VIDEOS[nextIdx].src} onClick={next} side="left" />

        <button onClick={prev}
          className="absolute left-4 lg:left-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-all"
          style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="relative flex-shrink-0 z-10" style={{ width: 'min(340px,72vw)', aspectRatio: '9/16' }}>
          <div className="absolute pointer-events-none" style={{
            inset: '-16px', borderRadius: '32px',
            boxShadow: '0 0 80px hsl(var(--glow-primary)/0.45),0 0 160px hsl(var(--glow-primary)/0.15)',
            zIndex: 0,
          }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.88, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0" style={{ zIndex: 1 }}
            >
              <ActiveCard src={VIDEOS[active].src} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 rounded-2xl lg:rounded-3xl pointer-events-none"
            style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)', zIndex: 2 }} />
        </div>

        <button onClick={next}
          className="absolute right-4 lg:right-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-all"
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
        <span className="text-xs text-muted-foreground/50 font-body">{active + 1} / {total}</span>
      </div>

      <div className="flex justify-center mt-5">
        <Link to="/results">
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl glass border border-primary/40 text-foreground font-heading font-semibold text-sm hover:border-primary/70 transition-all"
          >
            View All Results <ArrowRight className="w-4 h-4 text-primary" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}