import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, BookOpen, ArrowRight } from 'lucide-react';
import { HeroLogo } from '../Logo';
import TypewriterText from '../TypewriterText';
import SmartAccordion from '@/components/SmartAccordion';

const WHY_PARAGRAPHS = [
  "The goal of my coaching is simple: help you achieve your dream calisthenics skills as fast, safely and efficiently as possible.",
  "I've spent thousands of hours learning calisthenics, overcoming plateaus, refining technique, managing injuries and figuring out what actually works — including guidance from some of the best athletes in the world. That's why I started BTCALI.",
  "I've coached athletes from complete beginners to advanced, ranging from age 12 into their 30s. The results speak for themselves. With personalised coaching, every exercise and correction is built specifically around YOU — not random YouTube advice.",
  "My goal has always been to help as many athletes as possible achieve skills they once thought were impossible. That's why my coaching is priced significantly lower than most coaches charging $500+/month for the same service.",
];

export default function HeroSection() {

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Layered ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Main gold orb */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(43 74% 49% / 0.07) 0%, transparent 55%)' }}
        />
        {/* Top-right accent */}
        <div
          className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(43 74% 49% / 0.04) 0%, transparent 65%)' }}
        />
        {/* Bottom-left dim */}
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(38 65% 35% / 0.03) 0%, transparent 65%)' }}
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(0 0% 100% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Top gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, hsl(43 74% 49% / 0.35) 50%, transparent 95%)' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(0 0% 3%))' }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-28 w-full">
        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center mb-9"
          >
            <HeroLogo />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: 'hsl(0 0% 7% / 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid hsl(43 74% 49% / 0.28)',
              boxShadow: '0 0 20px hsl(43 74% 49% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'hsl(44 85% 52%)' }} />
            <Crown className="w-3.5 h-3.5" style={{ color: 'hsl(44 85% 52%)' }} />
            <span className="text-xs font-heading font-bold tracking-[0.2em] uppercase" style={{ color: 'hsl(44 80% 65%)' }}>
              1-on-1 Calisthenics Coaching
            </span>
          </motion.div>

          {/* Main heading with typewriter on first line */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <h1 className="font-heading font-black leading-[1.04] tracking-tight">
              <span className="block text-4xl sm:text-6xl md:text-7xl gradient-text gold-glow">
                <TypewriterText
                  text="Master Calisthenics"
                  delay={0.5}
                  speed={44}
                  showCursor={false}
                />
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.45 }}
                className="block text-4xl sm:text-6xl md:text-7xl text-foreground mt-1"
              >
                Skills At Every Level
              </motion.span>
            </h1>
          </motion.div>

          {/* Sub-tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.45 }}
            className="mb-9"
          >
            <p className="font-body text-base sm:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: 'hsl(0 0% 52%)' }}>
              <TypewriterText
                text="Personalised programming. Expert feedback. Real results."
                delay={1.95}
                speed={28}
                showCursor={true}
              />
            </p>
          </motion.div>

          {/* Why My Coaching dropdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.95, duration: 0.4 }}
            className="max-w-xl mx-auto mb-10"
          >
            <SmartAccordion
              scrollThreshold={60}
              trigger={
                <span className="flex items-center justify-center gap-1.5 mx-auto text-sm font-heading font-semibold px-4 py-2 rounded-lg w-full"
                  style={{ color: 'hsl(45 85% 58%)' }}>
                  Why My Coaching
                </span>
              }
            >
              <div className="space-y-3">
                {WHY_PARAGRAPHS.map((p, i) => (
                  <p key={i} className="text-sm font-body leading-relaxed" style={{ color: 'hsl(0 0% 65%)' }}>{p}</p>
                ))}
              </div>
            </SmartAccordion>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            <Link to="/scan">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="flex items-center gap-3 px-9 py-4 rounded-2xl font-heading font-black text-base relative overflow-hidden group gradient-bg-strong btn-shine"
                style={{
                  color: 'hsl(0 0% 5%)',
                  boxShadow: '0 0 30px hsl(43 74% 49% / 0.28), 0 4px 20px hsl(43 74% 49% / 0.16)',
                }}
              >
                <Crown className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Apply for Coaching</span>
                <span className="relative z-10 font-body font-normal text-sm opacity-60">— $40/wk</span>
              </motion.button>
            </Link>

            <Link to="/skills/free">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-heading font-bold text-base transition-all duration-200"
                style={{
                  background: 'hsl(0 0% 8% / 0.7)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid hsl(40 25% 18% / 0.6)',
                  color: 'hsl(0 0% 85%)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'hsl(43 74% 49% / 0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'hsl(40 25% 18% / 0.6)'}
              >
                <BookOpen className="w-4 h-4" style={{ color: 'hsl(44 80% 52%)' }} />
                Free Tutorials
              </motion.button>
            </Link>
          </motion.div>

          {/* Results link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.35 }}
          >
            <Link
              to="/results"
              className="inline-flex items-center gap-1.5 text-sm font-body transition-all duration-200 group"
              style={{ color: 'hsl(0 0% 40%)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'hsl(44 80% 55%)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'hsl(0 0% 40%)'; }}
            >
              See athlete results
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}