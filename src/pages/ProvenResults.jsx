import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, ArrowRight, Trophy } from 'lucide-react';
import GlowButton from '../components/GlowButton';
import { PageHeaderLogo } from '../components/Logo';

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

// ── Thumbnail hook ─────────────────────────────────────────────────────────────
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
        c.width = v.videoWidth || 360; c.height = v.videoHeight || 640;
        c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
        setThumb(c.toDataURL('image/jpeg', 0.72));
      } catch { setThumb('__fb__'); }
      v.src = '';
    }, { once: true });
    v.addEventListener('error', () => setThumb('__fb__'), { once: true });
  }, [src]);
  return thumb;
}

// ── Thumbnail tile (outer ring + strip) ───────────────────────────────────────
function ThumbTile({ src, isActive, onClick, style, className = '' }) {
  const thumb = useThumb(src);
  return (
    <div
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${className}`}
      style={style}
      onClick={onClick}
    >
      {thumb && thumb !== '__fb__'
        ? <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
        : <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#1c1c1c,#111,#1c1c1c)', backgroundSize: '200% 200%', animation: 'shimmer-bg 1.8s ease infinite' }} />
      }
      {!isActive && <div className="absolute inset-0 bg-black/50 pointer-events-none" />}
      {isActive && (
        <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ border: '2px solid hsl(var(--primary))' }} />
      )}
    </div>
  );
}

// ── Active centre video ────────────────────────────────────────────────────────
function CentreVideo({ src }) {
  const thumb = useThumb(src);
  const [ready, setReady] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
      {thumb && thumb !== '__fb__'
        ? <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: ready ? 0 : 1, transition: 'opacity 0.35s' }} />
        : <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#1c1c1c,#111,#1c1c1c)', backgroundSize: '200% 200%', animation: 'shimmer-bg 1.8s ease infinite' }} />
      }
      <video
        key={src}
        src={src}
        autoPlay muted loop playsInline preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.35s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// ── Orbital item — positioned on a circle ─────────────────────────────────────
function OrbitalItem({ src, angle, isActive, onClick }) {
  const radius = 300; // px from centre
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  const size = isActive ? 0 : 72; // active slot is empty (centre occupies it)

  if (size === 0) return null;
  return (
    <motion.div
      className="absolute"
      style={{
        width: size, height: size * (16 / 9),
        left: `calc(50% + ${x}px - ${size / 2}px)`,
        top: `calc(50% + ${y}px - ${(size * 16 / 9) / 2}px)`,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ThumbTile src={src} isActive={false} onClick={onClick} className="w-full h-full" />
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ProvenResults() {
  const [active, setActive] = useState(0);
  const total = RESULTS_VIDEOS.length;

  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(i => (i + 1) % total), [total]);

  // Orbital: spread all videos evenly on a circle
  const angleStep = 360 / total;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex justify-start mb-5">
          <PageHeaderLogo />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-3">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-body text-muted-foreground">Student Results</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl">
              Student <span className="gradient-text">Results</span>
            </h1>
            <p className="text-muted-foreground font-body mt-2 max-w-md">
              Real BTCALI student progress — shown through actual training videos.
            </p>
          </div>
          <div className="text-right">
            <span className="font-heading font-bold text-4xl gradient-text">{active + 1}</span>
            <span className="text-muted-foreground font-body text-lg"> / {total}</span>
          </div>
        </div>
      </motion.div>

      {/* ── DESKTOP: Orbital carousel ───────────────────────────────────────── */}
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ width: '800px', height: '680px' }}>
          {/* Orbital ring hint */}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{
            left: 'calc(50% - 300px)', top: 'calc(50% - 300px)',
            width: '600px', height: '600px',
            border: '1px solid hsl(var(--glow-primary)/0.1)',
            borderRadius: '50%',
          }} />

          {/* Orbital thumbnails */}
          {RESULTS_VIDEOS.map((v, i) => (
            <OrbitalItem
              key={i}
              src={v.src}
              angle={i * angleStep - 90}
              isActive={i === active}
              onClick={() => setActive(i)}
            />
          ))}

          {/* Centre video */}
          <div
            className="absolute"
            style={{
              width: '260px', aspectRatio: '9/16',
              left: 'calc(50% - 130px)',
              top: 'calc(50% - 231px)',
              zIndex: 10,
            }}
          >
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: '0 0 80px hsl(var(--glow-primary)/0.4), 0 0 160px hsl(var(--glow-primary)/0.12)', zIndex: 0 }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <CentreVideo src={RESULTS_VIDEOS[active].src} />
              </motion.div>
            </AnimatePresence>
            {/* Border ring */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: '1.5px solid hsl(var(--glow-primary)/0.6)', zIndex: 11 }} />
          </div>

          {/* Arrows overlaid on the orbital ring */}
          <button
            onClick={prev}
            className="absolute z-20 w-11 h-11 rounded-full glass border border-primary/30 flex items-center justify-center hover:border-primary/70 transition-all"
            style={{ left: 'calc(50% - 340px)', top: 'calc(50% - 22px)' }}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute z-20 w-11 h-11 rounded-full glass border border-primary/30 flex items-center justify-center hover:border-primary/70 transition-all"
            style={{ right: 'calc(50% - 340px)', top: 'calc(50% - 22px)' }}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* ── MOBILE: Large swipeable card + thumbnail strip ──────────────────── */}
      <div className="lg:hidden">
        {/* Main card */}
        <div className="relative mx-auto mb-5" style={{ width: 'min(300px, 84vw)', aspectRatio: '9/16' }}>
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: '0 0 60px hsl(var(--glow-primary)/0.3)', zIndex: 0 }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <CentreVideo src={RESULTS_VIDEOS[active].src} />
            </motion.div>
          </AnimatePresence>
          {/* Mobile arrows */}
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-20 w-10 h-10 rounded-full glass border border-primary/30 flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-20 w-10 h-10 rounded-full glass border border-primary/30 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 px-2 justify-center">
          {RESULTS_VIDEOS.map((v, i) => (
            <ThumbTile
              key={i}
              src={v.src}
              isActive={i === active}
              onClick={() => setActive(i)}
              style={{ width: '52px', height: '92px', flexShrink: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {RESULTS_VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all rounded-full"
            style={{
              width: i === active ? '22px' : '6px',
              height: '6px',
              background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.3)',
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl glass text-center py-12 px-6 glow-border relative overflow-hidden mt-12"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
        <Users className="w-10 h-10 text-primary mx-auto mb-4 relative z-10" />
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3 relative z-10">
          Your Transformation <span className="gradient-text">Starts Now</span>
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-6 relative z-10">
          Join athletes who are already training with BTCALI. Apply for coaching or start free today.
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