/**
 * ResultsWall — wraps any section with floating parallax thumbnail cards.
 * Uses OG student result thumbnails. Subtle scroll Y movement, slight rotation, gold borders.
 * Lazy-loaded. No autoplay. Performance-safe.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WINS_VIDEOS, TRANSFORM_VIDEOS } from '@/pages/ProvenResults';

const THUMBS = [
  ...WINS_VIDEOS.slice(0, 7).map(v => v.thumb),
  ...TRANSFORM_VIDEOS.slice(0, 5).map(v => v.thumb),
];

// Each card: top, left/right side, rotation (degrees), parallax factor, opacity, scale, width(px)
const CARDS = [
  { top: '5%',  side: 'left',  pct: '1%',   rot: -10, par: 18, op: 0.65, sc: 0.82, w: 70  },
  { top: '38%', side: 'left',  pct: '-1%',  rot: 6,   par: 28, op: 0.75, sc: 0.88, w: 78  },
  { top: '70%', side: 'left',  pct: '2%',   rot: -7,  par: 14, op: 0.60, sc: 0.76, w: 66  },
  { top: '15%', side: 'left',  pct: '14%',  rot: 9,   par: 22, op: 0.52, sc: 0.72, w: 62  },
  { top: '60%', side: 'left',  pct: '12%',  rot: -5,  par: 16, op: 0.68, sc: 0.80, w: 72  },
  { top: '5%',  side: 'right', pct: '1%',   rot: 8,   par: 20, op: 0.68, sc: 0.84, w: 72  },
  { top: '40%', side: 'right', pct: '-1%',  rot: -6,  par: 30, op: 0.78, sc: 0.90, w: 80  },
  { top: '72%', side: 'right', pct: '2%',   rot: 11,  par: 14, op: 0.60, sc: 0.76, w: 68  },
  { top: '14%', side: 'right', pct: '13%',  rot: -9,  par: 22, op: 0.52, sc: 0.70, w: 60  },
  { top: '60%', side: 'right', pct: '11%',  rot: 5,   par: 16, op: 0.70, sc: 0.82, w: 72  },
  { top: '28%', side: 'left',  pct: '4%',   rot: -4,  par: 12, op: 0.58, sc: 0.78, w: 66  },
  { top: '30%', side: 'right', pct: '4%',   rot: 4,   par: 12, op: 0.60, sc: 0.80, w: 68  },
];

function ParallaxCard({ thumb, card, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-card.par, card.par]);

  const posStyle = card.side === 'left'
    ? { left: card.pct }
    : { right: card.pct };

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        top: card.top,
        ...posStyle,
        width: card.w,
        aspectRatio: '9/16',
        rotate: card.rot,
        scale: card.sc,
        y,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1.5px solid hsl(45 85% 52% / 0.30)',
        boxShadow: '0 8px 28px hsl(0 0% 0% / 0.4), 0 0 12px hsl(45 85% 52% / 0.07)',
        willChange: 'transform',
        zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: card.op }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      whileHover={{ opacity: 1, scale: card.sc * 1.1, zIndex: 20, boxShadow: '0 12px 40px hsl(0 0% 0% / 0.5), 0 0 24px hsl(45 85% 52% / 0.18)' }}
    >
      <img
        src={thumb}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        onError={e => { e.target.style.opacity = '0'; }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 55%, hsl(0 0% 0% / 0.3))' }} />
    </motion.div>
  );
}

export default function ResultsWall({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Floating parallax thumbnails — hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block" aria-hidden>
        {CARDS.map((card, i) => (
          <ParallaxCard key={i} thumb={THUMBS[i % THUMBS.length]} card={card} index={i} />
        ))}
      </div>

      {/* Edge fade-outs so cards blend into background */}
      <div className="absolute inset-y-0 left-0 w-32 pointer-events-none hidden sm:block"
        style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)', zIndex: 1 }} />
      <div className="absolute inset-y-0 right-0 w-32 pointer-events-none hidden sm:block"
        style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)', zIndex: 1 }} />
      <div className="absolute inset-x-0 top-0 h-16 pointer-events-none hidden sm:block"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), transparent)', zIndex: 1 }} />
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none hidden sm:block"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)', zIndex: 1 }} />

      {/* Main content — always above thumbnails */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}