import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Mail, CheckCircle, Crown, Zap, ArrowRight, Target } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const COACHING_INCLUDED = [
  'In-depth 1-1 coaching',
  'Personalized training routine',
  'Full technique and form analysis',
  'Video feedback and movement breakdowns',
  'Routine adjustments based on progress',
  'Direct messaging support',
  'Help before the next workout whenever possible',
  'In-depth video explanations on how to improve and perform movements',
  'One-time onboarding call whenever the athlete is ready',
  'Goal-specific programming',
  'Progress tracking support',
];

const DIAGNOSTIC_REASONS = [
  'your current level',
  'strengths',
  'weaknesses',
  'goals',
  'technique level',
  'training background',
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
          <p className="text-xs font-heading text-primary uppercase tracking-widest font-bold mb-5">Pricing</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div>
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading text-primary uppercase tracking-wider font-semibold">Most Popular</span>
              </div>
              <div className="font-heading font-bold text-5xl gradient-text">
                $40<span className="text-xl text-muted-foreground font-body font-normal">/week</span>
              </div>
            </div>
            <div className="text-muted-foreground font-body text-sm font-semibold uppercase tracking-wider">or</div>
            <div>
              <div className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-1">Monthly</div>
              <div className="font-heading font-bold text-5xl gradient-text">
                $150<span className="text-xl text-muted-foreground font-body font-normal">/month</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <GlassCard hover={false} glow>
          <p className="font-body text-foreground/85 leading-relaxed text-base">
            BTCALI 1-1 Coaching includes in-depth personal coaching where athletes can message me whenever they need help. I will respond in time before their next workout whenever possible, so they can apply the tips, corrections, and advice straight away.
          </p>
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="font-body text-foreground/85 leading-relaxed text-base">
              This is not just a random program. I look at the athlete's current level, goals, weaknesses, form, and technique, then constantly adapt their routine specifically to help them progress as fast as possible.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* What's Included */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-5">
          {"What's "}<span className="gradient-text">Included</span>
        </h2>
        <GlassCard hover={false}>
          <div className="space-y-3">
            {COACHING_INCLUDED.map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-body text-foreground/85">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>
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
              Complete the BTCALI Athlete Diagnostic first so I can properly analyze:
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
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary"
              >
                <ArrowRight className="w-5 h-5" />
                Start Athlete Diagnostic
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEmail}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass border border-primary/40 text-foreground font-heading font-bold text-base hover:border-primary/70 transition-all"
            >
              <Mail className="w-5 h-5 text-primary" />
              Email BTCALI
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