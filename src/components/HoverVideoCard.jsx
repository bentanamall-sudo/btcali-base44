import { useRef, useCallback } from 'react';

const DARK_POSTER = 'data:image/svg+xml;base64,' + btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="9" height="16"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1a1a"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient></defs><rect width="9" height="16" fill="url(#g)"/></svg>'
);

/**
 * HoverVideoCard — plays on hover (desktop) or tap (mobile), pauses+resets on leave.
 * Props:
 *   src        — video URL
 *   poster     — optional poster image URL (falls back to dark gradient)
 *   className  — wrapper div className
 *   children   — overlay content (badges, gradients, etc.)
 */
export default function HoverVideoCard({ src, poster, className = '', children, onClick }) {
  const videoRef = useRef(null);
  const loadedRef = useRef(false);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!loadedRef.current) {
      v.src = src;
      v.load();
      loadedRef.current = true;
    }
    v.play().catch(() => {});
  }, [src]);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  // Mobile: toggle on tap
  const handleTap = useCallback((e) => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      play();
    } else {
      pause();
    }
    if (onClick) onClick(e);
  }, [play, pause, onClick]);

  return (
    <div
      className={className}
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        poster={poster || DARK_POSTER}
        preload="none"
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {children}
    </div>
  );
}