import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import GlassCard from '../GlassCard';

const testimonials = [
  {
    name: 'Marcus K.',
    achievement: 'Full Planche in 18 months',
    quote: 'BTCALI completely transformed my training. The roadmaps kept me focused and the coaching was elite.',
    rating: 5,
  },
  {
    name: 'Sarah L.',
    achievement: '60s Handstand Hold',
    quote: 'I went from zero handstand to a solid 60-second hold. The progression system is genius.',
    rating: 5,
  },
  {
    name: 'James T.',
    achievement: 'Strict Muscle-Up x5',
    quote: 'The diagnostics found exactly what I was missing. Three months later, I had my first strict muscle-up.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          <span className="gradient-text">Proven</span> Results
        </h2>
        <p className="text-muted-foreground font-body text-lg">Real athletes. Real transformations.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <GlassCard glow hover={false} className="h-full">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-foreground/90 mb-4 leading-relaxed italic">"{t.quote}"</p>
              <div className="border-t border-border/30 pt-4">
                <div className="font-heading font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-primary font-body">{t.achievement}</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}