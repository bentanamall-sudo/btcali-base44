import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * SmartAccordion — opens on hover (desktop) or click (mobile).
 * Auto-retracts when user scrolls away from the element.
 * scrollThreshold: px of scroll before it retracts (default 80).
 */
export default function SmartAccordion({
  trigger,
  children,
  className = '',
  panelStyle = {},
  scrollThreshold = 80,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef(null);
  const scrollStartRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Scroll-aware retract
  useEffect(() => {
    if (!open) return;
    const onScroll = () => {
      if (scrollStartRef.current === null) {
        scrollStartRef.current = window.scrollY;
        return;
      }
      const delta = Math.abs(window.scrollY - scrollStartRef.current);
      if (delta > scrollThreshold) {
        setOpen(false);
        scrollStartRef.current = null;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open, scrollThreshold]);

  useEffect(() => {
    if (open) scrollStartRef.current = window.scrollY;
  }, [open]);

  const hoverProps = isMobile ? {} : {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
  };

  return (
    <div ref={ref} className={`relative ${className}`} {...hoverProps}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 text-left"
        type="button"
      >
        {trigger}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0 text-primary/60"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, filter: 'blur(3px)' }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
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