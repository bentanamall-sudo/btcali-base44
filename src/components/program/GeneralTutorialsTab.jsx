import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronDown } from 'lucide-react';

function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function VideoModal({ tut, onClose }) {
  const videoId = extractYouTubeId(tut.url);
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}>
        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm rounded-2xl overflow-hidden border border-primary/30"
          style={{ background: 'hsl(var(--card))' }}
          onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <p className="font-heading font-bold text-sm text-foreground">{tut.title}</p>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/40 transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          {videoId ? (
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={tut.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground font-body">Tutorial coming soon.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Planche Conditioning is a grouped card with multiple tutorial buttons
const PLANCHE_CONDITIONING_LINKS = [
  { label: 'Planche Lean',     url: 'https://youtube.com/shorts/-cGOxgIccqU?si=XOzPg4iHUxQP9YcK' },
  { label: 'Dolphin Press',    url: 'https://youtube.com/shorts/SWJn6e7Kc50?si=YrVUbNtS-eJimEJ1' },
  { label: "Zannetti's",       url: 'https://youtube.com/shorts/IsiqiYLuVdA?feature=share' },
  { label: 'Scapular Pushups', url: 'https://youtube.com/shorts/D_8_yzV6Jdk?feature=share' },
];

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
    url: 'https://youtube.com/shorts/rGoEHcIPeFY?si=gcxe-tFCaHm7y2Nm',
    category: 'technique',
  },
  {
    title: 'Front Lever Activations',
    desc: 'Core activation and scapular depression drills for front lever progressions.',
    url: 'https://youtube.com/shorts/QVqbRvkFlx0?si=tRLp6kAqHFP45wrA',
    category: 'technique',
  },
  {
    title: 'Bent Arm Press Tutorial',
    desc: 'Step-by-step breakdown of the bent arm press from handstand into planche.',
    url: 'https://youtu.be/UO7pBH4FnOI?si=1NMIkv6NZsraT3UH',
    category: 'skill',
  },
  {
    title: 'Planche Lean',
    desc: 'Correct body positioning, PPT, serratus engagement and lean mechanics.',
    url: 'https://youtube.com/shorts/-cGOxgIccqU?si=XOzPg4iHUxQP9YcK',
    category: 'conditioning',
  },
  {
    title: 'Dolphin Press',
    desc: 'Serratus, external rotation, and core engagement for planche conditioning.',
    url: 'https://youtube.com/shorts/SWJn6e7Kc50?si=YrVUbNtS-eJimEJ1',
    category: 'conditioning',
  },
  {
    title: 'Banded Front Lever Entry',
    desc: 'Full banded front lever entry — required for FL training with any band colour.',
    url: 'https://youtube.com/shorts/xeNxL7ygiHg?si=1jxYXlji2rz1CGsQ',
    category: 'technique',
  },
  {
    title: 'Planche Conditioning',
    desc: 'Full planche conditioning: leans, dolphin press, Zannettis, and scapular pushups.',
    url: null, // grouped — handled separately
    category: 'conditioning',
    grouped: PLANCHE_CONDITIONING_LINKS,
  },
];

const CATEGORY_STYLE = {
  warmup:       { bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  text: '#FCD34D' },
  technique:    { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', text: '#C4B5FD' },
  skill:        { bg: 'rgba(79,157,255,0.1)',  border: 'rgba(79,157,255,0.3)',  text: '#93C5FD' },
  conditioning: { bg: 'rgba(148,163,184,0.08)',border: 'rgba(148,163,184,0.2)', text: '#CBD5E1' },
};

export default function GeneralTutorialsTab() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div>
      {activeModal && <VideoModal tut={activeModal} onClose={() => setActiveModal(null)} />}

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
              className="rounded-2xl p-5 relative overflow-hidden flex flex-col"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.text}40, transparent)` }} />

              <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full mb-3 self-start"
                style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.text }}>
                {tut.category}
              </span>

              <h3 className="font-heading font-bold text-base text-foreground mb-2">{tut.title}</h3>
              <p className="text-xs font-body text-muted-foreground leading-relaxed mb-4 flex-1">{tut.desc}</p>

              {/* Grouped card (Planche Conditioning) */}
              {tut.grouped ? (
                <div className="flex flex-wrap gap-2">
                  {tut.grouped.map((link, j) => (
                    <button key={j} onClick={() => setActiveModal(link)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all hover:scale-105"
                      style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.2)', color: '#93C5FD' }}>
                      <Play className="w-3 h-3" /> {link.label}
                    </button>
                  ))}
                </div>
              ) : tut.url ? (
                <button onClick={() => setActiveModal(tut)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-heading font-semibold gradient-bg-strong text-primary-foreground self-start">
                  <Play className="w-3.5 h-3.5" /> Watch Tutorial
                </button>
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