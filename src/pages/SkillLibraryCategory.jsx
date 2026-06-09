import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock, X, ChevronLeft, Crown, ArrowRight, Clock, ChevronDown } from 'lucide-react';
import { useAccessCodes } from '@/lib/useAccessCodes';

const COMING_SOON_DATA = {
  planche: {
    title: 'Planche Tutorials Coming Soon',
    text: 'We are currently building the complete BTCALI Planche System.',
    items: ['Planche Conditioning','Tuck Planche','Advanced Tuck Planche','Straddle Planche','Full Planche','Planche Push-Up Progressions','Mobility & Injury Prevention','Programming & Training Structure'],
  },
  'handstand-pushups': {
    title: 'Handstand Pushup Tutorials Coming Soon',
    text: 'We are currently building the complete BTCALI Handstand Pushup System.',
    items: ['Wall HSPU','Chest-To-Wall Progressions','Freestanding HSPU','Balance & Alignment','Strength Development','Advanced HSPU Variations'],
  },
  'muscle-up': {
    title: 'Muscle-Up Tutorials Coming Soon',
    text: 'We are currently building the complete BTCALI Muscle-Up System.',
    items: ['Pull-Up Strength Standards','Explosive Pulling','Transition Mechanics','False Grip Work','Bar Muscle-Up','Ring Muscle-Up'],
  },
};

const CATEGORY_DATA = {
  'master-basics': {
    title: 'Master The Basics',
    description: 'Foundational strength across push, pull, and core — the base of everything in calisthenics.',
    subcategories: ['Push Basics', 'Pull Basics', 'Core Basics'],
    tutorials: [
      // Push Basics
      { id: 'push-pushup-tutorial', title: 'Push-Up Tutorial', level: 'Beginner', sub: 'Push Basics', free: true, comingSoon: true },
      { id: 'push-dip-form', title: 'Dip Form', level: 'Beginner', sub: 'Push Basics', videoId: 'qG4dnoWpr94', free: true },
      { id: 'push-bent-knee-pike', title: 'Bent Knee Pike Push-Ups', level: 'Beginner', sub: 'Push Basics', videoId: '5HRq7xpcBkw', free: true },
      { id: 'push-pike-pushup', title: 'Pike Push-Ups', level: 'Beginner', sub: 'Push Basics', videoId: 'PSHF4b99J0Q', free: true },
      // Pull Basics
      { id: 'pull-form', title: 'Pull-Up Form', level: 'Beginner', sub: 'Pull Basics', videoId: 'DzU28xYSCjU', free: true },
      { id: 'pull-pullups', title: 'Pull-Ups', level: 'Beginner', sub: 'Pull Basics', free: true, comingSoon: true },
      { id: 'pull-scapular', title: 'Scapular Pull-Ups', level: 'Beginner', sub: 'Pull Basics', free: true, comingSoon: true },
      { id: 'pull-partial-top', title: 'Partial Rep Pull-Ups — Top ROM', level: 'Beginner', sub: 'Pull Basics', free: true, comingSoon: true },
      { id: 'pull-partial-bot', title: 'Partial Rep Pull-Ups — Bottom ROM', level: 'Beginner', sub: 'Pull Basics', free: true, comingSoon: true },
      { id: 'pull-hold', title: 'Pull-Up Hold', level: 'Beginner', sub: 'Pull Basics', free: true, comingSoon: true },
      // Core Basics
      { id: 'core-lsit-entry', title: 'L-Sit Progressions & Entry', level: 'Beginner', sub: 'Core Basics', videoId: 'JV2QPQFlpZQ', free: true },
    ],
  },

  'handstand-foundations': {
    title: 'Handstand & Shoulder Foundations',
    description: 'Wrist warmups, pike push-ups, kick-ups, and beginner handstand development.',
    subcategories: ['Beginner', 'Intermediate'],
    tutorials: [
      { id: 'hf-wrist-warmup', title: 'Wrist Warmup', level: 'Beginner', sub: 'Beginner', videoId: 'A1YPZdLyXPI', free: true },
      { id: 'hf-lsit-entry', title: 'L-Sit Progressions & Entry', level: 'Beginner', sub: 'Beginner', videoId: 'JV2QPQFlpZQ', free: true },
      { id: 'hf-bent-knee-pike', title: 'Bent Knee Pike Push-Ups', level: 'Beginner', sub: 'Beginner', videoId: '5HRq7xpcBkw', free: true },
      { id: 'hf-pike-pushup', title: 'Pike Push-Ups', level: 'Beginner', sub: 'Beginner', videoId: 'PSHF4b99J0Q', free: true },
      { id: 'hf-where-to-look', title: 'Where to Look in a Handstand', level: 'Beginner', sub: 'Beginner', videoId: 'pgKP61v2kz8', free: true },
      { id: 'hf-kickup', title: 'Handstand Kick-Up Tutorial', level: 'Beginner', sub: 'Beginner', videoId: '8GLA_c0jueA', free: true },
      { id: 'hf-bail', title: 'Handstand Bail — Face the Fear', level: 'Beginner', sub: 'Beginner', videoId: 'rGoEHcIPeFY', free: true },
      { id: 'hf-decline-pike', title: 'Decline Pike Push-Ups', level: 'Intermediate', sub: 'Intermediate', videoId: '3OfR0Kd1u-Q', free: true },
      { id: 'hf-toe-taps', title: 'Handstand Toe Taps', level: 'Intermediate', sub: 'Intermediate', videoId: 'yDYk7w7uqTA', free: true },
      { id: 'hf-floating-pike', title: 'Floating Pike Push-Ups', level: 'Intermediate', sub: 'Intermediate', videoId: 'AfLQJ-cCF2I', free: true },
      { id: 'hf-chest-wall-hold', title: 'Handstand Chest to Wall Hold', level: 'Intermediate', sub: 'Intermediate', free: true, comingSoon: true },
    ],
  },

  'l-sit-to-handstand': {
    title: 'L-Sit to Handstand Full Guide',
    description: 'The complete system — all foundation tutorials plus the full bent arm press and L-sit to handstand pathway.',
    subcategories: ['Foundation', 'Bent Arm Press', 'Advanced'],
    premium: true,
    tutorials: [
      // Foundation
      { id: 'lshs-wrist-warmup', title: 'Wrist Warmup', level: 'Beginner', sub: 'Foundation', videoId: 'A1YPZdLyXPI', free: false },
      { id: 'lshs-lsit-entry', title: 'L-Sit Progressions & Entry', level: 'Beginner', sub: 'Foundation', videoId: 'JV2QPQFlpZQ', free: false },
      { id: 'lshs-bent-knee-pike', title: 'Bent Knee Pike Push-Ups', level: 'Beginner', sub: 'Foundation', videoId: '5HRq7xpcBkw', free: false },
      { id: 'lshs-pike-pushup', title: 'Pike Push-Ups', level: 'Beginner', sub: 'Foundation', videoId: 'PSHF4b99J0Q', free: false },
      { id: 'lshs-where-to-look', title: 'Where to Look in a Handstand', level: 'Beginner', sub: 'Foundation', videoId: 'pgKP61v2kz8', free: false },
      { id: 'lshs-kickup', title: 'Handstand Kick-Up Tutorial', level: 'Beginner', sub: 'Foundation', videoId: '8GLA_c0jueA', free: false },
      { id: 'lshs-bail', title: 'Handstand Bail — Face the Fear', level: 'Beginner', sub: 'Foundation', videoId: 'rGoEHcIPeFY', free: false },
      { id: 'lshs-decline-pike', title: 'Decline Pike Push-Ups', level: 'Intermediate', sub: 'Foundation', videoId: '3OfR0Kd1u-Q', free: false },
      { id: 'lshs-toe-taps', title: 'Handstand Toe Taps', level: 'Intermediate', sub: 'Foundation', videoId: 'yDYk7w7uqTA', free: false },
      { id: 'lshs-floating-pike', title: 'Floating Pike Push-Ups', level: 'Intermediate', sub: 'Foundation', videoId: 'AfLQJ-cCF2I', free: false },
      // Bent Arm Press
      { id: 'lshs-bent-arm-raise', title: 'Bent Arm Press Raise', level: 'Intermediate', sub: 'Bent Arm Press', videoId: 'jUYGq7sBxI0', free: false },
      { id: 'lshs-bent-arm-cues', title: 'Bent Arm Press Cues', level: 'Intermediate', sub: 'Bent Arm Press', videoId: 'jD7JOlacCgg', free: false },
      { id: 'lshs-bent-arm-tuck-pos', title: 'Bent Arm Tuck Planche Positions', level: 'Intermediate', sub: 'Bent Arm Press', videoId: 'WRflJHXBIrA', free: false },
      { id: 'lshs-bent-arm-quick', title: 'Bent Arm Press Quick Tutorial', level: 'Intermediate', sub: 'Bent Arm Press', videoId: '6MpY6iLDtQM', free: false },
      { id: 'lshs-momentum-press', title: 'Momentum Bent Arm Press', level: 'Intermediate', sub: 'Bent Arm Press', videoId: 'cIZRmKLMlQ4', free: false },
      { id: 'lshs-momentum-press-exp', title: 'Momentum Bent Arm Press Explanation', level: 'Intermediate', sub: 'Bent Arm Press', videoId: 'yLn96dEdHWE', free: false },
      { id: 'lshs-clean-press', title: 'Clean Form Bent Arm Press', level: 'Intermediate', sub: 'Bent Arm Press', videoId: 'BouVt_LNI7k', free: false },
      { id: 'lshs-bent-arm-raise-prog', title: 'Bent Arm Press Raise Progressions', level: 'Intermediate', sub: 'Bent Arm Press', videoId: 'qAuVf2KGFUI', free: false },
      { id: 'lshs-chest-wall-hold', title: 'Handstand Chest to Wall Hold', level: 'Intermediate', sub: 'Bent Arm Press', free: false, comingSoon: true },
      // Advanced
      { id: 'lshs-indepth-press', title: 'In-Depth Bent Arm Press Tutorial', level: 'Advanced', sub: 'Advanced', videoId: 'UO7pBH4FnOI', free: false },
      { id: 'lshs-lsit-to-hs', title: 'L-Sit to Handstand', level: 'Advanced', sub: 'Advanced', videoId: '8SOeZroRebI', free: false },
      { id: 'lshs-straddle-press', title: 'Straddle Press to Handstand', level: 'Advanced', sub: 'Advanced', free: false, comingSoon: true },
      { id: 'lshs-straight-press', title: 'Straight Press to Handstand', level: 'Elite', sub: 'Advanced', free: false, comingSoon: true },
    ],
  },

  'planche-conditioning': {
    title: 'FREE Planche Conditioning',
    description: 'Essential conditioning before any planche work — wrist prep, scapular strength, straight arm conditioning, and injury prevention.',
    subcategories: ['Wrist & Warm-Up', 'Scapular Strength', 'Planche Lean & Conditioning'],
    tutorials: [
      { id: 'pc-wrist-warmup', title: 'Wrist Warmup', level: 'Beginner', sub: 'Wrist & Warm-Up', videoId: 'A1YPZdLyXPI', free: true },
      { id: 'pc-scap-protract', title: 'Scapular Protraction & Retraction', level: 'Beginner', sub: 'Scapular Strength', videoId: 'QppuGF94PLc', free: true },
      { id: 'pc-scap-to-normal', title: 'Scapular to Normal Push-Ups', level: 'Beginner', sub: 'Scapular Strength', videoId: 'D_8_yzV6Jdk', free: true },
      { id: 'pc-lean', title: 'The Planche Lean', level: 'Beginner', sub: 'Planche Lean & Conditioning', videoId: '-cGOxgIccqU', free: true },
      { id: 'pc-lean-press', title: 'Planche Lean Press', level: 'Beginner', sub: 'Planche Lean & Conditioning', videoId: 'pAn5RJZCvR0', free: true },
      { id: 'pc-zanettis', title: "Zanetti's", level: 'Beginner', sub: 'Planche Lean & Conditioning', videoId: 'IsiqiYLuVdA', free: true },
      { id: 'pc-pbars-grip', title: 'How to Properly Grip P-Bars', level: 'Beginner', sub: 'Planche Lean & Conditioning', videoId: 'boazomcMT7c', free: true },
      { id: 'pc-dolphin-press', title: 'Dolphin Press', level: 'Intermediate', sub: 'Planche Lean & Conditioning', videoId: 'SWJn6e7Kc50', free: true },
    ],
  },

  planche: {
    title: 'Planche Progressions',
    description: 'Tuck, straddle, and full planche — structured progressions beyond the conditioning foundations.',
    subcategories: ['Beginner', 'Intermediate', 'Advanced'],
    tutorials: [
      { id: 'p-tuck', title: 'Tuck Planche', level: 'Beginner', sub: 'Beginner', free: false, comingSoon: true },
      { id: 'p-straddle', title: 'Straddle Planche', level: 'Intermediate', sub: 'Intermediate', free: false, comingSoon: true },
      { id: 'p-straddle-press', title: 'Straddle Planche Banded Press', level: 'Intermediate', sub: 'Intermediate', free: false, comingSoon: true },
      { id: 'p-banded-pushups', title: 'Banded Straddle Planche Push-Ups', level: 'Intermediate', sub: 'Intermediate', free: false, comingSoon: true },
      { id: 'p-full', title: 'Full Planche', level: 'Advanced', sub: 'Advanced', free: false, comingSoon: true },
      { id: 'p-deadstop-press', title: 'Deadstop Straddle Press', level: 'Advanced', sub: 'Advanced', free: false, comingSoon: true },
      { id: 'p-straddle-neg', title: 'Straddle Negative', level: 'Advanced', sub: 'Advanced', free: false, comingSoon: true },
    ],
  },

  'front-lever': {
    title: 'Front Lever Library',
    description: 'Build horizontal pulling strength from hollow body to full front lever.',
    subcategories: ['Beginner', 'Intermediate'],
    tutorials: [
      // Beginner — all members only
      { id: 'fl-hollow-body', title: 'Hollow Body Hold', level: 'Beginner', sub: 'Beginner', videoId: 'DQu4UNPY8BU', free: false },
      { id: 'fl-activations', title: 'Front Lever Activations', level: 'Beginner', sub: 'Beginner', videoId: 'QVqbRvkFlx0', free: false },
      { id: 'fl-tuck', title: 'Tuck Front Lever', level: 'Beginner', sub: 'Beginner', videoId: '08DECfSNf8Y', free: false },
      { id: 'fl-adv-tuck', title: 'Advanced Tuck Front Lever', level: 'Intermediate', sub: 'Intermediate', videoId: '9FBurAs5q58', free: false },
      // Intermediate — all members only
      { id: 'fl-full-banded-entry', title: 'Full Banded FL Entry', level: 'Intermediate', sub: 'Intermediate', videoId: 'xeNxL7ygiHg', free: false },
      { id: 'fl-band-raises', title: 'Band Assisted Front Lever Raises', level: 'Intermediate', sub: 'Intermediate', videoId: 'aku6BVmhuck', free: false },
      { id: 'fl-hip-thrust', title: 'Front Lever Hip Thrust', level: 'Intermediate', sub: 'Intermediate', videoId: 'IEbuq-vlXgs', free: false },
      { id: 'fl-inv-deadlift', title: 'Inverted / Reverse Deadlifts', level: 'Intermediate', sub: 'Intermediate', videoId: 'VT77Hlo1uoM', free: false },
      { id: 'fl-half-banded', title: 'Half Banded Front Lever', level: 'Intermediate', sub: 'Intermediate', free: false, comingSoon: true },
    ],
  },

  'handstand-pushups': {
    title: 'Handstand Pushups',
    description: 'Wall HSPU, chest-to-wall progressions, and freestanding handstand push-up development.',
    subcategories: ['Beginner', 'Intermediate', 'Advanced'],
    tutorials: [
      // Beginner
      { id: 'hspu-pike-foundation', title: 'Pike Push-Up Foundation', level: 'Beginner', sub: 'Beginner', free: false, comingSoon: true },
      { id: 'hspu-wall-negatives', title: 'Wall HSPU Negatives', level: 'Beginner', sub: 'Beginner', free: false, comingSoon: true },
      // Intermediate
      { id: 'hspu-chest-wall', title: 'Chest to Wall Handstand Push-Ups', level: 'Intermediate', sub: 'Intermediate', videoId: 'GwHgAPqMMq0', free: false },
      { id: 'hspu-strict', title: 'Strict HSPU Technique', level: 'Intermediate', sub: 'Intermediate', free: false, comingSoon: true },
      // Advanced
      { id: 'hspu-freestanding', title: 'Freestanding HSPU Progressions', level: 'Advanced', sub: 'Advanced', free: false, comingSoon: true },
    ],
  },

  'muscle-up': {
    title: 'Muscle-Up Library',
    description: 'Explosive pull-push transition training — bar and rings.',
    tutorials: [
      { id: 'mu-explosive-pullup', title: 'Explosive Pull-Up Development', level: 'Beginner', free: false, comingSoon: true },
      { id: 'mu-false-grip', title: 'False Grip Training', level: 'Intermediate', free: false, comingSoon: true },
      { id: 'mu-transition', title: 'The Muscle-Up Transition', level: 'Intermediate', free: false, comingSoon: true },
      { id: 'mu-strict', title: 'Strict Muscle-Up', level: 'Advanced', free: false, comingSoon: true },
    ],
  },
};

const LEVEL_COLORS = {
  Beginner: 'bg-green-500/15 text-green-400 border-green-500/30',
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-sm glass rounded-2xl overflow-hidden border border-primary/30"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
            <div className="flex-1 min-w-0 mr-3">
              <p className="font-heading font-bold text-sm text-foreground truncate">{tutorial.title}</p>
              <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full mt-1 inline-block border ${LEVEL_COLORS[tutorial.level] || LEVEL_COLORS.Beginner}`}>
                {tutorial.level}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/40 transition-colors flex-shrink-0">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          {/* Video — 9:16 portrait */}
          <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1&rel=0`}
              title={tutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ComingSoonCard({ tutorial }) {
  return (
    <div className="glass rounded-xl border border-border/20 overflow-hidden opacity-60">
      <div className="aspect-video w-full bg-muted/10 flex items-center justify-center">
        <Clock className="w-7 h-7 text-muted-foreground/40" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-foreground/60 text-sm">{tutorial.title}</h3>
          <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 opacity-60 ${LEVEL_COLORS[tutorial.level] || LEVEL_COLORS.Beginner}`}>{tutorial.level}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-heading font-semibold px-2 py-0.5 rounded-full bg-muted/30 text-muted-foreground border border-border/30">
          <Clock className="w-3 h-3" /> Coming Soon
        </span>
      </div>
    </div>
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
      <div className="aspect-video w-full bg-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70">
          <Lock className="w-7 h-7 text-primary/40" />
          <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider text-center px-4">Exclusive to BTCALI<br/>Coaching Members</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-heading font-semibold text-foreground text-sm">{tutorial.title}</h3>
          <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${LEVEL_COLORS[tutorial.level] || LEVEL_COLORS.Advanced}`}>{tutorial.level}</span>
        </div>
        <div className="space-y-2">
          <Link to="/1-on-1-coaching">
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

function TutorialCard({ tutorial, onPlay, memberContent = false }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onPlay}
      className="glass rounded-xl border border-border/30 overflow-hidden cursor-pointer group transition-all duration-300 hover:border-primary/40"
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
          {memberContent ? (
            <span className="text-xs font-heading font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Crown className="w-2.5 h-2.5" /> Members
            </span>
          ) : (
            <span className="text-xs font-heading font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Free</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading font-semibold text-foreground text-sm">{tutorial.title}</h3>
          <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${LEVEL_COLORS[tutorial.level] || LEVEL_COLORS.Beginner}`}>{tutorial.level}</span>
        </div>
      </div>
    </motion.div>
  );
}

const PREMIUM_CATEGORIES = ['planche', 'front-lever', 'handstand-pushups', 'muscle-up', 'l-sit-to-handstand'];
const COMING_SOON_CATEGORIES = ['planche', 'handstand-pushups', 'muscle-up'];

function PremiumGate({ cat }) {
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { unlockCode } = useAccessCodes();

  const handleUnlock = () => {
    const result = unlockCode(code);
    if (!result) { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border"
      >
        <div className="w-14 h-14 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-5">
          <Crown className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-foreground mb-1">{cat.title}</h2>
        <p className="text-xs font-heading font-bold text-primary uppercase tracking-widest mb-5">Exclusive to BTCALI Members</p>
        <p className="text-sm font-body text-muted-foreground mb-7 leading-relaxed">
          This skill library is exclusively available to BTCALI coaching members. Apply for coaching or enter your member access code below.
        </p>

        <Link to="/1-on-1-coaching">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary mb-3 flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" /> Apply Now
          </motion.button>
        </Link>

        {!showCode ? (
          <button
            onClick={() => setShowCode(true)}
            className="w-full py-2.5 rounded-xl glass border border-border/40 text-muted-foreground font-heading font-semibold text-xs hover:border-primary/40 hover:text-foreground transition-all"
          >
            I am a BTCALI member — Enter Access Code
          </button>
        ) : (
          <div>
            <p className="text-xs text-muted-foreground font-body mb-2">If you are a BTCALI member, enter your unique access code below.</p>
            <div className={`flex gap-2 rounded-xl overflow-hidden mb-2 ${error ? 'ring-2 ring-destructive/60' : 'ring-1 ring-border/40'}`}>
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value.toUpperCase()); setError(false); }}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                placeholder="Enter access code..."
                className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3 outline-none placeholder:text-muted-foreground/50"
              />
              <button onClick={handleUnlock} className="gradient-bg-strong px-4 text-primary-foreground font-heading font-bold text-xs">
                Unlock
              </button>
            </div>
            {error && <p className="text-xs text-destructive font-body">Invalid code. Try again.</p>}
          </div>
        )}

        <Link to="/skills" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-4 font-body">
          <ChevronLeft className="w-3 h-3" /> Back to Skill Library
        </Link>
      </motion.div>
    </div>
  );
}

export default function SkillLibraryCategory() {
  const { categoryId } = useParams();
  const [search, setSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const { isAdmin, isMember: ctxMember } = useAccessCodes();
  const isMember = ctxMember;

  // Coming soon pages — show intentional coming soon card
  if (COMING_SOON_CATEGORIES.includes(categoryId)) {
    const csData = COMING_SOON_DATA[categoryId];
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 max-w-2xl mx-auto flex flex-col justify-center">
        <Link to="/skills" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-body hover:text-foreground transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Skill Library
        </Link>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-2xl p-10 border border-primary/30 text-center glow-border relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-muted/40 border border-border/40 rounded-full px-4 py-1.5 mb-5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-heading font-bold text-muted-foreground uppercase tracking-wider">Coming Soon</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl gradient-text mb-4">{csData.title}</h1>
            <p className="font-body text-sm text-foreground/80 mb-6 max-w-md mx-auto leading-relaxed">{csData.text}</p>
            <div className="glass rounded-xl p-5 border border-border/30 text-left max-w-sm mx-auto mb-7">
              <p className="font-heading font-semibold text-foreground text-xs mb-3 uppercase tracking-wider">Will include:</p>
              <div className="space-y-1.5">
                {csData.items.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                    <span className="text-sm font-body text-foreground/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link to="/1-on-1-coaching">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary">
                <Crown className="w-4 h-4" /> Apply For 1-on-1 Coaching
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const cat = CATEGORY_DATA[categoryId];

  // Gate premium categories for non-members
  if (cat && PREMIUM_CATEGORIES.includes(categoryId) && !isAdmin && !isMember) {
    return <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto"><PremiumGate cat={cat} /></div>;
  }

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

      {/* Planche Conditioning intro card */}
      {categoryId === 'planche-conditioning' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-7 border border-primary/30 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-bg pointer-events-none" />
          <div className="relative space-y-4">
            <h2 className="font-heading font-bold text-lg gradient-text">Why Planche Conditioning Matters</h2>
            <p className="font-body text-sm text-foreground/85 leading-relaxed">
              Planche is one of the most demanding and injury-prone skills in calisthenics. Many athletes rush straight into planche training without preparing their joints, tendons, connective tissue, and movement patterns.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4 border border-border/30">
                <p className="font-heading font-semibold text-foreground text-xs mb-2">This often leads to:</p>
                {['Wrist pain','Elbow pain','Bicep strain','Shoulder injuries','Poor technique','Plateaus'].map(item => (
                  <div key={item} className="flex items-center gap-2 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 flex-shrink-0" />
                    <span className="text-xs font-body text-foreground/75">{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass rounded-xl p-4 border border-primary/20">
                <p className="font-heading font-semibold text-primary text-xs mb-2">Conditioning teaches:</p>
                {['Proper engagement','Scapula positioning','Straight arm strength','Tendon conditioning','Wrist preparation','Lean mechanics','Body awareness'].map(item => (
                  <div key={item} className="flex items-center gap-2 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs font-body text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-body text-sm text-foreground/75 leading-relaxed">
              Many athletes unknowingly overlean, lose engagement, and use inefficient technique. These conditioning drills help correct those mistakes, improve form, increase hold times, reduce injury risk, and dramatically improve long-term progress.
            </p>
          </div>
        </motion.div>
      )}

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
              transition={{ delay: i * 0.04 }}
            >
              {tutorial.comingSoon ? (
                <ComingSoonCard tutorial={tutorial} />
              ) : tutorial.free || isAdmin || isMember ? (
                <TutorialCard tutorial={tutorial} onPlay={() => setActiveVideo(tutorial)} memberContent={!tutorial.free} />
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
          Want to unlock all tutorials and get personalised coaching? Apply for BTCALI 1-on-1 coaching.
        </p>
        <Link to="/1-on-1-coaching">
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