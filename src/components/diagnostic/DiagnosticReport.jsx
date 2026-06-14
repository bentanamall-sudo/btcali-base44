import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const LEVEL_COLORS = {
  'Beginner': 'text-slate-400 bg-slate-400/15',
  'Intermediate': 'text-cyan-400 bg-cyan-400/15',
  'Advanced': 'text-amber-400 bg-amber-400/15',
};

const LEVEL_GLOW = {
  'Beginner': '',
  'Intermediate': 'border-cyan-400/40',
  'Advanced': 'border-amber-400/50',
};

export default function DiagnosticReport({ data, report }) {
  const levelColor = LEVEL_COLORS[report.athlete_level] || LEVEL_COLORS['Beginner'];
  const levelGlow = LEVEL_GLOW[report.athlete_level] || '';

  return (
    <div className="space-y-5">
      {/* Level hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass rounded-2xl p-6 text-center border ${levelGlow} relative overflow-hidden`}
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          <Trophy className="w-10 h-10 text-primary mx-auto mb-3" />
          <p className="text-xs font-heading text-muted-foreground uppercase tracking-widest mb-1">Your Level</p>
          <div className={`inline-block text-xl font-heading font-bold px-6 py-2 rounded-full mb-3 ${levelColor}`}>
            {report.athlete_level}
          </div>
          <p className="text-sm font-body text-foreground/80 max-w-lg mx-auto leading-relaxed">{report.athlete_summary}</p>
        </div>
      </motion.div>

      {/* Your Next Step */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 border border-primary/25 relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          <p className="font-heading font-bold text-primary text-xs uppercase tracking-wider mb-3">Your Next Step</p>
          <p className="font-body text-sm text-foreground/85 leading-relaxed mb-3">
            Based on your answers, the biggest opportunity for improvement is following a structured progression plan.
          </p>
          <p className="font-body text-sm text-foreground/75 leading-relaxed">
            Many athletes at your level struggle because they train inconsistently, lack proper programming, or do not know how to progress efficiently. BTCALI coaching helps eliminate guesswork and provides a clear path towards stronger skills, better technique, and faster progress.
          </p>
        </div>
      </motion.div>
    </div>
  );
}