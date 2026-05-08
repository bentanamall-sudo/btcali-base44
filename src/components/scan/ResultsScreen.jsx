import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import GlassCard from '../GlassCard';
import GlowButton from '../GlowButton';
import ProgressBar from '../ProgressBar';

export default function ResultsScreen({ results }) {
  const { categories, pathways } = results;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 gradient-bg-strong text-primary-foreground px-4 py-2 rounded-full mb-4 font-heading text-sm font-semibold">
          <Shield className="w-4 h-4" /> SCAN COMPLETE
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
          BTCALI <span className="gradient-text">Athlete Scan</span> Complete
        </h1>
        <p className="text-muted-foreground font-body">Here is your personalized diagnosis</p>
      </motion.div>

      {/* Diagnosis Cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {Object.entries(categories).map(([key, cat], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard glow hover={false} className="h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-lg text-foreground">{cat.label}</h3>
                <span className={`text-xs font-heading font-semibold px-2 py-1 rounded-full ${
                  cat.score >= 70 ? 'bg-green-500/20 text-green-400' :
                  cat.score >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {cat.level}
                </span>
              </div>
              <ProgressBar value={cat.score} size="default" />
              {cat.weakness && (
                <p className="text-xs text-red-400/80 font-body mt-2">{cat.weakness}</p>
              )}
              <div className="mt-3">
                <p className="text-xs text-muted-foreground font-body mb-1">Recommendations:</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.recommendations.map((rec) => (
                    <span key={rec} className="text-xs glass px-2 py-1 rounded-md text-foreground/80 font-body">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Recommended Pathways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="font-heading font-bold text-2xl mb-6 text-center">
          Recommended <span className="gradient-text">Pathways</span>
        </h2>
        <div className="space-y-3 mb-8">
          {pathways.map((p, i) => (
            <Link key={i} to={p.to}>
              <GlassCard glow className="flex items-center justify-between py-4">
                <span className="font-body font-medium text-foreground">{p.name}</span>
                <ArrowRight className="w-5 h-5 text-primary" />
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/dashboard">
            <GlowButton size="lg">
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </GlowButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}