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
// Global thumbnail cache — keyed by src, values: null | 'loading' | dataURL
// Uses canvas extraction in a module-level worker pattern.
// Falls back to a warm gradient if CORS blocks canvas.
// ─────────────────────────────────────────────────────────────────────────────
const thumbCache = {};
const thumbSubs = {}; // src → Set of setState callbacks

function loadThumb(src) {
  if (thumbCache[src] && thumbCache[src] !== 'loading') return;
  if (thumbCache[src] === 'loading') return;
  thumbCache[src] = 'loading';

  const v = document.createElement('video');
  v.muted = true;
  v.playsInline = true;
  v.preload = 'auto';
  v.crossOrigin = 'anonymous';

  const notify = (val) => {
    thumbCache[src] = val;
    thumbSubs[src]?.forEach(fn => fn(val));
  };

  const tryCapture = () => {
    try {
      const c = document.createElement('canvas');
      c.width = v.videoWidth || 360;
      c.height = v.videoHeight || 640;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      const url = c.toDataURL('image/webp', 0.6);
      notify(url);
    } catch {
      // CORS blocked canvas — fall back to the src itself
      notify(src + '#thumb');
    }
    v.src = '';
    v.load();
  };

  const onReady = () => {
    if (v.readyState >= 2) { tryCapture(); return; }
    v.addEventListener('loadeddata', tryCapture, { once: true });
  };

  v.addEventListener('loadedmetadata', onReady, { once: true });
  v.addEventListener('error', () => notify(null), { once: true });
  v.src = src;
}

// Kick off ALL thumbnail extractions immediately on module load
RESULTS_VIDEOS.forEach(v => loadThumb(v.src));

function useThumb(src) {
  const cached = thumbCache[src];
  const [thumb, setThumb] = useState(
    cached && cached !== 'loading' ? cached : null
  );

  useEffect(() => {
    // Already resolved
    const c = thumbCache[src];
    if (c && c !== 'loading') { setThumb(c); return; }

    // Subscribe to future resolution
    if (!thumbSubs[src]) thumbSubs[src] = new Set();
    thumbSubs[src].add(setThumb);
    loadThumb(src);

    return () => thumbSubs[src]?.delete(setThumb);
  }, [src]);

  return thumb;
}

// ── Render a thumbnail — image if we have a dataURL, video fallback otherwise ─
function ThumbDisplay({ src, style = {}, className = '' }) {
  const thumb = useThumb(src);

  if (thumb && thumb !== src + '#thumb') {
    // We have a real canvas-captured dataURL
    return (
      <>
        {!thumb && <WarmBg />}
        <img
          src={thumb}
          alt=""
          loading="eager"
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          style={style}
        />
      </>
    );
  }

  // CORS fallback — use a frozen video element
  return <FrozenVideo src={src} style={style} className={className} />;
}

// ── Warm gradient placeholder (no black) ───────────────────────────────────────
function WarmBg() {
  return (
    <div className="absolute inset-0"
      style={{ background: 'linear-gradient(160deg,#2a2116 0%,#1a150e 50%,#111 100%)' }} />
  );
}

// ── Frozen video: preload=auto, paused at frame 0, acts as thumbnail ──────────
function FrozenVideo({ src, style = {}, className = '' }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    setReady(false);
    v.src = src;
    v.currentTime = 0.01;
    const onData = () => { v.currentTime = 0.01; };
    const onSeeked = () => setReady(true);
    v.addEventListener('loadeddata', onData, { once: true });
    v.addEventListener('seeked', onSeeked, { once: true });
    return () => { v.src = ''; };
  }, [src]);

  return (
    <>
      {!ready && <WarmBg />}
      <video
        ref={ref}
        muted playsInline preload="auto"
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.25s', ...style }}
      />
    </>
  );
}

// ── Centre active video: thumbnail stays until canplay fires ──────────────────
function CentreVideo({ src }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setPlaying(false);
    const v = videoRef.current;
    if (!v) return;
    v.src = src;
    v.load();
    const onCanPlay = () => {
      setPlaying(true);
      v.play().catch(() => {});
    };
    v.addEventListener('canplay', onCanPlay, { once: true });
    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.pause();
      v.src = '';
    };
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      {/* Thumbnail layer — always on top until video ready */}
      <div className="absolute inset-0" style={{ zIndex: 1, opacity: playing ? 0 : 1, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <ThumbDisplay src={src} />
      </div>
      {/* Playing video */}
      <video
        ref={videoRef}
        muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 2, opacity: playing ? 1 : 0, transition: 'opacity 0.4s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" style={{ zIndex: 3 }} />
    </div>
  );
}

// ── Orbit thumbnail tile ───────────────────────────────────────────────────────
function OrbitalThumb({ src, angleDeg, orbitRadiusX, orbitRadiusY, isActive, onClick }) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const sinVal = Math.sin(rad);
  const depth = (sinVal + 1) / 2;

  const baseScale = 0.80 + depth * 0.25;
  const opacity   = isActive ? 0 : 0.75 + depth * 0.25;
  const blur      = isActive ? 6 : (1 - depth) * 1.0;
  const zIndex    = isActive ? 0 : Math.round(depth * 12) + 2;

  const w = 72;
  const h = Math.round(w * 16 / 9);
  const x = Math.cos(rad) * orbitRadiusX;
  const y = Math.sin(rad) * orbitRadiusY;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: w, height: h,
        left: `calc(50% + ${x}px - ${w / 2}px)`,
        top: `calc(50% + ${y}px - ${h / 2}px)`,
        zIndex,
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1.5px solid hsl(var(--glow-primary)/0.5)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
      }}
      animate={{ scale: baseScale, opacity, filter: `blur(${blur}px)` }}
      whileHover={isActive ? {} : {
        scale: baseScale * 1.2,
        opacity: 1,
        filter: 'blur(0px)',
        boxShadow: '0 0 24px hsl(var(--glow-primary)/0.8),0 4px 20px rgba(0,0,0,0.7)',
        zIndex: 30,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <ThumbDisplay src={src} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.35),transparent)' }} />
    </motion.div>
  );
}

// ── Mobile thumbnail strip tile ────────────────────────────────────────────────
function MobileThumbTile({ src, isActive, onClick }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-xl cursor-pointer"
      style={{
        width: '52px', height: '92px',
        border: isActive ? '2px solid hsl(var(--primary))' : '1.5px solid hsl(var(--glow-primary)/0.3)',
        boxShadow: isActive ? '0 0 10px hsl(var(--glow-primary)/0.5)' : 'none',
        transition: 'border-color 0.2s,box-shadow 0.2s',
      }}
      onClick={onClick}
    >
      <ThumbDisplay src={src} />
      {!isActive && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

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
    <div className="min-h-screen py-8 px-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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

      {/* ══ DESKTOP ══════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ width: '900px', height: '780px' }}>
          <div className="absolute pointer-events-none" style={{
            width: '440px', height: '440px',
            left: 'calc(50% - 220px)', top: 'calc(50% - 220px)',
            background: 'radial-gradient(circle,hsl(var(--glow-primary)/0.12) 0%,transparent 70%)',
            filter: 'blur(50px)',
          }} />

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

          <div className="absolute" style={{
            width: '300px', aspectRatio: '9/16',
            left: 'calc(50% - 150px)', top: 'calc(50% - 267px)',
            zIndex: 20,
          }}>
            <div className="absolute pointer-events-none" style={{
              inset: '-24px', borderRadius: '36px',
              boxShadow: '0 0 80px hsl(var(--glow-primary)/0.5),0 0 160px hsl(var(--glow-primary)/0.18)',
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
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
              border: '1.5px solid hsl(var(--glow-primary)/0.7)', zIndex: 2,
            }} />
          </div>

          <button onClick={prev}
            className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-all"
            style={{ left: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}>
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button onClick={next}
            className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-all"
            style={{ right: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}>
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

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

      {/* ══ MOBILE ═══════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        <div className="relative mx-auto mb-5" style={{ width: 'min(310px,88vw)', aspectRatio: '9/16' }}>
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
          <button onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid hsl(var(--glow-primary)/0.35)' }}>
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid hsl(var(--glow-primary)/0.35)' }}>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid hsl(var(--glow-primary)/0.3)' }}>
            <span className="font-heading font-bold text-xs gradient-text">{active + 1}</span>
            <span className="text-white/50 text-xs"> / {total}</span>
          </div>
        </div>

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
          <Link to="/apply"><GlowButton size="lg">Apply for Coaching <ArrowRight className="w-4 h-4" /></GlowButton></Link>
          <Link to="/tutorials"><GlowButton variant="secondary" size="lg">Start Free Tutorials</GlowButton></Link>
        </div>
      </motion.div>
    </div>
  );
}