import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Faint architectural labels in the margins — brutalist, concrete-toned
const WORDS = [
  { text: 'PLANCHE',     x: '1%',  y: '18%', delay: 0,   depth: 1.2 },
  { text: 'FRONT LEVER', x: '1%',  y: '55%', delay: 0.4, depth: 1.0 },
  { text: 'STRENGTH',    x: '1%',  y: '75%', delay: 0.8, depth: 1.1 },
  { text: 'TUCK',        x: '90%', y: '6%',  delay: 0.2, depth: 0.9 },
  { text: 'STRADDLE',    x: '88%', y: '88%', delay: 1.0, depth: 1.0 },
  { text: 'CONTROL',     x: '1%',  y: '88%', delay: 1.3, depth: 0.8 },
];

function FloatingWord({ word, mouseX, mouseY }) {
  const floatY = useSpring(0, { stiffness: 60, damping: 20 });
  const floatX = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    let frame;
    let t = word.delay * 10;
    const animate = () => {
      t += 0.012;
      floatY.set(Math.sin(t) * 8 * word.depth);
      floatX.set(Math.cos(t * 0.7) * 4 * word.depth);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const parallaxX = useTransform(mouseX, [-1, 1], [-10 * word.depth, 10 * word.depth]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-6 * word.depth, 6 * word.depth]);
  const springX = useSpring(parallaxX, { stiffness: 50, damping: 18 });
  const springY = useSpring(parallaxY, { stiffness: 50, damping: 18 });

  const baseOpacity = 0.10 + word.depth * 0.05;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: baseOpacity }}
      transition={{ delay: word.delay, duration: 1.2 }}
      style={{
        position: 'absolute',
        left: word.x,
        top: word.y,
        x: useTransform([springX, floatX], ([a, b]) => a + b),
        y: useTransform([springY, floatY], ([a, b]) => a + b),
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <span
        className="font-heading font-black uppercase tracking-[0.25em] select-none text-[9px]"
        style={{ color: '#1A1A1A', display: 'block' }}
      >
        {word.text}
      </span>
    </motion.div>
  );
}

export default function Floating3DWords({ children }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      {WORDS.map((word, i) => (
        <FloatingWord key={i} word={word} mouseX={mouseX} mouseY={mouseY} />
      ))}
      {children}
    </div>
  );
}