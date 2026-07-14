import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

// Layered parallax — element moves at a fraction of scroll speed
export default function ParallaxLayer({ children, speed = 0.3, className, style, debugId }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // speed: 0 = no movement, 0.3 = 30% of scroll, negative = opposite direction
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  if (reduced) {
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ ...style, position: 'relative' }}>
      <motion.div style={{ y, height: '100%', width: '100%' }}>
        {children}
      </motion.div>
    </div>
  );
}