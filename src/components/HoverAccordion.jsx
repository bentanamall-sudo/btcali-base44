/**
 * HoverAccordion — premium glass dropdown.
 * Desktop: opens on hover, closes on mouse-leave.
 * Mobile: opens on tap, closes on scroll away.
 * Animation: fade + blur + slight slide-down + height.
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;

export default function HoverAccordion({
  trigger,
  children,
  defaultOpen = false,
  scrollThreshold = 100,
  triggerClassName = '',
  panelClassName = '',
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  const scrollY0 = useRef(null);
  const leaveTimer = useRef(null);
  const desktop = useRef(isDesktop());

  // Update desktop flag on resize
  useEffect(() => {
    const onResize = () => { desktop.current = isDesktop(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Mobile: retract on scroll away
  useEffect(() => {
    if (!open) { scrollY0.current = null; return; }
    scrollY0.current = window.scrollY;
    const onScroll = () => {
      if (scrollY0.current === null) return;
      if (Math.abs(window.scrollY - scrollY0.current) > scrollThreshold) {
        setOpen(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open, scrollThreshold]);

  const handleMouseEnter = () => {
    if (!desktop.current) return;
    clearTimeout(leaveTimer.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    if (!desktop.current) return;
    leaveTimer.current = setTimeout(() => setOpen(false), 80);
  };
  const handleClick = () => {
    if (desktop.current) return; // desktop uses hover only
    setOpen(o => !o);
  };

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  return (
    <div ref={rootRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full flex items-center justify-between gap-3 text-left ${triggerClassName}`}
      >
        <span className="flex-1">{trigger}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6, filter: 'blur(6px)' }}
            animate={{ opacity: 1, height: 'auto', y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, y: -4, filter: 'blur(4px)' }}
            transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`overflow-hidden ${panelClassName}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}