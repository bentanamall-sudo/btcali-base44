import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * HoverVideoCard — robust thumbnail-first video card
 *
 * - Always shows a real thumbnail (captured from video frame 0.01s)
 * - Thumbnail NEVER disappears during video loading
 * - Video fades IN over the thumbnail only after canplay fires
 * - On leave: video fades out, thumbnail stays visible
 * - Desktop: hover to play / leave to pause
 * - Mobile: tap to play / tap again to pause
 */
export default function HoverVideoCard({
  src,
  eager = false,
  className = '',
  children,
  onClick,
}) {
  const [thumb, setThumb] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const capturedRef = useRef(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  // ── Thumbnail generation via hidden video + canvas ──────────────────────────
  const generateThumb = useCallback(() => {
    if (capturedRef.current) return;
    capturedRef.current = true;

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
        // CORS block — use paused video fallback (handled in JSX)
        setThumb('__video__');
      }
      v.src = '';
    }, { once: true });

    v.addEventListener('error', () => setThumb('__video__'), { once: true });
  }, [src]);

  useEffect(() => {
    if (eager) {
      generateThumb();
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { generateThumb(); obs.disconnect(); } },
      { rootMargin: '400px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager, generateThumb]);

  // ── Play / pause ─────────────────────────────────────────────────────────────
  const startPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const stopPlay = useCallback(() => {
    setIsPlaying(false);
    setVideoReady(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) startPlay();
  }, [isMobile, startPlay]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) stopPlay();
  }, [isMobile, stopPlay]);

  const handleClick = useCallback((e) => {
    if (isMobile) {
      isPlaying ? stopPlay() : startPlay();
    }
    if (onClick) onClick(e);
  }, [isMobile, isPlaying, startPlay, stopPlay, onClick]);

  // Auto-play when video mounts
  const handleVideoRef = useCallback((el) => {
    videoRef.current = el;
    if (!el) return;
    el.play().catch(() => {});
  }, []);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* ── Thumbnail layer — ALWAYS present ────────────────────────────────── */}
      {thumb === '__video__' ? (
        // CORS fallback: paused video acts as thumbnail
        <video
          src={src}
          muted playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          ref={(el) => { if (el) { el.currentTime = 0.01; } }}
        />
      ) : thumb ? (
        <img
          src={thumb}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: 'opacity 0.25s', opacity: videoReady ? 0 : 1 }}
        />
      ) : (
        // Still capturing — dark shimmer, never a broken icon
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #1c1c1c 0%, #111 50%, #1c1c1c 100%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer-bg 1.8s ease infinite',
          }}
        />
      )}

      {/* ── Playback video — only mounted when playing ───────────────────────── */}
      {isPlaying && (
        <video
          ref={handleVideoRef}
          src={src}
          preload="auto"
          muted loop playsInline autoPlay
          onCanPlay={handleCanPlay}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: 'opacity 0.25s',
            opacity: videoReady ? 1 : 0,
          }}
        />
      )}

      {children}
    </div>
  );
}