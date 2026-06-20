/**
 * ControlledAccordion — one-open-at-a-time accordion group.
 *
 * Desktop: each item opens after a 350ms hover delay (prevents flickering
 *          when moving the mouse down the list). Closes 500ms after the mouse
 *          fully leaves the entire item area (trigger + content).
 *          Only one item can be open at a time.
 *
 * Mobile:  tap to open/close. Only one item open at a time.
 *          Uses IntersectionObserver — auto-closes only when less than 15%
 *          of the open item is visible, with a 700ms grace delay.
 *
 * Animation: smooth height + fade + slight blur reveal. No snap or bounce.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;

// ── Single item ────────────────────────────────────────────────────────────
function AccordionRow({ title, detail, isOpen, onOpen, onClose }) {
  const rootRef = useRef(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const observerRef = useRef(null);
  const desktop = useRef(isDesktop());

  useEffect(() => {
    const onResize = () => { desktop.current = isDesktop(); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Mobile IntersectionObserver — close only when mostly off-screen
  const setupObserver = useCallback(() => {
    if (!rootRef.current || desktop.current) return;
    if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.15) {
          clearTimeout(closeTimer.current);
          closeTimer.current = setTimeout(onClose, 700);
        } else {
          clearTimeout(closeTimer.current);
        }
      },
      { threshold: [0, 0.15, 0.5, 1.0] }
    );
    observerRef.current.observe(rootRef.current);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && !desktop.current) {
      setupObserver();
    } else {
      if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
      clearTimeout(closeTimer.current);
    }
    return () => {
      if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
      clearTimeout(closeTimer.current);
    };
  }, [isOpen, setupObserver]);

  useEffect(() => () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = () => {
    if (!desktop.current) return;
    clearTimeout(closeTimer.current);
    // 350ms open delay — prevents flickering when moving down the list
    openTimer.current = setTimeout(onOpen, 350);
  };

  const handleMouseLeave = () => {
    if (!desktop.current) return;
    clearTimeout(openTimer.current); // cancel pending open
    // 500ms close delay — content won't vanish while reading
    closeTimer.current = setTimeout(onClose, 500);
  };

  // Mobile tap
  const handleClick = () => {
    if (desktop.current) return;
    isOpen ? onClose() : onOpen();
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: isOpen
          ? 'linear-gradient(145deg, hsl(0 0% 9% / 0.9) 0%, hsl(43 30% 7% / 0.85) 100%)'
          : 'hsl(0 0% 7% / 0.65)',
        backdropFilter: 'blur(20px)',
        border: isOpen
          ? '1px solid hsl(45 85% 52% / 0.35)'
          : '1px solid hsl(40 25% 14% / 0.4)',
        boxShadow: isOpen
          ? '0 0 24px hsl(45 85% 52% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.05)'
          : 'none',
      }}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={handleClick}
        className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 transition-colors duration-150"
        style={{ background: isOpen ? 'hsl(45 85% 52% / 0.04)' : 'transparent' }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <CheckCircle
            className="w-4 h-4 flex-shrink-0 transition-colors duration-200"
            style={{ color: isOpen ? 'hsl(45 85% 58%)' : 'hsl(var(--primary))' }}
          />
          <span
            className="font-heading font-semibold text-sm sm:text-base transition-colors duration-200"
            style={{ color: isOpen ? 'hsl(47 92% 72%)' : 'hsl(var(--foreground))' }}
          >
            {title}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className="w-4 h-4 transition-colors duration-200"
            style={{ color: isOpen ? 'hsl(45 85% 52% / 0.8)' : 'hsl(var(--muted-foreground))' }}
          />
        </motion.span>
      </button>

      {/* Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="h-px mb-3" style={{ background: 'hsl(45 85% 52% / 0.2)' }} />
              <div className="space-y-3">
                {detail.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm font-body text-foreground/80 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Group controller ───────────────────────────────────────────────────────
export default function ControlledAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleOpen = (i) => setOpenIndex(i);
  const handleClose = (i) => setOpenIndex(prev => prev === i ? null : prev);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <AccordionRow
          key={i}
          title={item.title}
          detail={item.detail}
          isOpen={openIndex === i}
          onOpen={() => handleOpen(i)}
          onClose={() => handleClose(i)}
        />
      ))}
    </div>
  );
}