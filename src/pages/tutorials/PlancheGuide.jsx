import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Play, X, ExternalLink, AlertTriangle, Clock } from 'lucide-react';
import TutorialCoachingCTA from '../../components/home/TutorialCoachingCTA';

const TUTORIALS = [
  {
    title: 'Planche Lean',
    videoId: '-cGOxgIccqU',
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
    videoId: 'SWJn6e7Kc50',
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
    videoId: 'QppuGF94PLc',
    points: [
      'Essential for planche',
      'Essential for handstand',
      'Essential for front lever',
      'Shoulder health',
    ],
  },
  {
    title: 'Wrist Warm-Up',
    videoId: 'A1YPZdLyXPI',
    points: [
      'Essential before handstands',
      'Essential before planche work',
      'Heavy wrist loading prep',
      'Discomfort is okay',
      'Pain is NOT okay',
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
];

function VideoModal({ tutorial, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl glass rounded-2xl overflow-hidden border border-primary/30"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
            <h3 className="font-heading font-bold text-sm text-foreground truncate">{tutorial.title}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={`https://youtube.com/shorts/${tutorial.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-body text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> YouTube
              </a>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted/40 transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1&rel=0`}
              title={tutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TutorialCard({ tutorial, index }) {
  const [open, setOpen] = useState(false);
  const { comingSoon } = tutorial;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07 }}
        className={`rounded-2xl border overflow-hidden transition-all duration-300 ${comingSoon ? 'border-border/20 bg-card/30 opacity-60' : 'border-border/30 bg-card/60 hover:border-primary/40'}`}
        onMouseEnter={e => { if (!comingSoon) e.currentTarget.style.boxShadow = '0 0 25px hsl(var(--glow-primary) / 0.18)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div className={`h-0.5 w-full ${comingSoon ? 'bg-border/20' : 'bg-gradient-to-r from-primary/60 via-accent/40 to-transparent'}`} />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${comingSoon ? 'bg-muted/30' : 'gradient-bg-strong'}`}>
                {comingSoon ? <Clock className="w-3.5 h-3.5 text-muted-foreground" /> : <Play className="w-3.5 h-3.5 text-primary-foreground" />}
              </div>
              <h4 className={`font-heading font-bold text-sm leading-tight ${comingSoon ? 'text-muted-foreground' : 'text-foreground'}`}>{tutorial.title}</h4>
            </div>
            {comingSoon && (
              <span className="flex-shrink-0 text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/25">
                🚧 Coming Soon
              </span>
            )}
          </div>
          <ul className="space-y-1.5 mb-5">
            {tutorial.points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                <div className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${comingSoon ? 'bg-muted-foreground/30' : 'bg-primary/60'}`} />
                {p}
              </li>
            ))}
          </ul>
          {comingSoon ? (
            <div className="w-full py-2.5 rounded-xl bg-muted/20 border border-border/20 text-center text-xs font-heading font-semibold text-muted-foreground/50 cursor-not-allowed select-none">
              Coming Soon
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(true)}
              className="w-full py-2.5 rounded-xl gradient-bg-strong glow-primary flex items-center justify-center gap-2 text-xs font-heading font-bold text-primary-foreground"
            >
              <Play className="w-3.5 h-3.5" /> Watch Tutorial
            </motion.button>
          )}
        </div>
      </motion.div>
      {open && !comingSoon && <VideoModal tutorial={tutorial} onClose={() => setOpen(false)} />}
    </>
  );
}

export default function PlancheGuide() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link to="/tutorials" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Tutorials
        </Link>
        <div className="text-center">
          <div className="text-5xl mb-4">🧠</div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3">
            Free <span className="gradient-text">Planche Conditioning Guide</span>
          </h1>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Build the wrist, scapula, and straight-arm strength foundation required for all planche progressions.
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {TUTORIALS.map((t, i) => <TutorialCard key={t.title} tutorial={t} index={i} />)}
      </div>

      <TutorialCoachingCTA />

      <div className="flex items-start gap-3 rounded-xl px-5 py-4 border border-destructive/20 bg-destructive/5 max-w-3xl mx-auto mt-6">
        <AlertTriangle className="w-4 h-4 text-destructive/70 flex-shrink-0 mt-0.5" />
        <p className="text-xs font-body text-muted-foreground leading-relaxed">
          <span className="text-destructive/80 font-semibold">⚠️ Disclaimer: </span>
          BTCALI is not responsible for any injuries or damages caused while attempting these exercises or tutorials. Perform all movements at your own risk and responsibility.
        </p>
      </div>
    </div>
  );
}