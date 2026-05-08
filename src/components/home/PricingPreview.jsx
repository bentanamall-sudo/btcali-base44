import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Crown, Zap } from 'lucide-react';
import GlassCard from '../GlassCard';
import GlowButton from '../GlowButton';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    features: ['Athlete Scan', 'Free Tutorials', 'Skill Library Preview', 'Progress Tracking'],
    cta: 'Start Free',
    to: '/scan',
    featured: false,
  },
  {
    name: 'Pro Athlete',
    price: '$49',
    period: '/month',
    features: ['Full Skill Roadmaps', 'AI Diagnostics', 'Custom Programs', 'Video Feedback', 'Weekly Check-ins', 'Priority Support'],
    cta: 'Apply Now',
    to: '/pricing',
    featured: true,
  },
  {
    name: 'Elite 1-on-1',
    price: '$149',
    period: '/month',
    features: ['Everything in Pro', 'Direct Coach Access', 'Daily Feedback', 'Competition Prep', 'Nutrition Guidance', 'VIP Community'],
    cta: 'Apply for Elite',
    to: '/pricing',
    featured: false,
  },
];

export default function PricingPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Choose Your <span className="gradient-text">Path</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg">Invest in your athletic potential.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <GlassCard
              glow={plan.featured}
              hover={false}
              className={plan.featured ? 'relative ring-1 ring-primary/50 scale-105' : ''}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 gradient-bg-strong text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
                    <Crown className="w-3 h-3" /> Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{plan.name}</h3>
                <div className="font-heading font-bold text-4xl gradient-text">
                  {plan.price}
                  <span className="text-sm text-muted-foreground font-body font-normal">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={plan.to}>
                <GlowButton
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.cta}
                </GlowButton>
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}