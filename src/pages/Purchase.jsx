import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Instagram, ArrowRight, CheckCircle, MessageCircle, Crown, Zap } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

const INSTAGRAM_URL = 'https://www.instagram.com/btcali.coach/';

const offeringDetails = {
  coaching: {
    title: '1-on-1 Elite Coaching',
    emoji: '👁️',
    price: 'Custom',
    includes: [
      'Custom periodized training program',
      'Weekly video feedback on your form',
      'Direct coach messaging (Mon–Fri)',
      'Monthly strategy calls',
      'Adaptive programming as you progress',
      'Access to full skill roadmaps',
    ],
    note: 'Spots are limited. Application required.',
  },
  handstand: {
    title: 'Handstand Program',
    emoji: '🤸',
    price: 'Custom',
    includes: [
      'Structured 12-week handstand progression',
      'Wall drills → kick-up → balance → freestanding',
      'Video breakdown for each phase',
      'HSPU preparation pathway included',
      'Weekly check-in structure',
    ],
    note: 'Full program. Beginner to advanced freestanding hold.',
  },
  planche: {
    title: 'Planche Program',
    emoji: '💪',
    price: 'Custom',
    includes: [
      'Tuck → Advanced Tuck → Straddle → Full Planche',
      'Wrist and scapula prep protocols',
      'Planche lean periodization',
      'Straight-arm strength conditioning',
      '12-week structured plan',
    ],
    note: 'Requires planche foundation or free conditioning guide completion.',
  },
  default: {
    title: 'BTCALI Access',
    emoji: '⚡',
    price: 'Custom',
    includes: [
      'Personalized coaching program',
      'Skill-specific roadmap',
      'Video feedback',
      'Direct coach access',
      'Progress tracking',
    ],
    note: 'Message BTCALI to discuss your specific goals and program fit.',
  },
};

export default function Purchase() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type') || 'default';
  const offering = offeringDetails[type] || offeringDetails.default;

  const handleContact = () => {
    window.open(INSTAGRAM_URL, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Get Access</span>
          </div>
          <div className="text-5xl mb-4">{offering.emoji}</div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3">
            <span className="gradient-text">{offering.title}</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Here's exactly what you're getting when you reach out.
          </p>
        </motion.div>

        {/* What's included */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard glow hover={false} className="mb-6">
            <h2 className="font-heading font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> What's Included
            </h2>
            <div className="space-y-3">
              {offering.includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-body text-foreground/85">{item}</span>
                </div>
              ))}
            </div>
            {offering.note && (
              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground font-body italic">{offering.note}</p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard hover={false} className="mb-8">
            <h2 className="font-heading font-semibold text-lg mb-4 text-foreground">Next Steps</h2>
            <div className="space-y-4">
              {[
                { step: '01', text: 'Click "Message BTCALI on Instagram" below' },
                { step: '02', text: 'Send a DM — we\'ll respond with access instructions shortly' },
                { step: '03', text: 'You\'ll receive your personal unlock code and program details' },
                { step: '04', text: 'Enter your code on the BTCALI platform and begin training' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full gradient-bg-strong flex items-center justify-center flex-shrink-0 text-xs font-heading font-bold text-primary-foreground">
                    {step}
                  </div>
                  <p className="text-sm font-body text-foreground/80 pt-1">{text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContact}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl gradient-bg-strong text-primary-foreground font-heading font-bold text-lg glow-primary"
          >
            <Instagram className="w-6 h-6" />
            Message BTCALI on Instagram
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p className="text-center text-xs text-muted-foreground font-body">
            <MessageCircle className="w-3.5 h-3.5 inline mr-1" />
            DM us the program you want. We'll be with you shortly.
          </p>

          <div className="text-center">
            <Link to="/programs" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              ← Back to Programs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}