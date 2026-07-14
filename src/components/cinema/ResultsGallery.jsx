import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { STUDENT_STORIES } from '@/lib/cinemaContent';

function StudentSlide({ student, index, total, direction }) {
  return (
    <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-4 sm:px-8">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Before footage — enters from left */}
        <motion.div
          key={`before-${index}`}
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[9/16] max-w-[240px] sm:max-w-[300px] mx-auto overflow-hidden rounded-xl"
        >
          <img src={student.video.thumb} alt="" className="w-full h-full object-cover" style={{ filter: 'grayscale(0.3) brightness(0.6)' }} />
          <div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.3)' }} />
          <span className="absolute top-3 left-3 text-[10px] font-heading uppercase tracking-widest text-white/40">Starting Point</span>
        </motion.div>

        {/* Story + After footage */}
        <div>
          {/* Large editorial name */}
          <motion.h2
            key={`name-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-white leading-none mb-2"
          >
            {student.name}
          </motion.h2>
          <motion.span
            key={`skill-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-semibold text-sm uppercase tracking-[0.2em] block mb-6"
            style={{ color: '#5EEBFF' }}
          >
            {student.skill}
          </motion.span>

          <motion.p
            key={`highlight-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading font-bold text-lg sm:text-xl text-white mb-3"
          >
            {student.highlight}
          </motion.p>

          <motion.p
            key={`detail-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-md"
          >
            {student.detail}
          </motion.p>

          {/* After footage — enters from right */}
          <motion.div
            key={`after-${index}`}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[9/16] max-w-[180px] sm:max-w-[220px] overflow-hidden rounded-xl"
            data-cursor="play"
            data-cursor-label="Result"
          >
            <img src={student.video.thumb} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.4), transparent 40%)' }} />
            <div className="absolute inset-0 rounded-xl" style={{ border: '1px solid rgba(94,235,255,0.3)' }} />
            <span className="absolute top-3 left-3 text-[10px] font-heading uppercase tracking-widest" style={{ color: '#5EEBFF' }}>Result</span>
          </motion.div>
        </div>
      </div>

      {/* Progress label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="font-heading font-black text-lg text-white">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-white/20"> / {String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

export default function ResultsGallery() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = STUDENT_STORIES.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Map vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(total - 1) * 100}%`]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setActive(Math.min(Math.round(v * (total - 1)), total - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  return (
    <section ref={ref} data-chapter className="relative" style={{ height: `${total * 90}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#050508' }}>
        {/* Section label */}
        <div className="absolute top-20 left-4 sm:left-8 z-20">
          <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(79,157,255,0.5)' }}>
            05 — Results
          </span>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-white mt-1">Athlete Transformations</h2>
        </div>

        {/* Horizontal track */}
        <motion.div className="flex h-full" style={{ x: reduced ? 0 : x }}>
          {STUDENT_STORIES.map((student, i) => (
            <StudentSlide key={i} student={student} index={i} total={total} direction={i > active ? 1 : -1} />
          ))}
        </motion.div>

        {/* Edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(to right, #050508, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(to left, #050508, transparent)' }} />
      </div>
    </section>
  );
}