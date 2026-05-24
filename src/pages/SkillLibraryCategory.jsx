import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock, X, ChevronLeft, Crown, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAccessCodes } from '@/lib/useAccessCodes';

const FREE_IDS = ['handstand-beginner-guide', 'l-sit-to-handstand-guide', 'planche-conditioning-guide', 'master-basics'];


const CATEGORY_DATA = {
  planche: {
    title: 'Planche Library',
    description: 'Every progression from planche lean to full planche.',
    tutorials: [
      { id: 'planche-conditioning-guide', title: 'Free Planche Conditioning Guide', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: true },
      { id: 'planche-tuck', title: 'Tuck Planche Mastery', level: 'Intermediate', duration: '12 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'planche-adv-tuck', title: 'Advanced Tuck Planche', level: 'Intermediate', duration: '10 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'planche-straddle', title: 'Straddle Planche Progression', level: 'Advanced', duration: '15 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'planche-full', title: 'Full Planche Training', level: 'Elite', duration: '18 min', videoId: 'OlYx_n_H-5o', free: false },
    ],
  },
  'front-lever': {
    title: 'Front Lever Library',
    description: 'Build horizontal pulling strength from tuck to full front lever.',
    tutorials: [
      { id: 'fl-tuck', title: 'Tuck Front Lever', level: 'Beginner', duration: '10 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'fl-adv-tuck', title: 'Advanced Tuck Front Lever', level: 'Intermediate', duration: '12 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'fl-one-leg', title: 'One Leg Front Lever', level: 'Intermediate', duration: '12 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'fl-straddle', title: 'Straddle Front Lever', level: 'Advanced', duration: '14 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'fl-full', title: 'Full Front Lever', level: 'Elite', duration: '16 min', videoId: 'OlYx_n_H-5o', free: false },
    ],
  },
  'muscle-up': {
    title: 'Muscle-Up Library',
    description: 'Explosive pull-push transition training.',
    tutorials: [
      { id: 'mu-explosive-pullup', title: 'Explosive Pull-Up Development', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'mu-false-grip', title: 'False Grip Training', level: 'Intermediate', duration: '10 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'mu-transition', title: 'The Muscle-Up Transition', level: 'Intermediate', duration: '12 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'mu-strict', title: 'Strict Muscle-Up', level: 'Advanced', duration: '14 min', videoId: 'OlYx_n_H-5o', free: false },
    ],
  },
  handstand: {
    title: 'Handstand Library',
    description: 'From wall drills to freestanding — the full handstand journey.',
    tutorials: [
      { id: 'handstand-beginner-guide', title: 'Handstand Beginner Guide', level: 'Beginner', duration: '10 min', videoId: 'jF9pBJLhBkI', free: true },
      { id: 'hs-wall-drills', title: 'Wall Handstand Drills', level: 'Beginner', duration: '8 min', videoId: 'jF9pBJLhBkI', free: false },
      { id: 'hs-balance', title: 'Freestanding Balance Training', level: 'Intermediate', duration: '12 min', videoId: 'jF9pBJLhBkI', free: false },
      { id: 'hs-finger', title: 'Finger Balance & Control', level: 'Advanced', duration: '10 min', videoId: 'jF9pBJLhBkI', free: false },
    ],
  },
  'handstand-pushup': {
    title: 'Handstand Push-Up Library',
    description: 'Overhead pressing strength from pike push-ups to strict HSPU.',
    tutorials: [
      { id: 'hspu-pike', title: 'Pike Push-Up Foundation', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'hspu-wall', title: 'Wall HSPU Negatives', level: 'Intermediate', duration: '10 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'hspu-strict', title: 'Strict HSPU Technique', level: 'Advanced', duration: '14 min', videoId: 'OlYx_n_H-5o', free: false },
    ],
  },
  'l-sit': {
    title: 'L-Sit Library',
    description: 'Core compression and hip flexor strength for a clean L-sit.',
    tutorials: [
      { id: 'lsit-basics', title: 'L-Sit Foundation', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'lsit-tuck', title: 'Tuck L-Sit Progression', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'lsit-full', title: 'Full L-Sit Hold', level: 'Intermediate', duration: '10 min', videoId: 'OlYx_n_H-5o', free: false },
    ],
  },
  'l-sit-to-handstand': {
    title: 'L-Sit to Handstand Library',
    description: 'The elite pressing skill — structured path from compression to inversion.',
    tutorials: [
      { id: 'l-sit-to-handstand-guide', title: 'L-Sit to Handstand Guide', level: 'Intermediate', duration: '14 min', videoId: 'OlYx_n_H-5o', free: true },
      { id: 'lshs-straddle-press', title: 'Straddle Press to Handstand', level: 'Advanced', duration: '16 min', videoId: 'OlYx_n_H-5o', free: false },
      { id: 'lshs-straight-press', title: 'Straight Press to Handstand', level: 'Elite', duration: '18 min', videoId: 'OlYx_n_H-5o', free: false },
    ],
  },
  'master-basics': {
    title: 'Master The Basics',
    description: 'Foundational strength across pushups, pulls, dips, and core — the base of everything.',
    subcategories: ['Pushups', 'Pullups', 'Dips', 'Core Basics', 'Straight Arm Basics'],
    tutorials: [
      { id: 'basics-pushup', title: 'Push-Up Mastery & Progressions', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: true, sub: 'Pushups' },
      { id: 'basics-pullup', title: 'Pull-Up Technique & Volume', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: true, sub: 'Pullups' },
      { id: 'basics-dip', title: 'Dip Form & Progressions', level: 'Beginner', duration: '8 min', videoId: 'OlYx_n_H-5o', free: true, sub: 'Dips' },
      { id: 'basics-core', title: 'Core Strength Fundamentals', level: 'Beginner', duration: '10 min', videoId: 'OlYx_n_H-5o', free: true, sub: 'Core Basics' },
      { id: 'basics-straight-arm', title: 'Straight Arm Conditioning', level: 'Beginner', duration: '10 min', videoId: 'OlYx_n_H-5o', free: true, sub: 'Straight Arm Basics' },
    ],
  },
};

const LEVEL_COLORS = {
  Beginner: 'bg-green-500/15 text-green-400 border-green-500/30',
  'Beginner–Intermediate': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  Intermediate: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Advanced: 'bg-primary/15 text-primary border-primary/30',
  Elite: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

function VideoModal({ tutorial, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 glass rounded-full text-foreground/70 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1`}
              title={tutorial.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
          <div className="p-4">
            <h3 className="font-heading font-bold text-foreground">{tutorial.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{tutorial.level} · {tutorial.duration}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function LockedCard({ tutorial }) {
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { unlockCode } = useAccessCodes();

  const handleUnlock = () => {
    const result = unlockCode(code);
    if (!result) { setError(true); setCode(''); } else setError(false);
  };

  return (
    <div className="glass rounded-xl border border-border/30 overflow-hidden">
      <div className="aspect-video w-full bg-muted/20 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-2">
          <Lock className="w-8 h-8 text-muted-foreground" />
          <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">Exclusive to BTCALI Coaching Members</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-heading font-semibold text-foreground text-sm">{tutorial.title}</h3>
          <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${LEVEL_COLORS[tutorial.level] || LEVEL_COLORS.Advanced}`}>{tutorial.level}</span>
        </div>
        <p className="text-xs text-muted-foreground font-body mb-3">{tutorial.duration}</p>
        <div className="space-y-2">
          <Link to="/pricing">
            <motion.button whileTap={{ scale: 0.97 }} className="w-full py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-xs flex items-center justify-center gap-1.5 glow-primary">
              <Crown className="w-3.5 h-3.5" /> Apply for 1-on-1 Coaching
            </motion.button>
          </Link>
          {!showCode ? (
            <button
              onClick={() => setShowCode(true)}
              className="w-full py-2 rounded-xl glass border border-border/40 text-muted-foreground font-heading font-semibold text-xs hover:border-primary/40 hover:text-foreground transition-all"
            >
              Enter Access Code
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value.toUpperCase()); setError(false); }}
                placeholder="Enter code..."
                className={`flex-1 glass rounded-xl px-3 py-2 text-foreground font-body text-xs border focus:outline-none bg-transparent ${error ? 'border-red-500/60' : 'border-border/40 focus:border-primary/60'}`}
              />
              <button
                onClick={handleUnlock}
                className="px-3 py-2 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-xs"
              >
                Unlock
              </button>
            </div>
          )}
          {error && showCode && <p className="text-xs text-red-400 font-body mt-1">Invalid code. Try again.</p>}
        </div>
      </div>
    </div>
  );
}

function TutorialCard({ tutorial, onPlay }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onPlay}
      className="glass rounded-xl border border-border/30 overflow-hidden cursor-pointer group transition-all duration-300 hover:border-primary/40"
      style={{ transition: 'box-shadow 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 25px hsl(var(--glow-primary) / 0.2)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div className="aspect-video w-full bg-muted/20 relative overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${tutorial.videoId}/hqdefault.jpg`}
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full gradient-bg-strong flex items-center justify-center glow-primary">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="text-xs font-heading font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Free</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading font-semibold text-foreground text-sm">{tutorial.title}</h3>
          <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${LEVEL_COLORS[tutorial.level] || LEVEL_COLORS.Beginner}`}>{tutorial.level}</span>
        </div>
        <p className="text-xs text-muted-foreground font-body">{tutorial.duration}</p>
      </div>
    </motion.div>
  );
}

export default function SkillLibraryCategory() {
  const { categoryId } = useParams();
  const [search, setSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const { isAdmin } = useAccessCodes();

  const cat = CATEGORY_DATA[categoryId];

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-body mb-4">Category not found.</p>
          <Link to="/skills" className="text-primary font-heading font-semibold">← Back to Skill Library</Link>
        </div>
      </div>
    );
  }

  const filtered = cat.tutorials.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesSub = !activeSub || t.sub === activeSub;
    return matchesSearch && matchesSub;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Back */}
      <Link to="/skills" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-body hover:text-foreground transition-colors mb-8">
        <ChevronLeft className="w-4 h-4" /> Back to Skill Library
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
          <span className="gradient-text">{cat.title}</span>
        </h1>
        <p className="text-muted-foreground font-body text-base">{cat.description}</p>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tutorials..."
          className="w-full glass rounded-xl pl-10 pr-4 py-3 text-foreground font-body text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Subcategory tabs */}
      {cat.subcategories && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveSub(null)}
            className={`px-4 py-2 rounded-xl text-sm font-heading font-semibold border transition-all ${!activeSub ? 'gradient-bg-strong text-primary-foreground border-primary/60' : 'glass border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}
          >All</button>
          {cat.subcategories.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`px-4 py-2 rounded-xl text-sm font-heading font-semibold border transition-all ${activeSub === sub ? 'gradient-bg-strong text-primary-foreground border-primary/60' : 'glass border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}
            >{sub}</button>
          ))}
        </div>
      )}

      {/* Tutorials grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tutorial, i) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            {tutorial.free || isAdmin ? (
              <TutorialCard tutorial={tutorial} onPlay={() => setActiveVideo(tutorial)} />
            ) : (
              <LockedCard tutorial={tutorial} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && <VideoModal tutorial={activeVideo} onClose={() => setActiveVideo(null)} />}

      {/* Coaching CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 glass rounded-2xl p-8 border border-primary/20 text-center"
      >
        <p className="font-body text-muted-foreground text-base max-w-lg mx-auto mb-6">
          If you want to achieve elite calisthenics skills faster with structured guidance and personalised coaching, apply for BTCALI 1-on-1 coaching below.
        </p>
        <Link to="/pricing">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary"
          >
            View 1-on-1 Coaching <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}