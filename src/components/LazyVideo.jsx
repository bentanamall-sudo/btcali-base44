import { useRef, useEffect, useState } from 'react';

/**
 * LazyVideo — only starts loading when within `rootMargin` of the viewport.
 * Props:
 *   src         — video URL
 *   eager       — skip IntersectionObserver, load immediately (for above-the-fold videos)
 *   rootMargin  — how far ahead to start loading (default "200px")
 *   className   — passed to <video>
 *   style       — passed to <video>
 *   poster      — placeholder image shown before video loads
 *   [rest]      — any other <video> props (autoPlay, muted, loop, playsInline…)
 */
// Dark gradient data-URI — shows instantly, zero network cost
const DARK_POSTER = 'data:image/svg+xml;base64,' + btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="9" height="16"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#111"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient></defs><rect width="9" height="16" fill="url(#g)"/></svg>'
);

export default function LazyVideo({
  src,
  eager = false,
  rootMargin = '200px',
  className = '',
  style,
  poster,
  ...rest
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  // Use provided poster, or fall back to instant dark placeholder
  const effectivePoster = poster || DARK_POSTER;

  useEffect(() => {
    if (eager) return;
    const el = videoRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager, rootMargin]);

  // Once shouldLoad flips, set the src so the browser starts fetching
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldLoad) return;
    if (!el.src || el.src !== src) {
      el.src = src;
      el.load();
    }
  }, [shouldLoad, src]);

  return (
    <video
      ref={videoRef}
      poster={effectivePoster}
      preload={eager ? 'auto' : 'none'}
      className={className}
      style={style}
      {...rest}
    />
  );
}