import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';

const VIDEOS = RESULTS_VIDEOS.slice(0, 8);

// ── Thumbnail hook — reads from the global cache populated by ProvenResults ────
// The cache (thumbCache / thumbListeners / requestThumb) is module-level in
// ProvenResults. We re-implement a lightweight local version here that mirrors
// the same interface so the homepage carousel also benefits.
const _hpCache = {};
const _hpListeners = {};

function _hpRequest(src) {
  if (_hpCache[src]) return;
  _hpCache[src] = '__loading__';
  const v = document.createElement('video');
  v.crossOrigin = 'anonymous';
  v.muted = true; v.playsInline = true; v.preload = 'metadata'; v.src = src;
  const finish = (r) => {
    _hpCache[src] = r; v.src = '';
    if (_hpListeners[src]) { _hpListeners[src].forEach(fn => fn(r)); _hpListeners[src].clear(); }
  };
  v.addEventListener('loadedmetadata', () => { v.currentTime = 0.01; }, { once: true });
  v.addEventListener('seeked', () => {
    try {
      const c = document.createElement('canvas');
      c.width = v.videoWidth || 360; c.height = v.videoHeight || 640;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      finish(c.toDataURL('image/jpeg', 0.72));
    } catch { finish('__fb__'); }
  }, { once: true });
  v.addEventListener('error', () => finish('__fb__'), { once: true });
}

// Pre-kick all carousel thumbs on module load
VIDEOS.forEach(v => _hpRequest(v.src));

function useThumb(src) {
  const cached = _hpCache[src];
  const [thumb, setThumb] = useState(cached && cached !== '__loading__' ? cached : null);
  useEffect(() => {
    if (_hpCache[src] && _hpCache[src] !== '__loading__') { setThumb(_hpCache[src]); return; }
    if (!_hpListeners[src]) _hpListeners[src] = new Set();
    _hpListeners[src].add(setThumb);
    _hpRequest(src);
    return () => { if (_hpListeners[src]) _hpListeners[src].delete(setThumb); };
  }, [src]);
  return thumb;
}

function Shimmer() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg,#1a1a1a,#111,#1a1a1a)', backgroundSize: '200% 200%', animation: 'shimmer-bg 1.8s ease infinite' }}
    />
  );
}

// ── Side ghost card — thumbnail only, dimmed ───────────────────────────────────
function GhostCard({ src, onClick, side }) {
  const thumb = useThumb(src);
  return (
    <motion.div
      className="hidden lg:block absolute cursor-pointer overflow-hidden rounded-2xl"
      style={{
        width: '130px',
        aspectRatio: '9/16',
        [side]: 'calc(50% - 330px)',
        top: '50%',
        transform: `translateY(-50%) ${side === 'right' ? 'translateX(0)' : 'translateX(0)'}`,
        zIndex: 1,
        opacity: 0.45,
        filter: 'blur(1.5px)',
        border: '1px solid hsl(var(--glow-primary)/0.15)',
      }}
      whileHover={{ opacity: 0.7, filter: 'blur(0.5px)' }}
      onClick={onClick}
    >
      {thumb && thumb !== '__fb__'
        ? <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
        : <Shimmer />
      }
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </motion.div>
  );
}

// ── Active card with autoplay video ───────────────────────────────────────────
function ActiveCard({ src }) {
  const thumb = useThumb(src);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(false); }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl">
      {/* Thumbnail always present — never hidden until video is truly ready */}
      {thumb && thumb !== '__fb__' ? (
        <img
          src={thumb} alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: ready ? 0 : 1, transition: 'opacity 0.5s', zIndex: 1 }}
        />
      ) : (
        <Shimmer />
      )}
      <video
        key={src}
        src={src}
        autoPlay muted loop playsInline preload="auto"
        onCanPlay={() => setReady(true)}
        onCanPlayThrough={() => setReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s', zIndex: 2 }}
      />
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

  // Touch swipe
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
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--glow-primary)/0.08) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="text-center mb-6 px-4">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-1">
          Real Athletes · Real Results
        </p>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl">
          Student <span className="gradient-text">Results</span>
        </h2>
      </div>

      {/* Carousel arena */}
      <div className="relative flex items-center justify-center" style={{ height: 'calc(min(380px, 88vw) * 16 / 9)' }}>

        {/* Ghost left */}
        <GhostCard src={VIDEOS[prevIdx].src} onClick={prev} side="right" />

        {/* Ghost right */}
        <GhostCard src={VIDEOS[nextIdx].src} onClick={next} side="left" />

        {/* Arrow left */}
        <button
          onClick={prev}
          className="absolute left-4 lg:left-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-all"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Main active card */}
        <div
          className="relative flex-shrink-0 z-10"
          style={{
            width: 'min(340px, 72vw)',
            aspectRatio: '9/16',
          }}
        >
          {/* Gold glow halo */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-16px',
              borderRadius: '32px',
              boxShadow: '0 0 80px hsl(var(--glow-primary)/0.45), 0 0 160px hsl(var(--glow-primary)/0.15)',
              zIndex: 0,
            }}
          />
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
          {/* Gold border */}
          <div
            className="absolute inset-0 rounded-2xl lg:rounded-3xl pointer-events-none"
            style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)', zIndex: 2 }}
          />
        </div>

        {/* Arrow right */}
        <button
          onClick={next}
          className="absolute right-4 lg:right-[calc(50%-310px)] z-30 w-11 h-11 rounded-full glass border border-primary/35 flex items-center justify-center hover:border-primary transition-all"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Dots + counter */}
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

      {/* View All */}
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