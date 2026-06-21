import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Words only appear in far left/right margins and very top/bottom — never over the hero text
const WORDS = [
  { text: 'PLANCHE',    x: '1%',  y: '18%', size: 'text-[9px]', delay: 0,   depth: 1.2, color: '#4F9DFF' },
  { text: 'FRONT LEVER',x: '1%',  y: '55%', size: 'text-[9px]', delay: 0.4, depth: 1.0, color: '#5EEBFF' },
  { text: 'STRENGTH',   x: '1%',  y: '75%', size: 'text-[9px]', delay: 0.8, depth: 1.1, color: '#7BB8FF' },
  { text: 'TUCK',       x: '88%', y: '6%',  size: 'text-[9px]', delay: 0.2, depth: 0.9, color: '#A6D4FF' },
  { text: 'STRADDLE',   x: '87%', y: '88%', size: 'text-[9px]', delay: 1.0, depth: 1.0, color: '#4F9DFF' },
  { text: 'CONTROL',    x: '1%',  y: '88%', size: 'text-[9px]', delay: 1.3, depth: 0.8, color: '#A6D4FF' },
];

function FloatingWord({ word, mouseX, mouseY }) {
  const floatY = useSpring(0, { stiffness: 60, damping: 20 });
  const floatX = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    let frame;
    let t = word.delay * 10;
    const animate = () => {
      t += 0.012;
      floatY.set(Math.sin(t) * 10 * word.depth);
      floatX.set(Math.cos(t * 0.7) * 5 * word.depth);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Parallax toward/away from mouse based on depth
  const parallaxX = useTransform(mouseX, [-1, 1], [-12 * word.depth, 12 * word.depth]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-8 * word.depth, 8 * word.depth]);

  const springX = useSpring(parallaxX, { stiffness: 50, damping: 18 });
  const springY = useSpring(parallaxY, { stiffness: 50, damping: 18 });

  // 3D scale: deeper = slightly larger
  const baseScale = 0.7 + word.depth * 0.18;
  // Opacity: deeper = more visible
  const baseOpacity = 0.25 + word.depth * 0.12;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
      animate={{ opacity: baseOpacity, scale: baseScale, rotateX: 0 }}
      transition={{ delay: word.delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        left: word.x,
        top: word.y,
        x: useTransform([springX, floatX], ([a, b]) => a + b),
        y: useTransform([springY, floatY], ([a, b]) => a + b),
        pointerEvents: 'none',
        transformStyle: 'preserve-3d',
        perspective: 600,
        zIndex: Math.round(word.depth * 2),
      }}
    >
      <span
        className={`font-heading font-black uppercase tracking-[0.25em] select-none ${word.size}`}
        style={{
          color: word.color,
          textShadow: `0 0 20px ${word.color}60, 0 2px 8px rgba(0,0,0,0.8)`,
          filter: `blur(${Math.max(0, (2.2 - word.depth) * 0.4)}px)`,
          transform: `perspective(400px) translateZ(${word.depth * 15}px)`,
          display: 'block',
        }}
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
      style={{ position: 'relative', transformStyle: 'preserve-3d' }}
    >
      {WORDS.map((word, i) => (
        <FloatingWord key={i} word={word} mouseX={mouseX} mouseY={mouseY} />
      ))}
      {children}
    </div>
  );
}