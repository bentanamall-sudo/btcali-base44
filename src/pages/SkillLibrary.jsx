import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Crown, Zap, ChevronDown, ArrowRight, Lock } from 'lucide-react';
import { PageHeaderLogo } from '../components/Logo';

const FREE_CATEGORIES = [
  {
    id: 'master-basics',
    title: 'Master The Basics',
    description: 'Push, pull, and core fundamentals — the foundation everything is built on.',
    level: 'Beginner',
    icon: '📐',
    accentColor: '#6B7280',
  },
  {
    id: 'handstand-foundations',
    title: 'Handstand & Shoulder Foundations',
    description: 'Wrist warmups, pike push-ups, kick-ups, and beginner handstand development.',
    level: 'Beginner → Intermediate',
    icon: '⚡',
    accentColor: '#B8860B',
  },
  {
    id: 'planche-conditioning',
    title: 'FREE Planche Conditioning',
    description: 'Wrist prep, scapular strength, planche lean, straight arm conditioning — essential before any planche work.',
    level: 'Beginner → Intermediate',
    icon: '🔥',
    access: 'free',
    accentColor: '#D4AF37',
    featured: true,
  },
];

const PREMIUM_CATEGORIES = [
  {
    id: 'front-lever',
    title: 'Front Lever',
    description: 'Build horizontal pulling strength from hollow body to full front lever.',
    level: 'Intermediate → Advanced',
    icon: '🔱',
    accentColor: '#D4AF37',
  },
  {
    id: 'l-sit-to-handstand',
    title: 'L-Sit to Handstand Full Guide',
    description: 'The complete system — bent arm press, L-sit to handstand, and all advanced progressions.',
    level: 'Intermediate → Elite',
    icon: '🏆',
    accentColor: '#D4AF37',
  },
  {
    id: 'planche',
    title: 'Planche',
    description: 'Tuck, straddle, and full planche progressions.',
    level: 'Advanced → Elite',
    icon: '💪',
    accentColor: '#8B5CF6',
    comingSoon: true,
  },
  {
    id: 'handstand-pushups',
    title: 'Handstand Pushups',
    description: 'Wall HSPU through to freestanding handstand push-up development.',
    level: 'Intermediate → Advanced',
    icon: '🏋️',
    accentColor: '#D4AF37',
    comingSoon: true,
  },
  {
    id: 'muscle-up',
    title: 'Muscle-Up',
    description: 'Explosive transition training — bar and rings.',
    level: 'Intermediate',
    icon: '⚡',
    accentColor: '#D4AF37',
    comingSoon: true,
  },
];

function FoundationCard({ cat, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="cursor-pointer group rounded-2xl overflow-hidden relative"
      style={{
        background: cat.featured
          ? `linear-gradient(145deg, hsl(var(--card)), hsl(42 78% 12%))`
          : `linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))`,
        border: cat.featured ? `1.5px solid hsl(var(--primary)/0.5)` : `1px solid hsl(var(--border)/0.5)`,
        boxShadow: cat.featured ? '0 0 30px hsl(var(--glow-primary)/0.12)' : undefined,
      }}
    >
      <div className="h-px w-full opacity-40 group-hover:opacity-80 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${cat.accentColor}, transparent)` }} />
      <div className="p-6">
        {cat.featured && (
          <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/40 rounded-full px-3 py-1 mb-3 text-xs font-heading font-bold text-primary uppercase tracking-wider">
            <Zap className="w-3 h-3" /> Start Here
          </div>
        )}
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `linear-gradient(135deg, ${cat.accentColor}22, ${cat.accentColor}08)`, border: `1px solid ${cat.accentColor}35` }}>
            {cat.icon}
          </div>
          <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Free</span>
        </div>
        <h3 className="font-heading font-bold text-base text-foreground mb-1.5" style={{ color: cat.featured ? 'hsl(var(--primary))' : undefined }}>{cat.title}</h3>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">{cat.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <span className="text-xs font-body text-muted-foreground/50">{cat.level}</span>
          <span className="text-xs font-heading font-bold group-hover:translate-x-1 transition-transform" style={{ color: cat.accentColor }}>Explore →</span>
        </div>
      </div>
    </motion.div>
  );
}

function PremiumCard({ cat, onClick }) {
  if (cat.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className="cursor-pointer group rounded-2xl overflow-hidden relative opacity-70 hover:opacity-90 transition-opacity"
        style={{ background: `linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))`, border: `1px solid hsl(var(--border)/0.4)` }}
      >
        <div className="h-px w-full opacity-20" style={{ background: `linear-gradient(90deg, transparent, ${cat.accentColor}, transparent)` }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `linear-gradient(135deg, ${cat.accentColor}15, ${cat.accentColor}05)`, border: `1px solid ${cat.accentColor}25` }}>
              {cat.icon}
            </div>
            <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-muted/40 text-muted-foreground border border-border/40">Coming Soon</span>
          </div>
          <h3 className="font-heading font-bold text-base text-foreground/70 mb-1.5">{cat.title}</h3>
          <p className="text-sm font-body text-muted-foreground/60 leading-relaxed mb-4">{cat.description}</p>
          <div className="pt-4 border-t border-border/20">
            <span className="text-xs font-body text-muted-foreground/40">{cat.level}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="cursor-pointer group rounded-2xl overflow-hidden relative"
      style={{ background: `linear-gradient(145deg, hsl(var(--card)), hsl(42 78% 10%))`, border: `1px solid hsl(var(--primary)/0.3)`, boxShadow: '0 0 20px hsl(var(--glow-primary)/0.08)' }}
    >
      <div className="h-px w-full opacity-50 group-hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${cat.accentColor}, transparent)` }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `linear-gradient(135deg, ${cat.accentColor}22, ${cat.accentColor}08)`, border: `1px solid ${cat.accentColor}35` }}>
            {cat.icon}
          </div>
          <span className="flex items-center gap-1 text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <Crown className="w-3 h-3" /> Members
          </span>
        </div>
        <h3 className="font-heading font-bold text-base gradient-text mb-1.5">{cat.title}</h3>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">{cat.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <span className="text-xs font-body text-muted-foreground/50">{cat.level}</span>
          <span className="text-xs font-heading font-bold text-primary group-hover:translate-x-1 transition-transform">Explore →</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillLibrary() {
  const [infoOpen, setInfoOpen] = useState(false);
  const navigate = useNavigate();

  const handleCatClick = (cat) => {
    if (cat.comingSoon) {
      navigate(`/skills/${cat.id}`);
    } else {
      navigate(`/skills/${cat.id}`);
    }
  };

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex justify-start mb-6">
          <PageHeaderLogo />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5 border border-border/40">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">BTCALI Skill Library</span>
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-6 leading-tight">
          The <span className="gradient-text">Skill Library</span>
        </h1>

        {/* Foundation Banner */}
        <div className="glass rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, hsl(var(--primary)/0.05) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-lg gradient-text">Build The Foundation First</h2>
            </div>
            <p className="font-body text-sm text-foreground/75 leading-relaxed mb-4 max-w-2xl">
              One of the biggest mistakes athletes make is chasing advanced skills before building the foundations required to support them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setInfoOpen(o => !o)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-border/50 text-foreground font-heading font-semibold text-sm hover:border-primary/40 transition-all"
              >
                What Is The Skill Library?
                <motion.span animate={{ rotate: infoOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-primary" />
                </motion.span>
              </button>
              <button
                onClick={() => navigate('/1-on-1-coaching')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
              >
                <Crown className="w-4 h-4" /> Apply For 1-on-1 Coaching
              </button>
            </div>

            {/* Accordion */}
            <AnimatePresence>
              {infoOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 pt-5 border-t border-border/30 space-y-4">
                    <h3 className="font-heading font-bold text-base text-foreground">What's Included?</h3>
                    <p className="text-sm font-body text-foreground/80 leading-relaxed">
                      The BTCALI Skill Library includes free tutorials for beginners to help you get started with calisthenics, strength, body control, mobility, and proper technique.
                    </p>
                    <p className="text-sm font-body text-foreground/75">Free tutorials help athletes build strong foundations.</p>
                    <div>
                      <p className="text-sm font-heading font-semibold text-foreground mb-2">Premium BTCALI Members-only tutorials include:</p>
                      <div className="grid sm:grid-cols-2 gap-1.5">
                        {['Front Lever','Planche','Handstand Pushup','Muscle Up','L-Sit to Handstand Full Guide','Advanced progressions','Exclusive coaching resources'].map(item => (
                          <div key={item} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-sm font-body text-foreground/75">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass rounded-xl p-4 border border-primary/20 mt-4">
                      <p className="text-sm font-body text-foreground/80 mb-3">Want personalised coaching and full access to BTCALI member content?</p>
                      <button
                        onClick={() => navigate('/1-on-1-coaching')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
                      >
                        <ArrowRight className="w-4 h-4" /> Apply For 1-on-1 Coaching
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* FREE TUTORIALS */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-emerald-500/20" />
          <span className="text-xs font-heading font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">Free Tutorials</span>
          <div className="h-px flex-1 bg-emerald-500/20" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {FREE_CATEGORIES.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.06 }}>
              <FoundationCard cat={cat} onClick={() => navigate(`/skills/${cat.id}`)} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* PREMIUM TUTORIALS */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-primary/20" />
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-xs font-heading font-bold text-primary uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 border border-primary/25">Premium Tutorials</span>
            <span className="text-xs font-body text-muted-foreground">BTCALI Members Only</span>
          </div>
          <div className="h-px flex-1 bg-primary/20" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PREMIUM_CATEGORIES.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 + i * 0.06 }}>
              <PremiumCard cat={cat} onClick={() => navigate(`/skills/${cat.id}`)} />
            </motion.div>
          ))}
        </div>

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-primary/20 p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary)/0.05) 0%, transparent 70%)' }} />
          <div className="relative">
            <Lock className="w-8 h-8 text-primary/50 mx-auto mb-3" />
            <p className="font-heading font-bold text-foreground text-lg mb-1">Unlock All Premium Tutorials</p>
            <p className="text-muted-foreground font-body text-sm mb-5 max-w-md mx-auto">
              Get personalised coaching and full access to all BTCALI member tutorials.
            </p>
            <button
              onClick={() => navigate('/1-on-1-coaching')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
            >
              <Crown className="w-4 h-4" /> Apply For 1-on-1 Coaching
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}