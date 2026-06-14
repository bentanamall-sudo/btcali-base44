import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const FAILS = [
  'Following random YouTube videos without a clear plan',
  'Unsure what exercises you should actually be doing',
  'No expert feedback on your technique',
  'Getting stuck on the same skills for months',
  'Losing motivation and consistency over time',
];

const SOLUTIONS = [
  'A step-by-step roadmap built around your goals',
  'Personalised training tailored to your current level',
  'Detailed form and technique feedback',
  'Ongoing support and accountability',
  'Program adjustments as you improve',
];

export default function WhyAthletesFail() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            The Problem
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-2 text-center leading-tight">
            Why Most Athletes Never<br />
            <span className="gradient-text">Unlock Skills</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm text-center mb-10">
            It's not a lack of effort. It's a lack of direction.
          </p>

          <div className="space-y-3 mb-8">
            {FAILS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 glass rounded-xl px-5 py-4 border border-border/30"
              >
                <span className="text-base flex-shrink-0">❌</span>
                <span className="font-body text-sm text-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="rounded-xl px-6 py-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--gradient-start)/0.12), hsl(var(--gradient-end)/0.12))',
              border: '1px solid hsl(var(--primary)/0.35)',
            }}
          >
            <p className="font-heading font-bold text-foreground text-base sm:text-lg text-center mb-4">
              Why BTCALI Works
            </p>
            <div className="space-y-2">
              {SOLUTIONS.map((sol, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-body text-sm text-foreground/85">{sol}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}