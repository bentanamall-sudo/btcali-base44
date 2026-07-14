import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScanLine } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { MaskReveal } from '@/lib/motion/RevealText';
import MagneticButton from '@/lib/motion/MagneticButton';
import { WINS_VIDEOS } from '@/lib/cinemaContent';

export default function FinalCTA() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });

  // Video expands from centre
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const bgCompress = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const ctaVideo = WINS_VIDEOS[0]; // Full Planche

  return (
    <section ref={ref} data-chapter className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background compresses as we enter */}
      <motion.div className="absolute inset-0" style={{ scale: reduced ? 1 : bgCompress }}>
        <div className="absolute inset-0" style={{ background: '#050508' }} />
      </motion.div>

      {/* Video expands from centre */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ scale: reduced ? 1 : videoScale, opacity: videoOpacity }}
      >
        <video autoPlay muted loop playsInline poster={ctaVideo.thumb} className="absolute inset-0 w-full h-full object-cover">
          <source src={ctaVideo.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.6)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-3xl"
        style={{ opacity: headingOpacity }}
      >
        <MaskReveal direction="bottom">
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-7xl text-white leading-tight mb-4" style={{ textShadow: '0 0 40px rgba(0,0,0,0.8)' }}>
            Your journey starts<br />with one scan.
          </h2>
        </MaskReveal>

        <motion.p
          style={{ opacity: buttonOpacity }}
          className="font-body text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Tell me your level, goals and weaknesses. I'll review your application and show you the next step.
        </motion.p>

        <motion.div style={{ opacity: buttonOpacity }}>
          <Link to="/diagnostic" data-cursor="arrow" data-cursor-label="Scan">
            <MagneticButton strength={0.3}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(79,157,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-heading font-black text-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)',
                  color: 'white',
                  boxShadow: '0 0 30px rgba(79,157,255,0.35)',
                }}
              >
                {/* Subtle blue light behind button */}
                <span className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle at 50% 100%, rgba(94,235,255,0.3), transparent 70%)' }} />
                <ScanLine className="w-6 h-6 relative z-10" />
                <span className="relative z-10">START ATHLETE SCAN</span>
              </motion.button>
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}