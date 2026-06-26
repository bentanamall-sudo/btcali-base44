import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import VideoCollage from './VideoCollage';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-60" />
        <motion.div
          animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute"
          style={{
            top: '-20%', left: '-10%', width: '70%', height: '70%',
            background: 'radial-gradient(ellipse, rgba(79,157,255,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ opacity: [0.03, 0.07, 0.03], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute"
          style={{
            bottom: '-10%', right: '-5%', width: '60%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(94,235,255,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(79,157,255,0.3) 50%, transparent 95%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 20% 3%))' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">

          {/* LEFT — Typography */}
          <div className="min-w-0 relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(79,157,255,0.2)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#5EEBFF' }} />
              <span className="text-xs font-heading font-semibold tracking-[0.18em] uppercase" style={{ color: '#A6D4FF' }}>
                Elite 1-on-1 Calisthenics Coaching
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-heading font-black leading-[0.93] tracking-tight mb-6" style={{ perspective: 800 }}>
                {['MASTER', 'CALISTHENICS', 'SKILLS'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`block text-5xl sm:text-6xl lg:text-[5.5rem] ${i === 1 ? 'gradient-text gold-glow' : 'text-white'}`}
                    style={{
                      textShadow: i === 1
                        ? '0 0 40px rgba(79,157,255,0.4), 0 4px 20px rgba(0,0,0,0.5)'
                        : '0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.08)',
                      transformOrigin: 'left center',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-medium italic"
                  style={{ color: 'rgba(191,201,217,0.6)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                >
                  for every level
                </motion.span>
              </h1>
            </motion.div>

            {/* Sublines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-10 space-y-1.5"
            >
              {[
                'Personalised programming.',
                'Expert video feedback.',
                'Real results that speak for themselves.',
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.72 + i * 0.1 }}
                  className="font-body text-lg font-medium flex items-center gap-2.5"
                  style={{ color: '#BFC9D9' }}
                >
                  <span className="w-5 h-px rounded-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #4F9DFF, #5EEBFF)' }} />
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/skills">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3, boxShadow: '0 0 50px rgba(79,157,255,0.5), 0 8px 30px rgba(79,157,255,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-heading font-bold text-base gradient-bg-strong btn-shine relative overflow-hidden"
                  style={{ color: 'white', boxShadow: '0 0 28px rgba(79,157,255,0.35), 0 4px 20px rgba(79,157,255,0.18)' }}
                >
                  <BookOpen className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Free Tutorials</span>
                  <span className="relative z-10 text-sm opacity-70">→</span>
                </motion.button>
              </Link>

              <Link to="/apply">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl font-heading font-medium text-base transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#BFC9D9',
                  }}
                >
                  <Users className="w-4 h-4 flex-shrink-0" style={{ color: '#4F9DFF' }} />
                  Apply for 1-on-1 Coaching
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — Video Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <VideoCollage />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full"
            style={{ background: '#4F9DFF' }}
          />
        </div>
      </motion.div>
    </section>
  );
}