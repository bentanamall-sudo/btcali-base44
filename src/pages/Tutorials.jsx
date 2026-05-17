import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Zap } from 'lucide-react';

const GUIDES = [
  {
    id: 'handstand-beginner-guide',
    icon: '🤸‍♂️',
    title: 'Free Handstand Beginner Guide',
    description: 'Learn to kick up, bail safely, balance, and build your first freestanding handstand from scratch.',
    count: '4 tutorials',
    accent: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
    glow: '0 0 35px hsl(262 90% 65% / 0.18)',
    to: '/tutorials/handstand-beginner-guide',
  },
  {
    id: 'l-sit-to-handstand-guide',
    icon: '💪',
    title: 'Free L-Sit To Handstand Guide',
    description: 'Master the bent arm press, develop explosive coordination, and progress toward the L-sit to handstand.',
    count: '3 tutorials + 1 coming soon',
    accent: 'from-cyan-500/15 to-blue-500/10',
    border: 'border-cyan-500/30',
    glow: '0 0 35px hsl(200 90% 50% / 0.18)',
    to: '/tutorials/l-sit-to-handstand-guide',
  },
  {
    id: 'planche-conditioning-guide',
    icon: '🧠',
    title: 'Free Planche Conditioning Guide',
    description: 'Build the wrist, scapula, and straight-arm strength foundation required for all planche progressions.',
    count: '4 tutorials + 2 coming soon',
    accent: 'from-amber-500/15 to-orange-500/10',
    border: 'border-amber-500/30',
    glow: '0 0 35px hsl(45 90% 55% / 0.15)',
    to: '/tutorials/planche-conditioning-guide',
  },
];

export default function Tutorials() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Free Training</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Free <span className="gradient-text">Tutorials</span>
        </h1>
        <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
          Start your calisthenics journey with structured skill guides. Real technique, zero cost.
        </p>
      </motion.div>

      {/* Guide Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {GUIDES.map((guide, i) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={guide.to} className="block h-full group">
              <div
                className={`h-full rounded-2xl border bg-gradient-to-br ${guide.accent} ${guide.border} p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                style={{ boxShadow: 'none', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = guide.glow; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Top bar */}
                <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-accent mb-5" />

                <div className="text-4xl mb-4">{guide.icon}</div>

                <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-tight">
                  {guide.title}
                </h3>
                <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed flex-1">
                  {guide.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="text-xs font-body text-muted-foreground">{guide.count}</span>
                  <span className="flex items-center gap-1 text-sm font-heading font-semibold text-primary group-hover:gap-2 transition-all">
                    Open Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 text-center glow-border max-w-2xl mx-auto"
      >
        <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-heading font-bold text-2xl mb-2 gradient-text">Ready for More?</h3>
        <p className="text-muted-foreground font-body text-sm mb-6">
          Unlock premium skill roadmaps and 1-on-1 direct coaching with BTCALI.
        </p>
        <Link to="/pricing">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
          >
            Apply for Coaching <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}