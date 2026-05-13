import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Trophy, Play } from 'lucide-react';
import GlowButton from '../GlowButton';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Elite Calisthenics Coaching For Proven High-Level Progress</span>
          </motion.div>

          {/* Main heading */}
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
            <span className="text-foreground">Unlock Elite</span>
            <br />
            <span className="gradient-text">Bodyweight Strength</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate premium calisthenics coaching platform — combining elite coaching, athlete diagnostics, proven transformation systems, and structured programs designed to help athletes at every level unlock serious bodyweight strength and elite-level progress.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/scan">
              <GlowButton size="lg">
                <Target className="w-5 h-5" />
                Start Athlete Scan
                <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </Link>
            <Link to="/tutorials">
              <GlowButton variant="secondary" size="lg">
                Start Free Tutorials
              </GlowButton>
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-10 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl gradient-text">20+</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-body mt-1">Athletes Transformed</div>
            </div>
            <Link to="/results">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="text-center glass glow-border rounded-xl px-5 py-3 cursor-pointer"
              >
                <div className="font-heading font-bold text-2xl sm:text-3xl gradient-text flex items-center gap-1.5 justify-center">
                  <Play className="w-5 h-5 text-primary" />
                  Insane Student Results
                </div>
                <div className="text-xs sm:text-sm text-primary font-body mt-1">Watch the proof →</div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}