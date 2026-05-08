import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Star, ChevronLeft, ChevronRight, Users, ArrowRight, Quote } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

const results = [
  {
    name: 'Alex M.',
    nickname: '@alex_cali',
    skill: 'Pull Foundation',
    before: 'Zero pullups — could not complete a single rep',
    after: '15+ strict pullups — training muscle-up transitions',
    timeframe: '6 months',
    timeLabel: 'Progress in 6 months',
    badge: 'Pull Transformation',
    badgeColor: 'text-blue-400 bg-blue-400/15',
    beforeImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=600&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=600&fit=crop',
    quote: 'BTCALI completely restructured how I train. The diagnostics found my exact weakness and the program fixed it fast.',
  },
  {
    name: 'Jordan R.',
    nickname: '@jordan_hs',
    skill: 'Handstand',
    before: 'Could kick up but immediately fell — no balance control',
    after: '45-second freestanding hold — working HSPU progressions',
    timeframe: '4 months',
    timeLabel: 'Unlocked in 4 months',
    badge: 'Handstand Elite',
    badgeColor: 'text-purple-400 bg-purple-400/15',
    beforeImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=600&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=600&fit=crop',
    quote: 'The progression system is genius. Each step built perfectly on the last. I finally understand balance.',
  },
  {
    name: 'Chris W.',
    nickname: '@chrisw_planche',
    skill: 'Planche',
    before: 'Tuck planche hold — 2 seconds max',
    after: 'Straddle Planche — 8 solid seconds',
    timeframe: '12 months',
    timeLabel: 'Achieved in 12 months',
    badge: 'Planche Master',
    badgeColor: 'text-amber-400 bg-amber-400/15',
    beforeImg: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=600&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=500&h=600&fit=crop',
    quote: 'No fluff, no wasted time. The planche roadmap is the most structured thing I\'ve ever followed.',
  },
  {
    name: 'Mia S.',
    nickname: '@mia_strength',
    skill: 'Muscle-Up',
    before: 'No muscle-up — pulling to chin level only',
    after: '3 strict muscle-ups — clean transition every time',
    timeframe: '5 months',
    timeLabel: 'Progress in 5 months',
    badge: 'Muscle-Up Unlock',
    badgeColor: 'text-green-400 bg-green-400/15',
    beforeImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=600&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=600&fit=crop',
    quote: 'The coach knew exactly what I needed to fix. Within weeks my transitions clicked.',
  },
  {
    name: 'Daniel K.',
    nickname: '@dk_frontlever',
    skill: 'Front Lever',
    before: 'Tuck Front Lever — shaky, inconsistent',
    after: 'Full Front Lever — 6 second hold',
    timeframe: '8 months',
    timeLabel: 'Achieved in 8 months',
    badge: 'Front Lever Elite',
    badgeColor: 'text-cyan-400 bg-cyan-400/15',
    beforeImg: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=600&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=600&fit=crop',
    quote: 'I was stuck at advanced tuck for a year before BTCALI. Fixed in 8 months flat.',
  },
  {
    name: 'Ryan P.',
    nickname: '@ryan_hspu',
    skill: 'HSPU',
    before: 'Pike pushups only — no overhead pressing strength',
    after: 'Freestanding HSPU x3 — clean reps',
    timeframe: '10 months',
    timeLabel: 'Achieved in 10 months',
    badge: 'HSPU Legend',
    badgeColor: 'text-primary bg-primary/15',
    beforeImg: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=500&h=600&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=600&fit=crop',
    quote: 'The step-by-step overhead progression was a masterclass. Nothing like this exists anywhere else.',
  },
];

const stats = [
  { value: '150+', label: 'Athletes Coached' },
  { value: '30+', label: 'Full Planche Unlocks' },
  { value: '80+', label: 'Handstand Transformations' },
  { value: '98%', label: 'Athlete Retention' },
];

export default function ProvenResults() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + results.length) % results.length);
  const next = () => setCurrent((c) => (c + 1) % results.length);

  const result = results[current];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard glow hover={false} className="text-center py-4">
              <div className="font-heading font-bold text-2xl gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-body mt-1">{stat.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Cinematic carousel */}
      <div className="max-w-5xl mx-auto mb-14">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <div className="rounded-3xl glass overflow-hidden glow-border">
                {/* Time badge */}
                <div className="flex items-center justify-center py-4 px-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-heading font-bold px-4 py-1.5 rounded-full ${result.badgeColor}`}>
                      {result.badge}
                    </span>
                    <span className="text-foreground font-heading font-semibold text-lg">
                      ⏱ {result.timeLabel}
                    </span>
                  </div>
                </div>

                {/* Before / After images */}
                <div className="grid sm:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 sm:h-80">
                    <img src={result.beforeImg} alt="Before" className="w-full h-full object-cover brightness-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-heading font-bold text-red-400 bg-red-400/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        BEFORE
                      </span>
                      <p className="text-white text-sm font-body mt-2 leading-snug max-w-[200px]">{result.before}</p>
                    </div>
                  </div>
                  <div className="relative overflow-hidden h-64 sm:h-80">
                    <img src={result.afterImg} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-heading font-bold text-green-400 bg-green-400/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        AFTER
                      </span>
                      <p className="text-white text-sm font-body mt-2 leading-snug max-w-[200px]">{result.after}</p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6 flex flex-col sm:flex-row items-start gap-4">
                  <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-foreground/90 font-body italic leading-relaxed mb-3">"{result.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-bg-strong flex items-center justify-center">
                        <span className="font-heading font-bold text-primary-foreground text-sm">{result.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-heading font-semibold text-foreground text-sm">{result.name}</div>
                        <div className="text-xs text-muted-foreground font-body">{result.nickname} · {result.skill}</div>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 glass rounded-full flex items-center justify-center hover:glow-primary transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 glass rounded-full flex items-center justify-center hover:glow-primary transition-all"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {results.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-6 h-2 gradient-bg-strong' : 'w-2 h-2 bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grid of all transformations */}
      <h2 className="font-heading font-bold text-2xl text-center mb-8 text-foreground">
        All <span className="gradient-text">Athlete Stories</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {results.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard
              glow={i === current}
              hover={false}
              className={`h-full cursor-pointer transition-all ${i === current ? 'ring-1 ring-primary/40' : ''}`}
              onClick={() => setCurrent(i)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-bg-strong flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-heading font-bold text-primary-foreground">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-heading font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-body">{t.timeframe}</div>
                </div>
                <span className={`ml-auto text-xs font-heading font-semibold px-2 py-0.5 rounded-full ${t.badgeColor}`}>
                  {t.skill}
                </span>
              </div>
              <div className="space-y-2">
                <div className="glass rounded-lg p-2.5">
                  <div className="text-xs text-red-400 font-body mb-0.5">Before</div>
                  <div className="text-xs font-body text-foreground/80">{t.before}</div>
                </div>
                <div className="glass rounded-lg p-2.5 glow-border">
                  <div className="text-xs text-green-400 font-body mb-0.5">After</div>
                  <div className="text-xs font-body text-foreground/80">{t.after}</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
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
          Join hundreds of athletes who have transformed their bodies with BTCALI coaching. Apply for your spot today.
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