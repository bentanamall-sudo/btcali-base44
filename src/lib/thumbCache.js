/**
 * thumbCache.js — STATIC placeholder only.
 *
 * We do NOT extract video thumbnails at runtime — that requires downloading
 * video data which causes network congestion and lag.
 *
 * Instead, every "thumbnail" is just null (show warm gradient placeholder).
 * The ONE active video loads on demand with preload="none" first, then plays.
 *
 * useThumb() always returns null — components should show their warm placeholder.
 * prewarmPriority() is a no-op kept for import compatibility.
 */
import { useState } from 'react';

// No-ops kept for backwards compat
export function prewarm() {}
export function prewarmPriority() {}
export function getThumb() { return null; }

export function useThumb() {
  return null;
}