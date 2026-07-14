import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

// Minimal custom cursor — dot + ring, expands on interactive elements
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState('default'); // default | play | drag | arrow
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28 });

  useEffect(() => {
    if (reduced || window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const el = e.target;
      const interactive = el.closest('[data-cursor]');
      if (interactive) {
        const cv = interactive.getAttribute('data-cursor');
        const cl = interactive.getAttribute('data-cursor-label') || '';
        setVariant(cv);
        setLabel(cl);
      } else if (el.closest('a, button, [role="button"]')) {
        setVariant('hover');
        setLabel('');
      } else {
        setVariant('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, visible, x, y]);

  if (reduced) return null;

  const ringSizes = {
    default: 32,
    hover: 44,
    play: 64,
    drag: 56,
    arrow: 40,
  };

  const ringSize = ringSizes[variant] || 32;

  return (
    <>
      {/* Dot — follows instantly */}
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: variant === 'default' ? 'rgba(255,255,255,0.5)' : '#5EEBFF',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Ring — follows with spring lag */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            borderColor: variant === 'default' ? 'rgba(255,255,255,0.2)' : 'rgba(94,235,255,0.6)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {label && (
            <span
              className="font-heading font-bold uppercase tracking-wider"
              style={{
                fontSize: '8px',
                color: '#5EEBFF',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}