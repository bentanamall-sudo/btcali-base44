import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Crown, Target, ArrowRight, ChevronDown, Trophy } from 'lucide-react';

const SKILLS = [
  'Planche','Front Lever','Handstand','Handstand Push-Up','Muscle-Up',
  'L-Sit','L-Sit to Handstand','Bent Arm Press','Strength','Hypertrophy',
  'Mobility','Weighted Calisthenics','Body Control',
];

const INCLUSION_ITEMS = [
  {
    title: 'Personalized training routine / program',
    detail: 'Built specifically around your current level, goals, weaknesses, and available equipment.',
  },
  {
    title: 'Full technique and form analysis',
    detail: 'You send through your workout sets and I analyse them in depth.',
    sub: ['Text feedback', 'Voice recordings', 'Screen recording analysis', 'Personalized tutorials specific to YOU'],
    subNote: 'This helps you understand what you are doing wrong, how to fix it, proper technique, correct activations, and how to perform movements correctly.',
  },
  {
    title: 'Video feedback and movement breakdowns',
    detail: 'I personally perform movements to show you:',
    sub: ['What you are doing wrong', 'What needs fixing', 'Proper positioning', 'Correct technique', 'Movement control', 'How to improve faster'],
  },
  {
    title: 'Routine adjustments based on progress',
    detail: 'As you improve, I constantly adapt and upgrade your routine so your progress does not stall.',
  },
  {
    title: 'Direct messaging support',
    detail: 'Message whenever you need help. I will do my best to respond before your next workout whenever possible, with most replies occurring during my availability hours.',
    note: 'Main availability: weekdays 4–6 PM NSW time. Response timing will not negatively affect progress — corrections and advice will always be provided before your next session.',
  },
  {
    title: 'Skill-specific programming',
    detail: 'Whether your goal is Handstand, Planche, Front Lever, Muscle-Up, L-Sit to Handstand, or Strength — the programme is built around YOUR specific target.',
  },
  {
    title: 'Personalized tutorials',
    detail: 'Detailed tutorials explaining exactly how to improve movements and perform exercises correctly.',
  },
  {
    title: 'Progress tracking',
    detail: 'I track your progress across every set and continuously refine your programme based on real performance data.',
  },
];

const WHAT_I_ANALYZE = [
  'Current level', 'Goals', 'Weaknesses', 'Form', 'Technique', 'Mobility', 'Strengths', 'Limitations',
];

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl border border-border/30 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-muted/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-heading font-semibold text-foreground text-sm sm:text-base">{title}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/30">
              <div className="space-y-2 pt-1">
                <p className="text-sm font-body text-foreground/75 leading-relaxed">{children.detail}</p>
                {children.sub && (
                  <ul className="space-y-1 mt-2">
                    {children.sub.map(s => (
                      <li key={s} className="flex items-center gap-2 text-sm font-body text-foreground/70">
                        <div className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {children.subNote && <p className="text-xs font-body text-muted-foreground leading-relaxed mt-2 italic">{children.subNote}</p>}
                {children.note && <p className="text-xs font-body text-muted-foreground leading-relaxed mt-2 italic">{children.note}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CoachingApply() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-border/30">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Elite Coaching</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-3 leading-tight">
          BTCALI <span className="gradient-text">1-on-1 Coaching</span>
        </h1>
      </motion.div>

      {/* Primary CTA — BTCALI Coaching Details */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setDetailsOpen(o => !o)}
          className="flex items-center justify-center gap-3 px-10 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-lg"
          style={{ boxShadow: '0 0 20px hsl(var(--glow-primary)/0.2)', minWidth: '280px' }}
        >
          BTCALI Coaching Details
          <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Coaching Details Accordion */}
      <AnimatePresence>
        {detailsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden mb-8"
          >
            <div className="glass rounded-2xl p-6 border border-border/30 space-y-4">
              <p className="font-body text-sm text-foreground/85 leading-relaxed">
                I have helped athletes achieve crazy skills such as bent arm press, L-sit to handstand, full front lever, front lever pull-ups, planche, muscle-ups, pike presses and much more. Then I adapt the routine specifically to each athlete to help them progress as fast as possible.
              </p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                The question isn't whether BTCALI coaching works. The results already speak for themselves.
              </p>
              <p className="font-body text-sm text-foreground/75 leading-relaxed">
                From first pull-ups and pike push-ups to advanced skills like the full planche, front lever, front lever pull-ups and L-sit to handstand, athletes have already used these methods to achieve incredible progress.
              </p>

              {/* View Results CTA */}
              <Link to="/results">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-primary/30 text-primary font-heading font-semibold text-sm hover:bg-primary/10 transition-all cursor-pointer"
                >
                  <Trophy className="w-4 h-4" /> View Athlete Results
                </motion.div>
              </Link>

              <div className="glass rounded-xl p-4 border border-primary/20">
                <p className="font-heading font-semibold text-primary text-xs uppercase tracking-wider mb-2">Main Availability</p>
                <p className="text-sm font-body text-foreground/80">• Weekdays 4–6 PM NSW time</p>
                <p className="text-xs font-body text-muted-foreground mt-2 leading-relaxed">
                  I will do my best to respond before your next workout whenever possible, with most replies occurring during my availability hours.
                </p>
              </div>

              <div className="pt-2 border-t border-border/30">
                <p className="font-heading font-bold text-foreground text-sm mb-3">This is NOT a random copied program. I look at:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {WHAT_I_ANALYZE.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm font-body text-foreground/75">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-body text-foreground/75 mt-3 leading-relaxed">
                  Then I adapt the routine specifically to the athlete to help them progress as fast as possible.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="glass rounded-xl px-5 py-4 border border-primary/20 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-6 flex-1">
            <div className="text-center">
              <div className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-0.5">Weekly</div>
              <div className="text-xs font-body text-muted-foreground line-through">$49.99</div>
              <div className="font-heading font-bold text-3xl gradient-text leading-none">$39.99</div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">AUD/week</div>
            </div>
            <div className="text-muted-foreground font-body text-xs font-semibold uppercase">or</div>
            <div className="text-center">
              <div className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-0.5">Monthly</div>
              <div className="text-xs font-body text-muted-foreground line-through">$200</div>
              <div className="font-heading font-bold text-3xl gradient-text leading-none">$150</div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">AUD/month</div>
            </div>
          </div>
          <p className="text-xs font-body text-muted-foreground/70 max-w-xs text-center sm:text-right leading-relaxed">
            Lock in discounted pricing for the full year. Min. 1-month commitment. One-off week: AUD $50.
          </p>
        </div>
      </motion.div>

      {/* Application Section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
        className="glass rounded-xl px-5 py-5 border border-border/30 mb-8">
        <h3 className="font-heading font-bold text-lg text-foreground mb-1">Apply For 1-on-1 Coaching</h3>
        <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed">
          Complete the Athlete Scan so I can analyse your current level, goals and weaknesses before reviewing your coaching application.
        </p>
        <Link to="/scan">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base"
            style={{ boxShadow: '0 0 16px hsl(var(--glow-primary)/0.18)' }}
          >
            <Target className="w-5 h-5" /> Start Athlete Scan & Apply
          </motion.button>
        </Link>
      </motion.div>

      {/* What's Included */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-1">
          What Is <span className="gradient-text">Included</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-5">Tap each item to expand</p>
        <div className="space-y-2">
          {INCLUSION_ITEMS.map((item, i) => (
            <AccordionItem key={i} title={item.title}>
              {item}
            </AccordionItem>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Skills BTCALI Can <span className="gradient-text">Help You Achieve</span>
        </h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
          Whether you're a complete beginner working towards your first pike push-up, or an advanced athlete chasing the full planche, BTCALI helps bridge the gap with clear programming, technical feedback and proven progressions.
        </p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => (
            <span key={s} className="text-sm font-body glass px-3 py-1.5 rounded-full border border-border/30 text-foreground/80 hover:border-primary/40 hover:text-primary transition-all cursor-default">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}