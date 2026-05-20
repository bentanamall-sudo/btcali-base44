import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Crown, Clock } from 'lucide-react';
import CoachingCTA from '../components/programs/CoachingCTA';

const CATEGORIES = [
  {
    id: 'planche-programs',
    icon: '💪',
    title: 'Planche Programs',
    description: 'A fully custom planche program built around your current level, weaknesses, and goals. Includes a real session analysis and program adjustment.',
    count: 'AUD $50 · ~4 weeks',
    progression: 'Custom · Personalized · Analysed',
    accent: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
    glow: '0 0 35px hsl(262 90% 65% / 0.2)',
    to: '/programs/planche-programs',
  },
  {
    id: 'front-lever-programs',
    icon: '🔱',
    title: 'Front Lever Programs',
    description: 'A fully custom front lever program built around your current level, weaknesses, and goals. Includes a real session analysis and program adjustment.',
    count: 'AUD $50 · ~4 weeks',
    progression: 'Custom · Personalized · Analysed',
    accent: 'from-cyan-500/15 to-blue-500/10',
    border: 'border-cyan-500/30',
    glow: '0 0 35px hsl(200 90% 50% / 0.18)',
    to: '/programs/front-lever-programs',
  },
];

export default function Programs() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">BTCALI Programs</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Training <span className="gradient-text">Programs</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
          Structured calisthenics pathways built for real results. Choose your skill, follow the system.
        </p>
      </motion.div>

      {/* Coming soon notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-5 mb-12 max-w-3xl mx-auto text-center glow-border"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-primary" />
          <span className="font-heading font-semibold text-foreground">Full Programs Are Being Built</span>
        </div>
        <p className="text-sm text-muted-foreground font-body">
          Custom programs are available now for <strong className="text-foreground">AUD $50</strong> — built specifically for your level and goals, with a session analysis included. Click a category below to learn more.
          <br /><br />
          <strong className="text-foreground">1-on-1 coaching</strong> is also available for athletes who want ongoing direct guidance, video feedback, and fully adapted programming.
        </p>
      </motion.div>

      {/* Category Cards */}
      <div className="grid sm:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <Link to={cat.to} className="block h-full group">
              <div
                className={`h-full rounded-2xl border bg-gradient-to-br ${cat.accent} ${cat.border} p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = cat.glow; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-accent mb-5" />
                <div className="text-4xl mb-4">{cat.icon}</div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{cat.title}</h3>
                <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed flex-1">
                  {cat.description}
                </p>

                <div className="glass rounded-lg px-3 py-2 mb-4 border border-white/10">
                  <span className="text-xs font-heading text-muted-foreground font-semibold tracking-wider uppercase">Progression</span>
                  <p className="text-xs font-body text-foreground/80 mt-0.5">{cat.progression}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs font-body text-muted-foreground">{cat.count}</span>
                  <span className="flex items-center gap-1 text-sm font-heading font-semibold text-primary group-hover:gap-2 transition-all">
                    View Programs <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <CoachingCTA />
    </div>
  );
}