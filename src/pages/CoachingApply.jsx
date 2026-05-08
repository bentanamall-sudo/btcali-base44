import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Zap, ArrowRight, BarChart3, DollarSign } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

export default function CoachingApply() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Start Your Journey</span>
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            How Do You Want to <span className="gradient-text">Begin?</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Two paths. One destination — elite calisthenics.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Option 1: Athlete Scan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard glow className="h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 glow-primary">
                <BarChart3 className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-xl mb-2 text-foreground">Take the Athlete Scan</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1 mb-6">
                Not sure what program fits you? Take the scan and BTCALI will analyze your current level and recommend your exact best path.
              </p>
              <div className="space-y-2 mb-6">
                {['Personalized skill assessment', 'Weakness identification', 'Custom pathway recommendation'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-body text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/scan">
                <GlowButton className="w-full">
                  <Target className="w-4 h-4" />
                  Start Athlete Scan
                  <ArrowRight className="w-4 h-4" />
                </GlowButton>
              </Link>
              <p className="text-xs text-muted-foreground font-body text-center mt-3">Takes 3 minutes · 100% free</p>
            </GlassCard>
          </motion.div>

          {/* Option 2: Select Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard glow className="h-full flex flex-col ring-1 ring-primary/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="gradient-bg-strong text-primary-foreground text-xs font-heading font-bold px-3 py-1 rounded-full">
                  Ready to Commit
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl gradient-bg-strong flex items-center justify-center mb-5">
                <DollarSign className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="font-heading font-bold text-xl mb-2 text-foreground">Select Plan Now</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1 mb-6">
                Already know what you want? Choose a coaching plan and apply directly. Get custom programming, video feedback, and direct coach access.
              </p>
              <div className="space-y-2 mb-6">
                {['1-on-1 coaching available now', 'Custom programs & feedback', 'Direct coach messaging'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-body text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/pricing">
                <GlowButton variant="primary" className="w-full">
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </GlowButton>
              </Link>
              <p className="text-xs text-muted-foreground font-body text-center mt-3">Flexible plans · Cancel anytime</p>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-muted-foreground font-body">
            Not sure yet?{' '}
            <Link to="/programs" className="text-primary hover:underline">Browse Programs</Link>
            {' '}or{' '}
            <Link to="/tutorials" className="text-primary hover:underline">Start Free Tutorials</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}