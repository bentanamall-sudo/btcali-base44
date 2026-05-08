import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Crown, Zap, ArrowRight, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    description: 'Get started with fundamentals',
    features: [
      'Athlete Scan Diagnostics',
      'Free Handstand Guide',
      'Free Planche Conditioning',
      'Skill Library Preview',
      'Progress Tracking',
      'AI Coach (limited)',
    ],
    cta: 'Start Free',
    to: '/scan',
  },
  {
    name: 'Pro Athlete',
    price: '$49',
    period: '/month',
    description: 'Full access to all skill roadmaps',
    featured: true,
    features: [
      'Everything in Free',
      'Full Skill Roadmaps',
      'AI Diagnostics Unlimited',
      'Custom Training Programs',
      'Video Feedback (weekly)',
      'Priority Support',
      'XP & Achievement System',
      'Community Access',
    ],
    cta: 'Apply Now',
    to: '/scan',
  },
  {
    name: 'Elite 1-on-1',
    price: '$149',
    period: '/month',
    description: 'Direct coaching from elite athletes',
    features: [
      'Everything in Pro',
      'Direct Coach Access',
      'Daily Video Feedback',
      'Custom Periodization',
      'Competition Preparation',
      'Nutrition Guidance',
      'VIP Community',
      'Monthly Strategy Calls',
    ],
    cta: 'Apply for Elite',
    to: '/scan',
  },
];

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime with no penalty. You keep access until the end of your billing period.' },
  { q: 'What if I\'m a complete beginner?', a: 'Perfect. Our Free tier and Athlete Scan are designed to assess and guide complete beginners.' },
  { q: 'How does 1-on-1 coaching work?', a: 'You\'ll be matched with an elite coach who reviews your videos, adjusts your program, and provides daily feedback.' },
];

export default function Pricing() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Pricing</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Invest in <span className="gradient-text">Your Potential</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Choose the path that matches your goals. Upgrade anytime.
        </p>
      </motion.div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <GlassCard
              glow={plan.featured}
              hover={false}
              className={`h-full flex flex-col ${plan.featured ? 'ring-1 ring-primary/50 relative' : ''}`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 gradient-bg-strong text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
                    <Crown className="w-3 h-3" /> Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="font-heading font-semibold text-lg mb-1 text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground font-body mb-3">{plan.description}</p>
                <div className="font-heading font-bold text-4xl gradient-text">
                  {plan.price}
                  <span className="text-sm text-muted-foreground font-body font-normal">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={plan.to}>
                <GlowButton
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </GlowButton>
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-heading font-bold text-2xl text-center mb-8 text-foreground">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <GlassCard key={i} hover={false}>
              <h4 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h4>
              <p className="text-sm text-muted-foreground font-body">{faq.a}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}