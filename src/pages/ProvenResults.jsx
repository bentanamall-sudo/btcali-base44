import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react';
import GlowButton from '../components/GlowButton';

// ── Video list ─────────────────────────────────────────────────────────────────
export const RESULTS_VIDEOS = [
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/30726ddef_C2235DA5-CFA6-4B66-A712-1CFD414AEE34.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/ab40f3e73_3DBD7B8B-0985-4366-803A-6BF5FE6E16DA.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/d03b8e901_87AA93C8-C62D-44CB-92B4-25DE7D6EB9EF.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/33e465fb1_8FB2940B-72DC-4171-B5BD-3B262CA0230A.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/9bce54fa0_F8C3EC32-6F28-43F9-9274-5DCA2E4AD3AE.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/b29797e50_C52B9D44-CCC6-4C11-B563-D29E72D5E742.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/a7025db1d_C88E406D-F072-4021-9F9D-376E1AE850BA.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/acb324d63_D9DC1424-7087-4C6F-BC4C-83A843896E19.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7c2816870_BF734FD2-A5B6-4EA6-9DFC-3725ABB1BAAD.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a0d49733_D05272AD-F171-4C80-8119-90847BFEFB36.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/bb51770b0_61F09AF3-D0FC-44CC-8EC6-6037B4540D78.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7da5945e5_2882F251-A505-4D09-9090-44FCD8DAEDB4.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a47f6089_5DDF0CFF-6FD2-432E-B713-A609FBBD691A.mp4' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/8062fad09_5fed1466edd6499c94832fcfc468d25c.mov' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Global thumbnail cache — shared across all instances, persists across renders
// ─────────────────────────────────────────────────────────────────────────────
const thumbCache = {};
const thumbCallbacks = {};

function requestThumb(src, cb) {
  if (thumbCache[src]) { cb(thumbCache[src]); return; }
  if (thumbCallbacks[src]) { thumbCallbacks[src].push(cb); return; }

  thumbCallbacks[src] = [cb];
  const v = document.createElement('video');
  v.crossOrigin = 'anonymous';
  v.muted = true;
  v.playsInline = true;
  v.preload = 'metadata';

  const finish = (result) => {
    thumbCache[src] = result;
    v.src = '';
    const cbs = thumbCallbacks[src] || [];
    delete thumbCallbacks[src];
    cbs.forEach(fn => fn(result));
  };

  v.addEventListener('loadedmetadata', () => { v.currentTime = 0.01; }, { once: true });
  v.addEventListener('seeked', () => {
    try {
      const c = document.createElement('canvas');
      c.width = v.videoWidth || 360;
      c.height = v.videoHeight || 640;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      finish(c.toDataURL('image/jpeg', 0.75));
    } catch { finish('__fb__'); }
  }, { once: true });
  v.addEventListener('error', () => finish('__fb__'), { once: true });
  v.src = src;
}

// Pre-generate ALL thumbnails immediately on module load — parallel, non-blocking
RESULTS_VIDEOS.forEach(v => requestThumb(v.src, () => {}));

function useThumb(src) {
  const [thumb, setThumb] = useState(() => thumbCache[src] || null);
  useEffect(() => {
    if (thumbCache[src]) { setThumb(thumbCache[src]); return; }
    requestThumb(src, setThumb);
  }, [src]);
  return thumb;
}

// ── Warm gradient shown only while canvas thumb is being generated ─────────────
function WarmPlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(160deg, #2a2116 0%, #1a150e 40%, #111 100%)',
      }}
    />
  );
}

// ── Thumbnail image with immediate display ─────────────────────────────────────
function ThumbImg({ thumb, className = '', style = {} }) {
  if (!thumb || thumb === '__fb__') return <WarmPlaceholder />;
  return (
    <img
      src={thumb}
      alt=""
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={style}
    />
  );
}

// ── Orbit thumbnail tile — fully visible, bright, clickable ───────────────────
function OrbitalThumb({ src, angleDeg, orbitRadiusX, orbitRadiusY, isActive, onClick }) {
  const thumb = useThumb(src);
  const rad = ((angleDeg - 90) * Math.PI) / 180;

  // Depth: sin gives -1 (top/back) to +1 (bottom/front)
  const sinVal = Math.sin(rad);
  const depth = (sinVal + 1) / 2; // 0=back, 1=front

  const baseScale = 0.78 + depth * 0.28;     // 0.78 → 1.06
  const opacity   = isActive ? 0 : 0.72 + depth * 0.28; // 0.72 → 1.0  (never dark!)
  const blur      = isActive ? 6 : (1 - depth) * 1.2;   // max 1.2px blur at back
  const zIndex    = isActive ? 0 : Math.round(depth * 12) + 2;

  const w = 72;
  const h = Math.round(w * 16 / 9);
  const x = Math.cos(rad) * orbitRadiusX;
  const y = Math.sin(rad) * orbitRadiusY;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        width: w, height: h,
        left: `calc(50% + ${x}px - ${w / 2}px)`,
        top: `calc(50% + ${y}px - ${h / 2}px)`,
        zIndex,
        transformOrigin: 'center',
        borderRadius: '10px',
        overflow: 'hidden',
        // Always-on subtle gold border for every orbit item
        border: '1.5px solid hsl(var(--glow-primary)/0.45)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      }}
      animate={{
        scale: baseScale,
        opacity,
        filter: `blur(${blur}px)`,
      }}
      whileHover={isActive ? {} : {
        scale: baseScale * 1.18,
        opacity: 1,
        filter: 'blur(0px)',
        boxShadow: '0 0 20px hsl(var(--glow-primary)/0.7), 0 4px 20px rgba(0,0,0,0.6)',
        borderColor: 'hsl(var(--primary))',
        zIndex: 30,
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <ThumbImg thumb={thumb} />
      {/* Very light gradient at bottom for depth — not dark enough to hide content */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }} />
    </motion.div>
  );
}

// ── Centre video — thumbnail always visible until video ready ──────────────────
function CentreVideo({ src }) {
  const thumb = useThumb(src);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  // Reset ready state when src changes
  useEffect(() => { setVideoReady(false); }, [src]);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      {/* Thumbnail — always rendered, only hidden after video is truly ready */}
      <ThumbImg
        thumb={thumb}
        style={{ opacity: videoReady ? 0 : 1, transition: 'opacity 0.5s ease' }}
      />

      {/* Video — starts loading immediately, fades in only on canplay */}
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
        style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ProvenResults() {
  const [active, setActive] = useState(0);
  const [rotationOffset, setRotationOffset] = useState(0);
  const total = RESULTS_VIDEOS.length;

  const prev = useCallback(() => {
    setActive(i => (i - 1 + total) % total);
    setRotationOffset(r => r - 360 / total);
  }, [total]);

  const next = useCallback(() => {
    setActive(i => (i + 1) % total);
    setRotationOffset(r => r + 360 / total);
  }, [total]);

  const goTo = useCallback((idx) => {
    if (idx === active) return;
    const diff = idx - active;
    const shortDiff = ((diff + total / 2) % total) - total / 2;
    setRotationOffset(r => r + (shortDiff * 360 / total));
    setActive(idx);
  }, [active, total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Touch swipe
  const touchStart = useRef(null);
  const onTouchStart = useCallback((e) => { touchStart.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchStart.current = null;
  }, [prev, next]);

  const orbitRadiusX = 340;
  const orbitRadiusY = 210;

  return (
    <div
      className="min-h-screen py-8 px-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-2">
          Real Athletes · Real Results
        </p>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-2">
          Student <span className="gradient-text">Results</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
          Real BTCALI athlete transformations and progress.
        </p>
      </motion.div>

      {/* ══ DESKTOP: Orbit ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ width: '900px', height: '780px' }}>

          {/* Soft ambient glow — not too strong */}
          <div className="absolute pointer-events-none" style={{
            width: '440px', height: '440px',
            left: 'calc(50% - 220px)', top: 'calc(50% - 220px)',
            background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />

          {/* Orbit items */}
          {RESULTS_VIDEOS.map((v, i) => (
            <OrbitalThumb
              key={i}
              src={v.src}
              angleDeg={(i / total) * 360 + rotationOffset}
              orbitRadiusX={orbitRadiusX}
              orbitRadiusY={orbitRadiusY}
              isActive={i === active}
              onClick={() => goTo(i)}
            />
          ))}

          {/* Centre video */}
          <div className="absolute" style={{
            width: '300px', aspectRatio: '9/16',
            left: 'calc(50% - 150px)', top: 'calc(50% - 267px)',
            zIndex: 20,
          }}>
            {/* Glow halo */}
            <div className="absolute pointer-events-none" style={{
              inset: '-24px', borderRadius: '36px',
              boxShadow: '0 0 80px hsl(var(--glow-primary)/0.5), 0 0 160px hsl(var(--glow-primary)/0.18)',
            }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.84, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -12 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ zIndex: 1 }}
              >
                <CentreVideo src={RESULTS_VIDEOS[active].src} />
              </motion.div>
            </AnimatePresence>
            {/* Gold border */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
              border: '1.5px solid hsl(var(--glow-primary)/0.7)',
              zIndex: 2,
            }} />
          </div>

          {/* Arrows */}
          <button onClick={prev} className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-all"
            style={{ left: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}>
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button onClick={next} className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-all"
            style={{ right: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}>
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Counter + dots */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="font-heading font-bold text-lg">
            <span className="gradient-text">{active + 1}</span>
            <span className="text-muted-foreground/50"> / {total}</span>
          </p>
          <div className="flex gap-1.5">
            {RESULTS_VIDEOS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all" style={{
                width: i === active ? '22px' : '6px', height: '6px',
                background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.3)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE: Swipe card + strip ══════════════════════════════════════════ */}
      <div className="lg:hidden">
        <div className="relative mx-auto mb-5" style={{ width: 'min(310px, 88vw)', aspectRatio: '9/16' }}>
          <div className="absolute pointer-events-none" style={{
            inset: '-12px', borderRadius: '28px',
            boxShadow: '0 0 60px hsl(var(--glow-primary)/0.35)',
          }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <CentreVideo src={RESULTS_VIDEOS[active].src} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)' }} />
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid hsl(var(--glow-primary)/0.35)' }}>
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid hsl(var(--glow-primary)/0.35)' }}>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid hsl(var(--glow-primary)/0.3)' }}>
            <span className="font-heading font-bold text-xs gradient-text">{active + 1}</span>
            <span className="text-white/50 text-xs"> / {total}</span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none' }}>
          {RESULTS_VIDEOS.map((v, i) => (
            <MobileThumbTile key={i} src={v.src} isActive={i === active} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl glass text-center py-12 px-6 glow-border relative overflow-hidden mt-12 max-w-3xl mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
        <Users className="w-10 h-10 text-primary mx-auto mb-4 relative z-10" />
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3 relative z-10">
          Your Transformation <span className="gradient-text">Starts Now</span>
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-6 relative z-10">
          Join athletes already training with BTCALI. Apply for coaching or start free today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link to="/apply">
            <GlowButton size="lg">Apply for Coaching <ArrowRight className="w-4 h-4" /></GlowButton>
          </Link>
          <Link to="/tutorials">
            <GlowButton variant="secondary" size="lg">Start Free Tutorials</GlowButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ── Mobile thumbnail strip tile ────────────────────────────────────────────────
function MobileThumbTile({ src, isActive, onClick }) {
  const thumb = useThumb(src);
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-xl cursor-pointer"
      style={{
        width: '52px', height: '92px',
        border: isActive ? '2px solid hsl(var(--primary))' : '1.5px solid hsl(var(--glow-primary)/0.3)',
        boxShadow: isActive ? '0 0 10px hsl(var(--glow-primary)/0.5)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onClick={onClick}
    >
      <ThumbImg thumb={thumb} />
      {!isActive && <div className="absolute inset-0 bg-black/25 pointer-events-none" />}
    </div>
  );
}