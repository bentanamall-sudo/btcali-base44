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
              1-on-1 Calisthenics Coaching
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65 }}
            className="font-heading font-black text-4xl sm:text-6xl md:text-7xl leading-[1.02] mb-4 tracking-tight"
          >
            <span className="gradient-text">Master Calisthenics Skills</span>
            <br />
            <span className="text-foreground">At Every Level</span>
          </motion.h1>

          {/* Why My Coaching dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="max-w-xl mx-auto mb-10"
          >
            <button
              onClick={() => setDetailsOpen(o => !o)}
              className="flex items-center justify-center gap-2 mx-auto text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Why My Coaching
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
                      The goal of my coaching is simple: help you achieve your dream calisthenics skills as fast, safely and efficiently as possible.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      Over the past few years I've spent thousands of hours learning calisthenics, overcoming plateaus, refining technique, managing injuries and figuring out what actually works. I've also received coaching and guidance from some of the best athletes in the world, which completely changed the speed of my progress. That's one of the biggest reasons I started BTCALI Coaching — because I know firsthand how much coaching can accelerate results.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      I've coached athletes both online and in person, ranging from complete beginners to advanced athletes, and from ages as young as 12 all the way into their 30s. The results are there. At this point it isn't really a question of whether coaching works. It's been proven over and over again. The real question is how much longer you're willing to spend guessing.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      Most people continue watching random YouTube tutorials and trying different methods without knowing which advice actually applies to them. Some eventually get there, but progress is often much slower than it needs to be. With personalised coaching, every exercise, progression, correction and adjustment is built specifically around YOU.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      One thing that's important to me is that I'm not doing this purely for money. The reason my coaching is priced lower than many coaches is because my goal has always been to help as many athletes as possible achieve skills they once thought were impossible.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      I know exactly how it feels to look at skills such as the Planche, Front Lever, Muscle-Up, Handstand Push-Up and 90 Degree Handstand Push-Up and think they'll never happen. Yet within roughly two years of training I achieved a 5 second Full Planche, 5 Front Lever Pull-Ups, No Dip Muscle-Ups, Handstand Push-Ups and 90 Degree Handstand Push-Ups. Those skills weren't unlocked through luck. They came through proper guidance, structured training and understanding what to focus on.
                    </p>
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">
                      My goal is to help you achieve those same results faster while avoiding the mistakes that slow down progress.
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
            transition={{ delay: 0.58 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <Link to="/scan">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base"
                style={{ boxShadow: '0 0 20px hsl(var(--glow-primary)/0.25), 0 4px 20px hsl(var(--glow-primary)/0.15)' }}
              >
                <Crown className="w-5 h-5" />
                Apply for Coaching
                <span className="text-primary-foreground/60 font-body font-normal text-sm ml-0.5">— $40/wk</span>
              </motion.button>
            </Link>

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
            transition={{ delay: 0.72 }}
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