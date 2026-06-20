import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Flame, Zap } from 'lucide-react';

const INCLUDED = [
  'Personalised programme',
  'Video form analysis',
  'Voice note & screen recording feedback',
  'Personalised tutorials',
  'Routine adapted as you improve',
  'Direct messaging support',
  'Skill-specific programming',
];

const TIERS = [
  {
    price: '$150',
    unit: 'AUD/month',
    desc: 'Paid upfront monthly',
    badge: 'Best Value',
    premium: true,
  },
  {
    price: '$40',
    unit: 'AUD/week',
    desc: 'Minimum 1 month commitment',
    premium: false,
  },
  {
    price: '$50',
    unit: 'AUD/week',
    desc: 'No minimum commitment',
    premium: false,
    muted: true,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-heading font-bold text-primary/50 uppercase tracking-[0.3em] mb-3 text-center">
            Pricing
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            Simple, <span className="gradient-text">Transparent</span>
          </h2>

          {/* Spots badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div
              className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full border border-primary/30"
              style={{ boxShadow: '0 0 20px hsl(var(--glow-primary)/0.12)' }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-heading font-bold text-foreground">Currently Accepting New Athletes</span>
              <span className="text-xs font-body text-muted-foreground">— 8 spots available</span>
            </div>
          </motion.div>

          {/* Pricing cards */}
          <div className="space-y-3 mb-6">
            {TIERS.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + i * 0.1 }}
                className={`rounded-2xl p-5 border relative overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                  tier.premium
                    ? 'hover:shadow-[0_0_30px_hsl(var(--glow-primary)/0.18)]'
                    : 'hover:border-primary/30'
                }`}
                style={tier.premium
                  ? { background: 'linear-gradient(145deg, hsl(var(--card)), hsl(42 78% 8%))', border: '1.5px solid hsl(var(--primary)/0.45)', boxShadow: '0 4px 24px hsl(var(--glow-primary)/0.1)' }
                  : tier.muted
                    ? { background: 'hsl(var(--card)/0.5)', border: '1px solid hsl(var(--border)/0.35)' }
                    : { background: 'hsl(var(--card)/0.7)', border: '1px solid hsl(var(--primary)/0.25)' }
                }
              >
                {tier.premium && (
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.7), transparent)' }} />
                )}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    {tier.badge && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-heading font-black px-2.5 py-1 rounded-full gradient-bg-strong text-primary-foreground">{tier.badge}</span>
                      </div>
                    )}
                    <div className={`font-heading font-black text-3xl leading-none ${tier.muted ? 'text-foreground/70' : 'gradient-text'}`}
                      style={!tier.muted ? { textShadow: '0 0 20px hsl(var(--glow-primary)/0.2)' } : {}}>
                      {tier.price}{' '}
                      <span className="text-base font-semibold text-muted-foreground">{tier.unit}</span>
                    </div>
                  </div>
                  <p className="text-sm font-body text-foreground/60 text-right leading-relaxed">{tier.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-6 border border-border/25 mb-8"
            style={{ boxShadow: '0 4px 20px hsl(0 0% 0%/0.15)' }}
          >
            <p className="font-heading font-bold text-foreground text-sm mb-4">Everything included:</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {INCLUDED.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="font-body text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-body text-muted-foreground/50 mt-5 pt-4 border-t border-border/20">
              Support availability: Weekdays 4–6 PM NSW time.
            </p>
          </motion.div>

          {/* CTA */}
          <Link to="/scan">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-full py-5 rounded-2xl gradient-bg-strong text-primary-foreground font-heading font-black text-lg flex items-center justify-center gap-3 relative overflow-hidden group"
              style={{ boxShadow: '0 0 32px hsl(var(--glow-primary)/0.3), 0 4px 24px hsl(var(--glow-primary)/0.15)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, hsl(0 0% 100%/0.06), transparent)' }} />
              <Flame className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Apply Through Athlete Scan</span>
            </motion.button>
          </Link>
          <p className="text-center text-xs font-body text-muted-foreground/50 mt-3">
            Takes 3–5 minutes. I'll review your application and reach out directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}