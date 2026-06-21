import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';
import use3DHover from '@/hooks/use3DHover';

const INCLUDED = [
  'Personalised training programme',
  'Video form analysis',
  'Voice note & screen recording feedback',
  'Personalised tutorials',
  'Routine adapted as you improve',
  'Direct messaging support',
  'Skill-specific programming',
];

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$50',
    unit: '/week',
    desc: 'No minimum commitment. Start and cancel anytime.',
    highlight: false,
    color: '#7BB8FF',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$40',
    unit: '/week',
    desc: 'Minimum 1 month commitment. Best flexibility.',
    highlight: true,
    badge: 'Most Popular',
    color: '#4F9DFF',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$150',
    unit: '/month',
    desc: 'Paid upfront monthly. Maximum savings.',
    highlight: false,
    badge: 'Best Value',
    color: '#5EEBFF',
  },
];

function PricingCard({ tier, delay }) {
  const tilt = use3DHover({ intensity: 6, scale: tier.highlight ? 1.02 : 1.03 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{
        ...tilt.style,
        background: tier.highlight
          ? 'linear-gradient(145deg, rgba(79,157,255,0.12) 0%, rgba(94,235,255,0.07) 100%)'
          : 'rgba(255,255,255,0.03)',
        border: tier.highlight
          ? '1px solid rgba(79,157,255,0.35)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: tier.highlight
          ? `0 0 40px rgba(79,157,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06), ${tilt.style.boxShadow || ''}`
          : tilt.style.boxShadow,
      }}
      className="rounded-2xl p-6 relative overflow-hidden cursor-default"
    >
      {tier.highlight && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.7), transparent)' }} />
      )}

      {tier.badge && (
        <div className="flex mb-4">
          <span className="text-xs font-heading font-bold px-3 py-1 rounded-full"
            style={{
              background: tier.highlight ? 'rgba(79,157,255,0.2)' : 'rgba(94,235,255,0.12)',
              color: tier.color,
              border: `1px solid ${tier.color}35`,
            }}>
            {tier.badge}
          </span>
        </div>
      )}

      <p className="font-heading font-bold text-sm mb-4" style={{ color: tier.color }}>{tier.name}</p>

      <div className="flex items-end gap-1 mb-2">
        <span className="font-heading font-black text-4xl" style={{ color: tier.highlight ? '#fff' : 'rgba(255,255,255,0.85)' }}>
          {tier.price}
        </span>
        <span className="text-sm font-body pb-1" style={{ color: 'rgba(191,201,217,0.5)' }}>{tier.unit}</span>
      </div>

      <p className="text-sm font-body mb-6 leading-relaxed" style={{ color: 'rgba(191,201,217,0.55)' }}>{tier.desc}</p>

      <Link to="/diagnostic">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl font-heading font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
          style={tier.highlight ? {
            background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)',
            color: 'white',
            boxShadow: '0 0 20px rgba(79,157,255,0.3)',
          } : {
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${tier.color}25`,
            color: tier.color,
          }}
        >
          Start Athlete Scan <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: 'rgba(79,157,255,0.5)' }}>Pricing</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Invest In Faster<br /><span className="gradient-text">Progress</span>
          </h2>
          <p className="text-base mt-4 max-w-md mx-auto" style={{ color: '#BFC9D9' }}>
            Significantly less than most coaches charging $500+/month for similar results.
          </p>

          {/* Spots badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(79,157,255,0.08)',
              border: '1px solid rgba(79,157,255,0.2)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-heading font-semibold text-white">Currently Accepting New Athletes</span>
            <span className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.5)' }}>— 8 spots</span>
          </motion.div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} delay={i * 0.1} />
          ))}
        </div>

        {/* Included features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-primary" />
            <p className="font-heading font-bold text-sm text-white">Everything Included — All Plans</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {INCLUDED.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-sm font-body" style={{ color: 'rgba(191,201,217,0.75)' }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs font-body mt-5 pt-4 border-t" style={{ color: 'rgba(191,201,217,0.3)', borderColor: 'rgba(255,255,255,0.06)' }}>
            Support availability: Weekdays 4–6 PM NSW time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}