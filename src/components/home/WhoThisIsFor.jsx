import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const ITEMS = [
  'Complete beginners starting from zero',
  'Working towards your first handstand',
  'Stuck on muscle-up for months',
  'Training front lever with no structure',
  'Chasing planche with no real plan',
  'Advanced athletes going after elite skills',
];

export default function WhoThisIsFor() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            All Levels Welcome
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            Who BTCALI Coaching<br />
            <span className="gradient-text">Is For</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 glass rounded-xl px-4 py-3.5 border border-border/30"
              >
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-body text-sm text-foreground/85">{item}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm font-body text-muted-foreground">
            Not sure if coaching is right for you?{' '}
            <RouterLink to="/scan" className="text-primary font-semibold hover:underline">
              Complete the Athlete Scan →
            </RouterLink>
          </p>
        </motion.div>
      </div>
    </section>
  );
}