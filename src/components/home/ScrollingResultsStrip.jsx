import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RESULTS_VIDEOS } from '../../pages/ProvenResults';

const STRIP_VIDEOS = RESULTS_VIDEOS.slice(0, 6);

// Pure CSS card — zero network, instant render
function ResultCard({ index, onClick }) {
  const hue = 30 + (index * 11) % 24;
  return (
    <div
      className="flex-shrink-0 w-32 h-48 sm:w-36 sm:h-52 rounded-2xl overflow-hidden relative cursor-pointer"
      style={{
        border: '1px solid hsl(var(--glow-primary)/0.25)',
        background: `linear-gradient(160deg, hsl(${hue} 45% 14%) 0%, hsl(${hue} 25% 9%) 60%, #0f0f0f 100%)`,
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      {/* Subtle logo-ish shape for visual interest */}
      <div className="absolute inset-0 flex items-end justify-start p-3 pointer-events-none">
        <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--primary)/0.5)' }} />
      </div>
    </div>
  );
}

export default function ScrollingResultsStrip() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const row1 = [...STRIP_VIDEOS, ...STRIP_VIDEOS];
  const row2 = [...STRIP_VIDEOS].reverse().concat([...STRIP_VIDEOS].reverse());

  return (
    <section ref={ref} className="relative py-20 overflow-hidden select-none">
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

      <div className="text-center mb-8 relative z-10">
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em]">
          Real Athletes · Real Results
        </p>
      </div>

      <motion.div style={{ x: x1 }} className="flex gap-3 mb-3 px-8">
        {row1.map((item, i) => (
          <ResultCard key={`r1-${i}`} index={i % STRIP_VIDEOS.length} onClick={() => navigate('/results')} />
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex gap-3 px-8" initial={{ x: '-4%' }}>
        {row2.map((item, i) => (
          <ResultCard key={`r2-${i}`} index={(i + 3) % STRIP_VIDEOS.length} onClick={() => navigate('/results')} />
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--glow-primary)/0.04) 0%, transparent 70%)' }} />

      <div className="flex justify-center mt-10 relative z-10">
        <Link to="/results">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl glass border border-primary/40 text-foreground font-heading font-semibold text-sm hover:border-primary/70 transition-all"
          >
            View All Results <ArrowRight className="w-4 h-4 text-primary" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}