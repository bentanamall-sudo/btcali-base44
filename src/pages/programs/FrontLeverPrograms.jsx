import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Crown, CheckCircle, AlertCircle, Mail, Clock } from 'lucide-react';

const FL_PROGRAMS = [
  {
    name: 'Front Lever V1',
    emoji: '⚡',
    for: 'Athletes with 5–10 pullups',
    description: 'Build your tuck front lever and develop the horizontal pulling strength and lat activation needed for all FL progressions.',
    requirements: ['Minimum 5 pullups', 'Ideally 10 pullups'],
    includes: ['Tuck FL holds & progressions', 'Ice cream maker introduction', 'Lat activation protocols', 'Core horizontal strength'],
  },
  {
    name: 'Front Lever V2',
    emoji: '🔱',
    for: 'Athletes with 10 pullups and 3 sec adv tuck',
    description: 'Develop advanced tuck endurance and begin purple band full front lever work.',
    requirements: ['10 pullups', '3 second advanced tuck front lever', 'Easy 10+ second tuck hold'],
    includes: ['Advanced tuck FL endurance', 'Purple band FL progressions', 'Front lever rows', 'Scapular retraction strength'],
  },
  {
    name: 'Front Lever V3',
    emoji: '💎',
    for: 'Athletes with 5 sec adv tuck and 5 sec purple band FL',
    description: 'Progress to black band and build serious full FL holding capacity.',
    requirements: ['Consistent 5+ second advanced tuck', '5 second purple band front lever'],
    includes: ['Black band FL progression', 'Advanced tuck to 10 sec', 'FL row volume building', 'Periodized pulling cycles'],
  },
  {
    name: 'Front Lever V4',
    emoji: '🏅',
    for: 'Athletes with 5 sec black band and 10 sec adv tuck FL',
    description: 'Transition to red band and build FL raises for full FL strength.',
    requirements: ['5 second black band front lever', '10+ second advanced tuck', '10+ second purple band'],
    includes: ['Red band FL progressions', '10 sec black band hold', 'Black band FL raises', 'Intensity periodization'],
  },
  {
    name: 'Front Lever V5',
    emoji: '🌟',
    for: 'Athletes with 3–5 sec red band FL',
    description: 'Build red band endurance and FL raises for full front lever development.',
    requirements: ['3–5 second red band front lever', '10 second black band front lever'],
    includes: ['Red band hold endurance to 10 sec', 'FL raises introduction', 'Max effort FL attempts', 'Pulling strength cycles'],
  },
  {
    name: 'Front Lever V6',
    emoji: '👑',
    for: 'Athletes with 10 sec red band FL',
    description: 'Unlock the full front lever — the pinnacle of horizontal pulling strength.',
    requirements: ['10 second red band front lever'],
    includes: ['Full FL first attempts', 'Advanced FL raises', 'FL rowing variations', 'Peak strength cycles'],
  },
  {
    name: 'Advanced Front Lever V6',
    emoji: '🔥',
    for: 'Athletes with 3–5 sec full front lever',
    description: 'Elite front lever mastery — extend holds, build raises, and own the full front lever.',
    requirements: ['3–5 second full front lever', 'Strong front lever raises'],
    includes: ['Full FL endurance cycles', 'Max raises protocol', 'Elite periodization', 'Peak performance programming'],
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
      transition={{ delay: index * 0.07 }}
      className="rounded-2xl border border-cyan-500/20 bg-card/60 overflow-hidden transition-all duration-300 hover:border-cyan-500/50"
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 25px hsl(200 90% 50% / 0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/60 via-blue-500/40 to-transparent" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="text-3xl mb-2">{program.emoji}</div>
            <h3 className="font-heading font-bold text-lg text-foreground">{program.name}</h3>
            <p className="text-xs font-body text-cyan-400 mt-0.5">For: {program.for}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-heading font-bold text-2xl text-cyan-400">$30</div>
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
              <CheckCircle className="w-3 h-3 text-cyan-500/60 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-3 mb-4 text-center border border-amber-400/20">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-heading font-semibold text-amber-400">Coming Soon — $30</span>
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

export default function FrontLeverPrograms() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Programs
        </Link>
        <div className="text-center">
          <div className="text-5xl mb-4">🔱</div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3">
            <span className="text-cyan-400">Front Lever</span> <span className="gradient-text">Programs</span>
          </h1>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto mb-2">
            Complete V1–V6 pathway from tuck FL to full front lever mastery.
          </p>
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-cyan-500/30">
            <Crown className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-heading text-cyan-400 font-semibold">V1 → V2 → V3 → V4 → V5 → V6 → Advanced</span>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FL_PROGRAMS.map((p, i) => <ProgramCard key={p.name} program={p} index={i} />)}
      </div>
    </div>
  );
}