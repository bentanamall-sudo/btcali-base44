import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ResultsWall from '@/components/home/ResultsWall';

const SKILL_RESULTS = [
  'Full Planche in under a year',
  'Full Front Lever in under a year',
  'Handstand Push-Ups in under a year',
  'Bent Arm Presses in weeks',
  'L-Sit to Handstand',
  'Front Lever Pull-Ups',
  '90 Degree Handstand Push-Ups',
  'Muscle-Ups',
  'And many more',
];

const OUTCOMES = [
  {
    category: 'Strength',
    before: 'Weak push-ups, low rep pull-ups, poor straight arm strength',
    after: 'Consistent skill progressions, compound pushing and pulling strength',
  },
  {
    category: 'Physique',
    before: 'Skinny or undertrained — not seeing body composition change',
    after: 'Visible muscle development from structured calisthenics volume',
  },
  {
    category: 'Consistency',
    before: 'Training randomly, skipping sessions, no structure',
    after: 'Clear weekly programme — showing up every session with a plan',
  },
  {
    category: 'Confidence',
    before: 'Frustrated, confused about what to do, no visible progress',
    after: 'Unlocking real skills, seeing results, training with purpose',
  },
];

export default function BeforeAfterOutcomes() {
  return (
    <ResultsWall className="py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            The Shift
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-2 text-center leading-tight">
            Before / After <span className="gradient-text">Coaching</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm text-center mb-10">
            Skills are just the surface. Here's what actually changes.
          </p>

          {/* Results Achieved */}
          <div className="rounded-2xl px-6 py-5 mb-8"
            style={{
              background: 'linear-gradient(135deg, hsl(45 85% 52% / 0.09), hsl(40 75% 38% / 0.06))',
              border: '1px solid hsl(45 85% 52% / 0.22)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 30px hsl(45 85% 52% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
            }}>
            <p className="font-heading font-bold text-foreground text-sm text-center mb-4">Results Achieved By BTCALI Athletes</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {SKILL_RESULTS.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="font-body text-sm text-foreground/80">{r}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {OUTCOMES.map(({ category, before, after }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl border border-border/30 overflow-hidden"
                whileHover={{ borderColor: 'hsl(45 85% 52% / 0.3)', boxShadow: '0 0 20px hsl(45 85% 52% / 0.08)' }}
              >
                <div className="px-5 py-3 border-b border-border/20">
                  <span className="font-heading font-bold text-sm gradient-text uppercase tracking-wider">{category}</span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/20">
                  <div className="px-5 py-4">
                    <p className="text-xs font-heading font-bold text-muted-foreground/40 uppercase tracking-widest mb-1.5">Before</p>
                    <p className="text-sm font-body text-foreground/60 leading-relaxed">{before}</p>
                  </div>
                  <div className="px-5 py-4" style={{ background: 'hsl(var(--primary)/0.04)' }}>
                    <p className="text-xs font-heading font-bold text-primary/60 uppercase tracking-widest mb-1.5">After</p>
                    <p className="text-sm font-body text-foreground/85 leading-relaxed">{after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ResultsWall>
  );
}