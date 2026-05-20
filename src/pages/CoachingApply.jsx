import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Crown, Mail, Target, ArrowRight, Lock, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const SKILLS = [
  'Planche','Front Lever','Handstand','Handstand Push-Up','Muscle-Up',
  'L-Sit','L-Sit to Handstand','Bent Arm Press','Strength','Hypertrophy',
  'Mobility','Weighted Calisthenics','Body Control',
];

const DIAGNOSTIC_REASONS = [
  'your current level',
  'strengths',
  'weaknesses',
  'goals',
  'technique level',
  'training background',
];

const INCLUSION_ITEMS = [
  {
    title: 'Personalized training routine / program',
    detail: 'Built specifically around your current level, goals, weaknesses, and available equipment.',
    sub: null,
  },
  {
    title: 'Full technique and form analysis',
    detail: 'You send through your workout sets and I analyse them in depth. I give feedback through:',
    sub: ['Text feedback', 'Voice recordings', 'Screen recording analysis', 'Personalized tutorials specific to YOU'],
    subNote: 'This helps you understand exactly what you are doing wrong, how to fix it, proper technique, correct activations, and how to perform movements correctly.',
  },
  {
    title: 'Video feedback and movement breakdowns',
    detail: 'I personally perform movements to show you:',
    sub: ['What you are doing wrong', 'What needs fixing', 'Proper positioning', 'Correct technique', 'Movement control', 'How to improve faster'],
  },
  {
    title: 'Routine adjustments based on progress',
    detail: 'As you improve, I constantly adapt and upgrade your routine so your progress does not stall.',
    sub: null,
  },
  {
    title: 'Direct messaging support',
    detail: 'You can message me whenever you need help. I will respond before your next workout whenever possible and whenever I am free.',
    sub: null,
    note: 'Main availability: 4–6 PM weekdays Australian Eastern Time. The response timing will not negatively affect your progress because I will still make sure you have the corrections and tips needed before your next workout session.',
  },
  {
    title: 'Help before your next workout whenever possible',
    detail: 'This allows you to apply corrections immediately instead of repeating mistakes for weeks or months.',
    sub: null,
  },
  {
    title: 'In-depth video explanations',
    detail: 'Detailed tutorials explaining exactly how to improve movements and perform exercises correctly.',
    sub: null,
  },
  {
    title: 'One-time onboarding call whenever you are ready',
    detail: 'This helps me understand your goals, current level, weaknesses, schedule, and training background so we can start properly.',
    sub: null,
  },
  {
    title: 'Programming specific to YOUR goals',
    detail: 'Whether your goal is:',
    sub: ['Handstand', 'Planche', 'Front Lever', 'Muscle-Up', 'L-Sit to Handstand', 'Handstand Push-Up', 'Strength', 'Physique', 'Overall calisthenics performance'],
  },
  {
    title: 'Access to all methods, resources, tips, and systems',
    detail: 'The exact methods I use with my athletes who make crazy progress.',
    sub: null,
  },
];

const WHAT_I_ANALYZE = [
  'Current level', 'Goals', 'Weaknesses', 'Form', 'Technique', 'Mobility', 'Strengths', 'Limitations',
];

export default function CoachingApply() {
  const handleEmail = () => {
    window.location.href = 'mailto:btcalisw@gmail.com?subject=BTCALI%201-1%20Coaching%20Application&body=I%20completed%20the%20BTCALI%20Athlete%20Diagnostic%20and%20want%20to%20apply%20for%201-1%20coaching.%0D%0A';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Elite Coaching</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-5 leading-tight">
          BTCALI <span className="gradient-text">1-1 Coaching</span>
        </h1>
      </motion.div>

      {/* Pricing — Special Offer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8 glow-border mb-4 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          {/* Lock-in banner */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 mb-5">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Limited Monthly Special Offer</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-5">
            {/* Weekly */}
            <div className="text-center">
              <div className="flex items-center gap-1.5 justify-center mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading text-primary uppercase tracking-wider font-bold">Weekly</span>
              </div>
              <div className="text-sm font-body text-muted-foreground line-through mb-1">AUD $49.99/week</div>
              <div className="font-heading font-bold text-5xl gradient-text leading-none">
                AUD $39.99
              </div>
              <div className="text-lg text-muted-foreground font-body mt-1">/week</div>
              <div className="mt-2 inline-flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1">
                <span className="text-xs font-heading font-bold text-green-400">Save AUD $10/week</span>
              </div>
            </div>

            <div className="text-muted-foreground font-body text-sm font-semibold uppercase tracking-wider">or</div>

            {/* Monthly */}
            <div className="text-center">
              <div className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-2">Monthly</div>
              <div className="text-sm font-body text-muted-foreground line-through mb-1">AUD $200/month</div>
              <div className="font-heading font-bold text-5xl gradient-text leading-none">
                AUD $150
              </div>
              <div className="text-lg text-muted-foreground font-body mt-1">/month</div>
              <div className="mt-2 inline-flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1">
                <span className="text-xs font-heading font-bold text-green-400">Save AUD $50/month</span>
              </div>
            </div>
          </div>

          {/* Lock-in note */}
          <div className="glass rounded-xl p-4 border border-primary/25 max-w-md mx-auto">
            <div className="flex items-start gap-2.5">
              <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs font-body text-foreground/80 leading-relaxed text-left">
                Athletes who secure a spot this month keep the discounted pricing <strong className="text-foreground">locked in for the full year</strong>, even after prices increase later. Weekly rate requires a minimum 1-month commitment. One-off single week: AUD $50.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 mt-8">
        <GlassCard hover={false} glow>
          <div className="space-y-4 font-body text-foreground/85 leading-relaxed text-base">
            <p>
              BTCALI 1-1 Coaching includes in-depth personal coaching where you can message me whenever you need help.
            </p>
            <p>
              I will respond in time before your next workout whenever possible and whenever I am free.{' '}
              <span className="text-muted-foreground text-sm">(Main availability: 4–6 PM weekdays Australian Eastern Time.)</span>{' '}
              The exact time I respond will not negatively affect your progress because I will still make sure you have the tips, corrections, and advice needed before your next workout session.
            </p>
            <p>
              This means you can apply the feedback straight away instead of continuing to train with incorrect form, weak activations, or inefficient programming.
            </p>
            <div className="pt-3 border-t border-border/30">
              <p className="font-heading font-bold text-foreground text-base mb-3">This is NOT just some random copied program.</p>
              <p className="mb-3">I look at your:</p>
              <div className="grid grid-cols-2 gap-2">
                {WHAT_I_ANALYZE.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-foreground/80">
                Then I constantly adapt your routine specifically to <strong className="text-foreground">YOU</strong> to help you progress as fast as possible.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* What's Included */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          What Is <span className="gradient-text">Included</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-6">Everything inside BTCALI 1-1 Coaching</p>
        <div className="space-y-4">
          {INCLUSION_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-5 border border-border/50"
            >
              <div className="flex items-start gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="font-heading font-semibold text-foreground text-base">{item.title}</h3>
              </div>
              <div className="ml-8 space-y-2">
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
                {item.subNote && (
                  <p className="text-xs font-body text-muted-foreground leading-relaxed mt-2 italic">{item.subNote}</p>
                )}
                {item.note && (
                  <p className="text-xs font-body text-muted-foreground leading-relaxed mt-2 italic">{item.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Skills BTCALI <span className="gradient-text">Helps With</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-5">Skills &amp; goals I specialize in</p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => (
            <span key={s} className="text-sm font-body glass px-3 py-1.5 rounded-full border border-primary/20 text-foreground/80 hover:border-primary/50 hover:text-primary transition-all cursor-default">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Application CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass rounded-2xl p-8 glow-border relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Application</span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3">
            Ready to apply for BTCALI 1-1 Coaching?
          </h2>

          <p className="font-heading font-extrabold text-xl sm:text-2xl gradient-text mb-3 tracking-wide uppercase">
            SERIOUS ATHLETES ONLY
          </p>

          <p className="text-sm font-body text-muted-foreground mb-5 max-w-md mx-auto">
            Please read everything on this page in depth before applying or enquiring with BTCALI.
          </p>

          <div className="glass rounded-xl p-5 mb-6 text-left">
            <p className="font-body text-foreground/85 text-sm mb-4">
              Complete the BTCALI Athlete Diagnostic first so I can properly analyse:
            </p>
            <div className="space-y-2">
              {DIAGNOSTIC_REASONS.map(r => (
                <div key={r} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-body text-foreground/80">{r}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-foreground/70 text-sm mt-4 leading-relaxed">
              The Athlete Diagnostic helps me understand exactly how to structure your coaching for the fastest progress possible.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEmail}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary"
            >
              <Mail className="w-5 h-5" />
              Email BTCALI
            </motion.button>
            <Link to="/scan">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass border border-primary/40 text-foreground font-heading font-bold text-base hover:border-primary/70 transition-all w-full"
              >
                <ArrowRight className="w-5 h-5 text-primary" />
                Start Athlete Diagnostic
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}