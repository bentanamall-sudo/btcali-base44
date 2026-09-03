import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import VideoCollage from './VideoCollage';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bone-surface">
      {/* Architectural grid lines — subtle vertical plumb lines */}
      <div className="absolute inset-0 pointer-events-none grid-lines opacity-40" aria-hidden />

      {/* Top + bottom plumb rules */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: '#D1D1CB' }} />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* LEFT — 8 cols — Monumental typography */}
          <div className="lg:col-span-8 min-w-0">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-px" style={{ background: '#FF4D00' }} />
              <span className="eyebrow text-foreground/60">
                Elite 1-on-1 Calisthenics Coaching
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-foreground mb-3"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 7rem)' }}
            >
              Master<br />
              Calisthenics<br />
              <span style={{ color: '#FF4D00' }}>Skills</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-heading font-medium italic text-foreground/50 mb-8"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', textTransform: 'none', letterSpacing: '0' }}
            >
              for every level
            </motion.p>

            {/* Deck */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mb-12 space-y-2 max-w-xl"
            >
              {[
                'Personalised programming.',
                'Expert video feedback.',
                'Real results that speak for themselves.',
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="font-body text-foreground/70 flex items-center gap-3"
                  style={{ fontSize: '18px', lineHeight: 1.6 }}
                >
                  <span className="w-4 h-px flex-shrink-0" style={{ background: '#1A1A1A' }} />
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* CTAs — stacked on mobile, row on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/skills">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="b-cta btn-shine flex items-center justify-center gap-2.5 px-8 py-4 text-sm w-full sm:w-auto"
                >
                  <BookOpen className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Free Tutorials</span>
                  <span className="relative z-10 text-xs opacity-70">→</span>
                </motion.button>
              </Link>

              <Link to="/apply">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="b-cta-outline flex items-center justify-center gap-2 px-7 py-4 text-sm w-full sm:w-auto"
                >
                  <Users className="w-4 h-4" />
                  Apply for 1-on-1 Coaching
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — 4 cols — Video preview framed in 1px Raw Concrete */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block lg:col-span-4 relative"
            data-view-cursor
          >
            <div className="relative" style={{ border: '1px solid #D1D1CB', padding: '8px' }}>
              <VideoCollage />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}