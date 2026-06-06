import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, ArrowRight, Trophy, Zap } from 'lucide-react';
import GlowButton from '../components/GlowButton';

// ── Student Wins ─────────────────────────────────────────────────────────────
export const WINS_VIDEOS = [
  { src: 'https://BTCALI.b-cdn.net/Results/9A2BD0D3-54C8-4A31-A783-4D41A28231F8.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.56.57%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/6788AB6E-2557-4044-A41E-04741FCEDEBD.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.57.07%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/1EE46107-AAE6-4CB2-BB53-E5A868222ADF.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.57.22%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/EF8173F4-B7EE-4543-9393-CDADD13BADA2.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.57.29%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/176B944E-94B7-4831-AE29-3D4DCCD2A8CE.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.57.36%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/4544DF68-9BE7-4331-B80A-AC6B771BFDBF.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.57.49%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/0F8509E9-7D7F-4230-A1C9-868BDD35408C.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.57.55%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/1FAB58FF-AB8A-408F-BBA8-DBD501995F3A.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.58.01%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/FFB21426-FF15-494D-8633-74BBD69A6DE3.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.58.08%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/7B27398B-3E9C-4A93-BDFD-F531D63F8BB9.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.58.14%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/6B70BFBC-BC86-439E-9BCF-517A8D87E1C5.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.58.21%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/0B7EAEAF-0CA5-4B2A-87E3-636580BA6632.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.58.27%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Results/377B6423-A5E3-4608-A64C-E66750032938.mp4',   thumb: 'https://BTCALI.b-cdn.net/Results/Screenshot%202026-06-06%20at%201.58.33%E2%80%AFpm.jpeg' },
];

// ── Transformations ──────────────────────────────────────────────────────────
export const TRANSFORM_VIDEOS = [
  { src: 'https://BTCALI.b-cdn.net/Transformations/648DC970-AF08-43AB-AC8E-E7A919D7B25A.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.15.31%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/F1DEC7F9-9337-4BC7-989B-0DDDB969B7C7.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.16.59%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/F007272D-79AB-455F-82D3-972E1F254A82.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.17.14%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/27FD8876-99B8-41C1-8896-76A14B301F48.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.17.30%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/1DD0D472-6470-4740-BD97-AD4945438697.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.17.42%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/5272E502-068E-4546-A13C-3D0C7C5FF9A0.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.17.51%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/C4EEBF99-6C29-42F5-B9AC-99F75D5DE84A.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.18.01%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/D087C857-18CE-43BA-B04E-377CF114FF86.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.18.14%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/A582949A-B680-490A-9967-6B784D495CA5.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.18.25%E2%80%AFpm.jpeg' },
  { src: 'https://BTCALI.b-cdn.net/Transformations/E4449B10-7664-47B4-91B7-108A836C7281.mp4',   thumb: 'https://BTCALI.b-cdn.net/Transformations/Screenshot%202026-06-06%20at%201.18.38%E2%80%AFpm.jpeg' },
];

// Keep legacy export so ResultsTeaser still works
export const RESULTS_VIDEOS = WINS_VIDEOS.map(v => ({ src: v.src, thumbnailSrc: v.thumb }));

// ── Silently prime a video into the browser cache ────────────────────────────
function primeVideo(src) {
  if (!src || typeof document === 'undefined') return;
  const v = document.createElement('video');
  v.src = src;
  v.preload = 'auto';
  v.muted = true;
  v.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none;';
  document.body.appendChild(v);
  v.load();
  setTimeout(() => {
    try { v.pause(); v.removeAttribute('src'); v.load(); document.body.removeChild(v); } catch {}
  }, 10000);
}

// ── Persistent video player — thumbnail always underneath, video fades in ────
function ActiveVideo({ src, thumb }) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);
  const prevSrc = useRef(null);

  useEffect(() => {
    if (prevSrc.current === src) return;
    prevSrc.current = src;
    setReady(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.removeAttribute('src');
    v.load();
    v.preload = 'auto';
    v.src = src;
    v.load();
    const onCanPlay = () => { setReady(true); v.play().catch(() => {}); };
    v.addEventListener('canplay', onCanPlay, { once: true });
    return () => v.removeEventListener('canplay', onCanPlay);
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      <img
        src={thumb}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1, background: '#111' }}
        draggable={false}
        fetchPriority="high"
      />
      <video
        ref={videoRef}
        muted loop playsInline autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.25s ease', zIndex: 2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" style={{ zIndex: 3 }} />
    </div>
  );
}

// ── Thumb strip tile ─────────────────────────────────────────────────────────
const ThumbTile = memo(function ThumbTile({ thumb, isActive, onClick, w = 54, h = 96 }) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 rounded-xl cursor-pointer overflow-hidden"
      style={{
        width: w, height: h,
        border: isActive ? '2px solid hsl(var(--primary))' : '1.5px solid hsl(var(--glow-primary)/0.3)',
        opacity: isActive ? 1 : 0.55,
        transition: 'border-color 0.2s, opacity 0.2s',
        background: '#111',
        flexShrink: 0,
      }}
    >
      <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
    </div>
  );
});

// ── Reusable Carousel ────────────────────────────────────────────────────────
function VideoCarousel({ videos, label, icon: Icon }) {
  const [active, setActive] = useState(0);
  const total = videos.length;
  const touchStart = useRef(null);

  // Prime all videos aggressively on mount
  useEffect(() => {
    // First 2 immediately
    primeVideo(videos[0]?.src);
    const t1 = setTimeout(() => primeVideo(videos[1]?.src), 800);
    const t2 = setTimeout(() => primeVideo(videos[2]?.src), 1800);
    // Rest staggered
    const timers = videos.slice(3).map((v, i) =>
      setTimeout(() => primeVideo(v.src), 2800 + i * 1200)
    );
    return () => { clearTimeout(t1); clearTimeout(t2); timers.forEach(clearTimeout); };
  }, []);

  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(i => (i + 1) % total), [total]);
  const goTo = useCallback((i) => setActive(i), []);

  const onTouchStart = useCallback((e) => { touchStart.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchStart.current = null;
  }, [next, prev]);

  return (
    <div className="mb-16" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Section label */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-bold text-xl sm:text-2xl gradient-text">{label}</h2>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex flex-col items-center gap-6">
        {/* Main player */}
        <div className="relative" style={{ width: '300px', aspectRatio: '9/16' }}>
          <ActiveVideo src={videos[active].src} thumb={videos[active].thumb} />
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
            border: '1.5px solid hsl(var(--glow-primary)/0.7)',
            boxShadow: '0 0 0 2px hsl(var(--primary)/0.6), 0 0 30px hsl(var(--primary)/0.25)',
            zIndex: 10,
          }} />

          {/* Arrow buttons */}
          <button onClick={prev}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={next}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Counter */}
        <p className="font-heading font-bold text-base">
          <span className="gradient-text">{active + 1}</span>
          <span className="text-muted-foreground/40"> / {total}</span>
        </p>

        {/* Thumb strip */}
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-2xl" style={{ scrollbarWidth: 'none' }}>
          {videos.map((v, i) => (
            <ThumbTile key={i} thumb={v.thumb} isActive={i === active} onClick={() => goTo(i)} w={48} h={85} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {videos.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all" style={{
              width: i === active ? '20px' : '5px', height: '5px',
              background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.3)',
            }} />
          ))}
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden flex flex-col items-center gap-4">
        <div className="relative" style={{ width: 'min(300px, 86vw)', aspectRatio: '9/16' }}>
          <ActiveVideo src={videos[active].src} thumb={videos[active].thumb} />
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
            border: '1.5px solid hsl(var(--glow-primary)/0.6)', zIndex: 10,
          }} />
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

        <div className="flex gap-2 overflow-x-auto px-4 pb-1 w-full" style={{ scrollbarWidth: 'none' }}>
          {videos.map((v, i) => (
            <ThumbTile key={i} thumb={v.thumb} isActive={i === active} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ProvenResults() {
  return (
    <div className="min-h-screen py-8 px-4">
      {/* Page header */}
      <div className="text-center mb-12">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-2">
          Real Athletes · Real Results
        </p>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-2">
          Student <span className="gradient-text">Results</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
          Real BTCALI athlete transformations and skill wins.
        </p>
      </div>

      {/* Carousel 1: Student Wins */}
      <VideoCarousel videos={WINS_VIDEOS} label="Student Wins" icon={Trophy} />

      {/* Divider */}
      <div className="max-w-2xl mx-auto mb-16 border-t border-border/30" />

      {/* Carousel 2: Transformations */}
      <VideoCarousel videos={TRANSFORM_VIDEOS} label="Transformations" icon={Zap} />

      {/* CTA */}
      <div className="rounded-2xl glass text-center py-12 px-6 glow-border relative overflow-hidden mt-4 max-w-3xl mx-auto">
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