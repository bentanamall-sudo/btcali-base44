import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Crown, Zap, ArrowRight, Shield, Lock, Star, Mail } from 'lucide-react';
import { PageHeaderLogo } from '../components/Logo';

const COACHING_FEATURES = [
  'Personalized training routine built for your level & goals',
  'Full technique and form analysis',
  'Video feedback and movement breakdowns',
  'Routine adjustments based on progress',
  'Direct messaging support',
  'One-time onboarding call',
  'In-depth video explanations',
  'Programming for any skill — Planche, Front Lever, Handstand, Muscle-Up, and more',
];

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime with no penalty. You keep access until the end of your billing period.' },
  { q: 'What if I\'m a complete beginner?', a: 'Perfect. The Athlete Scan is designed to assess any level, and coaching is fully personalised from day one.' },
  { q: 'How does 1-on-1 coaching work?', a: 'BTCALI reviews your videos, adjusts your programming, and provides feedback before your next workout whenever possible.' },
  { q: 'What is the weekly rate?', a: 'The weekly rate is AUD $40/week (special offer, normally AUD $49.99/week). Requires a minimum 1-month commitment. One-off single week: AUD $50.' },
];

export default function Pricing() {
  const handleEmail = () => {
    window.location.href = 'mailto:btcalisw@gmail.com?subject=BTCALI%201-1%20Coaching%20Application&body=I%20want%20to%20apply%20for%20BTCALI%201-1%20coaching.%0D%0A%0D%0AName%3A%0D%0AGoals%3A%0D%0A';
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="flex justify-start mb-6">
          <PageHeaderLogo />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">1-on-1 Coaching</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-4">
          Elite <span className="gradient-text">1-on-1 Coaching</span>
        </h1>
        <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
          Personalized coaching built around your level, goals, and weaknesses. Real feedback. Real progress.
        </p>
      </motion.div>

      {/* Two Coaching Cards */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">

        {/* Weekly */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 border border-primary/30 flex flex-col relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-bg pointer-events-none" />
          <div className="relative flex flex-col h-full">
            <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/40 rounded-full px-3 py-1 mb-4 w-fit">
              <Lock className="w-3 h-3 text-primary" />
              <span className="font-heading font-bold text-xs text-primary uppercase tracking-wide">Special Offer</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-1">Weekly Coaching</h3>
            <p className="text-xs text-muted-foreground font-body mb-4">Minimum 1-month commitment</p>
            <div className="mb-1">
              <span className="text-sm text-muted-foreground font-body line-through">AUD $49.99/week</span>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="font-heading font-bold text-5xl gradient-text leading-none">$40</span>
              <span className="text-muted-foreground font-body mb-1">AUD/week</span>
            </div>
            <div className="inline-flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1 mb-6 w-fit">
              <Star className="w-3 h-3 text-green-400" />
              <span className="text-xs font-heading font-bold text-green-400">Save AUD $10/week</span>
            </div>
            <p className="text-xs text-muted-foreground font-body mb-6 leading-relaxed">
              Lock in this rate now — kept for the full year even after prices increase.
            </p>
            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEmail}
                className="w-full py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base flex items-center justify-center gap-2 glow-primary"
              >
                <Mail className="w-5 h-5" /> Apply Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Monthly */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 border border-primary/50 flex flex-col relative overflow-hidden"
          style={{ boxShadow: '0 0 50px hsl(var(--glow-primary) / 0.25)' }}
        >
          <div className="absolute inset-0 gradient-bg pointer-events-none" />
          <div className="relative flex flex-col h-full">
            <div className="flex gap-2 mb-4">
              <div className="inline-flex items-center gap-1 gradient-bg-strong text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
                <Crown className="w-3 h-3" /> Best Value
              </div>
              <div className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-400 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-heading font-semibold">
                <Zap className="w-3 h-3" /> Most Popular
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-1">Monthly Coaching</h3>
            <p className="text-xs text-muted-foreground font-body mb-4">Billed monthly, cancel anytime</p>
            <div className="mb-1">
              <span className="text-sm text-muted-foreground font-body line-through">AUD $200/month</span>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="font-heading font-bold text-5xl gradient-text leading-none">$150</span>
              <span className="text-muted-foreground font-body mb-1">AUD/month</span>
            </div>
            <div className="inline-flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1 mb-6 w-fit">
              <Star className="w-3 h-3 text-green-400" />
              <span className="text-xs font-heading font-bold text-green-400">Save AUD $50/month</span>
            </div>
            <p className="text-xs text-muted-foreground font-body mb-6 leading-relaxed">
              Lock in this rate now — kept for the full year even after prices increase.
            </p>
            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEmail}
                className="w-full py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base flex items-center justify-center gap-2 glow-primary"
              >
                <Mail className="w-5 h-5" /> Apply Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 border border-border/30 max-w-3xl mx-auto mb-16"
      >
        <h2 className="font-heading font-bold text-xl text-foreground mb-6">What's Included in Both Plans</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {COACHING_FEATURES.map(f => (
            <li key={f} className="flex items-start gap-2.5 text-sm font-body text-foreground/80">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Athlete Scan CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 border border-primary/20 text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm text-muted-foreground font-body mb-2">Not sure where to start?</p>
        <h3 className="font-heading font-bold text-xl text-foreground mb-3">Complete the Athlete Scan first</h3>
        <p className="text-sm text-muted-foreground font-body mb-5 leading-relaxed">
          The Athlete Scan analyses your current level, strengths, weaknesses, and goals — so BTCALI can build the most effective coaching plan for you.
        </p>
        <Link to="/diagnostic">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-primary/40 text-foreground font-heading font-semibold text-sm hover:border-primary/70 transition-all"
          >
            Start Athlete Scan <ArrowRight className="w-4 h-4 text-primary" />
          </motion.button>
        </Link>
      </motion.div>

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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5 border border-border/30"
            >
              <h4 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h4>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}