import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Crown, Mail, Phone, Target, Shield, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const INCLUDED = [
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

      {/* Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8 glow-border mb-10 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-heading text-primary uppercase tracking-widest font-bold mb-5">Pricing</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading text-primary uppercase tracking-wider font-semibold">Special Offer — This Month</span>
              </div>
              <div className="font-heading font-bold text-5xl gradient-text">
                AUD $39.99<span className="text-xl text-muted-foreground font-body font-normal">/week</span>
              </div>
              <div className="text-xs text-muted-foreground font-body mt-1 line-through">normally AUD $49.99/week</div>
            </div>
            <div className="text-muted-foreground font-body text-sm font-semibold uppercase tracking-wider">or</div>
            <div className="text-center">
              <div className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-1">Monthly</div>
              <div className="font-heading font-bold text-5xl gradient-text">
                AUD $150<span className="text-xl text-muted-foreground font-body font-normal">/month</span>
              </div>
              <div className="text-xs text-muted-foreground font-body mt-1 line-through">normally AUD $200/month</div>
            </div>
          </div>
          <p className="text-xs font-body text-muted-foreground mt-4 max-w-md mx-auto">
            Secure your spot this month and the discounted weekly rate stays locked in for the year. Weekly rate requires a minimum 1-month commitment. One-off single week: AUD $50.
          </p>
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
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-5">
          {"What's "}<span className="gradient-text">Included</span>
        </h2>
        <GlassCard hover={false}>
          <div className="space-y-3">
            {INCLUDED.map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-body text-foreground/85">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Call / Connection */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-5">
          Call / <span className="gradient-text">Connection</span>
        </h2>
        <GlassCard hover={false} glow>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="font-body text-foreground/85 leading-relaxed text-base">
              The coaching also includes a one-time onboarding call whenever you like, so we can get to know each other properly. As a coach, I want to not only guide you, but also support and motivate you like a friend so you keep improving 💪
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Why BTCALI Coaching */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-5">
          Why <span className="gradient-text">BTCALI Coaching</span>
        </h2>
        <GlassCard hover={false}>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="font-body text-foreground/85 leading-relaxed text-base">
              BTCALI coaching is built for athletes who want real guidance instead of guessing. I help with your form, technique, programming, progressions, weaknesses, and mindset so your training becomes clearer, smarter, and more effective.
            </p>
          </div>
        </GlassCard>
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
              Complete the BTCALI Athlete Diagnostic first so I can properly analyze:
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