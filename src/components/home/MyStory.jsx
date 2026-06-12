import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const BEFORE = [
  "Skinny kid — called \"skinny chopsticks\"",
  "Couldn't do a handstand",
  "Couldn't do a muscle-up",
  "No structure, no results",
];

const NOW = [
  'Full Planche',
  'Front Lever',
  'HSPU',
  '4,000+ followers',
  'Coaching athletes worldwide',
];

export default function MyStory() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            Behind BTCALI
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-2 text-center leading-tight">
            My Story
          </h2>
          <p className="text-muted-foreground font-body text-sm text-center mb-10">
            I've been where you are. That's why I know how to get you out.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Before */}
            <div className="glass rounded-2xl p-6 border border-border/30">
              <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-widest mb-4">Before</p>
              <div className="space-y-2.5">
                {BEFORE.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-muted-foreground/40 mt-0.5 flex-shrink-0 text-base leading-none">—</span>
                    <span className="font-body text-sm text-foreground/70 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Now */}
            <div className="glass rounded-2xl p-6 border border-primary/25 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(var(--card)), hsl(42 78% 8%))' }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent)' }} />
              <p className="text-xs font-heading font-bold text-primary/70 uppercase tracking-widest mb-4">Now</p>
              <div className="space-y-2.5">
                {NOW.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-heading font-semibold text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm font-body text-muted-foreground mt-8 max-w-md mx-auto leading-relaxed">
            I built BTCALI because I wanted to give athletes the coaching I never had. Every programme I write is built on what actually worked — not theory.
          </p>
        </motion.div>
      </div>
    </section>
  );
}