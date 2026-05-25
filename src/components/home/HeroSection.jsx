import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Trophy, Play } from 'lucide-react';
import GlowButton from '../GlowButton';
import Logo from '../Logo';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* ── Layered ambient background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Deep ambient centre glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.07) 0%, transparent 65%)' }} />
        {/* Top-left float */}
        <div className="ambient-blob-1 top-[-100px] left-[-100px]" />
        {/* Bottom-right float */}
        <div className="ambient-blob-2 bottom-[-80px] right-[-80px]" />
        {/* Subtle horizontal scan line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,hsl(var(--glow-primary)/0.3),transparent)' }} />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)/0.15) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)/0.15) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Logo mark above headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <Logo size="lg" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 glass glow-border px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-heading font-semibold text-muted-foreground tracking-wider uppercase">
              Elite Calisthenics Coaching
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 tracking-tight"
          >
            <span className="text-foreground">Unlock Elite</span>
            <br />
            <span className="gradient-text">Bodyweight Strength</span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Structured systems, proven progressions, and real coaching — built to take athletes from basic to elite calisthenics performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
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

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* Stat pill */}
            <div className="glass rounded-2xl px-6 py-4 border border-border/40 card-3d">
              <div className="font-heading font-black text-2xl sm:text-3xl gradient-text">20+</div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">Athletes Transformed</div>
            </div>

            {/* Results CTA */}
            <Link to="/results">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="glass glow-border rounded-2xl px-6 py-4 cursor-pointer card-3d transition-all duration-300"
              >
                <div className="font-heading font-bold text-base sm:text-lg gradient-text flex items-center gap-2 justify-center">
                  <Play className="w-4 h-4 text-primary fill-current" />
                  Student Results
                </div>
                <div className="text-xs text-primary font-body mt-0.5 text-center">Watch the proof →</div>
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