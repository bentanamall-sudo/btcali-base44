/**
 * thumbCache.js — Staggered thumbnail extractor
 *
 * CRITICAL: Never downloads 14 videos simultaneously.
 * - Priority queue: active video thumb first, then rest staggered 150ms apart
 * - Each hidden video is destroyed immediately after frame capture
 * - preload="metadata" only — seeks to 0.01s which loads ~first keyframe only
 */
import { useState, useEffect } from 'react';

const cache = new Map();       // src → blob URL | '__video__' | null (in-progress)
const listeners = new Map();   // src → Set<fn>
let queue = [];                // pending srcs
let activeCaptures = 0;
const MAX_CONCURRENT = 2;      // never more than 2 hidden videos at once

function notify(src, url) {
  cache.set(src, url);
  listeners.get(src)?.forEach(fn => fn(url));
}

function drainQueue() {
  while (activeCaptures < MAX_CONCURRENT && queue.length > 0) {
    const src = queue.shift();
    if (cache.get(src) !== null) continue; // already done
    activeCaptures++;
    _captureOne(src);
  }
}

function _captureOne(src) {
  const v = document.createElement('video');
  v.crossOrigin = 'anonymous';
  v.muted = true;
  v.playsInline = true;
  v.preload = 'metadata';

  const done = (result) => {
    notify(src, result);
    v.src = '';
    v.load(); // release browser resources
    activeCaptures--;
    drainQueue();
  };

  v.addEventListener('loadedmetadata', () => {
    v.currentTime = 0.01;
  }, { once: true });

  v.addEventListener('seeked', () => {
    try {
      const c = document.createElement('canvas');
      // Downsample thumbnail to max 360px wide for smaller blob
      const aspect = v.videoHeight / (v.videoWidth || 360);
      c.width = 360;
      c.height = Math.round(360 * aspect);
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      c.toBlob(blob => {
        done(blob ? URL.createObjectURL(blob) : '__video__');
      }, 'image/webp', 0.65);
    } catch {
      done('__video__');
    }
  }, { once: true });

  v.addEventListener('error', () => done('__video__'), { once: true });

  // Safety timeout — if metadata never loads in 8s, bail
  const timeout = setTimeout(() => done('__video__'), 8000);
  v.addEventListener('seeked', () => clearTimeout(timeout), { once: true });
  v.addEventListener('error', () => clearTimeout(timeout), { once: true });

  v.src = src;
}

function enqueue(src, priority = false) {
  if (cache.has(src)) return;
  cache.set(src, null); // mark in-progress
  if (priority) {
    queue.unshift(src);
  } else {
    queue.push(src);
  }
  drainQueue();
}

/** Eagerly capture thumb for the active/visible video first */
export function prewarmPriority(src) {
  if (typeof window === 'undefined') return;
  enqueue(src, true);
}

/** Background-warm a list — staggered, low priority */
export function prewarm(sources) {
  if (typeof window === 'undefined') return;
  // Stagger enqueuing so we don't dump 14 requests at once
  sources.forEach((src, i) => {
    setTimeout(() => enqueue(src, false), i * 80);
  });
}

export function getThumb(src) {
  const v = cache.get(src);
  return (v && v !== null) ? v : null;
}

/** React hook — returns blob URL or null */
export function useThumb(src) {
  const [url, setUrl] = useState(() => {
    const v = cache.get(src);
    return (v && v !== null) ? v : null;
  });

  useEffect(() => {
    const v = cache.get(src);
    if (v && v !== null) { setUrl(v); return; }

    if (!listeners.has(src)) listeners.set(src, new Set());
    listeners.get(src).add(setUrl);

    // Ensure it's in the queue
    if (!cache.has(src)) enqueue(src, false);

    return () => listeners.get(src)?.delete(setUrl);
  }, [src]);

  return url;
}