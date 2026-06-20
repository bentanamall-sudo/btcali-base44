import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import use3DHover from '@/hooks/use3DHover';
import TypewriterHeading from '@/components/TypewriterHeading';

const ITEMS = [
  'Complete beginners',
  'Learning first handstand',
  'Working towards muscle-up',
  'Working towards front lever',
  'Working towards planche',
  'Athletes stuck at plateaus',
  'Advanced athletes chasing elite skills',
];

function ItemCard({ item, delay }) {
  const tilt = use3DHover({ intensity: 8, scale: 1.05 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{
        ...tilt.style,
        background: 'hsl(0 0% 7% / 0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid hsl(40 25% 14% / 0.45)',
      }}
      className="flex items-center gap-3 rounded-xl px-4 py-3.5 cursor-default"
    >
      <motion.span whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 500 }}>
        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
      </motion.span>
      <span className="font-body text-sm text-foreground/85">{item}</span>
    </motion.div>
  );
}

export default function WhoThisIsFor() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            All Levels Welcome
          </p>
          <TypewriterHeading
            text="Who BTCALI Coaching Is For"
            tag="h2"
            className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight"
            highlightWords={['Is For']}
            speed={38}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {ITEMS.map((item, i) => (
              <ItemCard key={i} item={item} delay={i * 0.07} />
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