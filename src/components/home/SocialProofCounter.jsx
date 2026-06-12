import { motion } from 'framer-motion';

const STATS = [
  { value: '40+', label: 'Athletes Coached' },
  { value: '100+', label: 'Skills Unlocked' },
  { value: 'Days', label: 'Results For Many Athletes', prefix: 'Within' },
];

export default function SocialProofCounter() {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 divide-x divide-border/30 glass rounded-2xl border border-border/30 overflow-hidden"
        >
          {STATS.map(({ value, label, prefix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-7 px-3 text-center"
            >
              {prefix && (
                <span className="text-xs font-body text-muted-foreground/60 leading-none mb-0.5">{prefix}</span>
              )}
              <span className="font-heading font-black text-3xl sm:text-4xl gradient-text leading-none mb-1.5">
                {value}
              </span>
              <span className="text-xs font-body text-muted-foreground leading-snug">{label}</span>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-xs font-body text-muted-foreground/50 text-center mt-4">
          From complete beginners to advanced athletes.
        </p>
      </div>
    </section>
  );
}