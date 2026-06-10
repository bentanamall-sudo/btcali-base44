import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Crown, Mail, Target, ArrowRight, Lock, Star, ChevronDown } from 'lucide-react';

const SKILLS = [
  'Planche','Front Lever','Handstand','Handstand Push-Up','Muscle-Up',
  'L-Sit','L-Sit to Handstand','Bent Arm Press','Strength','Hypertrophy',
  'Mobility','Weighted Calisthenics','Body Control',
];

const INCLUSION_ITEMS = [
  {
    title: 'Personalized training routine / program',
    detail: 'Built specifically around your current level, goals, weaknesses, and available equipment.',
    sub: null,
  },
  {
    title: 'Full technique and form analysis',
    detail: 'You send through your workout sets and BTCALI analyses them in depth.',
    sub: ['Text feedback', 'Voice recordings', 'Screen recording analysis', 'Personalized tutorials specific to YOU'],
    subNote: 'This helps you understand what you are doing wrong, how to fix it, proper technique, correct activations, and how to perform movements correctly.',
  },
  {
    title: 'Video feedback and movement breakdowns',
    detail: 'BTCALI personally performs movements to show you:',
    sub: ['What you are doing wrong', 'What needs fixing', 'Proper positioning', 'Correct technique', 'Movement control', 'How to improve faster'],
  },
  {
    title: 'Routine adjustments based on progress',
    detail: 'As you improve, BTCALI constantly adapts and upgrades your routine so your progress does not stall.',
    sub: null,
  },
  {
    title: 'Direct messaging support',
    detail: 'Message whenever you need help. BTCALI will respond before your next workout whenever possible.',
    sub: null,
    note: 'Main availability: 4–6 PM and 7–8 AM NSW time on weekdays. Response timing will not negatively affect progress — corrections and advice will always be provided before your next session.',
  },
  {
    title: 'Skill-specific programming',
    detail: 'Whether your goal is Handstand, Planche, Front Lever, Muscle-Up, L-Sit to Handstand, or Strength — the programme is built around YOUR specific target.',
    sub: null,
  },
  {
    title: 'Personalized tutorials',
    detail: 'Detailed tutorials explaining exactly how to improve movements and perform exercises correctly.',
    sub: null,
  },
  {
    title: 'Progress tracking',
    detail: 'BTCALI tracks your progress across every set and continuously refines your programme based on real performance data.',
    sub: null,
  },
];

const WHAT_I_ANALYZE = [
  'Current level', 'Goals', 'Weaknesses', 'Form', 'Technique', 'Mobility', 'Strengths', 'Limitations',
];

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass rounded-xl border border-border/40 overflow-hidden">
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
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CoachingApply() {
  const [instagram, setInstagram] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleEmail = () => {
    const ig = instagram.trim() || 'N/A';
    const subject = encodeURIComponent('Apply for $40 Coaching a Week — BTCALI');
    const body = encodeURIComponent(`Hi BTCALI,\n\nI want to apply for $40 coaching a week.\n\nInstagram: ${ig}\n\nI have completed (or plan to complete) the BTCALI Athlete Scan.\n\nName:\nGoals:\n`);
    window.location.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Elite Coaching</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-3 leading-tight">
          BTCALI <span className="gradient-text">1-on-1 Coaching</span>
        </h1>
        <p className="text-muted-foreground font-body text-base max-w-lg mx-auto leading-relaxed">
          Personalised coaching designed around your goals, weaknesses, skill level, form, and available equipment.
        </p>
      </motion.div>

      {/* Hero CTA buttons */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <Link to="/scan">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary">
            <Zap className="w-5 h-5" /> Apply For Coaching
          </motion.button>
        </Link>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => setDetailsOpen(o => !o)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-border/50 text-foreground font-heading font-semibold text-base hover:border-primary/40 transition-all">
          BTCALI Coaching Details
          <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-primary" />
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
            <div className="glass rounded-2xl p-6 border border-border/40 space-y-4">
              <p className="font-body text-sm text-foreground/85 leading-relaxed">
                BTCALI 1-1 Coaching includes in-depth personal coaching where athletes can message whenever they need help.
              </p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                BTCALI will respond whenever possible before the athlete's next workout, mainly during availability hours.
              </p>
              <div className="glass rounded-xl p-4 border border-primary/20">
                <p className="font-heading font-semibold text-primary text-xs uppercase tracking-wider mb-2">Main Availability</p>
                <div className="space-y-1">
                  <p className="text-sm font-body text-foreground/80">• 4–6 PM weekdays Australian Eastern Time</p>
                  <p className="text-sm font-body text-foreground/80">• 7–8 AM NSW time on weekdays</p>
                </div>
                <p className="text-xs font-body text-muted-foreground mt-2 leading-relaxed">
                  Outside these hours BTCALI may respond, but it is not guaranteed. Response timing will not negatively affect progress — feedback and corrections will always be given before the next workout whenever possible.
                </p>
              </div>
              <div className="pt-3 border-t border-border/30">
                <p className="font-heading font-bold text-foreground text-sm mb-3">This is NOT just a random copied program.</p>
                <p className="text-sm font-body text-foreground/80 mb-3">BTCALI looks at:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {WHAT_I_ANALYZE.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm font-body text-foreground/75">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-body text-foreground/75 mt-3 leading-relaxed">
                  Then BTCALI adapts the routine specifically to the athlete to help them progress as fast as possible.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="glass rounded-xl px-5 py-4 border border-primary/25 mb-4 relative overflow-hidden">
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

      {/* Application Form — compact */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
        className="glass rounded-xl px-5 py-4 border border-border/30 mb-8">
        <p className="text-xs font-body text-muted-foreground mb-3">Enter your Instagram then apply — or complete the Athlete Diagnostic first so BTCALI can analyse your level.</p>
        <div className="flex flex-col sm:flex-row gap-2.5 items-start">
          <input
            type="text"
            value={instagram}
            onChange={e => setInstagram(e.target.value)}
            placeholder="@yourinstagram"
            className="flex-1 glass rounded-lg px-3 py-2.5 text-foreground font-body text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent placeholder:text-muted-foreground/40 min-w-0"
          />
          <div className="flex gap-2 flex-shrink-0">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={handleEmail} disabled={!instagram.trim()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg gradient-bg-strong text-primary-foreground font-heading font-bold text-xs glow-primary disabled:opacity-40 whitespace-nowrap">
              <Mail className="w-3.5 h-3.5" /> Apply Now
            </motion.button>
            <Link to="/scan">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg glass border border-primary/30 text-foreground font-heading font-semibold text-xs hover:border-primary/60 transition-all whitespace-nowrap">
                <ArrowRight className="w-3.5 h-3.5 text-primary" /> Athlete Scan
              </motion.button>
            </Link>
          </div>
        </div>
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
              <div className="space-y-2 pt-1">
                <p className="text-sm font-body text-foreground/75 leading-relaxed">{item.detail}</p>
                {item.sub && (
                  <ul className="space-y-1 mt-2">
                    {item.sub.map(s => (
                      <li key={s} className="flex items-center gap-2 text-sm font-body text-foreground/70">
                        <div className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {item.subNote && <p className="text-xs font-body text-muted-foreground leading-relaxed mt-2 italic">{item.subNote}</p>}
                {item.note && <p className="text-xs font-body text-muted-foreground leading-relaxed mt-2 italic">{item.note}</p>}
              </div>
            </AccordionItem>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Skills BTCALI <span className="gradient-text">Helps With</span>
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {SKILLS.map(s => (
            <span key={s} className="text-sm font-body glass px-3 py-1.5 rounded-full border border-primary/20 text-foreground/80 hover:border-primary/50 hover:text-primary transition-all cursor-default">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}