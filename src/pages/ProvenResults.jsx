import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react';
import GlowButton from '../components/GlowButton';

// ── Video list with real uploaded thumbnails (matched by upload order) ────
export const RESULTS_VIDEOS = [
  { src: 'https://BTCALI.b-cdn.net/Videos/1A1AF447-0FC4-4CBD-8F32-7070E68FAF81.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6627.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/5DDF0CFF-6FD2-432E-B713-A609FBBD691A.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6628.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/D05272AD-F171-4C80-8119-90847BFEFB36.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6633.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/2882F251-A505-4D09-9090-44FCD8DAEDB4.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6631.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/61F09AF3-D0FC-44CC-8EC6-6037B4540D78.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6632.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/03246CBA-6320-4FEC-8025-85BBE3E3C17F.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6629.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/F8C3EC32-6F28-43F9-9274-5DCA2E4AD3AE.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6634.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/C52B9D44-CCC6-4C11-B563-D29E72D5E742.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6635.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/3DBD7B8B-0985-4366-803A-6BF5FE6E16DA.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6636.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/D9DC1424-7087-4C6F-BC4C-83A843896E19.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6637.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/BF734FD2-A5B6-4EA6-9DFC-3725ABB1BAAD.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6638.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/8FB2940B-72DC-4171-B5BD-3B262CA0230A.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6639.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/87AA93C8-C62D-44CB-92B4-25DE7D6EB9EF.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6640.png' },
  { src: 'https://BTCALI.b-cdn.net/Videos/C88E406D-F072-4021-9F9D-376E1AE850BA.mp4',   thumbnailSrc: 'https://BTCALI.b-cdn.net/Thumbnails/IMG_6641.png' },
];

const TOTAL = RESULTS_VIDEOS.length;

// ── Silently prime a video URL into the browser cache
function primeVideo(src) {
  if (!src) return;
  const v = document.createElement('video');
  v.src = src;
  v.preload = 'auto';
  v.muted = true;
  v.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none;';
  document.body.appendChild(v);
  v.load();
  setTimeout(() => {
    try { v.pause(); v.removeAttribute('src'); v.load(); document.body.removeChild(v); } catch {}
  }, 8000);
}

// ── Persistent video player — single element, src swapped in-place, thumbnail always under
// This avoids ANY blank frame: thumbnail is always visible until the video overlays it
function ActiveVideo({ src, thumbnailSrc, playing, onToggle }) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const currentSrc = useRef(null);

  useEffect(() => {
    if (currentSrc.current === src) return;
    currentSrc.current = src;

    setVideoReady(false);
    const v = videoRef.current;
    if (!v) return;

    v.pause();
    v.removeAttribute('src');
    v.load();

    v.preload = 'auto';
    v.src = src;
    v.load();

    const onCanPlay = () => {
      setVideoReady(true);
      v.play().catch(() => {});
    };
    v.addEventListener('canplay', onCanPlay, { once: true });
    return () => v.removeEventListener('canplay', onCanPlay);
  }, [src]);

  // Sync external pause/play
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoReady) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, videoReady]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl cursor-pointer" onClick={onToggle}>
      {/* Thumbnail — permanent base layer, never removed */}
      <img
        src={thumbnailSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1, background: '#1a1a1a' }}
        draggable={false}
        fetchPriority="high"
        onError={(e) => { e.target.style.opacity = '0'; }}
      />
      {/* Video — single persistent element, fades in after canplay */}
      <video
        ref={videoRef}
        muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: 2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" style={{ zIndex: 3 }} />
    </div>
  );
}

// ── Memoized orbital thumbnail with image
const OrbitalThumb = memo(function OrbitalThumb({ angleDeg, index, isActive, onClick, thumbnail }) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const depth = (sin + 1) / 2;
  const w = 72, h = Math.round(w * 16 / 9);
  const x = Math.cos(rad) * 340;
  const y = sin * 210;
  const scale = isActive ? 0 : 0.82 + depth * 0.24;
  const opacity = isActive ? 0 : 0.75 + depth * 0.25;
  const zIndex = isActive ? 0 : Math.round(depth * 12) + 2;

  return (
    <div
      className="absolute cursor-pointer overflow-hidden"
      style={{
        width: w, height: h,
        left: `calc(50% + ${x}px - ${w / 2}px)`,
        top: `calc(50% + ${y}px - ${h / 2}px)`,
        zIndex,
        borderRadius: '10px',
        border: '1.5px solid hsl(var(--glow-primary)/0.5)',
        transform: `scale(${scale})`,
        opacity,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
        background: `linear-gradient(160deg, hsl(30 40% 16%) 0%, hsl(30 30% 10%) 60%, #111 100%)`,
        willChange: 'transform, opacity',
      }}
      onClick={onClick}
    >
      {thumbnail && (
        <img 
          src={thumbnail} 
          alt={`Video ${index + 1}`}
          className="w-full h-full object-cover"
          style={{ background: '#1a1a1a' }}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.style.opacity = '0'; }}
        />
      )}
    </div>
  );
});

// ── Memoized mobile thumbnail with image
const MobileThumbTile = memo(function MobileThumbTile({ index, isActive, onClick, thumbnail }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-xl cursor-pointer overflow-hidden"
      style={{
        width: '54px', height: '96px',
        border: isActive ? '2px solid hsl(var(--primary))' : '1.5px solid hsl(var(--glow-primary)/0.3)',
        opacity: isActive ? 1 : 0.6,
        transition: 'border-color 0.2s, opacity 0.2s',
        flexShrink: 0,
        willChange: 'opacity, border-color',
        background: '#1a1a1a',
      }}
      onClick={onClick}
    >
      {thumbnail && (
        <img 
          src={thumbnail} 
          alt={`Video ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.style.opacity = '0'; }}
        />
      )}
    </div>
  );
});

// ── Main page
export default function ProvenResults() {
  const [active, setActive] = useState(0);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Pre-warm first 3 videos immediately on mount, rest during idle
  useEffect(() => {
    // First video: immediate
    primeVideo(RESULTS_VIDEOS[0].src);
    // Next two: short delay
    const t1 = setTimeout(() => primeVideo(RESULTS_VIDEOS[1].src), 1500);
    const t2 = setTimeout(() => primeVideo(RESULTS_VIDEOS[2].src), 3000);
    // Rest: idle
    const schedule = () => {
      RESULTS_VIDEOS.slice(3).forEach((v, i) => {
        setTimeout(() => primeVideo(v.src), i * 2000);
      });
    };
    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(schedule, { timeout: 5000 });
    } else {
      idleId = setTimeout(schedule, 4000);
    }
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, []);

  // Memoize computed values
  const orbitalPositions = useMemo(() => {
    return RESULTS_VIDEOS.map((_, i) => ({
      angleDeg: (i / TOTAL) * 360 + rotationOffset,
      index: i,
    }));
  }, [rotationOffset]);

  const prev = useCallback(() => {
    setPlaying(true);
    setActive(i => (i - 1 + TOTAL) % TOTAL);
    setRotationOffset(r => r - 360 / TOTAL);
  }, []);

  const next = useCallback(() => {
    setPlaying(true);
    setActive(i => (i + 1) % TOTAL);
    setRotationOffset(r => r + 360 / TOTAL);
  }, []);

  const goTo = useCallback((idx) => {
    if (idx === active) return;
    const diff = idx - active;
    const shortDiff = ((diff + TOTAL / 2) % TOTAL) - TOTAL / 2;
    setRotationOffset(r => r + (shortDiff * 360 / TOTAL));
    setActive(idx);
    setPlaying(true);
  }, [active]);

  const handleToggle = useCallback(() => setPlaying(p => !p), []);

  // Debounced keyboard handler
  useEffect(() => {
    let timeout;
    const onKey = (e) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }, 0);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (timeout) clearTimeout(timeout);
    };
  }, [prev, next]);

  const touchStart = useRef(null);
  const onTouchStart = useCallback((e) => { touchStart.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchStart.current = null;
  }, [next, prev]);

  return (
    <div className="min-h-screen py-8 px-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Header */}
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

      {/* ══ DESKTOP ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ width: '900px', height: '780px' }}>

          {orbitalPositions.map(({ angleDeg, index }) => (
            <OrbitalThumb
              key={index}
              angleDeg={angleDeg}
              index={index}
              isActive={index === active}
              onClick={() => goTo(index)}
              thumbnail={RESULTS_VIDEOS[index].thumbnailSrc}
            />
          ))}

          {/* Centre — persistent single video, src swapped in-place */}
          <div className="absolute" style={{
            width: '300px', aspectRatio: '9/16',
            left: 'calc(50% - 150px)', top: 'calc(50% - 267px)',
            zIndex: 20,
          }}>
            <div className="absolute inset-0">
              <ActiveVideo
                src={RESULTS_VIDEOS[active].src}
                thumbnailSrc={RESULTS_VIDEOS[active].thumbnailSrc}
                playing={playing}
                onToggle={handleToggle}
              />
            </div>
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
              boxShadow: playing
                ? '0 0 0 2px hsl(var(--primary)/0.8), 0 0 30px hsl(var(--primary)/0.4), 0 0 60px hsl(var(--primary)/0.15)'
                : undefined,
              border: '1.5px solid hsl(var(--glow-primary)/0.7)',
              transition: 'box-shadow 0.4s ease',
              zIndex: 30,
            }} />
          </div>

          {/* Arrows */}
          <button onClick={prev}
            className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-colors"
            style={{ left: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}>
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button onClick={next}
            className="absolute z-30 w-14 h-14 rounded-full glass border border-primary/40 flex items-center justify-center hover:border-primary transition-colors"
            style={{ right: 'calc(50% - 390px)', top: 'calc(50% - 28px)' }}>
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Counter + dots */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="font-heading font-bold text-lg">
            <span className="gradient-text">{active + 1}</span>
            <span className="text-muted-foreground/50"> / {TOTAL}</span>
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

      {/* ══ MOBILE ═════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        <div className="relative mx-auto mb-5" style={{ width: 'min(310px,88vw)', aspectRatio: '9/16' }}>
          <div className="absolute inset-0">
            <ActiveVideo
              src={RESULTS_VIDEOS[active].src}
              thumbnailSrc={RESULTS_VIDEOS[active].thumbnailSrc}
              playing={playing}
              onToggle={handleToggle}
            />
          </div>
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
            <span className="text-white/50 text-xs"> / {TOTAL}</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none' }}>
          {RESULTS_VIDEOS.map((v, i) => (
            <MobileThumbTile key={i} index={i} isActive={i === active} onClick={() => goTo(i)} thumbnail={v.thumbnailSrc} />
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