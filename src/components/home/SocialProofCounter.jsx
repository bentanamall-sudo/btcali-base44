import { motion } from 'framer-motion';
import use3DHover from '@/hooks/use3DHover';

const STATS = [
  { value: '40+', label: 'Athletes Coached' },
  { value: '100+', label: 'Skills Unlocked' },
  { value: 'Days', label: 'Results For Many Athletes', prefix: 'Within' },
];

function StatCell({ value, label, prefix, delay }) {
  const tilt = use3DHover({ intensity: 10, scale: 1.06 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ ...tilt.style }}
      className="flex flex-col items-center justify-center py-8 px-3 text-center cursor-default"
    >
      {prefix && (
        <span className="text-xs font-body text-muted-foreground/50 leading-none mb-1">{prefix}</span>
      )}
      <motion.span
        className="font-heading font-black text-3xl sm:text-4xl gradient-text leading-none mb-2"
        style={{ textShadow: '0 0 30px hsl(var(--glow-primary)/0.3)' }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 16 }}
      >
        {value}
      </motion.span>
      <span className="text-xs font-body text-muted-foreground/70 leading-snug">{label}</span>
    </motion.div>
  );
}

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
            border: '1px solid hsl(45 85% 52% / 0.22)',
            boxShadow: '0 0 50px hsl(45 85% 52% / 0.06), 0 4px 30px hsl(0 0% 0% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.55), transparent)' }} />
          <div className="grid grid-cols-3 divide-x divide-border/20">
            {STATS.map(({ value, label, prefix }, i) => (
              <StatCell key={label} value={value} label={label} prefix={prefix} delay={0.1 + i * 0.12} />
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