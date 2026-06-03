import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react';
import GlowButton from '../components/GlowButton';

// ── Video + thumbnail list ─────────────────────────────────────────────────────
export const RESULTS_VIDEOS = [
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/30726ddef_C2235DA5-CFA6-4B66-A712-1CFD414AEE34.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/13036ca1b_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/ab40f3e73_3DBD7B8B-0985-4366-803A-6BF5FE6E16DA.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/560b41a4e_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/d03b8e901_87AA93C8-C62D-44CB-92B4-25DE7D6EB9EF.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/8f772d440_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/33e465fb1_8FB2940B-72DC-4171-B5BD-3B262CA0230A.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/4d080a500_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/9bce54fa0_F8C3EC32-6F28-43F9-9274-5DCA2E4AD3AE.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/b4ca08603_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/b29797e50_C52B9D44-CCC6-4C11-B563-D29E72D5E742.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/9294d6e8c_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/a7025db1d_C88E406D-F072-4021-9F9D-376E1AE850BA.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/a96d52273_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/acb324d63_D9DC1424-7087-4C6F-BC4C-83A843896E19.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/334bed7ab_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7c2816870_BF734FD2-A5B6-4EA6-9DFC-3725ABB1BAAD.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/e70ea0b67_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a0d49733_D05272AD-F171-4C80-8119-90847BFEFB36.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/3042f6aad_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/bb51770b0_61F09AF3-D0FC-44CC-8EC6-6037B4540D78.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/562d9cce6_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7da5945e5_2882F251-A505-4D09-9090-44FCD8DAEDB4.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/752deea19_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a47f6089_5DDF0CFF-6FD2-432E-B713-A609FBBD691A.mp4', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/54583ecb0_generated_image.png' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/8062fad09_5fed1466edd6499c94832fcfc468d25c.mov', thumb: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/0bc012989_generated_image.png' },
];

// ── Active video — thumbnail shown instantly, video fades in ──────────────────
function ActiveVideo({ src, thumb }) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setReady(false);
    const v = videoRef.current;
    if (!v) return;
    v.src = src;
    v.load();
    const onCanPlay = () => { setReady(true); v.play().catch(() => {}); };
    v.addEventListener('canplay', onCanPlay, { once: true });
    return () => { v.pause(); v.removeAttribute('src'); v.load(); };
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 0 : 1, transition: 'opacity 0.3s', zIndex: 1 }} />
      <video ref={videoRef} muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s', zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" style={{ zIndex: 3 }} />
    </div>
  );
}

// ── Orbit thumbnail — real <img>, zero video ──────────────────────────────────
function OrbitalThumb({ thumb, angleDeg, orbitRadiusX, orbitRadiusY, isActive, onClick }) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const depth = (sin + 1) / 2;
  const w = 72, h = Math.round(w * 16 / 9);
  const x = Math.cos(rad) * orbitRadiusX;
  const y = sin * orbitRadiusY;
  const scale = isActive ? 0 : 0.82 + depth * 0.24;
  const opacity = isActive ? 0 : 0.75 + depth * 0.25;
  const zIndex = isActive ? 0 : Math.round(depth * 12) + 2;

  return (
    <div className="absolute cursor-pointer overflow-hidden" onClick={onClick}
      style={{
        width: w, height: h,
        left: `calc(50% + ${x}px - ${w / 2}px)`,
        top: `calc(50% + ${y}px - ${h / 2}px)`,
        zIndex, borderRadius: '10px',
        border: '1.5px solid hsl(var(--glow-primary)/0.5)',
        transform: `scale(${scale})`, opacity,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
      }}>
      <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}

// ── Mobile thumbnail tile — real <img> ────────────────────────────────────────
function MobileThumbTile({ thumb, isActive, onClick }) {
  return (
    <div className="relative flex-shrink-0 rounded-xl cursor-pointer overflow-hidden" onClick={onClick}
      style={{
        width: '54px', height: '96px',
        border: isActive ? '2px solid hsl(var(--primary))' : '1.5px solid hsl(var(--glow-primary)/0.3)',
        opacity: isActive ? 1 : 0.65,
        transition: 'border-color 0.2s, opacity 0.2s',
        flexShrink: 0,
      }}>
      <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
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
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  return (
    <div className="min-h-screen py-8 px-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="text-center mb-8">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-2">
          Real Athletes · Real Results
        </p>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-2">
          Student <span className="gradient-text">Results</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
          Real BTCALI athlete transformations and progress.
        </p>
      </div>

      {/* ══ DESKTOP ══ */}
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ width: '900px', height: '780px' }}>
          {RESULTS_VIDEOS.map((v, i) => (
            <OrbitalThumb key={i} thumb={v.thumb}
              angleDeg={(i / total) * 360 + rotationOffset}
              orbitRadiusX={340} orbitRadiusY={210}
              isActive={i === active} onClick={() => goTo(i)} />
          ))}
          <div className="absolute" style={{ width: '300px', aspectRatio: '9/16', left: 'calc(50% - 150px)', top: 'calc(50% - 267px)', zIndex: 20 }}>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="absolute inset-0">
                <ActiveVideo src={RESULTS_VIDEOS[active].src} thumb={RESULTS_VIDEOS[active].thumb} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: '1.5px solid hsl(var(--glow-primary)/0.7)', zIndex: 30 }} />
          </div>
          <button onClick={prev} className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-colors"
            style={{ left: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}>
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button onClick={next} className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-colors"
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

      {/* ══ MOBILE ══ */}
      <div className="lg:hidden">
        <div className="relative mx-auto mb-5" style={{ width: 'min(310px,88vw)', aspectRatio: '9/16' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }} className="absolute inset-0">
              <ActiveVideo src={RESULTS_VIDEOS[active].src} thumb={RESULTS_VIDEOS[active].thumb} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)', zIndex: 10 }} />
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
        <div className="flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none' }}>
          {RESULTS_VIDEOS.map((v, i) => (
            <MobileThumbTile key={i} thumb={v.thumb} isActive={i === active} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl glass text-center py-12 px-6 glow-border relative overflow-hidden mt-12 max-w-3xl mx-auto">
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
      </div>
    </div>
  );
}