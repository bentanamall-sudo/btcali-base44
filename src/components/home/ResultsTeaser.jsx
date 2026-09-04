import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WINS_VIDEOS } from '../../pages/ProvenResults';
import ResultsVideoPreview from './ResultsVideoPreview';

const THUMBS = WINS_VIDEOS.slice(0, 10).map(v => v.thumb);

const POSITIONS = [
  { left: '2%',   top: '8%',   rotate: -6, scale: 0.82, opacity: 0.5, delay: 0 },
  { left: '0%',   top: '38%',  rotate: 4,   scale: 0.90, opacity: 0.65, delay: 0.05 },
  { left: '6%',   top: '65%',  rotate: -4,  scale: 0.78, opacity: 0.45, delay: 0.1 },
  { left: '18%',  top: '5%',   rotate: 8,   scale: 0.70, opacity: 0.4, delay: 0.15 },
  { left: '14%',  top: '75%',  rotate: -3,  scale: 0.85, opacity: 0.55, delay: 0.2 },
  { right: '2%',  top: '10%',  rotate: 6,   scale: 0.85, opacity: 0.55, delay: 0.08 },
  { right: '0%',  top: '40%',  rotate: -5,  scale: 0.92, opacity: 0.68, delay: 0.12 },
  { right: '6%',  top: '68%',  rotate: 10,  scale: 0.75, opacity: 0.43, delay: 0.18 },
  { right: '18%', top: '4%',   rotate: -8,  scale: 0.72, opacity: 0.38, delay: 0.22 },
  { right: '14%', top: '77%',  rotate: 4,   scale: 0.88, opacity: 0.58, delay: 0.25 },
];

export default function ResultsTeaser() {
  return (
    <section className="relative py-32 overflow-hidden bone-surface">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #F4F4F2, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #F4F4F2, transparent)' }} />

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
            borderRadius: 0,
            overflow: 'hidden',
            border: '1px solid #D1D1CB',
            zIndex: 1,
          }}
          data-view-cursor
        >
          <img
            src={THUMBS[i]}
            alt=""
            className="w-full h-full object-cover grayscale"
            loading={i < 4 ? 'eager' : 'lazy'}
            decoding="async"
            onError={(e) => { e.target.style.opacity = '0'; }}
          />
        </motion.div>
      ))}

      {/* Centre content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px" style={{ background: '#CCFF00' }} />
          <span className="eyebrow text-foreground/50">Real Athletes · Real Progress</span>
          <span className="w-8 h-px" style={{ background: '#CCFF00' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="display-lg text-foreground mb-5"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Athlete Results
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-body text-foreground/60 max-w-md mx-auto mb-10"
          style={{ fontSize: '18px', lineHeight: 1.6 }}
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
          <div className="mb-8">
            <ResultsVideoPreview />
          </div>
          <Link to="/results" className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="b-cta btn-shine inline-flex items-center gap-2.5 px-8 py-4 text-sm"
            >
              View All Results <ArrowRight className="w-4 h-4 relative z-10" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}