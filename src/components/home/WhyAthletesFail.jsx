import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import use3DHover from '@/hooks/use3DHover';
import TypewriterHeading from '@/components/TypewriterHeading';

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

function FailCard({ item, delay }) {
  const tilt = use3DHover({ intensity: 6, scale: 1.03, glowColor: 'hsl(0 70% 50% / 0.15)' });
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ ...tilt.style }}
      className="flex items-center gap-4 rounded-xl px-5 py-4 cursor-default"
      {...{ style: { ...tilt.style, background: 'hsl(0 0% 7% / 0.65)', backdropFilter: 'blur(16px)', border: '1px solid hsl(0 60% 30% / 0.2)' } }}
    >
      <XCircle className="w-4 h-4 text-red-400/70 flex-shrink-0" />
      <span className="font-body text-sm text-foreground/75 leading-snug">{item}</span>
    </motion.div>
  );
}

function SolutionCard() {
  const tilt = use3DHover({ intensity: 5, scale: 1.02 });
  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl px-6 py-7 relative overflow-hidden cursor-default"
      style={{
        ...tilt.style,
        background: 'linear-gradient(135deg, hsl(45 85% 52% / 0.09) 0%, hsl(40 75% 38% / 0.06) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid hsl(45 85% 52% / 0.25)',
        boxShadow: `0 0 40px hsl(45 85% 52% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.06), ${tilt.style.boxShadow || ''}`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent)' }} />
      <p className="font-heading font-black text-foreground text-xl text-center mb-5">
        Why <span className="gradient-text">BTCALI</span> Works
      </p>
      <div className="space-y-2.5 mb-5">
        {SOLUTIONS.map((sol, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + i * 0.07 }}
            className="flex items-center gap-3"
          >
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-body text-sm text-foreground/85">{sol}</span>
          </motion.div>
        ))}
        <div className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-body text-sm text-foreground/85">And much more.</span>
        </div>
      </div>
      <p className="font-body text-sm text-foreground/65 leading-relaxed mb-5">
        For a complete breakdown of exactly how BTCALI Coaching works — including video analysis, personalised programming, progress tracking and ongoing support — visit the 1-1 Coaching page.
      </p>
      <Link to="/apply">
        <motion.button
          whileHover={{ scale: 1.03, y: -2, boxShadow: '0 0 22px hsl(45 85% 52% / 0.25)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-full py-3.5 rounded-xl border border-primary/50 text-primary font-heading font-bold text-sm hover:border-primary/80 hover:bg-primary/5 transition-all duration-200"
        >
          View Full Coaching Details
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default function WhyAthletesFail() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-heading font-bold text-primary/50 uppercase tracking-[0.3em] mb-3 text-center">
            The Problem
          </p>
          <TypewriterHeading
            text="Why Most Athletes Never Unlock Their Skills"
            tag="h2"
            className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-2 text-center leading-tight"
            highlightWords={['Unlock Their Skills']}
            speed={36}
          />
          <p className="text-muted-foreground font-body text-sm text-center mb-12 max-w-sm mx-auto leading-relaxed">
            It's not a lack of effort. It's a lack of direction.
          </p>

          <div className="space-y-2.5 mb-10">
            {FAILS.map((item, i) => (
              <FailCard key={i} item={item} delay={i * 0.09} />
            ))}
          </div>

          <SolutionCard />
        </motion.div>
      </div>
    </section>
  );
}