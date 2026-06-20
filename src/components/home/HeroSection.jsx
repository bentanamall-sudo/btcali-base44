import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TypewriterText from '../TypewriterText';

const FADE_UP = (delay = 0, y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
});

function ApplyButton({ className = '' }) {
  return (
    <Link to="/scan">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={`rounded-full font-medium uppercase tracking-widest text-white ${className}`}
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
          outline: '2px solid white',
          outlineOffset: '-3px',
          fontFamily: "'Kanit', sans-serif",
          padding: '12px 32px',
          fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
        }}
      >
        Apply for Coaching
      </motion.button>
    </Link>
  );
}

// Magnetic hover wrapper
function Magnet({ children, padding = 150, strength = 3 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;
      if (dist < maxDist) {
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
        el.style.transition = 'transform 0.3s ease-out';
      } else {
        el.style.transform = 'translate3d(0,0,0)';
        el.style.transition = 'transform 0.6s ease-in-out';
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0,0,0)';
      el.style.transition = 'transform 0.6s ease-in-out';
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength]);

  return (
    <div ref={ref} style={{ willChange: 'transform', display: 'inline-block' }}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col overflow-hidden"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      {/* Navbar */}
      <motion.div
        {...FADE_UP(0, -20)}
        className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 z-20 relative"
      >
        {[
          { label: 'Coaching', to: '/pricing' },
          { label: 'Results', to: '/results' },
          { label: 'Skills', to: '/skills' },
          { label: 'Apply', to: '/scan' },
        ].map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 text-sm md:text-lg"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(0.75rem, 1.4vw, 1.4rem)',
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {label}
          </Link>
        ))}
      </motion.div>

      {/* Main heading */}
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 z-10 relative">
        <motion.h1
          {...FADE_UP(0.15, 40)}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center"
          style={{
            fontSize: 'clamp(14vw, 17.5vw, 17.5vw)',
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          Master Calisthenics
        </motion.h1>
      </div>

      {/* Portrait — centered absolutely */}
      <motion.div
        {...FADE_UP(0.6, 30)}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
        style={{ width: 'clamp(200px, 35vw, 480px)' }}
      >
        <Magnet padding={150} strength={3}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="BTCALI Athlete"
            className="w-full"
            style={{ filter: 'brightness(0.85) contrast(1.1)' }}
          />
        </Magnet>
      </motion.div>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
        <motion.p
          {...FADE_UP(0.35, 20)}
          className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{
            color: '#D7E2EA',
            fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          Personalised calisthenics coaching. Real results. Every level.
        </motion.p>

        <motion.div {...FADE_UP(0.5, 20)}>
          <ApplyButton />
        </motion.div>
      </div>
    </section>
  );
}