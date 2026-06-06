import { motion } from 'framer-motion';
import { Trophy, Target } from 'lucide-react';

const LEVEL_COLORS = {
  'Beginner Foundation': 'text-slate-400 bg-slate-400/15',
  'Developing Foundation': 'text-blue-400 bg-blue-400/15',
  'Intermediate Foundation': 'text-cyan-400 bg-cyan-400/15',
  'Strong Foundation': 'text-primary bg-primary/15',
  'Advanced Foundation': 'text-amber-400 bg-amber-400/15',
};

const LEVEL_GLOW = {
  'Beginner Foundation': '',
  'Developing Foundation': 'border-blue-400/40',
  'Intermediate Foundation': 'border-cyan-400/40',
  'Strong Foundation': 'border-primary/50',
  'Advanced Foundation': 'border-amber-400/50',
};

// Derive skill focuses from report data
function getSkillFocuses(data, report) {
  const focuses = [];
  const goals = data?.goals || [];
  if (goals.includes('Handstand') || goals.includes('Handstand Push-Up')) focuses.push('Handstand');
  if (goals.includes('L-Sit') || goals.includes('L-Sit To Handstand')) focuses.push('L-Sit');
  if (goals.includes('Front Lever') || goals.includes('Front Lever Pull-Ups')) focuses.push('Front Lever Foundations');
  if (goals.includes('Planche') || goals.includes('Planche Progressions')) focuses.push('Planche Foundations');
  if (goals.includes('Muscle-Up')) focuses.push('Pull Strength');
  if (goals.includes('Increase Push-Up Reps') || goals.includes('Build Muscle') || goals.includes('Get Stronger')) focuses.push('Push Strength');
  if (focuses.length === 0) {
    // fallback from recommended_programs
    const programs = report?.recommended_programs || [];
    if (programs.some(p => /handstand/i.test(p))) focuses.push('Handstand');
    if (programs.some(p => /planche/i.test(p))) focuses.push('Planche Foundations');
    if (programs.some(p => /lever/i.test(p))) focuses.push('Front Lever Foundations');
    if (focuses.length === 0) focuses.push('Push Strength', 'Pull Strength', 'L-Sit');
  }
  return focuses.slice(0, 5);
}

export default function DiagnosticReport({ data, report }) {
  const levelColor = LEVEL_COLORS[report.athlete_level] || LEVEL_COLORS['Beginner Foundation'];
  const levelGlow = LEVEL_GLOW[report.athlete_level] || '';
  const focuses = getSkillFocuses(data, report);

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
          <p className="text-xs font-heading text-muted-foreground uppercase tracking-widest mb-1">Your Foundation Level</p>
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

      {/* Recommended Skill Focus */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-6 border border-border/40"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-primary" />
          <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">Recommended Skill Focus</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {focuses.map(f => (
            <span key={f} className="px-4 py-2 rounded-xl glass border border-primary/30 text-primary font-heading font-semibold text-sm">
              {f}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}