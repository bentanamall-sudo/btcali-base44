import { motion } from 'framer-motion';
import { Mail, Users, ArrowRight, Zap, CheckCircle } from 'lucide-react';

const EMAIL = 'ben.tanamall@gmail.com';
const INQUIRY_URL = 'https://ig.me/j/AbaAth3FA0NMTibx/';

const benefits = [
  'Send training videos directly for form analysis',
  'Receive form analysis and technique corrections',
  'Identify weaknesses with expert eyes',
  'Get adjusted programming every session',
  'Progress faster and more efficiently with direct feedback',
];

const problems = [
  "Don't know if their form is correct",
  "Cannot identify their own weak points",
  "Use poor activations that limit progress",
  "Progress slowly without real feedback",
];

export default function CoachingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-10 rounded-2xl glass overflow-hidden glow-border relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />

      <div className="relative p-6 sm:p-8">
      {/* Pricing highlight */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <div className="glass rounded-2xl px-6 py-3 text-center border border-primary/30">
          <div className="text-xs font-heading text-muted-foreground uppercase tracking-widest mb-0.5">Monthly</div>
          <div className="font-heading font-bold text-3xl gradient-text">$150<span className="text-base font-body text-muted-foreground font-normal">/month</span></div>
        </div>
        <div className="font-heading text-muted-foreground text-sm">or</div>
        <div className="glass rounded-2xl px-6 py-3 text-center glow-border border border-primary/50 relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg pointer-events-none" />
          <div className="relative">
            <div className="text-xs font-heading text-primary uppercase tracking-widest mb-0.5 font-bold">Weekly</div>
            <div className="font-heading font-bold text-3xl gradient-text">$40<span className="text-base font-body text-muted-foreground font-normal">/week</span></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-heading font-bold text-primary uppercase tracking-widest">Want Faster and More Personalised Progress?</span>
          </div>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl mx-auto">
            These programs provide the structure, exercises, tutorials, and progressions needed to improve.
            But many athletes stay stuck because they:
          </p>
        </div>

        {/* Problems */}
        <div className="grid sm:grid-cols-2 gap-2 mb-6 max-w-2xl mx-auto">
          {problems.map((p) => (
            <div key={p} className="flex items-start gap-2 glass rounded-lg px-3 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-1.5" />
              <span className="text-xs font-body text-foreground/70">{p}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground font-body mb-6">
          Even the best program will fail if exercises are performed incorrectly.
        </p>

        {/* Benefits */}
        <div className="glass rounded-xl p-5 mb-6 max-w-2xl mx-auto">
          <p className="font-heading font-semibold text-foreground text-sm mb-4 text-center">
            With BTCALI 1-on-1 Coaching you can:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs font-body text-foreground/80">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-foreground/80 font-body mb-6 max-w-xl mx-auto">
          Instead of guessing what is wrong, you will know exactly what to improve every session. If you want the fastest and most personalised path toward your goals, 1-on-1 Coaching is the best option.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <motion.a
            href={`mailto:${EMAIL}?subject=BTCALI%201-on-1%20Coaching%20Inquiry&body=Hi%20BTCALI%2C%0A%0AInstagram%20Profile%3A%20%0AGoals%3A%20%0ACurrent%20Level%3A%20%0A%0AI'm%20interested%20in%201-on-1%20coaching.%20Please%20send%20onboarding%20details.`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-sm glow-primary cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            Email BTCALI
            <ArrowRight className="w-4 h-4 ml-auto" />
          </motion.a>
          <motion.a
            href={INQUIRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl glass glow-border text-foreground font-heading font-semibold text-sm cursor-pointer"
          >
            <Users className="w-4 h-4 text-primary" />
            Join Inquiry Group
            <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </motion.a>
        </div>
        <p className="text-center text-xs text-muted-foreground font-body mt-3">
          Include your Instagram profile, goals and current level when emailing.
        </p>
      </div>
    </motion.div>
  );
}