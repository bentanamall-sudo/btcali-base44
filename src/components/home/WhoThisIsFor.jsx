import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const ITEMS = [
  'Complete beginners',
  'Learning first handstand',
  'Working towards muscle-up',
  'Working towards front lever',
  'Working towards planche',
  'Athletes stuck at plateaus',
  'Advanced athletes chasing elite skills',
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
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

          <p className="text-center text-sm font-heading font-semibold text-foreground/80 mb-2">And many more skills and goals.</p>
          <p className="text-center text-sm font-body text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
            Whether your goal is your first pull-up, first handstand, muscle-up, front lever, planche, strength development, mobility improvements or overcoming a plateau, BTCALI Coaching is built around your specific goals.
          </p>
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