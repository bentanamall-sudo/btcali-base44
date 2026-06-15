import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Play, X, ExternalLink, AlertTriangle, Copy, CheckCircle } from 'lucide-react';
import TutorialCoachingCTA from '../../components/home/TutorialCoachingCTA';
import { useAuth } from '@/lib/AuthContext';

const TUTORIALS = [
  {
    title: 'Handstand Bail Tutorial',
    videoId: 'rGoEHcIPeFY',
    youtubeUrl: 'https://www.youtube.com/watch?v=rGoEHcIPeFY',
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
    videoId: '8GLA_c0jueA',
    youtubeUrl: 'https://www.youtube.com/watch?v=8GLA_c0jueA',
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
    videoId: 'yDYk7w7uqTA',
    youtubeUrl: 'https://www.youtube.com/watch?v=yDYk7w7uqTA',
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
    videoId: 'pgKP61v2kz8',
    youtubeUrl: 'https://www.youtube.com/watch?v=pgKP61v2kz8',
    points: [
      'Hands form bottom of triangle',
      'Look slightly in front of hands',
      'Roughly 10cm forward',
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
                href={`https://www.youtube.com/watch?v=${tutorial.videoId}`}
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
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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

function AdminCopyOverlay({ url }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold border border-primary/60 text-primary hover:bg-primary/10 transition-all z-10"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
    >
      {copied ? <><CheckCircle className="w-3 h-3 text-green-400" /><span className="text-green-400">Copied!</span></> : <><Copy className="w-3 h-3" /> Copy Link</>}
    </button>
  );
}

function TutorialCard({ tutorial, index, isAdmin }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        className="rounded-2xl border border-border/30 bg-card/60 overflow-hidden group transition-all duration-300 hover:border-primary/40 relative"
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 25px hsl(var(--glow-primary) / 0.18)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-accent/40 to-transparent" />
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg gradient-bg-strong flex items-center justify-center flex-shrink-0">
              <Play className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <h4 className="font-heading font-bold text-sm text-foreground leading-tight">{tutorial.title}</h4>
          </div>
          <ul className="space-y-1.5 mb-5">
            {tutorial.points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                <div className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0 mt-1.5" />
                {p}
              </li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)}
            className="w-full py-2.5 rounded-xl gradient-bg-strong glow-primary flex items-center justify-center gap-2 text-xs font-heading font-bold text-primary-foreground"
          >
            <Play className="w-3.5 h-3.5" /> Watch Tutorial
          </motion.button>
          {isAdmin && tutorial.youtubeUrl && <AdminCopyOverlay url={tutorial.youtubeUrl} />}
        </div>
      </motion.div>
      {open && <VideoModal tutorial={tutorial} onClose={() => setOpen(false)} />}
    </>
  );
}

export default function HandstandGuide() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link to="/tutorials" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Tutorials
        </Link>
        <div className="text-center">
          <div className="text-5xl mb-4">🤸‍♂️</div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3">
            Free <span className="gradient-text">Handstand Beginner Guide</span>
          </h1>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Learn to kick up, bail safely, and build your first freestanding handstand from scratch.
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-12">
        {TUTORIALS.map((t, i) => <TutorialCard key={t.title} tutorial={t} index={i} isAdmin={isAdmin} />)}
      </div>

      {/* Coaching CTA */}
      <TutorialCoachingCTA />

      {/* Disclaimer */}
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