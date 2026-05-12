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
    name: 'Program Access',
    price: '$30',
    period: '/program',
    description: 'Per skill program — structured & proven',
    featured: false,
    features: [
      'Full structured program access',
      'Phase-by-phase progressions',
      'Video breakdowns per level',
      'Periodized volume & intensity',
      'Milestone tracking',
      'Program-specific roadmap',
    ],
    cta: 'Get a Program',
    to: '/purchase?type=coaching',
  },
  {
    name: 'Elite 1-on-1',
    price: '$150',
    period: '/month',
    description: 'Or $40/week — direct elite coaching',
    featured: true,
    bestOffer: true,
    features: [
      'Everything in Program Access',
      'Direct Coach Access',
      'Weekly Video Feedback',
      'Form Analysis & Corrections',
      'Custom Periodization',
      'Weakness Identification',
      'Adjusted Programming',
      'Monthly Strategy Calls',
    ],
    cta: 'Apply for Elite',
    to: '/purchase?type=coaching',
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
              className={`h-full flex flex-col ${plan.bestOffer ? 'ring-2 ring-primary/70 relative' : plan.featured ? 'ring-1 ring-primary/50 relative' : ''}`}
              style={plan.bestOffer ? { boxShadow: '0 0 50px hsl(var(--glow-primary) / 0.3), 0 0 100px hsl(var(--glow-primary) / 0.1)' } : {}}
            >
              {plan.bestOffer && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="flex items-center gap-1 gradient-bg-strong text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
                    <Crown className="w-3 h-3" /> Best Offer
                  </div>
                  <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-heading font-semibold">
                    <Zap className="w-3 h-3" /> Fastest Progress
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
                {plan.name === 'Elite 1-on-1' && (
                  <div className="mt-2 inline-flex items-center gap-1.5 glass glow-border rounded-full px-4 py-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <span className="font-heading font-bold text-base gradient-text">or $40/week</span>
                  </div>
                )}
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