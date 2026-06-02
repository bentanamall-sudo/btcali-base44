import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';

const CAROUSEL_VIDEOS = RESULTS_VIDEOS.slice(0, 8);

/** Generates a thumbnail from a video's first frame via canvas */
function useVideoThumb(src, enabled) {
  const [thumb, setThumb] = useState(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!enabled || doneRef.current) return;
    doneRef.current = true;

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
        setThumb(c.toDataURL('image/jpeg', 0.72));
      } catch {
        setThumb('__video__');
      }
      v.src = '';
    }, { once: true });
    v.addEventListener('error', () => setThumb('__video__'), { once: true });
  }, [src, enabled]);

  return thumb;
}

/** Single card in the carousel — thumbnail + optional live video */
function CarouselCard({ video, isActive, isSide }) {
  const [videoReady, setVideoReady] = useState(false);
  const thumb = useVideoThumb(video.src, true); // eager for carousel

  return (
    <div
      className="relative overflow-hidden rounded-2xl w-full h-full"
      style={{ border: '1px solid hsl(var(--glow-primary)/0.3)' }}
    >
      {/* Thumbnail — always present */}
      {thumb === '__video__' ? (
        <video
          src={video.src}
          muted playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          ref={(el) => { if (el) el.currentTime = 0.01; }}
        />
      ) : thumb ? (
        <img
          src={thumb}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady && isActive ? 0 : 1, transition: 'opacity 0.3s' }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1c1c1c 0%, #111 50%, #1c1c1c 100%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer-bg 1.8s ease infinite',
          }}
        />
      )}

      {/* Live video — only on active card */}
      {isActive && (
        <video
          src={video.src}
          autoPlay muted loop playsInline preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Side overlay — dim non-active cards */}
      {isSide && (
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      )}
    </div>
  );
}

export default function ResultsCarousel() {
  const [active, setActive] = useState(0);
  const total = CAROUSEL_VIDEOS.length;

  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(i => (i + 1) % total), [total]);

  const prevIdx = (active - 1 + total) % total;
  const nextIdx = (active + 1) % total;

  return (
    <section className="py-20 px-4 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-2">
          Real Athletes · Real Results
        </p>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          Student <span className="gradient-text">Results</span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-xl mx-auto">

        {/* Prev ghost card */}
        <motion.div
          className="hidden sm:block flex-shrink-0 cursor-pointer"
          style={{ width: '80px', aspectRatio: '9/16', opacity: 0.35, filter: 'blur(1px)', transform: 'scale(0.92)' }}
          onClick={prev}
          whileHover={{ opacity: 0.55 }}
        >
          <CarouselCard video={CAROUSEL_VIDEOS[prevIdx]} isActive={false} isSide />
        </motion.div>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-0 sm:left-auto sm:relative z-20 w-9 h-9 rounded-full glass border border-primary/30 flex items-center justify-center hover:border-primary/70 transition-all flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>

        {/* Main active card */}
        <div className="relative flex-shrink-0" style={{ width: '180px', aspectRatio: '9/16' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
              style={{ boxShadow: '0 0 40px hsl(var(--glow-primary)/0.25)' }}
            >
              <CarouselCard video={CAROUSEL_VIDEOS[active]} isActive isSide={false} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-0 sm:right-auto sm:relative z-20 w-9 h-9 rounded-full glass border border-primary/30 flex items-center justify-center hover:border-primary/70 transition-all flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>

        {/* Next ghost card */}
        <motion.div
          className="hidden sm:block flex-shrink-0 cursor-pointer"
          style={{ width: '80px', aspectRatio: '9/16', opacity: 0.35, filter: 'blur(1px)', transform: 'scale(0.92)' }}
          onClick={next}
          whileHover={{ opacity: 0.55 }}
        >
          <CarouselCard video={CAROUSEL_VIDEOS[nextIdx]} isActive={false} isSide />
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {CAROUSEL_VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all rounded-full"
            style={{
              width: i === active ? '20px' : '6px',
              height: '6px',
              background: i === active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground)/0.4)',
            }}
          />
        ))}
      </div>

      {/* View All */}
      <div className="flex justify-center mt-8">
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