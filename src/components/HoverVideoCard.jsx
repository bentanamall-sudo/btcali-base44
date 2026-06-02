import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * HoverVideoCard
 *
 * Strategy:
 * 1. On mount, load the video with preload="metadata" and seek to 0.01s
 *    then capture a canvas snapshot → use as poster (data URL).
 * 2. Show that snapshot as an <img> immediately — no blank cards ever.
 * 3. On hover/tap: mount the real <video> element and play it.
 * 4. On leave: unmount the video element entirely (frees memory).
 *
 * Props:
 *   src       — video URL
 *   poster    — optional external poster URL (used if provided and loads OK)
 *   eager     — load thumbnail immediately vs lazily
 *   className — wrapper className
 *   children  — overlay elements
 *   onClick   — optional click handler
 */
export default function HoverVideoCard({
  src,
  poster,
  eager = false,
  className = '',
  children,
  onClick,
}) {
  const [thumb, setThumb] = useState(poster || null);
  const [videoActive, setVideoActive] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const capturedRef = useRef(false);
  const isMobile = useRef(
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  );

  // Generate thumbnail from video's first frame via canvas
  const generateThumb = useCallback(() => {
    if (capturedRef.current) return;
    capturedRef.current = true;

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = src;

    const capture = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 360;
        canvas.height = video.videoHeight || 640;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        // Only use it if it's not a blank frame (all-black)
        setThumb(dataUrl);
      } catch {
        // CORS or other issue — fall back to paused video
        setThumbFailed(true);
      }
      video.src = '';
    };

    video.addEventListener('seeked', capture, { once: true });
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0.01;
    }, { once: true });
    video.addEventListener('error', () => {
      setThumbFailed(true);
    }, { once: true });
  }, [src]);

  useEffect(() => {
    if (eager) {
      generateThumb();
    } else {
      // For lazy cards, use IntersectionObserver to trigger when near viewport
      const el = document.createElement('div');
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            generateThumb();
            observer.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      // We'll trigger via the container ref below
      return () => observer.disconnect();
    }
  }, [eager, generateThumb]);

  // Ref callback: attach IntersectionObserver for lazy cards
  const containerRef = useCallback((el) => {
    if (!el || eager) return;
    if (capturedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          generateThumb();
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
  }, [eager, generateThumb]);

  const handleMouseEnter = useCallback(() => {
    if (isMobile.current) return;
    setVideoActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isMobile.current) return;
    setVideoActive(false);
  }, []);

  const handleClick = useCallback((e) => {
    if (isMobile.current) {
      setVideoActive(v => !v);
    }
    if (onClick) onClick(e);
  }, [onClick]);

  const handleVideoRef = useCallback((el) => {
    if (!el) return;
    el.play().catch(() => {});
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Thumbnail layer — always visible when video isn't active */}
      {!videoActive && (
        <>
          {thumb && !thumbFailed ? (
            <img
              src={thumb}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setThumbFailed(true)}
            />
          ) : thumbFailed ? (
            // Fallback: paused video at 0.01s — still shows first frame, no broken icon
            <video
              src={src}
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              ref={(el) => { if (el) el.currentTime = 0.01; }}
            />
          ) : (
            // Still generating — show a dark shimmer placeholder
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #111 50%, #1a1a1a 100%)',
                backgroundSize: '200% 200%',
                animation: 'shimmer-bg 1.5s ease infinite',
              }}
            />
          )}
        </>
      )}

      {/* Video — only mounted during hover/tap */}
      {videoActive && (
        <video
          ref={handleVideoRef}
          src={src}
          preload="auto"
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {children}
    </div>
  );
}