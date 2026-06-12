import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, ChevronDown, BookOpen, ArrowRight } from 'lucide-react';
import { HeroLogo } from '../Logo';

export default function HeroSection() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.05) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)/0.15) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)/0.15) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,hsl(var(--glow-primary)/0.25),transparent)' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <HeroLogo />
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-primary/20"
          >
            <Crown className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-heading font-bold text-muted-foreground tracking-widest uppercase">
              Elite Calisthenics Coaching
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65 }}
            className="font-heading font-black text-4xl sm:text-6xl md:text-7xl leading-[1.02] mb-3 tracking-tight"
          >
            <span className="gradient-text">Unlock Crazy</span>
            <br />
            <span className="text-foreground">Calisthenics Skills</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="font-heading font-semibold text-xl sm:text-2xl text-muted-foreground mb-8"
          >
            With BTCALI Coaching
          </motion.p>

          {/* Short copy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-xl mx-auto mb-3 space-y-3"
          >
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Whether you're starting from 0 pike push-ups and your first pull-up, or chasing advanced skills like the full planche, front lever, handstand push-up and front lever pull-up, BTCALI provides coaching tailored to your current level.
            </p>
            <p className="font-body text-sm text-muted-foreground/70 leading-relaxed">
              No guesswork. No random tutorials. Just a proven system that works.
            </p>
          </motion.div>

          {/* How it works dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="max-w-xl mx-auto mb-10"
          >
            <button
              onClick={() => setDetailsOpen(o => !o)}
              className="flex items-center justify-center gap-2 mx-auto text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              How BTCALI Coaching Works
              <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {detailsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="glass rounded-xl p-5 mt-3 border border-border/30 text-left space-y-3">
                    <p className="text-sm font-body text-foreground/80 leading-relaxed">
                      I look at your current level, goals, weaknesses, form, technique, mobility, strengths and limitations — then build a routine specifically designed to get you progressing as fast as possible.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      You send every set to me. I analyse your form, technique, strength and endurance, then provide feedback via text, voice recordings, screen recordings and personalised tutorials — before your next workout.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      I continuously adapt your routine based on your performance so your progress never stalls.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            {/* Primary — 1-on-1 Coaching */}
            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base"
                style={{ boxShadow: '0 0 20px hsl(var(--glow-primary)/0.25), 0 4px 20px hsl(var(--glow-primary)/0.15)' }}
              >
                <Crown className="w-5 h-5" />
                1-on-1 Coaching
                <span className="text-primary-foreground/70 font-body font-normal text-sm ml-1">AUD $40/wk</span>
              </motion.button>
            </Link>

            {/* Secondary — Free Tutorials */}
            <Link to="/skills/free">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-4 rounded-xl glass border border-border/40 text-foreground font-heading font-semibold text-base hover:border-primary/30 transition-all"
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
            transition={{ delay: 0.75 }}
          >
            <Link to="/results" className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-primary transition-colors">
              See athlete results <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }} />
    </section>
  );
}