import { useState, useRef, useCallback } from 'react';

/**
 * HoverVideoCard
 * - Shows a real <img> thumbnail at all times (instant load, no blank cards)
 * - On hover/tap: mounts <video>, loads + plays it over the thumbnail
 * - On leave: unmounts the video entirely (frees memory, resets to thumbnail)
 *
 * Props:
 *   src        — video URL
 *   poster     — thumbnail image URL (must be a real image, not a data-URI)
 *   className  — wrapper className
 *   eager      — if true, loads thumbnail eagerly (for first visible row)
 *   children   — overlay elements
 *   onClick    — optional click handler
 */
export default function HoverVideoCard({
  src,
  poster,
  className = '',
  eager = false,
  children,
  onClick,
}) {
  const [videoActive, setVideoActive] = useState(false);
  const videoRef = useRef(null);
  const isMobile = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);

  // Desktop: mouseenter → mount video + play
  const handleMouseEnter = useCallback(() => {
    if (isMobile.current) return;
    setVideoActive(true);
  }, []);

  // Desktop: mouseleave → unmount video
  const handleMouseLeave = useCallback(() => {
    if (isMobile.current) return;
    setVideoActive(false);
  }, []);

  // Mobile: tap toggles
  const handleClick = useCallback((e) => {
    if (isMobile.current) {
      setVideoActive(v => !v);
    }
    if (onClick) onClick(e);
  }, [onClick]);

  // Once video mounts, play it
  const handleVideoRef = useCallback((el) => {
    videoRef.current = el;
    if (!el) return;
    el.play().catch(() => {});
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Always-visible thumbnail — instant, no network delay */}
      <img
        src={poster}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transition: 'opacity 0.2s', opacity: videoActive ? 0 : 1 }}
      />

      {/* Video only mounts on hover — destroyed on leave */}
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
          style={{ opacity: 1 }}
        />
      )}

      {children}
    </div>
  );
}