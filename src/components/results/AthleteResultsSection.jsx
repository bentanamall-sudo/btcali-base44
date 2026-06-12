import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap } from 'lucide-react';

const RESULTS = [
  {
    name: 'Adrian',
    skill: 'Front Lever',
    highlight: '10 sec Full Front Lever in 4 weeks',
    story: 'Started coaching with a straddle front lever. Within 4 weeks achieved a 10 second full front lever while dramatically improving front lever pull-ups and raises.',
  },
  {
    name: 'Hugo',
    skill: '90° HSPU',
    highlight: 'Unlocked on day 1 of coaching',
    story: 'Had spent months trying to unlock the 90 Degree Handstand Push-Up. Using technique corrections and coaching feedback, unlocked it on the very first day of coaching.',
  },
  {
    name: 'Marcus',
    skill: 'Planche',
    highlight: 'Advanced Tuck → Straddle in 3 weeks',
    story: 'Started with an Advanced Tuck Planche. Within 3 weeks progressed to Straddle Planche Push-Up to Hold and Planche Press variations thanks to his existing foundation and targeted programming.',
  },
  {
    name: 'Mack',
    skill: 'Handstand',
    highlight: 'Consistent handstand in 4 weeks',
    story: 'Could not handstand confidently and was too afraid to commit to balancing. Within 4 weeks developed a consistent handstand. Could not perform a proper pike push-up initially, but after one coaching session fixed his form and achieved multiple clean reps.',
  },
  {
    name: 'Daniel',
    skill: 'Bent Arm Press',
    highlight: 'Pike push-ups → Bent Arm Press in 1 week',
    story: 'Progressed from basic pike push-ups to Bent Arm Press within one week.',
  },
  {
    name: 'Gaon',
    skill: 'Bent Arm Press',
    highlight: 'Bent Arm Press in 2 weeks',
    story: 'Had never performed a proper pike push-up progression. Unlocked Bent Arm Press within two weeks.',
  },
  {
    name: 'Alistair',
    skill: 'Bent Arm Press',
    highlight: 'Unlocked within days',
    story: 'Was struggling to understand Bent Arm Press mechanics. Unlocked the skill within days after technical coaching adjustments.',
  },
  {
    name: 'Cedrick',
    skill: 'Full Planche',
    highlight: 'Straddle → Full Planche in 1 month',
    story: 'Progressed from Straddle Planche to Full Planche in one month of coaching.',
  },
];

function ResultCard({ result, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-2xl border border-border/30 overflow-hidden hover:border-primary/30 transition-all"
    >
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent)' }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="font-heading font-black text-foreground text-base">{result.name}</p>
            <span className="text-xs font-heading font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mt-1 inline-block">
              {result.skill}
            </span>
          </div>
          <div className="flex-shrink-0 glass rounded-xl px-3 py-1.5 border border-primary/25 text-right">
            <p className="text-xs font-heading font-bold gradient-text leading-tight">{result.highlight}</p>
          </div>
        </div>
        <p className="font-body text-sm text-foreground/70 leading-relaxed">{result.story}</p>
      </div>
    </motion.div>
  );
}

export default function AthleteResultsSection() {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3">
          Athlete Spotlight
        </p>
        <h2 className="font-heading font-black text-3xl sm:text-4xl mb-2">
          Real <span className="gradient-text">Athlete Results</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
          Real athletes, real coaching, real outcomes.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {RESULTS.map((r, i) => <ResultCard key={r.name} result={r} index={i} />)}

        {/* And Many More card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.48 }}
          className="glass rounded-2xl border border-primary/30 overflow-hidden sm:col-span-2"
          style={{ background: 'linear-gradient(135deg, hsl(var(--card)), hsl(42 78% 6%))' }}
        >
          <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), transparent)' }} />
          <div className="p-6 text-center">
            <p className="font-heading font-black text-foreground text-lg mb-2">And Many More</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              These are only a handful of the athlete results achieved through BTCALI coaching.
              Every athlete starts at a different level, which is why every routine, progression and coaching decision is personalised to the individual.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Results achieved list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl border border-border/30 p-6 mb-8"
      >
        <p className="font-heading font-bold text-foreground text-base mb-4 text-center">Results Achieved By BTCALI Athletes</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            'Full Planche in under a year',
            'Full Front Lever in under a year',
            'Handstand Push-Ups in under a year',
            'Bent Arm Presses in weeks',
            'L-Sit to Handstand',
            'Front Lever Pull-Ups',
            '90 Degree Handstand Push-Ups',
            'Muscle-Ups',
            'And many more',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-body text-sm text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Link to="/scan">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary"
          >
            <Zap className="w-5 h-5" /> Apply For 1-on-1 Coaching
          </motion.button>
        </Link>
        <p className="text-xs font-body text-muted-foreground mt-3">
          Ready to become the next BTCALI success story? Complete the Athlete Scan to apply.
        </p>
      </motion.div>
    </section>
  );
}