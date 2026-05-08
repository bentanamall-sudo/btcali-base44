import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

const transformations = [
  { name: 'Alex M.', before: 'Zero pullups', after: '15+ strict pullups', timeframe: '6 months', skill: 'Pull Foundation' },
  { name: 'Jordan R.', before: 'Cannot hold handstand', after: '45-second freestanding hold', timeframe: '4 months', skill: 'Handstand' },
  { name: 'Chris W.', before: 'Tuck Planche', after: 'Straddle Planche 8s', timeframe: '12 months', skill: 'Planche' },
  { name: 'Mia S.', before: 'No muscle-up', after: '3 strict muscle-ups', timeframe: '5 months', skill: 'Muscle-Up' },
  { name: 'Daniel K.', before: 'Tuck Front Lever', after: 'Full Front Lever 6s', timeframe: '8 months', skill: 'Front Lever' },
  { name: 'Ryan P.', before: 'Pike pushups only', after: 'Freestanding HSPU x3', timeframe: '10 months', skill: 'HSPU' },
];

const achievements = [
  '150+ athletes coached',
  '30+ full planche unlocks',
  '80+ handstand transformations',
  '50+ muscle-up achievements',
];

export default function ProvenResults() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Proven Results</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Real <span className="gradient-text">Transformations</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Our athletes speak through results, not words.
        </p>
      </motion.div>

      {/* Achievement stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {achievements.map((a, i) => (
          <GlassCard key={i} glow hover={false} className="text-center py-4">
            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
            <span className="font-body text-sm text-foreground">{a}</span>
          </GlassCard>
        ))}
      </motion.div>

      {/* Transformation cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {transformations.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard glow hover={false} className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full gradient-bg-strong flex items-center justify-center">
                  <span className="text-sm font-heading font-bold text-primary-foreground">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-heading font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-body">{t.timeframe}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-red-400 font-body mb-1">Before</div>
                  <div className="text-sm font-body text-foreground">{t.before}</div>
                </div>
                <div className="glass rounded-lg p-3 glow-border">
                  <div className="text-xs text-green-400 font-body mb-1">After</div>
                  <div className="text-sm font-body text-foreground">{t.after}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span className="text-xs text-primary font-body">{t.skill}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Coaching CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl glass text-center py-12 px-6 glow-border"
      >
        <Users className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3">
          Your Transformation <span className="gradient-text">Starts Now</span>
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-6">
          Join hundreds of athletes who have transformed their bodies with BTCALI coaching. Apply for your spot today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/pricing">
            <GlowButton size="lg">
              Apply for Coaching <ArrowRight className="w-4 h-4" />
            </GlowButton>
          </Link>
          <Link to="/tutorials">
            <GlowButton variant="secondary" size="lg">
              Start Free Tutorials
            </GlowButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}