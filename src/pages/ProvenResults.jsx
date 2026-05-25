import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Play, Users, ArrowRight, X, ExternalLink } from 'lucide-react';
import GlowButton from '../components/GlowButton';
import { LogoBadge } from '../components/Logo';

const testimonials = [
  {
    id: 'JIOPPWpEds8',
    title: "Haejun's 5 Week Progress",
    label: '5 Weeks',
    labelColor: 'text-primary bg-primary/15',
  },
  {
    id: 'D4llYbwGojs',
    title: "Adrian's 1 Hour Progress",
    label: '1 Hour Session',
    labelColor: 'text-cyan-400 bg-cyan-400/15',
  },
  {
    id: 'xCHxH-oVO0s',
    title: "Haegun's 30 Min Pike Press Progress",
    label: '30 Minutes',
    labelColor: 'text-green-400 bg-green-400/15',
  },
  {
    id: 'ljX0zJJn0Q4',
    title: "Haegun's 5 Week Progress",
    label: '5 Weeks',
    labelColor: 'text-primary bg-primary/15',
  },
  {
    id: 'lAz9QY81SkI',
    title: "Cardea's Less Than 1 Month Progress",
    label: '< 1 Month',
    labelColor: 'text-amber-400 bg-amber-400/15',
  },
  {
    id: 'j8PrFLzyAcc',
    title: "Andreas' 1 Week L-Sit to Handstand",
    label: '1 Week',
    labelColor: 'text-purple-400 bg-purple-400/15',
  },
  {
    id: 'ep1uFxV0o50',
    title: "Andreas 1 Week L-Sit To Handstand",
    label: '1 Week Progress',
    labelColor: 'text-cyan-400 bg-cyan-400/15',
  },
];

function VideoCard({ video, index, onPlay }) {
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group rounded-2xl overflow-hidden glass glow-border hover:ring-1 hover:ring-primary/40 transition-all duration-300 cursor-pointer"
      style={{ aspectRatio: '9/16' }}
      onClick={() => onPlay(video)}
    >
      <div className="relative w-full h-full">
        <img
          src={thumbUrl}
          alt={video.title}
          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full gradient-bg-strong glow-primary flex items-center justify-center"
          >
            <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground ml-1" />
          </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full backdrop-blur-sm ${video.labelColor}`}>
            {video.label}
          </span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-heading font-semibold text-white text-sm leading-snug">{video.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

function VideoModal({ video, onClose }) {
  const embedSrc = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
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
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
            <div className="flex-1 min-w-0 mr-3">
              <p className="font-heading font-bold text-sm text-foreground truncate">{video.title}</p>
              <span className={`text-xs font-heading font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${video.labelColor}`}>
                {video.label}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={`https://youtube.com/shorts/${video.id}`}
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

          {/* Video — 9:16 portrait */}
          <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
            <iframe
              src={embedSrc}
              title={video.title}
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

export default function ProvenResults() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <LogoBadge size="lg" />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Student Testimonials</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Student <span className="gradient-text">Testimonials</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Real BTCALI student progress — shown through actual training videos.
        </p>
      </motion.div>

      {/* Video grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-16">
        {testimonials.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i} onPlay={setActiveVideo} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl glass text-center py-14 px-6 glow-border relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
        <Users className="w-10 h-10 text-primary mx-auto mb-4 relative z-10" />
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3 relative z-10">
          Your Transformation <span className="gradient-text">Starts Now</span>
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-6 relative z-10">
          Join athletes who are already training with BTCALI. Apply for coaching or start free today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link to="/apply">
            <GlowButton size="lg">Apply for Coaching <ArrowRight className="w-4 h-4" /></GlowButton>
          </Link>
          <Link to="/tutorials">
            <GlowButton variant="secondary" size="lg">Start Free Tutorials</GlowButton>
          </Link>
        </div>
      </motion.div>

      {/* Premium video modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}