import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const SKILL_RESULTS = [
  'Full Planche in under a year',
  'Full Front Lever in under a year',
  'Handstand Push-Ups in under a year',
  'Bent Arm Presses in weeks',
  'L-Sit to Handstand',
  'Front Lever Pull-Ups',
  '90 Degree Handstand Push-Ups',
  'Muscle-Ups',
];

const OUTCOMES = [
  {
    category: 'Strength',
    icon: '⚡',
    before: 'Weak push-ups, low rep pull-ups, poor straight arm strength',
    after: 'Consistent skill progressions, compound pushing and pulling strength',
    color: '#4F9DFF',
  },
  {
    category: 'Physique',
    icon: '◈',
    before: 'Skinny or undertrained — not seeing body composition change',
    after: 'Visible muscle development from structured calisthenics volume',
    color: '#5EEBFF',
  },
  {
    category: 'Consistency',
    icon: '▲',
    before: 'Training randomly, skipping sessions, no structure',
    after: 'Clear weekly programme — showing up every session with a plan',
    color: '#7BB8FF',
  },
  {
    category: 'Confidence',
    icon: '✦',
    before: 'Frustrated, confused about what to do, no visible progress',
    after: 'Unlocking real skills, seeing results, training with purpose',
    color: '#A6D4FF',
  },
];

export default function BeforeAfterOutcomes() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: 'rgba(79,157,255,0.5)' }}>The Shift</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Before / After<br /><span className="gradient-text">Coaching</span>
          </h2>
          <p className="text-base mt-4 max-w-md mx-auto" style={{ color: '#BFC9D9' }}>
            Skills are just the surface. Here's what actually changes.
          </p>
        </motion.div>

        {/* Skills achieved grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl px-6 py-6 mb-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(79,157,255,0.07) 0%, rgba(94,235,255,0.04) 100%)',
            border: '1px solid rgba(79,157,255,0.18)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.5), transparent)' }} />
          <p className="font-heading font-bold text-sm text-center mb-5" style={{ color: '#A6D4FF' }}>
            Results Achieved By BTCALI Athletes
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SKILL_RESULTS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(79,157,255,0.06)', border: '1px solid rgba(79,157,255,0.12)' }}
              >
                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-xs font-body text-foreground/80">{r}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Before/After comparison */}
        <div className="grid sm:grid-cols-2 gap-4">
          {OUTCOMES.map(({ category, icon, before, after, color }, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div className="px-4 py-2.5 flex items-center gap-2"
                style={{ background: `${color}0A`, borderBottom: `1px solid ${color}20` }}>
                <span style={{ color }}>{icon}</span>
                <span className="font-heading font-bold text-xs uppercase tracking-widest" style={{ color }}>{category}</span>
              </div>
              <div className="grid grid-cols-2 divide-x" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="px-4 py-4">
                  <p className="text-xs font-heading font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'rgba(255,255,255,0.2)' }}>Before</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(191,201,217,0.5)' }}>{before}</p>
                </div>
                <div className="px-4 py-4" style={{ background: `${color}04` }}>
                  <p className="text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: `${color}80` }}>After</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(191,201,217,0.85)' }}>{after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}