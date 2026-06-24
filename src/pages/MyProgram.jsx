import { motion } from 'framer-motion';
import { Lock, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyProgram() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border"
      >
        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          My <span className="gradient-text">Program</span>
        </h1>
        <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
          Your personalised BTCALI training program is exclusively available to coaching members. Contact BTCALI Coaching for access.
        </p>
        <Link to="/1-on-1-coaching">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm flex items-center justify-center gap-2 glow-primary mb-3"
          >
            <Crown className="w-4 h-4" /> Contact BTCALI Coaching
          </motion.button>
        </Link>
        <Link to="/" className="text-xs text-muted-foreground/50 hover:text-muted-foreground font-body transition-colors">
          ← Back to home
        </Link>
      </motion.div>
    </div>
  );
}