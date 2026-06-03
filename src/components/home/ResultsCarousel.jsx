import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';
import { useThumb, prewarmPriority } from '../../lib/thumbCache';

const VIDEOS = RESULTS_VIDEOS.slice(0, 8);

function WarmBg() {
  return (
    <div className="absolute inset-0"
      style={{ background: 'linear-gradient(160deg,#2a2116 0%,#1a150e 50%,#111 100%)' }} />
  );
}

function ThumbImg({ src, priority = false }) {
  const url = useThumb(src);
  if (!url) return <WarmBg />;
  if (url === '__video__') {
    return (
      <video src={src} muted playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        ref={el => { if (el) el.currentTime = 0.01; }} />
    );
  }
  return (
    <img src={url} alt="" draggable={false}
      loading={priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchPriority: 'high' } : {})}
      className="absolute inset-0 w-full h-full object-cover" />
  );
}

// Ghost cards — thumbnail only, no video, CSS opacity
function GhostCard({ src, onClick, side }) {
  return (
    <div
      className="hidden lg:block absolute cursor-pointer overflow-hidden rounded-2xl"
      style={{
        width: '130px', aspectRatio: '9/16',
        [side]: 'calc(50% - 330px)',
        top: '50%', transform: 'translateY(-50%)',
        zIndex: 1,
        opacity: 0.45,
        border: '1px solid hsl(var(--glow-primary)/0.2)',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
      onMouseLeave={e => e.currentTarget.style.opacity = '0.45'}
      onClick={onClick}
    >
      <ThumbImg src={src} />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}

// Active card — ONE video element total
function ActiveCard({ src }) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => { prewarmPriority(src); }, [src]);

  useEffect(() => {
    setVideoReady(false);
    const v = videoRef.current;
    if (!v) return;
    const t = setTimeout(() => {
      v.src = src;
      v.load();
      const onCanPlay = () => {
        setVideoReady(true);
        v.play().catch(() => {});
      };
      v.addEventListener('canplay', onCanPlay, { once: true });
    }, 50);
    return () => {
      clearTimeout(t);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl">
      <div className="absolute inset-0" style={{ zIndex: 1, opacity: videoReady ? 0 : 1, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <ThumbImg src={src} priority />
      </div>
      <video ref={videoRef} muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 2, opacity: videoReady ? 1 : 0, transition: 'opacity 0.4s' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" style={{ zIndex: 3 }} />
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
              transition={{ duration: 0.28 }}
              className="absolute inset-0"
              style={{ zIndex: 1 }}
            >
              <ActiveCard src={VIDEOS[active].src} />
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