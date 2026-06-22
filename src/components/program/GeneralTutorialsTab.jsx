import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';

const GENERAL_TUTORIALS = [
  {
    title: 'Wrist Warmup',
    desc: 'Essential wrist conditioning and warmup routine before every training session.',
    url: 'https://youtube.com/shorts/A1YPZdLyXPI?si=NTII3TIGbomjKChN',
    category: 'warmup',
  },
  {
    title: 'Handstand Bail',
    desc: 'How to safely bail out of a handstand — required before attempting freestanding handstands.',
    url: '',
    category: 'technique',
  },
  {
    title: 'Front Lever Activations',
    desc: 'Core activation and scapular depression drills for front lever progressions.',
    url: '',
    category: 'technique',
  },
  {
    title: 'Bent Arm Press Tutorial',
    desc: 'Step-by-step breakdown of the bent arm press from handstand into planche.',
    url: '',
    category: 'skill',
  },
  {
    title: 'Planche Lean',
    desc: 'Correct body positioning, PPT, serratus engagement and lean mechanics.',
    url: '',
    category: 'conditioning',
  },
  {
    title: 'Dolphin Press',
    desc: 'Serratus, external rotation, and core engagement for planche conditioning.',
    url: '',
    category: 'conditioning',
  },
  {
    title: 'Planche Conditioning',
    desc: 'Full planche conditioning routine including presses, leans, and Zannettis.',
    url: '',
    category: 'conditioning',
  },
];

const CATEGORY_STYLE = {
  warmup:      { bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  text: '#FCD34D' },
  technique:   { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', text: '#C4B5FD' },
  skill:       { bg: 'rgba(79,157,255,0.1)',  border: 'rgba(79,157,255,0.3)',  text: '#93C5FD' },
  conditioning:{ bg: 'rgba(148,163,184,0.08)',border: 'rgba(148,163,184,0.2)', text: '#CBD5E1' },
};

export default function GeneralTutorialsTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-xl text-foreground mb-1">General Tutorials</h2>
        <p className="text-sm font-body text-muted-foreground">Core tutorials every BTCALI premium member should review.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GENERAL_TUTORIALS.map((tut, i) => {
          const cat = CATEGORY_STYLE[tut.category] || CATEGORY_STYLE.skill;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${cat.text}40, transparent)` }} />

              <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full mb-3"
                style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.text }}>
                {tut.category}
              </span>

              <h3 className="font-heading font-bold text-base text-foreground mb-2">{tut.title}</h3>
              <p className="text-xs font-body text-muted-foreground leading-relaxed mb-4">{tut.desc}</p>

              {tut.url ? (
                <a href={tut.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-heading font-semibold gradient-bg-strong text-primary-foreground">
                  <Play className="w-3.5 h-3.5" /> Watch Tutorial
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-body text-muted-foreground/50 italic">
                  Tutorial coming soon
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}