import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Crown, CheckCircle, AlertCircle, Mail, Clock } from 'lucide-react';

const PLANCHE_PROGRAMS = [
  {
    name: 'Planche V1',
    emoji: '🏆',
    for: 'Athletes with foundational pushing strength',
    description: 'Build the tuck planche and develop the straight-arm strength and scapular control needed for all planche progressions.',
    requirements: ['~30 pushups', '10 dips', 'Foundational pushing strength'],
    goals: ['5 second advanced tuck planche', 'Stronger shoulder strength', 'Improved scapular control', 'Improved straight-arm strength'],
    includes: ['Tuck planche progressions', 'Planche lean protocol', 'Scapular strength training', 'Straight-arm conditioning', 'HSPU prep strength'],
    price: '$30',
  },
  {
    name: 'Planche V2',
    emoji: '⚡',
    for: 'Athletes with advanced tuck planche',
    description: 'Progress to straddle planche with HSPU strength integration.',
    requirements: ['5 second advanced tuck planche', 'Strong bent arm press or handstand pushup strength'],
    goals: ['5 second straddle planche', 'Multiple handstand pushups', 'Stronger shoulder endurance', 'Cleaner planche form'],
    includes: ['Straddle planche progressions', 'HSPU integration training', 'Shoulder endurance protocols', 'Form refinement drills'],
    price: '$30',
  },
  {
    name: 'Planche V3',
    emoji: '💎',
    for: 'Athletes with 5 second clean straddle planche',
    description: 'Build straddle planche endurance and develop the pressing strength needed to bridge toward full planche.',
    requirements: ['5 second clean straddle planche'],
    goals: ['Consistent 8+ second straddle hold', 'Deadstop straddle press', 'Controlled negatives', 'Straddle raises'],
    includes: ['Straddle endurance cycles', 'Deadstop press training', 'Negative planche protocol', 'Straddle raise progressions'],
    price: '$30',
  },
  {
    name: 'Planche V4',
    emoji: '👑',
    for: 'Athletes with 8+ second straddle planche',
    description: 'Bridge from straddle to the full planche — the pinnacle of straight-arm pushing strength.',
    requirements: ['8+ second straddle planche', 'Deadstop straddle press', 'Straddle press negatives'],
    goals: ['5 second full planche', 'Stronger full planche consistency', 'Advanced planche control'],
    includes: ['Full planche transition work', 'Max effort full planche attempts', 'Advanced pressing cycles', 'Peak strength periodization'],
    price: '$30',
  },
];

function ProgramCard({ program, index }) {
  const handleWaitlist = () => {
    const subject = encodeURIComponent(`BTCALI ${program.name} Waiting List Application`);
    const body = encodeURIComponent(`I want to apply for the waiting list for the BTCALI ${program.name} program.\n\nName:\n[Your name]\n\nEmail:\n[Your email]`);
    window.location.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-border/30 bg-card/60 overflow-hidden transition-all duration-300 hover:border-primary/40"
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 25px hsl(var(--glow-primary) / 0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-accent/40 to-transparent" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="text-3xl mb-2">{program.emoji}</div>
            <h3 className="font-heading font-bold text-lg text-foreground">{program.name}</h3>
            <p className="text-xs font-body text-primary mt-0.5">For: {program.for}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-heading font-bold text-2xl gradient-text">{program.price}</div>
            <div className="text-xs text-muted-foreground font-body">per program</div>
          </div>
        </div>

        <p className="text-sm font-body text-foreground/80 mb-4 leading-relaxed">{program.description}</p>

        {program.requirements?.length > 0 && (
          <div className="glass rounded-xl p-3 mb-3 border border-amber-400/20">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="text-xs font-heading font-bold text-amber-400 uppercase tracking-wider">Requirements</span>
            </div>
            {program.requirements.map(r => (
              <div key={r} className="flex items-start gap-2 text-xs font-body text-foreground/75 mb-1">
                <div className="w-1 h-1 rounded-full bg-amber-400/70 flex-shrink-0 mt-1.5" />
                {r}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-1.5 mb-5">
          {program.includes.map(item => (
            <div key={item} className="flex items-center gap-2 text-xs font-body text-foreground/65">
              <CheckCircle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-3 mb-4 text-center border border-amber-400/20">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-heading font-semibold text-amber-400">Coming Soon — {program.price}</span>
          </div>
          <p className="text-xs text-muted-foreground font-body">Apply for the waiting list to be notified at launch.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleWaitlist}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl gradient-bg-strong text-primary-foreground text-sm font-heading font-semibold glow-primary"
        >
          <Mail className="w-4 h-4" />
          Apply for Waiting List
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function PlanchePrograms() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Programs
        </Link>
        <div className="text-center">
          <div className="text-5xl mb-4">💪</div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3">
            <span className="gradient-text">Planche Programs</span>
          </h1>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto mb-2">
            Structured V1–V4 progression pathway. Build from tuck planche to full planche.
          </p>
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-primary/20">
            <Crown className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-heading text-primary font-semibold">V1 → V2 → V3 → V4</span>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {PLANCHE_PROGRAMS.map((p, i) => <ProgramCard key={p.name} program={p} index={i} />)}
      </div>
    </div>
  );
}