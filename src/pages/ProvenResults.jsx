import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Play, Users, ArrowRight } from 'lucide-react';
import GlowButton from '../components/GlowButton';

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
];

function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group rounded-2xl overflow-hidden glass glow-border hover:ring-1 hover:ring-primary/40 transition-all duration-300"
      style={{ aspectRatio: '9/16' }}
    >
      {playing ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setPlaying(true)}
        >
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
      )}
    </motion.div>
  );
}

export default function ProvenResults() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
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
          <VideoCard key={video.id} video={video} index={i} />
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
    </div>
  );
}