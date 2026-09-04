import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Monthly',
    price: '$160',
    period: '/month',
    features: ['Personalised training program', 'Video form analysis', 'Voice note feedback', 'Direct messaging support', 'Routine adjustments', 'Skill-specific programming'],
    cta: 'Apply Now',
    to: '/apply',
    featured: false,
  },
  {
    name: '3 Months',
    price: '$450',
    period: '/3 months',
    features: ['Everything in Monthly', '12 weeks of coaching', 'Paid upfront — best value', 'Video form analysis', 'Direct messaging support', 'Routine adjustments'],
    cta: 'Apply Now',
    to: '/apply',
    featured: true,
  },
];

export default function PricingPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
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
        <h2 className="display-lg text-foreground" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Choose Your Path
        </h2>
        <p className="font-body text-foreground/60 mt-4" style={{ fontSize: '18px' }}>Invest in your athletic potential.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-px max-w-3xl mx-auto" style={{ background: '#D1D1CB' }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-8 relative"
            style={{
              background: '#F4F4F2',
              border: plan.featured ? '2px solid #CCFF00' : '1px solid #D1D1CB',
            }}
            data-view-cursor
          >
            {plan.featured && (
              <div className="absolute -top-px left-0">
                <div className="flex items-center gap-1 px-3 py-1.5 eyebrow" style={{ background: '#CCFF00', color: '#F4F4F2' }}>
                  <Crown className="w-3 h-3" /> Most Popular
                </div>
              </div>
            )}
            <div className="mb-6 pt-4">
              <h3 className="eyebrow text-foreground/50 mb-3">{plan.name}</h3>
              <div className="display-lg text-foreground" style={{ fontSize: '3.5rem' }}>
                {plan.price}
                <span className="font-body text-foreground/50 text-base" style={{ textTransform: 'none' }}>{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-body text-foreground/75" style={{ fontSize: '18px' }}>
                  <Check className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#CCFF00' }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link to={plan.to}>
              <button className={plan.featured ? 'b-cta w-full py-4 text-sm' : 'b-cta-outline w-full py-4 text-sm'}>
                {plan.cta}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}