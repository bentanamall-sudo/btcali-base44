import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Crown, Flame } from 'lucide-react';

const INCLUDED = [
  'Personalised programme',
  'Video form analysis',
  'Voice note & screen recording feedback',
  'Personalised tutorials',
  'Routine adapted as you improve',
  'Direct messaging support',
  'Skill-specific programming',
];

export default function PricingSection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            Pricing
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            Simple, <span className="gradient-text">Transparent</span>
          </h2>

          {/* Spots badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/30"
              style={{ boxShadow: '0 0 16px hsl(var(--glow-primary)/0.1)' }}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-heading font-bold text-foreground">Currently Accepting New Athletes</span>
              <span className="text-xs font-body text-muted-foreground">— 8 spots available</span>
            </div>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-2xl p-6 border border-border/30 text-center">
              <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-widest mb-3">Weekly</p>
              <div className="text-xs font-body text-muted-foreground/50 line-through mb-0.5">$49.99</div>
              <div className="font-heading font-black text-4xl gradient-text leading-none mb-1">$39.99</div>
              <div className="text-xs text-muted-foreground font-body">AUD / week</div>
              <p className="text-xs font-body text-muted-foreground/60 mt-3">Min. 1-month commitment</p>
            </div>
            <div className="rounded-2xl p-6 border text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, hsl(var(--card)), hsl(42 78% 8%))',
                border: '1.5px solid hsl(var(--primary)/0.4)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), transparent)' }} />
              <div className="absolute top-3 right-3">
                <span className="text-xs font-heading font-bold px-2 py-1 rounded-full gradient-bg-strong text-primary-foreground">Best Value</span>
              </div>
              <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-widest mb-3">Monthly</p>
              <div className="text-xs font-body text-muted-foreground/50 line-through mb-0.5">$200</div>
              <div className="font-heading font-black text-4xl gradient-text leading-none mb-1">$150</div>
              <div className="text-xs text-muted-foreground font-body">AUD / month</div>
              <p className="text-xs font-body text-muted-foreground/60 mt-3">Save ~$10/week</p>
            </div>
          </div>

          {/* What's included */}
          <div className="glass rounded-2xl p-6 border border-border/30 mb-8">
            <p className="font-heading font-bold text-foreground text-sm mb-4">Everything included:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {INCLUDED.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="font-body text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-body text-muted-foreground/60 mt-4 pt-4 border-t border-border/20">
              Support availability: Weekdays 4–6 PM NSW time. One-off week available at AUD $50.
            </p>
          </div>

          {/* CTA */}
          <Link to="/scan">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-lg flex items-center justify-center gap-3"
              style={{ boxShadow: '0 0 24px hsl(var(--glow-primary)/0.25)' }}
            >
              <Flame className="w-5 h-5" /> Apply Through Athlete Scan
            </motion.button>
          </Link>
          <p className="text-center text-xs font-body text-muted-foreground/60 mt-3">
            Takes 3–5 minutes. I'll review your application and reach out directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}