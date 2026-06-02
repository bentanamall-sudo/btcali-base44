import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';
import LazyVideo from '../LazyVideo';

// Use only first 7 videos for the strip — fewer simultaneous loads
const STRIP_VIDEOS = RESULTS_VIDEOS.slice(0, 7);

function ResultCard({ item, eager }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/results')}
      className="flex-shrink-0 w-32 h-48 sm:w-36 sm:h-52 rounded-2xl overflow-hidden relative cursor-pointer bg-muted/20"
      style={{ border: '1px solid hsl(var(--glow-primary)/0.2)' }}
    >
      <LazyVideo
        src={item.src}
        eager={eager}
        rootMargin="400px"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-2 left-2 pointer-events-none">
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full backdrop-blur-sm ${item.labelColor}`}>
          {item.label}
        </span>
      </div>
    </div>
  );
}

export default function ScrollingResultsStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const row1 = [...STRIP_VIDEOS, ...STRIP_VIDEOS];
  const row2 = [...STRIP_VIDEOS].reverse().concat([...STRIP_VIDEOS].reverse());

  return (
    <section ref={ref} className="relative py-20 overflow-hidden select-none">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

      {/* Section label */}
      <div className="text-center mb-8 relative z-10">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em]">
          Real Athletes · Real Results
        </p>
        <p className="text-xs text-muted-foreground/40 font-body mt-1">Click any video to see all results</p>
      </div>

      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="flex gap-3 mb-3 px-8">
        {row1.map((item, i) => (
          <ResultCard key={`r1-${i}`} item={item} eager={i < 4} />
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="flex gap-3 px-8" initial={{ x: '-4%' }}>
        {row2.map((item, i) => (
          <ResultCard key={`r2-${i}`} item={item} eager={false} />
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--glow-primary)/0.04) 0%, transparent 70%)' }} />
    </section>
  );
}