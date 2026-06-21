/**
 * HoverAccordion — premium glass dropdown.
 *
 * Desktop: opens on mouse-enter anywhere in the accordion (trigger OR content).
 *          Only closes when mouse fully leaves the entire accordion area,
 *          with a 500ms delay so content isn't snatched away instantly.
 *          Never closes due to scrolling on desktop.
 *
 * Mobile:  opens on tap. Stays open while the accordion is visible on screen.
 *          Uses IntersectionObserver — only auto-closes when less than 15% of
 *          the accordion is visible, with a 600ms delay before closing.
 *          Scrolling inside or near the content keeps it open.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;

export default function HoverAccordion({
  trigger,
  children,
  defaultOpen = false,
  triggerClassName = '',
  panelClassName = '',
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  const leaveTimer = useRef(null);
  const closeTimer = useRef(null);
  const desktop = useRef(isDesktop());
  const observerRef = useRef(null);

  // Update desktop flag on resize
  useEffect(() => {
    const onResize = () => { desktop.current = isDesktop(); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── MOBILE: IntersectionObserver auto-close ──────────────────────────────
  const setupObserver = useCallback(() => {
    if (!rootRef.current || desktop.current) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Only close if less than 15% visible AND user hasn't tapped inside recently
        if (entry.intersectionRatio < 0.15) {
          clearTimeout(closeTimer.current);
          closeTimer.current = setTimeout(() => {
            setOpen(false);
          }, 600);
        } else {
          // Still visible — cancel any pending close
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
      // Not open or on desktop — disconnect observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      clearTimeout(closeTimer.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      clearTimeout(closeTimer.current);
    };
  }, [open, setupObserver]);

  // Cleanup on unmount
  useEffect(() => () => {
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  const handleClick = () => setOpen(o => !o);

  return (
    <div ref={rootRef}>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full flex items-center justify-between gap-3 text-left ${triggerClassName}`}
      >
        <span className="flex-1">{trigger}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0, y: -6, filter: 'blur(6px)' }}
            animate={{ opacity: 1, height: 'auto', y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, y: -4, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`overflow-hidden ${panelClassName}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}