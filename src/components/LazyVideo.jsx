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
      poster={poster}
      preload={eager ? 'auto' : 'none'}
      className={className}
      style={style}
      {...rest}
    />
  );
}