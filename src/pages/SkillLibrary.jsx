import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Lock, BookOpen } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'master-basics',
    title: 'Master The Basics',
    description: 'Push basics, pull basics, and core fundamentals — the foundation that everything is built on.',
    level: 'Beginner',
    accent: 'from-slate-500/15 to-gray-500/10',
    border: 'border-slate-500/30',
    icon: '📐',
    free: true,
  },
  {
    id: 'handstand-pressing',
    title: 'Handstand & Pressing',
    description: 'From wrist warmups and pike push-ups to freestanding handstands and bent arm press.',
    level: 'Beginner → Advanced',
    accent: 'from-amber-500/15 to-yellow-500/10',
    border: 'border-amber-500/30',
    icon: '⚡',
    free: false,
  },
  {
    id: 'planche',
    title: 'Planche',
    description: 'From conditioning and planche lean to tuck, straddle, and full planche.',
    level: 'Intermediate → Elite',
    accent: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
    icon: '💪',
    free: false,
    hasFree: true,
  },
  {
    id: 'front-lever',
    title: 'Front Lever',
    description: 'Build horizontal pulling strength from hollow body to full front lever.',
    level: 'Intermediate → Advanced',
    accent: 'from-cyan-500/15 to-blue-500/10',
    border: 'border-cyan-500/30',
    icon: '🔱',
    free: false,
    hasFree: true,
  },
  {
    id: 'l-sit-to-handstand',
    title: 'L-Sit to Handstand',
    description: 'The elite pressing skill — structured path from compression to full inversion.',
    level: 'Advanced → Elite',
    accent: 'from-fuchsia-500/15 to-purple-500/10',
    border: 'border-fuchsia-500/30',
    icon: '🌟',
    free: true,
  },
  {
    id: 'muscle-up',
    title: 'Muscle-Up',
    description: 'Master the explosive transition from pull to push above the bar.',
    level: 'Intermediate',
    accent: 'from-emerald-500/15 to-teal-500/10',
    border: 'border-emerald-500/30',
    icon: '⚡',
    free: false,
  },
];

export default function SkillLibrary() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">BTCALI Skill Library</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-4">
          The <span className="gradient-text">Skill Library</span>
        </h1>
        <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
          Structured progressions for every elite calisthenics skill. Select a category to explore tutorials, progressions, and coaching content.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-xl mx-auto mb-12"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search skills, tutorials, or progressions..."
          className="w-full glass rounded-2xl pl-12 pr-5 py-4 text-foreground font-body text-base border border-border/40 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 bg-transparent placeholder:text-muted-foreground/50"
        />
      </motion.div>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            onClick={() => navigate(`/skills/${cat.id}`)}
            className={`cursor-pointer rounded-2xl border bg-gradient-to-br ${cat.accent} ${cat.border} p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{cat.icon}</span>
              <div className="flex items-center gap-2">
                {cat.free ? (
                  <span className="text-xs font-heading font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Free</span>
                ) : cat.hasFree ? (
                  <span className="text-xs font-heading font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-400/80 border border-green-500/20">Free + Members</span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-heading font-bold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Lock className="w-3 h-3" /> Members
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">{cat.title}</h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{cat.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs font-body text-muted-foreground">{cat.level}</span>
              <span className="text-xs font-heading font-semibold text-primary">Explore →</span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground font-body">
          No results for "{search}"
        </div>
      )}
    </div>
  );
}