import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Renders text that fades/brightens as it enters the viewport.
 * On desktop, hovering the parent brightens this paragraph and dims siblings.
 */
export default function ScrollRevealText({ children, className = '', delay = 0, highlight = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
      animate={inView
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0.25, y: 6, filter: 'blur(1px)' }
      }
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={highlight ? {
        background: 'linear-gradient(135deg, hsl(44 90% 65% / 0.12), hsl(38 70% 42% / 0.06))',
        borderLeft: '2px solid hsl(43 74% 49% / 0.5)',
        borderRadius: '0 8px 8px 0',
        paddingLeft: '14px',
        paddingTop: '8px',
        paddingBottom: '8px',
      } : {}}
    >
      {children}
    </motion.p>
  );
}

/**
 * Wraps a group of paragraphs so hovering dims non-hovered ones on desktop.
 */
export function RevealGroup({ children, className = '' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              transition: 'opacity 0.3s ease',
              opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.45 : 1,
            }}
          >
            {child}
          </div>
        ))
        : children}
    </div>
  );
}