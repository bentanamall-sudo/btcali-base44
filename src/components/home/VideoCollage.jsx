import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { WINS_VIDEOS } from '@/pages/ProvenResults';

// Layout positions for each tile in the collage (percent-based)
const LAYOUT = [
  // col 1
  { x: 0,   y: 0,   w: 31, h: 52 },
  { x: 0,   y: 53,  w: 31, h: 47 },
  // col 2
  { x: 33,  y: 0,   w: 34, h: 34 },
  { x: 33,  y: 36,  w: 34, h: 34 },
  { x: 33,  y: 71,  w: 34, h: 29 },
  // col 3
  { x: 69,  y: 0,   w: 31, h: 47 },
  { x: 69,  y: 49,  w: 31, h: 51 },
];

function CollageTile({ src, thumb, delay, x, y, w, h }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.src = src;
          v.play().catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, [src]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute overflow-hidden"
      style={{
        left: `${x}%`, top: `${y}%`,
        width: `${w}%`, height: `${h}%`,
        borderRadius: 0,
        border: '1px solid #D1D1CB',
      }}
    >
      <img
        src={thumb}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </motion.div>
  );
}

export default function VideoCollage() {
  const videos = WINS_VIDEOS.slice(0, 7);

  return (
    <div className="relative w-full" style={{ paddingBottom: '135%' }}>
      {videos.map((v, i) => (
        <CollageTile
          key={i}
          src={v.src}
          thumb={v.thumb}
          delay={0.3 + i * 0.08}
          {...LAYOUT[i]}
        />
      ))}

      {/* Label — brutalist caption */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 eyebrow"
        style={{
          background: '#1A1A1A',
          color: '#F4F4F2',
          whiteSpace: 'nowrap',
          zIndex: 5,
        }}
      >
        Real Athletes · Real Results
      </motion.div>
    </div>
  );
}