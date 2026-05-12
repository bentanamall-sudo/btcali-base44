import { motion } from 'framer-motion';
import { Trophy, Zap, Target, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LEVEL_COLORS = {
  Recruit: 'text-slate-400 bg-slate-400/15',
  Initiate: 'text-blue-400 bg-blue-400/15',
  Warrior: 'text-cyan-400 bg-cyan-400/15',
  Elite: 'text-primary bg-primary/15',
  Legend: 'text-amber-400 bg-amber-400/15',
};

const LEVEL_GLOW = {
  Recruit: '',
  Initiate: 'border-blue-400/40',
  Warrior: 'border-cyan-400/40',
  Elite: 'border-primary/50',
  Legend: 'border-amber-400/50',
};

export default function DiagnosticReport({ data, report, compact }) {
  const levelColor = LEVEL_COLORS[report.athlete_level] || LEVEL_COLORS.Recruit;
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
          <p className="text-xs font-heading text-muted-foreground uppercase tracking-widest mb-1">Athlete Level</p>
          <div className={`inline-block text-2xl font-heading font-bold px-6 py-2 rounded-full mb-3 ${levelColor}`}>
            {report.athlete_level}
          </div>
          <p className="text-sm font-body text-foreground/80 max-w-lg mx-auto leading-relaxed">{report.athlete_summary}</p>
        </div>
      </motion.div>

      {!compact && (
        <>
          {/* Strengths & Weaknesses */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5 border border-green-400/20">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <h3 className="font-heading font-bold text-sm text-green-400 uppercase tracking-wider">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {report.strengths.map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-2" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-5 border border-amber-400/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h3 className="font-heading font-bold text-sm text-amber-400 uppercase tracking-wider">Weaknesses</h3>
              </div>
              <ul className="space-y-2">
                {report.weaknesses.map(w => (
                  <li key={w} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Recommended Focus */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-5 border border-primary/25">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="font-heading font-bold text-sm text-primary uppercase tracking-wider">Recommended Focus</h3>
            </div>
            <p className="text-sm font-body text-foreground/80">{report.recommended_focus}</p>
          </motion.div>

          {/* Recommended Programs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass rounded-2xl p-5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-heading font-bold text-sm text-primary uppercase tracking-wider">Recommended Programs</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {report.recommended_programs.map(p => (
                <span key={p} className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full glass border border-primary/30 text-primary">{p}</span>
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-5 glow-border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="font-heading font-bold text-sm text-primary uppercase tracking-wider">Next Steps</h3>
            </div>
            <ul className="space-y-2">
              {report.next_steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}

      {compact && (
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="glass rounded-xl p-4 border border-green-400/20">
            <p className="text-xs font-heading text-green-400 mb-2 uppercase tracking-wider">Top Strengths</p>
            {report.strengths.slice(0, 2).map(s => <p key={s} className="text-xs text-foreground/70 font-body">· {s}</p>)}
          </div>
          <div className="glass rounded-xl p-4 border border-amber-400/20">
            <p className="text-xs font-heading text-amber-400 mb-2 uppercase tracking-wider">Key Weaknesses</p>
            {report.weaknesses.slice(0, 2).map(w => <p key={w} className="text-xs text-foreground/70 font-body">· {w}</p>)}
          </div>
          <div className="glass rounded-xl p-4 border border-primary/25">
            <p className="text-xs font-heading text-primary mb-2 uppercase tracking-wider">Next Steps</p>
            {report.next_steps.slice(0, 2).map((s, i) => <p key={i} className="text-xs text-foreground/70 font-body">· {s}</p>)}
          </div>
        </div>
      )}
    </div>
  );
}