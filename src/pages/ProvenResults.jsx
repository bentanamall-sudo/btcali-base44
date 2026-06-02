import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, ArrowRight, Trophy } from 'lucide-react';
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

// ── Thumbnail generator hook ───────────────────────────────────────────────────
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
        c.width = v.videoWidth || 360;
        c.height = v.videoHeight || 640;
        c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
        setThumb(c.toDataURL('image/jpeg', 0.7));
      } catch { setThumb('__fb__'); }
      v.src = '';
    }, { once: true });
    v.addEventListener('error', () => setThumb('__fb__'), { once: true });
  }, [src]);
  return thumb;
}

// ── Shimmer placeholder ────────────────────────────────────────────────────────
function Shimmer({ className = '', style = {} }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        background: 'linear-gradient(135deg,#1a1a1a 0%,#111 50%,#1a1a1a 100%)',
        backgroundSize: '200% 200%',
        animation: 'shimmer-bg 1.8s ease infinite',
        ...style,
      }}
    />
  );
}

// ── Thumbnail-only tile ────────────────────────────────────────────────────────
function ThumbTile({ src, isActive, onClick, className = '', style = {} }) {
  const thumb = useThumb(src);
  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={style}
      onClick={onClick}
    >
      {thumb && thumb !== '__fb__'
        ? <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
        : <Shimmer />
      }
      {/* Dim overlay for inactive */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.45)', opacity: isActive ? 0 : 1 }}
      />
      {/* Active gold border */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ border: '2px solid hsl(var(--primary))', boxShadow: '0 0 12px hsl(var(--glow-primary)/0.6)' }}
        />
      )}
    </div>
  );
}

// ── Large centre video card ────────────────────────────────────────────────────
function CentreVideo({ src }) {
  const thumb = useThumb(src);
  const [ready, setReady] = useState(false);
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      {thumb && thumb !== '__fb__'
        ? <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: ready ? 0 : 1, transition: 'opacity 0.4s' }} />
        : <Shimmer />
      }
      <video
        key={src}
        src={src}
        autoPlay muted loop playsInline preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// ── Orbital thumbnail — positioned by angle with depth scale ──────────────────
// Angles go 0–360, items at the "back" (top of circle) are smaller/dimmer
function OrbitalThumb({ src, angleDeg, orbitRadiusX, orbitRadiusY, isActive, onClick }) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  // depth: items at top (angle=0 after offset) are behind, bottom are in front
  const depth = (Math.sin(rad) + 1) / 2; // 0 = back, 1 = front
  const scale = 0.72 + depth * 0.34; // 0.72 → 1.06
  const opacity = isActive ? 0.15 : 0.5 + depth * 0.45; // active slot fades out
  const blur = isActive ? 4 : (1 - depth) * 2;
  const zIndex = isActive ? 0 : Math.round(depth * 10) + 1;

  const thumbW = 68;
  const thumbH = thumbW * (16 / 9);
  const x = Math.cos(rad) * orbitRadiusX;
  const y = Math.sin(rad) * orbitRadiusY;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: thumbW,
        height: thumbH,
        left: `calc(50% + ${x}px - ${thumbW / 2}px)`,
        top: `calc(50% + ${y}px - ${thumbH / 2}px)`,
        zIndex,
        transformOrigin: 'center',
      }}
      animate={{ scale, opacity, filter: `blur(${blur}px)` }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      whileHover={isActive ? {} : { scale: scale * 1.15, opacity: 1, filter: 'blur(0px)' }}
    >
      <ThumbTile src={src} isActive={false} className="w-full h-full rounded-xl" />
    </motion.div>
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
    const diff = idx - active;
    const shortDiff = ((diff + total / 2) % total) - total / 2;
    setRotationOffset(r => r + (shortDiff * 360 / total));
    setActive(idx);
  }, [active, total]);

  // Keyboard + wheel navigation
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
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    touchStart.current = null;
  };

  const orbitRadiusX = 340;
  const orbitRadiusY = 210;

  return (
    <div
      className="min-h-screen py-8 px-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
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

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP: Orbital + large centre video
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Orbital arena — fixed size container centred on page */}
        <div className="relative mx-auto" style={{ width: '900px', height: '780px' }}>

          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '500px', height: '500px',
              left: 'calc(50% - 250px)', top: 'calc(50% - 250px)',
              background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Orbital thumbnails — rotated by rotationOffset */}
          {RESULTS_VIDEOS.map((v, i) => {
            const baseAngle = (i / total) * 360;
            const displayAngle = baseAngle + rotationOffset;
            return (
              <OrbitalThumb
                key={i}
                src={v.src}
                angleDeg={displayAngle}
                orbitRadiusX={orbitRadiusX}
                orbitRadiusY={orbitRadiusY}
                isActive={i === active}
                onClick={() => goTo(i)}
              />
            );
          })}

          {/* ── Centre video — large, dominant ── */}
          <div
            className="absolute"
            style={{
              width: '300px',
              aspectRatio: '9/16',
              left: 'calc(50% - 150px)',
              top: 'calc(50% - 267px)',
              zIndex: 20,
            }}
          >
            {/* Glow behind card */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-20px',
                borderRadius: '32px',
                boxShadow: '0 0 80px hsl(var(--glow-primary)/0.5), 0 0 160px hsl(var(--glow-primary)/0.18)',
                zIndex: 0,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.82, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ zIndex: 1 }}
              >
                <CentreVideo src={RESULTS_VIDEOS[active].src} />
              </motion.div>
            </AnimatePresence>
            {/* Gold border */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ border: '1.5px solid hsl(var(--glow-primary)/0.65)', zIndex: 2 }}
            />
          </div>

          {/* ── Arrows ── */}
          <button
            onClick={prev}
            className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary hover:glow-primary transition-all"
            style={{ left: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary hover:glow-primary transition-all"
            style={{ right: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}
          >
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
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all rounded-full"
                style={{
                  width: i === active ? '22px' : '6px',
                  height: '6px',
                  background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE: Large swipeable card + thumbnail strip
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Main card */}
        <div
          className="relative mx-auto mb-5"
          style={{ width: 'min(310px, 88vw)', aspectRatio: '9/16' }}
        >
          <div
            className="absolute pointer-events-none"
            style={{ inset: '-12px', borderRadius: '28px', boxShadow: '0 0 60px hsl(var(--glow-primary)/0.35)' }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.92, x: -30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <CentreVideo src={RESULTS_VIDEOS[active].src} />
            </motion.div>
          </AnimatePresence>
          {/* Gold border */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)' }}
          />
          {/* Mobile arrows — inside card edges */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid hsl(var(--glow-primary)/0.3)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white mx-auto" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid hsl(var(--glow-primary)/0.3)' }}
          >
            <ChevronRight className="w-4 h-4 text-white mx-auto" />
          </button>
          {/* Counter badge */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid hsl(var(--glow-primary)/0.3)' }}
          >
            <span className="font-heading font-bold text-xs gradient-text">{active + 1}</span>
            <span className="text-white/50 text-xs"> / {total}</span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none' }}>
          {RESULTS_VIDEOS.map((v, i) => (
            <ThumbTile
              key={i}
              src={v.src}
              isActive={i === active}
              onClick={() => goTo(i)}
              className="flex-shrink-0 rounded-xl"
              style={{ width: '52px', height: '92px' }}
            />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
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