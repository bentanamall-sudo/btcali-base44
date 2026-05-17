import { motion } from 'framer-motion';
import { BookOpen, Play, ExternalLink, Clock, AlertTriangle, Zap, Hand, Dumbbell, Brain, Waves } from 'lucide-react';

const SECTIONS = [
  {
    id: 'handstand',
    icon: '🤸‍♂️',
    label: 'FREE HANDSTAND BEGINNER GUIDE',
    accent: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
    glow: '0 0 30px hsl(262 90% 65% / 0.15)',
    tutorials: [
      {
        title: 'Handstand Bail Tutorial',
        link: 'https://youtube.com/shorts/rGoEHcIPeFY?si=gcxe-tFCaHm7y2Nm',
        points: [
          'Fear of falling is the biggest reason people cannot handstand',
          'Learn safe bail technique',
          'Bunny hop progression',
          'Rotate hips while falling',
          'Place hand before feet land',
          'Elevate shoulders',
          'Push floor hard',
        ],
      },
      {
        title: 'Handstand Kick-Up Tutorial',
        link: 'https://youtube.com/shorts/8GLA_c0jueA?si=dIFucwXfHV7ZIbl2',
        points: [
          'Start in runner position',
          'Get feet above head',
          'Press fingers to save overbalance',
          'Look slightly in front of hands',
          'Engage glutes/core',
          'Point toes',
        ],
      },
      {
        title: 'Handstand Toe Taps',
        link: 'https://youtube.com/shorts/yDYk7w7uqTA?si=7pU1huvvbtV2TSig',
        points: [
          'Chest to wall',
          'Walk feet up wall',
          'PPT activation',
          'Elevated shoulders',
          'Alternate toe taps',
          'Eventually remove both feet',
        ],
      },
      {
        title: 'Where To Look In A Handstand',
        link: 'https://youtube.com/shorts/pgKP61v2kz8?si=6GKzfB-gWxyLo8UA',
        points: [
          'Hands form bottom of triangle',
          'Look slightly in front of hands',
          'Roughly 10cm forward',
        ],
      },
    ],
  },
  {
    id: 'lsit',
    icon: '💪',
    label: 'FREE L-SIT TO HANDSTAND GUIDE',
    accent: 'from-cyan-500/15 to-blue-500/10',
    border: 'border-cyan-500/30',
    glow: '0 0 30px hsl(200 90% 50% / 0.15)',
    tutorials: [
      {
        title: 'Quick Bent Arm Press Tutorial',
        link: 'https://youtube.com/shorts/6MpY6iLDtQM?si=XSjEG60mxk7WmO7D',
        points: [
          'Kick and push at same time',
          'Explosive movement',
          'Commit aggressively',
          'Timing and coordination',
        ],
      },
      {
        title: 'Bent Arm Press Cues',
        link: 'https://youtube.com/shorts/jD7JOlacCgg?si=-iFxIMqEvEgp_Gl8',
        points: [
          'Imagine kicking over your head',
          'Slight overbalance is okay',
          'Commit aggressively',
        ],
      },
      {
        title: 'Full Bent Arm Press Tutorial',
        link: 'https://youtu.be/UO7pBH4FnOI?si=1NMIkv6NZsraT3UH',
        points: [
          'Technique > strength',
          '10 pike pushups is enough foundation',
          'Helps unlock L-sit to handstand',
          'Timing and coordination',
          'Aggressive kick + push',
        ],
      },
      {
        title: 'L-Sit To Handstand Guide',
        comingSoon: true,
        points: [
          'Slightly bend arms during transition',
          "Don't go too deep",
          'Bent arm tuck planche transition',
          'Smooth controlled movement',
        ],
      },
    ],
  },
  {
    id: 'planche',
    icon: '🧠',
    label: 'FREE PLANCHE CONDITIONING GUIDE',
    accent: 'from-amber-500/15 to-orange-500/10',
    border: 'border-amber-500/30',
    glow: '0 0 30px hsl(45 90% 55% / 0.12)',
    tutorials: [
      {
        title: 'Planche Lean',
        link: 'https://youtube.com/shorts/-cGOxgIccqU?si=XOzPg4iHUxQP9YcK',
        points: [
          'Externally rotate biceps',
          'Chin slightly forward',
          'Protraction + depression',
          'Point toes',
          'PPT',
          'Engage core/glutes',
          'Active press, not passive lean',
        ],
      },
      {
        title: 'Dolphin Press',
        link: 'https://youtube.com/shorts/SWJn6e7Kc50?si=YrVUbNtS-eJimEJ1',
        points: [
          'Press through serratus',
          'Push upward aggressively',
          'Externally rotate shoulders',
          'Engage core/glutes',
          'Breathe properly',
        ],
      },
      {
        title: 'Scapular Protraction & Retraction',
        link: 'https://youtube.com/shorts/QppuGF94PLc?si=u8maK1wFk3E2d_CT',
        points: [
          'Essential for planche',
          'Essential for handstand',
          'Essential for front lever',
          'Shoulder health',
        ],
      },
      {
        title: 'Planche Lean Presses',
        comingSoon: true,
        points: [
          'Press through serratus',
          'Use all planche lean cues',
          'Active pressing focus',
        ],
      },
      {
        title: 'Zanettis',
        comingSoon: true,
        points: [
          'External rotation',
          'Hollow body position',
          'Look slightly in front of toes',
          'Controlled negative',
          'Press upward with control',
        ],
      },
    ],
  },
  {
    id: 'wrist',
    icon: '🖐️',
    label: 'WRIST PREP',
    accent: 'from-green-500/15 to-emerald-500/10',
    border: 'border-green-500/30',
    glow: '0 0 30px hsl(150 70% 45% / 0.12)',
    tutorials: [
      {
        title: 'Wrist Warm-Up',
        link: 'https://youtube.com/shorts/A1YPZdLyXPI?si=NTII3TIGbomjKChN',
        points: [
          'Essential before handstands',
          'Essential before planche work',
          'Heavy wrist loading prep',
          'Discomfort is okay',
          'Pain is NOT okay',
        ],
      },
    ],
  },
];

function TutorialCard({ tutorial, index }) {
  const { title, link, points, comingSoon } = tutorial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden group
        ${comingSoon
          ? 'border-border/20 bg-card/30 opacity-60'
          : 'border-border/30 bg-card/60 hover:border-primary/40 cursor-pointer'
        }`}
      style={!comingSoon ? { boxShadow: '0 0 0 0 transparent', transition: 'box-shadow 0.3s' } : {}}
      onMouseEnter={e => { if (!comingSoon) e.currentTarget.style.boxShadow = '0 0 25px hsl(var(--glow-primary) / 0.18)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent'; }}
    >
      {/* Top bar */}
      <div className={`h-0.5 w-full ${comingSoon ? 'bg-border/20' : 'bg-gradient-to-r from-primary/60 via-accent/40 to-transparent'}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${comingSoon ? 'bg-muted/30' : 'gradient-bg-strong'}`}>
              {comingSoon
                ? <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                : <Play className="w-3.5 h-3.5 text-primary-foreground" />
              }
            </div>
            <h4 className={`font-heading font-bold text-sm leading-tight ${comingSoon ? 'text-muted-foreground' : 'text-foreground'}`}>
              {title}
            </h4>
          </div>
          {comingSoon && (
            <span className="flex-shrink-0 text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/25">
              🚧 Coming Soon
            </span>
          )}
        </div>

        {/* Key points */}
        <ul className="space-y-1.5 mb-5">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
              <div className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${comingSoon ? 'bg-muted-foreground/30' : 'bg-primary/60'}`} />
              {p}
            </li>
          ))}
        </ul>

        {/* Button */}
        {comingSoon ? (
          <div className="w-full py-2.5 rounded-xl bg-muted/20 border border-border/20 text-center text-xs font-heading font-semibold text-muted-foreground/50 cursor-not-allowed select-none">
            Coming Soon
          </div>
        ) : (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-xl gradient-bg-strong glow-primary flex items-center justify-center gap-2 text-xs font-heading font-bold text-primary-foreground"
            >
              <Play className="w-3.5 h-3.5" />
              Watch Tutorial
              <ExternalLink className="w-3 h-3 opacity-70" />
            </motion.div>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Tutorials() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Free Training</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Free <span className="gradient-text">Tutorials</span>
        </h1>
        <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
          Start your calisthenics journey with structured skill guides. Real technique, zero cost.
        </p>
      </motion.div>

      {/* Coming Soon Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-4xl mx-auto mb-10 flex items-start gap-3 glass rounded-xl px-5 py-4 border border-amber-400/25"
      >
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs font-body text-muted-foreground leading-relaxed">
          <span className="text-amber-400 font-semibold">Notice: </span>
          Tutorials marked as "Coming Soon" currently do not have working buttons, as these tutorials are still being developed and uploaded.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto space-y-16">
        {SECTIONS.map((section, si) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r ${section.accent} border ${section.border} backdrop-blur-sm`}
                style={{ boxShadow: section.glow }}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="font-heading font-bold text-sm sm:text-base text-foreground tracking-wide">
                  {section.label}
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent" />
            </div>

            {/* Tutorial cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.tutorials.map((tutorial, ti) => (
                <TutorialCard key={tutorial.title} tutorial={tutorial} index={ti} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legal Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-16 flex items-start gap-3 rounded-xl px-5 py-4 border border-destructive/20 bg-destructive/5"
      >
        <AlertTriangle className="w-4 h-4 text-destructive/70 flex-shrink-0 mt-0.5" />
        <p className="text-xs font-body text-muted-foreground leading-relaxed">
          <span className="text-destructive/80 font-semibold">⚠️ Disclaimer: </span>
          BTCALI is not responsible for any injuries or damages caused while attempting these exercises or tutorials. Perform all movements at your own risk and responsibility.
        </p>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-14 text-center"
      >
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto glow-border">
          <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-heading font-bold text-2xl mb-2 gradient-text">Ready for More?</h3>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Unlock premium skill roadmaps and 1-on-1 direct coaching with BTCALI.
          </p>
          <a href="/pricing">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
            >
              Apply for Coaching
            </motion.button>
          </a>
        </div>
      </motion.div>

    </div>
  );
}