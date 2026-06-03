/**
 * thumbCache.js — Global thumbnail pre-loader
 *
 * Starts loading ALL video thumbnails immediately when this module is imported.
 * Uses a muted video element seeked to 0.01s to capture the first frame as a
 * blob URL — no canvas, no CORS issues with same-CDN videos.
 *
 * Components call:  getThumb(src)      → string | null  (synchronous, instant if cached)
 *                   subscribeThumb(src, cb) → unsubscribe fn
 */

// module-level cache: src → blob URL string
const cache = new Map();
// listeners: src → Set of callbacks
const listeners = new Map();

function notify(src, url) {
  cache.set(src, url);
  const cbs = listeners.get(src);
  if (cbs) cbs.forEach(cb => cb(url));
}

function captureThumb(src) {
  if (cache.has(src)) return; // already done or in-progress marker

  // Mark as in-progress with null so we don't double-start
  cache.set(src, null);

  const v = document.createElement('video');
  v.crossOrigin = 'anonymous';
  v.muted = true;
  v.playsInline = true;
  v.preload = 'metadata';

  const onSeeked = () => {
    try {
      const c = document.createElement('canvas');
      c.width = v.videoWidth || 360;
      c.height = v.videoHeight || 640;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      c.toBlob(
        blob => {
          if (blob) notify(src, URL.createObjectURL(blob));
          else fallback();
          cleanup();
        },
        'image/webp',
        0.72
      );
    } catch {
      fallback();
      cleanup();
    }
  };

  const fallback = () => {
    // Can't canvas-capture — use a paused video poster URL approach:
    // We signal '__video__' so components render a paused <video> instead.
    notify(src, '__video__');
  };

  const cleanup = () => {
    v.removeEventListener('seeked', onSeeked);
    v.removeEventListener('error', onError);
    v.src = '';
  };

  const onError = () => { fallback(); cleanup(); };

  v.addEventListener('loadedmetadata', () => { v.currentTime = 0.01; }, { once: true });
  v.addEventListener('seeked', onSeeked, { once: true });
  v.addEventListener('error', onError, { once: true });

  v.src = src;
}

/** Returns cached thumb URL (string), null if still loading, or undefined if not started */
export function getThumb(src) {
  return cache.get(src) ?? null;
}

/** Subscribe to thumb ready event. Calls cb(url) immediately if already cached. */
export function subscribeThumb(src, cb) {
  // If already cached with a real value, fire immediately
  const cached = cache.get(src);
  if (cached && cached !== null) {
    cb(cached);
    return () => {};
  }

  if (!listeners.has(src)) listeners.set(src, new Set());
  listeners.get(src).add(cb);

  // Start capture if not already started
  if (!cache.has(src)) captureThumb(src);

  return () => {
    const set = listeners.get(src);
    if (set) set.delete(cb);
  };
}

/** Pre-warm a list of sources — call this at app boot */
export function prewarm(sources) {
  if (typeof window === 'undefined') return;
  sources.forEach(src => {
    if (!cache.has(src)) captureThumb(src);
  });
}

/** React hook: returns thumb URL string or null */
import { useState, useEffect } from 'react';
export function useThumb(src) {
  const [url, setUrl] = useState(() => {
    const cached = cache.get(src);
    return (cached && cached !== null) ? cached : null;
  });

  useEffect(() => {
    // Check again synchronously in case it loaded between render and effect
    const cached = cache.get(src);
    if (cached && cached !== null) {
      setUrl(cached);
      return;
    }
    const unsub = subscribeThumb(src, setUrl);
    return unsub;
  }, [src]);

  return url;
}