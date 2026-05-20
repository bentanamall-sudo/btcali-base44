import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Mail, CheckCircle, Crown, Zap, ArrowRight, Target, Lock, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const INCLUSION_ITEMS = [
  { title: 'Personalized training routine / program', detail: 'Built specifically around your current level, goals, weaknesses, and available equipment.', sub: null },
  { title: 'Full technique and form analysis', detail: 'You send through your workout sets and I analyse them in depth. Feedback through: text, voice recordings, screen recording analysis, and personalized tutorials specific to YOU.', sub: null },
  { title: 'Video feedback and movement breakdowns', detail: 'I personally perform movements to show you proper positioning, correct technique, and exactly how to improve.', sub: null },
  { title: 'Routine adjustments based on progress', detail: 'As you improve, I constantly adapt and upgrade your routine so your progress does not stall.', sub: null },
  { title: 'Direct messaging support', detail: 'Message me whenever you need help. I respond before your next workout whenever possible. (Main availability: 4–6 PM weekdays Australian Eastern Time.)', sub: null },
  { title: 'Help before your next workout whenever possible', detail: 'Apply corrections immediately instead of repeating mistakes for weeks or months.', sub: null },
  { title: 'In-depth video explanations', detail: 'Detailed tutorials explaining exactly how to improve movements and perform exercises correctly.', sub: null },
  { title: 'One-time onboarding call whenever you are ready', detail: 'Helps me understand your goals, level, weaknesses, schedule, and training background so we start properly.', sub: null },
  { title: 'Programming specific to YOUR goals', detail: 'Handstand, Planche, Front Lever, Muscle-Up, L-Sit to Handstand, Handstand Push-Up, Strength, Physique, or overall calisthenics performance.', sub: null },
  { title: 'Access to all methods, resources, tips, and systems', detail: 'The exact methods I use with my athletes who make crazy progress.', sub: null },
];

const DIAGNOSTIC_REASONS = [
  'your current level', 'strengths', 'weaknesses', 'goals', 'technique level', 'training background',
];

const WHAT_I_ANALYZE = [
  'Current level', 'Goals', 'Weaknesses', 'Form', 'Technique', 'Mobility', 'Strengths', 'Limitations',
];

function CoachingPage() {
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

      {/* Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8 glow-border mb-10 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 mb-5">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Limited Monthly Special Offer</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-5">
            <div className="text-center">
              <div className="flex items-center gap-1.5 justify-center mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading text-primary uppercase tracking-wider font-bold">Weekly</span>
              </div>
              <div className="text-sm font-body text-muted-foreground line-through mb-1">AUD $49.99/week</div>
              <div className="font-heading font-bold text-5xl gradient-text leading-none">AUD $39.99</div>
              <div className="text-lg text-muted-foreground font-body mt-1">/week</div>
              <div className="mt-2 inline-flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1">
                <span className="text-xs font-heading font-bold text-green-400">Save AUD $10/week</span>
              </div>
            </div>
            <div className="text-muted-foreground font-body text-sm font-semibold uppercase tracking-wider">or</div>
            <div className="text-center">
              <div className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-2">Monthly</div>
              <div className="text-sm font-body text-muted-foreground line-through mb-1">AUD $200/month</div>
              <div className="font-heading font-bold text-5xl gradient-text leading-none">AUD $150</div>
              <div className="text-lg text-muted-foreground font-body mt-1">/month</div>
              <div className="mt-2 inline-flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1">
                <span className="text-xs font-heading font-bold text-green-400">Save AUD $50/month</span>
              </div>
            </div>
          </div>
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
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <GlassCard hover={false} glow>
          <div className="space-y-4 font-body text-foreground/85 leading-relaxed text-base">
            <p>BTCALI 1-1 Coaching includes in-depth personal coaching where you can message me whenever you need help.</p>
            <p>I will respond in time before your next workout whenever possible and whenever I am free. <span className="text-muted-foreground text-sm">(Main availability: 4–6 PM weekdays Australian Eastern Time.)</span> The exact time I respond will not negatively affect your progress because I will still make sure you have the tips, corrections, and advice needed before your next workout session.</p>
            <p>This means you can apply the feedback straight away instead of continuing to train with incorrect form, weak activations, or inefficient programming.</p>
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
              <p className="mt-3 text-foreground/80">Then I constantly adapt your routine specifically to <strong className="text-foreground">YOU</strong> to help you progress as fast as possible.</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* What's Included */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
          What Is <span className="gradient-text">Included</span>
        </h2>
        <div className="space-y-3">
          {INCLUSION_ITEMS.map((item, i) => (
            <div key={i} className="glass rounded-xl p-5 border border-border/50">
              <div className="flex items-start gap-3 mb-1">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="font-heading font-semibold text-foreground text-sm">{item.title}</h3>
              </div>
              <p className="ml-8 text-sm font-body text-foreground/70 leading-relaxed">{item.detail}</p>
            </div>
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
          <p className="font-heading font-extrabold text-2xl sm:text-3xl gradient-text mb-6 tracking-wide uppercase">
            SERIOUS ATHLETES ONLY
          </p>
          <div className="glass rounded-xl p-5 mb-6 text-left">
            <p className="font-body text-foreground/85 text-sm mb-4">
              Complete the BTCALI Athlete Diagnostic first so I can properly analyse:
            </p>
            <div className="space-y-2 mb-4">
              {DIAGNOSTIC_REASONS.map(r => (
                <div key={r} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-body text-foreground/80">{r}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-foreground/70 text-sm leading-relaxed">
              The Athlete Diagnostic helps me understand exactly how to structure your coaching for the fastest progress possible.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scan" className="flex-1">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary">
                <ArrowRight className="w-5 h-5" /> Start Athlete Diagnostic
              </motion.button>
            </Link>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleEmail}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass border border-primary/40 text-foreground font-heading font-bold text-base hover:border-primary/70 transition-all">
              <Mail className="w-5 h-5 text-primary" /> Email BTCALI
            </motion.button>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default function Purchase() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type') || 'default';

  if (type === 'coaching') {
    return <CoachingPage />;
  }

  // Fallback for other types (handstand, planche, etc.)
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
      <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
      <h1 className="font-heading font-bold text-3xl gradient-text mb-4">Coming Soon</h1>
      <p className="text-muted-foreground font-body mb-6">This program will be available soon at $30. Apply for the waiting list.</p>
      <motion.a
        href={`mailto:btcalisw@gmail.com?subject=BTCALI%20$30%20Program%20Waiting%20List&body=Program%20type%3A%20${encodeURIComponent(type)}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-6 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold glow-primary"
      >
        <Mail className="w-5 h-5" /> Apply for Waiting List
      </motion.a>
    </div>
  );
}