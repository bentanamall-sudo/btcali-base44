import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Play, ChevronRight } from 'lucide-react';
import GlowButton from '../GlowButton';
import { HeroLogo } from '../Logo';

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">

      {/* ── Layered ambient background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.09) 0%, transparent 65%)' }} />
        <div className="ambient-blob-1" style={{ top: '-120px', left: '-80px' }} />
        <div className="ambient-blob-2" style={{ bottom: '-80px', right: '-80px' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)/0.2) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)/0.2) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }} />
        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,hsl(var(--glow-primary)/0.35),transparent)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Large premium circular logo badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <HeroLogo className="w-[280px] sm:w-[340px] md:w-[400px]" />
          </motion.div>

          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 glass glow-border px-4 py-2 rounded-full mb-7"
          >
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-heading font-bold text-muted-foreground tracking-widest uppercase">
              Elite Calisthenics Coaching
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-heading font-black text-4xl sm:text-6xl md:text-7xl leading-[1.02] mb-6 tracking-tight"
          >
            <span className="text-foreground">Unlock Elite</span>
            <br />
            <span className="gradient-text">Bodyweight Strength</span>
            <br />
            <span className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold">With BTCALI Coaching</span>
          </motion.h1>

          {/* Long-form persuasive copy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="max-w-2xl mx-auto mb-10 space-y-4"
          >
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed">
              Thousands of athletes want to unlock elite calisthenics skills — the muscle-up, handstand push-up, front lever, and planche. But most never get there because of confusion, inconsistent advice, and poor programming.
            </p>
            <p className="font-body text-base text-muted-foreground/80 leading-relaxed">
              BTCALI removes the guesswork with <span className="text-foreground font-semibold">structured systems</span>, <span className="text-foreground font-semibold">proven progressions</span>, and <span className="text-foreground font-semibold">real 1-on-1 coaching</span> — built from years of experience taking athletes from basic to elite bodyweight strength.
            </p>
            <p className="font-body text-sm text-muted-foreground/70 leading-relaxed">
              No random tutorials. No confusion. Just a clear, direct path toward elite calisthenics performance.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/scan">
              <GlowButton size="lg">
                <Target className="w-5 h-5" />
                Start Athlete Scan
                <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </Link>
            <Link to="/skills">
              <GlowButton variant="secondary" size="lg">
                Explore Skill Library
              </GlowButton>
            </Link>
          </motion.div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="glass rounded-2xl px-6 py-4 border border-border/40 card-3d text-center">
              <div className="font-heading font-black text-3xl gradient-text">20+</div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">Athletes Transformed</div>
            </div>
            <Link to="/results">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="glass glow-border rounded-2xl px-6 py-4 cursor-pointer card-3d transition-all duration-300"
              >
                <div className="font-heading font-bold text-base gradient-text flex items-center gap-2 justify-center">
                  <Play className="w-4 h-4 text-primary fill-current" />
                  Student Results
                </div>
                <div className="text-xs text-primary font-body mt-0.5 text-center">Watch the proof →</div>
              </motion.div>
            </Link>
            <Link to="/pricing">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="glass rounded-2xl px-6 py-4 cursor-pointer card-3d border border-border/40 transition-all duration-300"
              >
                <div className="font-heading font-bold text-base text-foreground flex items-center gap-2 justify-center">
                  1-on-1 Coaching
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground font-body mt-0.5 text-center">From AUD $40/week</div>
              </motion.div>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }} />
    </section>
  );
}