import { useRef, useState } from 'react';

/**
 * Returns { ref, style } — apply both to any element you want 3D tilt + pop on hover.
 * intensity: 0–20 (default 12). scale: default 1.04.
 */
export default function use3DHover({ intensity = 12, scale = 1.04, glowColor = 'hsl(45 85% 52% / 0.2)' } = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
    boxShadow: 'none',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
    willChange: 'transform',
  });

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = (-dy * intensity).toFixed(2);
    const rotY = (dx * intensity).toFixed(2);
    setStyle({
      transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
      boxShadow: `${dx * 8}px ${dy * 8}px 40px ${glowColor}, 0 20px 60px hsl(0 0% 0% / 0.35)`,
      transition: 'transform 0.1s ease, box-shadow 0.1s ease',
      willChange: 'transform',
    });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: 'none',
      transition: 'transform 0.45s ease, box-shadow 0.45s ease',
      willChange: 'transform',
    });
  };

  return { ref, style, onMouseMove, onMouseLeave };
}