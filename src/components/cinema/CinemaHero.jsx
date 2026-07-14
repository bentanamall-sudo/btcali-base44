import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScanLine, Trophy, ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { WINS_VIDEOS } from '@/lib/cinemaContent';

export default function CinemaHero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax — video moves slower than page, scales slightly, darkens
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.75, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1, 0]);

  // Word-by-word reveal sequence
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (reduced) { setRevealed(5); return; }
    const timers = [
      setTimeout(() => setRevealed(1), 400),   // MASTER
      setTimeout(() => setRevealed(2), 900),   // CALISTHENICS
      setTimeout(() => setRevealed(3), 1400),  // SKILLS
      setTimeout(() => setRevealed(4), 2100),  // WITH BTCALI COACHING
      setTimeout(() => setRevealed(5), 2700),  // FOR EVERY LEVEL
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  // Use a powerful real video for the background
  const heroVideo = WINS_VIDEOS[0]; // Full Planche footage

  const words = ['MASTER', 'CALISTHENICS', 'SKILLS'];

  return (
    <section ref={ref} data-chapter className="relative h-screen min-h-[640px] overflow-hidden bg-black">
      {/* Background video */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ scale: reduced ? 1 : videoScale, y: reduced ? 0 : videoY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroVideo.thumb}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo.src} type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <motion.div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.4)', opacity: overlayOpacity }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.1) 40%, rgba(5,5,8,0.7) 100%)',
        }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }} />
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")',
        }} />
      </motion.div>

      {/* Typography */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
        style={{ y: reduced ? 0 : textY, opacity: textOpacity }}
      >
        {/* Main heading — word by word */}
        <h1 className="font-heading font-black text-center leading-[0.92] tracking-tight">
          {words.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.div
                initial={{ y: reduced ? 0 : 120, opacity: 0, filter: 'blur(12px)' }}
                animate={revealed > i ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl"
                style={{
                  color: i === 1 ? '#fff' : 'rgba(255,255,255,0.9)',
                  textShadow: '0 4px 30px rgba(0,0,0,0.6)',
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Supporting line */}
        <AnimatePresence>
          {revealed >= 4 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading font-semibold text-base sm:text-xl mt-4 tracking-[0.15em] uppercase"
              style={{ color: 'rgba(166,212,255,0.7)' }}
            >
              With BTCALI Coaching
            </motion.p>
          )}
        </AnimatePresence>

        {/* Secondary line */}
        <AnimatePresence>
          {revealed >= 5 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-heading font-light text-lg sm:text-2xl mt-1 italic"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              for every level
            </motion.p>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <AnimatePresence>
          {revealed >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Link to="/diagnostic" data-cursor="arrow" data-cursor-label="Scan">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(79,157,255,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-heading font-bold text-base"
                  style={{
                    background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)',
                    color: 'white',
                    boxShadow: '0 0 24px rgba(79,157,255,0.3)',
                  }}
                >
                  <ScanLine className="w-5 h-5" /> Start Athlete Scan
                </motion.button>
              </Link>
              <Link to="/results" data-cursor="play" data-cursor-label="View">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-heading font-semibold text-base backdrop-blur-md"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <Trophy className="w-5 h-5" /> View Student Results
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed >= 5 ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-white/30">Scroll to see the journey</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}