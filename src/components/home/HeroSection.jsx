import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, ChevronDown, BookOpen, ArrowRight, Zap } from 'lucide-react';
import { HeroLogo } from '../Logo';
import TypewriterText from '../TypewriterText';

const PHRASES = ['Planche', 'Front Lever', 'Handstand', 'Muscle-Up', 'L-Sit', 'Bent Arm Press'];

export default function HeroSection() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section className="relative min-h-[96vh] flex items-center overflow-hidden">
      {/* Rich ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.07) 0%, transparent 60%)' }} />
        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(var(--glow-secondary)/0.03) 0%, transparent 70%)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)/0.2) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)/0.2) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
          }} />
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent 10%,hsl(var(--glow-primary)/0.4) 50%,transparent 90%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="text-center">
          {/* Logo with entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <HeroLogo />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-7 border border-primary/30"
            style={{ boxShadow: '0 0 20px hsl(var(--glow-primary)/0.1)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <Crown className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-heading font-bold text-foreground/80 tracking-widest uppercase">
              Premium 1-on-1 Calisthenics Coaching
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
          >
            <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl leading-[1.03] tracking-tight">
              <span
                className="gradient-text block"
                style={{ textShadow: '0 0 60px hsl(var(--glow-primary)/0.2)' }}
              >
                Master Calisthenics
              </span>
              <span className="text-foreground block">
                Skills At Every Level
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="font-body text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Personalised programming, expert feedback, and a roadmap to unlock skills most athletes never reach.
          </motion.p>

          {/* Why My Coaching dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62 }}
            className="max-w-xl mx-auto mb-10"
          >
            <button
              onClick={() => setDetailsOpen(o => !o)}
              className="group flex items-center justify-center gap-2 mx-auto text-sm font-heading font-bold text-primary hover:text-primary/80 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-primary/5"
            >
              Why My Coaching
              <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {detailsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -4 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="glass rounded-2xl p-6 mt-3 border border-primary/20 text-left space-y-3"
                    style={{ boxShadow: '0 8px 32px hsl(var(--glow-primary)/0.08)' }}>
                    {[
                      "The goal of my coaching is simple: help you achieve your dream calisthenics skills as fast, safely and efficiently as possible.",
                      "Over the past few years I've spent thousands of hours learning calisthenics, overcoming plateaus, refining technique, managing injuries and figuring out what actually works. I've also received coaching and guidance from some of the best athletes in the world, which completely changed the speed of my progress.",
                      "I've coached athletes both online and in person, ranging from complete beginners to advanced athletes. The results are there. At this point it isn't really a question of whether coaching works. The real question is how much longer you're willing to spend guessing.",
                      "Most people continue watching random YouTube tutorials without knowing which advice actually applies to them. With personalised coaching, every exercise, progression, correction and adjustment is built specifically around YOU.",
                      "My goal is to help you achieve those same results faster while avoiding the mistakes that slow down progress.",
                    ].map((para, i) => (
                      <p key={i} className="text-sm font-body text-foreground/75 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            <Link to="/scan">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex items-center gap-3 px-9 py-4 rounded-2xl gradient-bg-strong text-primary-foreground font-heading font-black text-base relative overflow-hidden group"
                style={{ boxShadow: '0 0 28px hsl(var(--glow-primary)/0.3), 0 4px 24px hsl(var(--glow-primary)/0.18)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--gradient-start)/0.15), transparent)' }} />
                <Crown className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Apply for Coaching</span>
                <span className="text-primary-foreground/55 font-body font-normal text-sm relative z-10">— $40/wk</span>
              </motion.button>
            </Link>

            <Link to="/skills/free">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl glass border border-border/50 text-foreground font-heading font-bold text-base hover:border-primary/40 transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Free Tutorials
              </motion.button>
            </Link>
          </motion.div>

          {/* Results link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.88 }}
          >
            <Link to="/results"
              className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-primary transition-all duration-200 group"
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