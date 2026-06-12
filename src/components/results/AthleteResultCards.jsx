import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, CheckCircle } from 'lucide-react';

const RESULTS = [
  {
    name: 'Adrian',
    skill: 'Front Lever',
    highlight: '10-sec Full Front Lever in 4 weeks',
    detail: 'Started with a straddle front lever. Within 4 weeks achieved a 10 second full front lever while dramatically improving front lever pull-ups and raises.',
  },
  {
    name: 'Hugo',
    skill: '90° HSPU',
    highlight: 'Unlocked 90° HSPU on day one of coaching',
    detail: 'Had spent months trying to unlock the 90 Degree Handstand Push-Up. Using technique corrections and coaching feedback, unlocked it on the very first day of coaching.',
  },
  {
    name: 'Marcus',
    skill: 'Planche',
    highlight: 'Advanced Tuck → Straddle Planche in 3 weeks',
    detail: 'Started with an Advanced Tuck Planche. Within 3 weeks progressed to Straddle Planche Push-Up to Hold and Planche Press variations thanks to his existing foundation and targeted programming.',
  },
  {
    name: 'Mack',
    skill: 'Handstand + Pike Push-Up',
    highlight: 'Consistent handstand in 4 weeks',
    detail: 'Could not handstand confidently and was too afraid to commit to balancing. Within 4 weeks developed a consistent handstand. Also fixed pike push-up form after one session and achieved multiple clean reps.',
  },
  {
    name: 'Daniel',
    skill: 'Bent Arm Press',
    highlight: 'Pike Push-Up → Bent Arm Press in one week',
    detail: 'Progressed from basic pike push-ups to Bent Arm Press within one week.',
  },
  {
    name: 'Gaon',
    skill: 'Bent Arm Press',
    highlight: 'Bent Arm Press unlocked in two weeks',
    detail: 'Had never performed a proper pike push-up progression. Unlocked Bent Arm Press within two weeks.',
  },
  {
    name: 'Alistair',
    skill: 'Bent Arm Press',
    highlight: 'Unlocked within days via technique coaching',
    detail: 'Was struggling to understand Bent Arm Press mechanics. Unlocked the skill within days after technical coaching adjustments.',
  },
  {
    name: 'Cedrick',
    skill: 'Full Planche',
    highlight: 'Straddle → Full Planche in one month',
    detail: 'Progressed from Straddle Planche to Full Planche in one month of coaching.',
  },
];

export default function AthleteResultCards() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            Coaching Results
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-2 text-center leading-tight">
            Real Athlete <span className="gradient-text">Results</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm text-center mb-10">
            Every result below came from personalised BTCALI programming and technique coaching.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {RESULTS.map(({ name, skill, highlight, detail }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-2xl border border-border/30 overflow-hidden flex flex-col"
                style={{ borderTop: '1.5px solid hsl(var(--primary)/0.3)' }}
              >
                <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading font-black text-foreground text-base leading-none">{name}</p>
                    <span className="text-xs font-heading font-bold text-primary/70 mt-1 inline-block">{skill}</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                </div>
                <div className="px-5 pb-2">
                  <p className="font-heading font-semibold text-sm text-foreground/90 leading-snug mb-2">{highlight}</p>
                </div>
                <div className="px-5 pb-5 flex-1">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{detail}</p>
                </div>
              </motion.div>
            ))}

            {/* And Many More card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: RESULTS.length * 0.06 }}
              className="sm:col-span-2 rounded-2xl px-6 py-6 text-center"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--gradient-start)/0.1), hsl(var(--gradient-end)/0.1))',
                border: '1px solid hsl(var(--primary)/0.3)',
              }}
            >
              <p className="font-heading font-black text-foreground text-lg mb-2">And Many More</p>
              <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                These are only a handful of the athlete results achieved through BTCALI coaching. Every athlete starts at a different level, which is why every routine, progression and coaching decision is personalised to the individual.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/scan">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary mb-3"
              >
                <Rocket className="w-5 h-5" /> Apply For 1-on-1 Coaching
              </motion.button>
            </Link>
            <p className="text-xs font-body text-muted-foreground/60">
              Ready to become the next BTCALI success story? Complete the Athlete Scan to apply.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}