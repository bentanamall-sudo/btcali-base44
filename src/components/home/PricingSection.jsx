import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';

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
    id: 'monthly',
    name: 'Monthly',
    price: '$160',
    unit: '/month',
    desc: '4 weeks of personalised coaching. Renews monthly.',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: '$450',
    unit: '/3 months',
    desc: '12 weeks of coaching paid upfront. Maximum savings.',
    highlight: false,
    badge: 'Best Value',
  },
];

function PricingCard({ tier, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-8 relative"
      style={{
        background: '#F4F4F2',
        border: tier.highlight ? '2px solid #CCFF00' : '1px solid #D1D1CB',
      }}
      data-view-cursor
    >
      {tier.badge && (
        <div className="flex mb-6">
          <span
            className="eyebrow px-3 py-1.5"
            style={{
              background: tier.highlight ? '#CCFF00' : '#1A1A1A',
              color: '#F4F4F2',
            }}
          >
            {tier.badge}
          </span>
        </div>
      )}

      <p className="eyebrow text-foreground/50 mb-4">{tier.name}</p>

      <div className="flex items-end gap-1 mb-3">
        <span className="display-lg text-foreground" style={{ fontSize: '3.5rem' }}>
          {tier.price}
        </span>
        <span className="font-body text-foreground/50 pb-2">{tier.unit}</span>
      </div>

      <p className="font-body text-foreground/60 mb-8" style={{ fontSize: '18px', lineHeight: 1.6 }}>{tier.desc}</p>

      <Link to="/diagnostic">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={tier.highlight ? 'b-cta btn-shine w-full py-4 text-sm flex items-center justify-center gap-2' : 'b-cta-outline w-full py-4 text-sm flex items-center justify-center gap-2'}
        >
          Start Athlete Scan <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: '#CCFF00' }} />
            <span className="eyebrow text-foreground/50">Pricing</span>
          </div>
          <h2 className="display-lg text-foreground mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Invest In Faster<br />Progress
          </h2>
          <p className="font-body text-foreground/60 max-w-xl" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            Significantly less than most coaches charging $500+/month for similar results. $160/month or $450 for 3 months.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <span className="w-2 h-2" style={{ background: '#CCFF00' }} />
            <span className="eyebrow text-foreground">Currently Accepting New Athletes</span>
            <span className="font-body text-foreground/40 text-sm">— 8 spots</span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-12 max-w-3xl mx-auto w-full" style={{ background: '#D1D1CB' }}>
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} delay={i * 0.1} />
          ))}
        </div>

        {/* Included features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8"
          style={{ background: '#1A1A1A', color: '#F4F4F2' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4" style={{ color: '#CCFF00' }} />
            <p className="eyebrow" style={{ color: '#F4F4F2' }}>Everything Included — All Plans</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {INCLUDED.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#CCFF00' }} />
                <span className="font-body" style={{ color: 'rgba(244,244,242,0.75)', fontSize: '18px' }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="font-body mt-6 pt-5 text-sm" style={{ color: 'rgba(244,244,242,0.35)', borderTop: '1px solid rgba(244,244,242,0.1)' }}>
            Support availability: Weekdays 4–6 PM NSW time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}