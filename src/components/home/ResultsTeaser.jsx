import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { WINS_VIDEOS } from '../../pages/ProvenResults';
import ResultsVideoPreview from './ResultsVideoPreview';

const THUMBS = WINS_VIDEOS.slice(0, 10).map(v => v.thumb);

const POSITIONS = [
  { left: '2%',   top: '8%',   rotate: -12, scale: 0.82, opacity: 0.55, delay: 0 },
  { left: '0%',   top: '38%',  rotate: 6,   scale: 0.90, opacity: 0.70, delay: 0.05 },
  { left: '6%',   top: '65%',  rotate: -8,  scale: 0.78, opacity: 0.50, delay: 0.1 },
  { left: '18%',  top: '5%',   rotate: 10,  scale: 0.70, opacity: 0.45, delay: 0.15 },
  { left: '14%',  top: '75%',  rotate: -5,  scale: 0.85, opacity: 0.60, delay: 0.2 },
  { right: '2%',  top: '10%',  rotate: 8,   scale: 0.85, opacity: 0.60, delay: 0.08 },
  { right: '0%',  top: '40%',  rotate: -7,  scale: 0.92, opacity: 0.72, delay: 0.12 },
  { right: '6%',  top: '68%',  rotate: 12,  scale: 0.75, opacity: 0.48, delay: 0.18 },
  { right: '18%', top: '4%',   rotate: -10, scale: 0.72, opacity: 0.42, delay: 0.22 },
  { right: '14%', top: '77%',  rotate: 5,   scale: 0.88, opacity: 0.62, delay: 0.25 },
];

export default function ResultsTeaser() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />
      <div className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,157,255,0.06) 0%, transparent 70%)' }} />

      {/* Scattered thumbnails */}
      {POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: pos.scale * 0.85 }}
          animate={{ opacity: pos.opacity, scale: pos.scale }}
          transition={{ duration: 0.6, delay: pos.delay, ease: 'easeOut' }}
          className="absolute hidden sm:block"
          style={{
            left: pos.left,
            right: pos.right,
            top: pos.top,
            width: '90px',
            aspectRatio: '9/16',
            transform: `rotate(${pos.rotate}deg)`,
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(79,157,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        >
          <img
            src={THUMBS[i]}
            alt=""
            className="w-full h-full object-cover"
            loading={i < 4 ? 'eager' : 'lazy'}
            decoding="async"
            onError={(e) => { e.target.style.opacity = '0'; }}
          />
        </motion.div>
      ))}

      {/* Centre content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
          style={{ color: 'rgba(79,157,255,0.5)' }}
        >
          Real Athletes · Real Progress
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl mb-4 text-white"
        >
          Athlete <span className="gradient-text">Results</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto mb-8 leading-relaxed"
          style={{ color: '#BFC9D9' }}
        >
          Skills unlocked. Transformations achieved. Watch the footage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22 }}
          className="w-full"
        >
          <div className="mb-6">
            <ResultsVideoPreview />
          </div>
          <Link to="/results" className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl gradient-bg-strong text-white font-heading font-bold text-base btn-shine"
              style={{ boxShadow: '0 0 24px rgba(79,157,255,0.25)' }}
            >
              View All Results <ArrowRight className="w-4 h-4 relative z-10" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}