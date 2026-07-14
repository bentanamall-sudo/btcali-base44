import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { STUDENT_STORIES, WINS_VIDEOS } from '@/lib/cinemaContent';

// Stacking cards — each student result fills viewport, covered by the next
function StackingCard({ student, index, total, progress, range }) {
  const reduced = useReducedMotion();
  const target = useRef(null);

  // Card scale + opacity based on scroll position within its range
  const scale = useTransform(progress, range, [1, 0.85]);
  const opacity = useTransform(progress, range, [1, 0.4]);
  const y = useTransform(progress, range, [0, -30]);

  // Alternate layouts per card
  const isEven = index % 2 === 0;

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ zIndex: index + 1 }}>
      <motion.div
        ref={target}
        style={{ scale: reduced ? 1 : scale, opacity: reduced ? 1 : opacity, y: reduced ? 0 : y }}
        className="max-w-4xl w-full mx-4"
      >
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: 'rgba(10,12,18,0.9)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top light edge */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.3), transparent)' }} />

          {isEven ? (
            // Layout A: Large video left, story right
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-[9/16] lg:aspect-auto lg:h-[460px] overflow-hidden">
                <img src={student.video.thumb} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(10,12,18,0.4))' }} />
              </div>
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <span className="font-heading font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#5EEBFF' }}>{student.skill}</span>
                <h3 className="font-heading font-black text-3xl sm:text-5xl text-white mb-3">{student.name}</h3>
                <p className="font-heading font-bold text-base sm:text-lg text-white/90 mb-4">{student.highlight}</p>
                <p className="font-body text-sm text-white/50 leading-relaxed">{student.detail}</p>
              </div>
            </div>
          ) : (
            // Layout B: Story top, full-width video
            <div className="p-8 sm:p-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-heading font-semibold text-xs uppercase tracking-[0.2em] block mb-2" style={{ color: '#5EEBFF' }}>{student.skill}</span>
                  <h3 className="font-heading font-black text-3xl sm:text-5xl text-white">{student.name}</h3>
                </div>
                <span className="font-heading font-black text-4xl text-white/10">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="relative aspect-video max-h-[400px] overflow-hidden rounded-2xl">
                <img src={student.video.thumb} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid rgba(79,157,255,0.15)' }} />
              </div>
              <p className="font-heading font-bold text-base text-white/90 mt-4">{student.highlight}</p>
              <p className="font-body text-sm text-white/50 leading-relaxed mt-2">{student.detail}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingCards() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const total = STUDENT_STORIES.length;

  // Create ranges for each card
  const ranges = STUDENT_STORIES.map((_, i) => [i / total, (i + 1) / total]);

  return (
    <section ref={ref} data-chapter className="relative" style={{ background: '#050508' }}>
      {STUDENT_STORIES.map((student, i) => (
        <StackingCard
          key={i}
          student={student}
          index={i}
          total={total}
          progress={scrollYProgress}
          range={ranges[i]}
        />
      ))}

      {/* Final card — CTA */}
      <div className="sticky top-0 h-screen flex items-center justify-center" style={{ zIndex: total + 1, background: '#050508' }}>
        <div className="text-center px-4">
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-2">See Every Athlete Story</h2>
          <p className="font-body text-sm text-white/40 mb-8 max-w-md mx-auto">
            These are only a handful of results achieved through BTCALI coaching. Every athlete starts at a different level.
          </p>
          <Link to="/results" data-cursor="arrow" data-cursor-label="View All">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-heading font-bold text-base"
              style={{ background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)', color: 'white', boxShadow: '0 0 24px rgba(79,157,255,0.3)' }}
            >
              <Trophy className="w-5 h-5" /> View All Results
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}