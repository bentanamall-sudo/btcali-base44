import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Crown, Zap } from 'lucide-react';
import { PageHeaderLogo } from '../components/Logo';

const TRIDENT_ICON_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/668f24dc5_ChatGPTImageJun2202609_27_21AM.png';

function TridentIcon({ size = 20 }) {
  return (
    <img src={TRIDENT_ICON_URL} alt="Premium" style={{ width: size, height: size, objectFit: 'contain' }} />
  );
}

const CATEGORIES = [
  {
    id: 'master-basics',
    title: 'Master The Basics',
    description: 'Push basics, pull basics, and core fundamentals — the foundation everything is built on.',
    level: 'Beginner',
    icon: '📐',
    access: 'free',
    accentColor: '#6B7280',
  },
  {
    id: 'l-sit-to-handstand',
    title: 'L-Sit to Handstand Guide',
    description: 'Wrist warmups, pike push-ups, handstand progressions, bent arm press, and the full L-sit to handstand path.',
    level: 'Beginner → Elite',
    icon: '⚡',
    access: 'free',
    accentColor: '#B8860B',
  },
  {
    id: 'planche-conditioning',
    title: 'FREE Planche Conditioning',
    description: 'Wrist prep, scapular strength, planche lean, straight arm conditioning and injury prevention — essential before any planche work.',
    level: 'Beginner → Intermediate',
    icon: '🔥',
    access: 'free',
    accentColor: '#D4AF37',
    featured: true,
  },
  {
    id: 'planche',
    title: 'Planche Progressions',
    description: 'Tuck, straddle, and full planche — structured progressions beyond the conditioning foundations.',
    level: 'Intermediate → Elite',
    icon: '💪',
    access: 'mixed',
    accentColor: '#8B5CF6',
  },
  {
    id: 'front-lever',
    title: 'Front Lever',
    description: 'Build horizontal pulling strength from hollow body to full front lever.',
    level: 'Intermediate → Advanced',
    icon: '🔱',
    access: 'members',
    accentColor: '#D4AF37',
  },
  {
    id: 'handstand-pushups',
    title: 'Handstand Pushups',
    description: 'Wall HSPU, chest-to-wall progressions, and freestanding handstand push-up development.',
    level: 'Intermediate → Advanced',
    icon: '🏋️',
    access: 'members',
    accentColor: '#D4AF37',
  },
  {
    id: 'muscle-up',
    title: 'Muscle-Up',
    description: 'Master the explosive transition from pull to push above the bar.',
    level: 'Intermediate',
    icon: '⚡',
    access: 'members',
    accentColor: '#D4AF37',
  },
];

function AccessBadge({ access }) {
  if (access === 'free') {
    return (
      <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        Free
      </span>
    );
  }
  if (access === 'mixed') {
    return (
      <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/15">
        Free + Members
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
      <TridentIcon size={14} /> Members
    </span>
  );
}

export default function SkillLibrary() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="flex justify-start mb-6">
          <PageHeaderLogo />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5 border border-border/40">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">BTCALI Skill Library</span>
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4 leading-tight">
          The <span className="gradient-text">Skill Library</span>
        </h1>
        <p className="text-muted-foreground font-body text-base max-w-lg mx-auto leading-relaxed">
          Structured progressions for every elite calisthenics skill. Select a category to begin.
        </p>
      </motion.div>

      {/* Build The Foundation First — premium info banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="glass rounded-2xl p-7 border border-primary/25 mb-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-lg gradient-text">Build The Foundation First</h2>
          </div>
          <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">
            One of the biggest mistakes athletes make is trying advanced skills too early without building the foundations required to support them.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
            That is why the BTCALI Skill Library focuses heavily on the things most athletes skip:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 mb-4">
            {[
              'Straight arm strength','Tendon conditioning','Scapula control','Wrist strength and mobility',
              'Shoulder stability','Serratus and pressing engagement','Skill-specific activations','Proper body positioning',
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                <span className="text-xs font-body text-foreground/75">{item}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            These foundations are often the difference between getting stuck for months and progressing safely and efficiently. Mastering them helps reduce injury risk, improve technique, increase hold times, and accelerate overall skill development.
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="relative max-w-md mx-auto mb-10"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search skills or progressions..."
          className="w-full glass rounded-xl pl-11 pr-5 py-3.5 text-foreground font-body text-sm border border-border/40 focus:border-primary/50 focus:outline-none bg-transparent placeholder:text-muted-foreground/40"
        />
      </motion.div>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16,1,0.3,1] } }}
            onClick={() => navigate(`/skills/${cat.id}`)}
            className="cursor-pointer group rounded-2xl overflow-hidden relative card-3d"
            style={{
              background: cat.featured
                ? `linear-gradient(145deg, hsl(var(--card)), hsl(42 78% 12%))`
                : `linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))`,
              border: cat.featured ? `1.5px solid hsl(var(--primary)/0.5)` : `1px solid hsl(var(--border)/0.5)`,
              boxShadow: cat.featured ? '0 0 30px hsl(var(--glow-primary)/0.15)' : undefined,
            }}
          >
            {cat.featured && (
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }} />
            )}
            {/* Top shimmer line */}
            <div
              className="h-px w-full transition-opacity duration-300 opacity-40 group-hover:opacity-90"
              style={{ background: `linear-gradient(90deg, transparent, ${cat.accentColor}, transparent)` }}
            />

            <div className="p-6">
              {/* Featured badge */}
              {cat.featured && (
                <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/40 rounded-full px-3 py-1 mb-3 text-xs font-heading font-bold text-primary uppercase tracking-wider">
                  <Zap className="w-3 h-3" /> Start Here
                </div>
              )}
              {/* Icon + badge row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${cat.accentColor}22, ${cat.accentColor}08)`,
                    border: `1px solid ${cat.accentColor}35`,
                    boxShadow: `0 4px 16px ${cat.accentColor}15, inset 0 1px 0 ${cat.accentColor}25`,
                  }}
                >
                  {cat.icon}
                </div>
                <AccessBadge access={cat.access} />
              </div>

              <h3 className="font-heading font-bold text-base text-foreground mb-2"
                style={{ color: cat.featured ? 'hsl(var(--primary))' : undefined }}
              >
                {cat.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed mb-5">
                {cat.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <span className="text-xs font-body text-muted-foreground/50">{cat.level}</span>
                <span
                  className="text-xs font-heading font-bold transition-all duration-200 group-hover:translate-x-1"
                  style={{ color: cat.accentColor }}
                >
                  Explore →
                </span>
              </div>
            </div>

            {/* Hover ambient glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${cat.accentColor}10 0%, transparent 60%)`,
                boxShadow: `inset 0 0 0 1px ${cat.accentColor}20`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground font-body">
          No results for "{search}"
        </div>
      )}

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 rounded-2xl border border-primary/20 p-10 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary)/0.06) 0%, transparent 70%)' }} />
        <div className="relative">
          <p className="font-heading font-bold text-foreground text-xl mb-2">Ready for personalised coaching?</p>
          <p className="text-muted-foreground font-body text-sm mb-6 max-w-md mx-auto">
            Unlock all tutorials and get a custom programme built for your exact level and goals.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
          >
            <TridentIcon size={16} /> View 1-on-1 Coaching
          </button>
        </div>
      </motion.div>
    </div>
  );
}