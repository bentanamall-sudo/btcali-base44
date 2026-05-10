import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Mail, Users, CheckCircle, Crown, Zap, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const INQUIRY_GROUP_URL = 'https://ig.me/j/AbaAth3FA0NMTibx/';
const EMAIL = 'ben.tanamall@gmail.com';

const offeringDetails = {
  coaching: {
    title: '1-on-1 Elite Coaching',
    emoji: '👁️',
    tag: 'EXCLUSIVE ACCESS',
    tagColor: 'text-primary bg-primary/20',
    description: 'Direct athlete-to-coach programming. Built around your body, your goals, your timeline.',
    includes: [
      'Custom periodized training program',
      'Weekly video feedback on your form',
      'Direct coach messaging (Mon–Fri)',
      'Monthly strategy & review calls',
      'Adaptive programming as you evolve',
      'Full skill roadmap access',
    ],
    note: 'Spots are strictly limited. Serious athletes only.',
  },
  handstand: {
    title: 'Handstand Program',
    emoji: '🤸',
    tag: 'PREMIUM PROGRAM',
    tagColor: 'text-purple-400 bg-purple-400/20',
    description: 'A complete, structured handstand system built to take you from instability to freestanding mastery.',
    includes: [
      '12-week periodized handstand progression',
      'Wall drills → kick-up → balance → freestanding hold',
      'Phase-by-phase video breakdown',
      'HSPU preparation pathway included',
      'One-arm handstand conditioning prep',
      'Weekly structure & milestone tracking',
    ],
    note: 'Designed for athletes who are serious about handstand mastery.',
  },
  planche: {
    title: 'Planche Program',
    emoji: '💪',
    tag: 'PREMIUM PROGRAM',
    tagColor: 'text-amber-400 bg-amber-400/20',
    description: 'A systematic planche development program built on strength science and progressive overload.',
    includes: [
      'Tuck → Advanced Tuck → Straddle → Full Planche',
      'Wrist and scapula preparation protocols',
      'Straight-arm strength periodization',
      'Planche lean progression system',
      '12-week structured plan',
      'Conditioning benchmarks per phase',
    ],
    note: 'Requires planche foundation or free conditioning guide completion.',
  },
  frontlever: {
    title: 'Front Lever Program',
    emoji: '🔱',
    tag: 'PREMIUM PROGRAM',
    tagColor: 'text-cyan-400 bg-cyan-400/20',
    description: 'Elite pulling strength. Structured progressions to unlock the full front lever.',
    includes: [
      'Tuck → Advanced Tuck → Straddle → Full Front Lever',
      'Lat and core activation protocols',
      'Scapular retraction strength work',
      'Periodized volume & intensity cycles',
      '12-week structured roadmap',
    ],
    note: 'Requires solid pulling base (10+ pull-ups recommended).',
  },
  default: {
    title: 'BTCALI Access',
    emoji: '⚡',
    tag: 'ATHLETE ONBOARDING',
    tagColor: 'text-primary bg-primary/20',
    description: 'Message BTCALI to receive athlete onboarding details, program recommendations, and your personal access instructions.',
    includes: [
      'Personalized program recommendation',
      'Skill-specific roadmap assignment',
      'Custom unlock code for platform access',
      'Onboarding walkthrough from your coach',
      'Progress tracking from day one',
    ],
    note: 'Each athlete receives a unique code tied to their specific program.',
  },
};

const steps = [
  {
    num: '01',
    title: 'Reach Out',
    desc: 'Email BTCALI or join the inquiry group below.',
  },
  {
    num: '02',
    title: 'Get Assessed',
    desc: 'BTCALI responds with onboarding instructions, coaching details, and your recommended pathway.',
  },
  {
    num: '03',
    title: 'Receive Your Code',
    desc: 'You\'ll receive a personal unlock code — e.g. JaydenBTCALI — tied to your specific program.',
  },
  {
    num: '04',
    title: 'Unlock & Train',
    desc: 'Enter your code on the BTCALI platform. Your program unlocks instantly. Begin training.',
  },
];

export default function Purchase() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type') || 'default';
  const offering = offeringDetails[type] || offeringDetails.default;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/6 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="text-6xl mb-5">{offering.emoji}</div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold mb-4 ${offering.tagColor}`}>
            <Crown className="w-3 h-3" />
            {offering.tag}
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
            <span className="gradient-text">{offering.title}</span>
          </h1>
          <p className="text-muted-foreground font-body text-base max-w-lg mx-auto leading-relaxed">
            {offering.description}
          </p>
        </motion.div>

        {/* What's Included */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard glow hover={false} className="mb-6">
            <h2 className="font-heading font-semibold text-base mb-4 text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> What's Included
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
              <div className="mt-5 pt-4 border-t border-border/30 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body">{offering.note}</p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard hover={false} className="mb-8">
            <h2 className="font-heading font-semibold text-base mb-5 text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> How Access Works
            </h2>
            <div className="space-y-5">
              {steps.map(({ num, title, desc }) => (
                <div key={num} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full gradient-bg-strong flex items-center justify-center flex-shrink-0 text-xs font-heading font-bold text-primary-foreground">
                    {num}
                  </div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-foreground">{title}</p>
                    <p className="text-xs font-body text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">

          {/* Email */}
          <motion.a
            href={`mailto:${EMAIL}?subject=BTCALI%20Access%20%E2%80%94%20${encodeURIComponent(offering.title)}&body=Hi%20BTCALI%2C%0A%0AI%27m%20interested%20in%20the%20${encodeURIComponent(offering.title)}.%20Please%20send%20me%20onboarding%20details.%0A%0AThanks`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary cursor-pointer"
          >
            <Mail className="w-5 h-5" />
            Email BTCALI
            <ArrowRight className="w-4 h-4 ml-auto" />
          </motion.a>

          {/* Inquiry Group */}
          <motion.a
            href={INQUIRY_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl glass glow-border text-foreground font-heading font-semibold text-base cursor-pointer"
          >
            <Users className="w-5 h-5 text-primary" />
            Join BTCALI Inquiry Group
            <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </motion.a>

          <p className="text-center text-xs text-muted-foreground font-body pt-1">
            Reach out via either channel — BTCALI responds with your onboarding details and personal access code.
          </p>

          <div className="text-center pt-2">
            <Link to="/programs" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              ← Back to Programs
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}