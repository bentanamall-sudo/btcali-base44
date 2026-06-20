import { motion } from 'framer-motion';

const STATS = [
  { value: '40+', label: 'Athletes Coached' },
  { value: '100+', label: 'Skills Unlocked' },
  { value: 'Days', label: 'Results For Many Athletes', prefix: 'Within' },
];

export default function SocialProofCounter() {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, hsl(0 0% 7%) 0%, hsl(43 30% 6%) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid hsl(43 74% 49% / 0.2)',
            boxShadow: '0 0 50px hsl(43 74% 49% / 0.06), 0 4px 30px hsl(0 0% 0% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent)' }} />
          <div className="grid grid-cols-3 divide-x divide-border/20">
            {STATS.map(({ value, label, prefix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
                className="flex flex-col items-center justify-center py-8 px-3 text-center"
              >
                {prefix && (
                  <span className="text-xs font-body text-muted-foreground/50 leading-none mb-1">{prefix}</span>
                )}
                <span
                  className="font-heading font-black text-3xl sm:text-4xl gradient-text leading-none mb-2"
                  style={{ textShadow: '0 0 30px hsl(var(--glow-primary)/0.3)' }}
                >
                  {value}
                </span>
                <span className="text-xs font-body text-muted-foreground/70 leading-snug">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <p className="text-xs font-body text-muted-foreground/40 text-center mt-4">
          From complete beginners to advanced athletes.
        </p>
      </div>
    </section>
  );
}