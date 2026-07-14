import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

// Word-by-word reveal — words rise from below and sharpen from blur
export function RevealWords({ text, className, delay = 0, stagger = 0.08, once = true, as: Tag = 'span' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return <Tag ref={ref} className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={className} style={{ display: 'inline-block' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            delay: delay + i * stagger,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

// Line-by-line mask reveal for paragraphs
export function RevealLines({ lines, className, lineClassName, delay = 0, stagger = 0.06, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div ref={ref} className={className}>{lines.map((l, i) => <p key={i} className={lineClassName}>{l}</p>)}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <motion.p
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ delay: delay + i * stagger, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={lineClassName}
          >
            {line}
          </motion.p>
        </div>
      ))}
    </div>
  );
}

// Mask reveal — text acts as a window, reveals from a clip-path
export function MaskReveal({ children, className, delay = 0, direction = 'left', once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const reduced = useReducedMotion();

  const clipFrom = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    center: 'inset(0 50% 0 50%)',
    top: 'inset(100% 0 0 0)',
    bottom: 'inset(0 0 100% 0)',
  };

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipFrom[direction] }}
      animate={inView ? { clipPath: 'inset(0 0 0 0)' } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}