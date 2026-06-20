/**
 * SmartAccordion — used in the Hero "Why My Coaching" dropdown.
 *
 * Desktop: opens on hover, closes 500ms after mouse leaves the entire area.
 * Mobile:  opens on tap. Uses IntersectionObserver — only auto-closes when
 *          less than 15% of the accordion is visible, with a 600ms delay.
 *          Scrolling inside or near the content keeps it open.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;

export default function SmartAccordion({
  trigger,
  children,
  className = '',
  panelStyle = {},
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  const leaveTimer = useRef(null);
  const closeTimer = useRef(null);
  const desktop = useRef(isDesktop());
  const observerRef = useRef(null);

  useEffect(() => {
    const onResize = () => { desktop.current = isDesktop(); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── MOBILE: IntersectionObserver ─────────────────────────────────────────
  const setupObserver = useCallback(() => {
    if (!rootRef.current || desktop.current) return;
    if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.15) {
          clearTimeout(closeTimer.current);
          closeTimer.current = setTimeout(() => setOpen(false), 600);
        } else {
          clearTimeout(closeTimer.current);
        }
      },
      { threshold: [0, 0.15, 0.5, 1.0] }
    );
    observerRef.current.observe(rootRef.current);
  }, []);

  useEffect(() => {
    if (open && !desktop.current) {
      setupObserver();
    } else {
      if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
      clearTimeout(closeTimer.current);
    }
    return () => {
      if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
      clearTimeout(closeTimer.current);
    };
  }, [open, setupObserver]);

  useEffect(() => () => {
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  // ── DESKTOP: hover ────────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (!desktop.current) return;
    clearTimeout(leaveTimer.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    if (!desktop.current) return;
    leaveTimer.current = setTimeout(() => setOpen(false), 500);
  };

  // ── MOBILE: tap toggle ────────────────────────────────────────────────────
  const handleClick = () => {
    if (desktop.current) return;
    setOpen(o => !o);
  };

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between gap-3 text-left"
        type="button"
      >
        {trigger}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0 text-primary/60"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, filter: 'blur(3px)' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 rounded-xl p-4"
              style={{
                background: 'hsl(0 0% 7% / 0.9)',
                backdropFilter: 'blur(30px)',
                border: '1px solid hsl(40 30% 16% / 0.6)',
                boxShadow: '0 12px 40px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
                ...panelStyle,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}