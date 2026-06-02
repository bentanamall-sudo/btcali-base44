import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Users, ArrowRight } from 'lucide-react';
import GlowButton from '../components/GlowButton';
import { PageHeaderLogo } from '../components/Logo';
import LazyVideo from '../components/LazyVideo';

export const RESULTS_VIDEOS = [
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/30726ddef_C2235DA5-CFA6-4B66-A712-1CFD414AEE34.mp4', label: '5 Weeks', labelColor: 'text-primary bg-primary/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/ab40f3e73_3DBD7B8B-0985-4366-803A-6BF5FE6E16DA.mp4', label: '1 Hour', labelColor: 'text-cyan-400 bg-cyan-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/d03b8e901_87AA93C8-C62D-44CB-92B4-25DE7D6EB9EF.mp4', label: '30 Minutes', labelColor: 'text-green-400 bg-green-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/33e465fb1_8FB2940B-72DC-4171-B5BD-3B262CA0230A.mp4', label: '5 Weeks', labelColor: 'text-primary bg-primary/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/9bce54fa0_F8C3EC32-6F28-43F9-9274-5DCA2E4AD3AE.mp4', label: '< 1 Month', labelColor: 'text-amber-400 bg-amber-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/b29797e50_C52B9D44-CCC6-4C11-B563-D29E72D5E742.mp4', label: '1 Week', labelColor: 'text-purple-400 bg-purple-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/a7025db1d_C88E406D-F072-4021-9F9D-376E1AE850BA.mp4', label: '1 Week', labelColor: 'text-cyan-400 bg-cyan-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/acb324d63_D9DC1424-7087-4C6F-BC4C-83A843896E19.mp4', label: 'Progress', labelColor: 'text-primary bg-primary/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7c2816870_BF734FD2-A5B6-4EA6-9DFC-3725ABB1BAAD.mp4', label: 'Session', labelColor: 'text-green-400 bg-green-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a0d49733_D05272AD-F171-4C80-8119-90847BFEFB36.mp4', label: 'Progress', labelColor: 'text-amber-400 bg-amber-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/bb51770b0_61F09AF3-D0FC-44CC-8EC6-6037B4540D78.mp4', label: 'Progress', labelColor: 'text-purple-400 bg-purple-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7da5945e5_2882F251-A505-4D09-9090-44FCD8DAEDB4.mp4', label: 'Progress', labelColor: 'text-cyan-400 bg-cyan-400/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a47f6089_5DDF0CFF-6FD2-432E-B713-A609FBBD691A.mp4', label: 'Progress', labelColor: 'text-primary bg-primary/15' },
  { src: 'https://media.base44.com/videos/public/69fd635623a9368c153045ad/8062fad09_5fed1466edd6499c94832fcfc468d25c.mov', label: 'Progress', labelColor: 'text-amber-400 bg-amber-400/15' },
];

// First 4 are above-the-fold on the results grid — load eagerly
const EAGER_COUNT = 4;

function VideoCard({ video, index }) {
  const eager = index < EAGER_COUNT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.04, 0.2) }}
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl overflow-hidden relative bg-muted/20"
      style={{
        aspectRatio: '9/16',
        border: '1px solid hsl(var(--glow-primary)/0.25)',
        boxShadow: '0 4px 24px hsl(var(--glow-primary)/0.08)',
      }}
    >
      <LazyVideo
        src={video.src}
        eager={eager}
        rootMargin="300px"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 pointer-events-none">
        <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full backdrop-blur-sm ${video.labelColor}`}>
          {video.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProvenResults() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="flex justify-start mb-6">
          <PageHeaderLogo />
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
        {RESULTS_VIDEOS.map((video, i) => (
          <VideoCard key={i} video={video} index={i} />
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