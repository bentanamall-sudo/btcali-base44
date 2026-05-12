import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, ArrowRight, Trophy, Users, Star, Crown, Gift } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

const SKILLS = [
  'Handstand','Handstand Push-Up','Pike Push-Up','Bent Arm Press','L-Sit',
  'L-Sit To Handstand','Muscle-Up','Front Lever','Front Lever Progressions',
  'Front Lever Pull-Ups','Planche','Planche Progressions','Push-Up Strength',
  'Pull-Up Strength','Dip Strength','Mobility','Body Control',
  'Strength Endurance','Building Muscle','Improving Technique','Skill Mastery',
];

const INCLUDED = [
  '24/7 text access for support, questions, and coaching guidance',
  'Responses generally within a few hours — before your next workout',
  'In-depth form analysis and technique breakdowns',
  'Personalized feedback to improve faster and avoid mistakes',
  'Fully personalized program tailored to your goals, weaknesses, schedule, and level',
  'Programs designed for maximum speed, safety, and efficiency',
  'One-time 10-minute coaching call at the start to align goals',
  'Ongoing support throughout your calisthenics journey',
  'Skill-specific progression systems and advanced movement breakdowns',
  'Video analysis and correction feedback',
  'Detailed explanations behind exercises and programming',
  'Progress tracking and technique correction support',
  'Mobility, recovery, and injury prevention guidance',
  'Access to BTCALI coaching resources and tutorials',
  'Unlimited access to materials related to your goals',
];

const WHO_FOR = [
  'Serious athletes', 'Motivated beginners', 'Intermediate athletes',
  'Advanced calisthenics athletes', 'Athletes who want fast structured progress',
  'Athletes who want detailed coaching support',
  'Athletes willing to stay consistent over multiple months',
];

const COACHING_STYLE = [
  'Fast but sustainable progress', 'Proper technique and movement quality',
  'Body control and skill mastery', 'Injury prevention',
  'Personalized progression', 'Elite athlete development', 'Long-term mastery',
];

export default function CoachingApply() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Elite Coaching</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          BTCALI <span className="gradient-text">1-on-1 Coaching</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
          A premium elite calisthenics coaching system designed to help serious athletes rapidly improve strength, body control, advanced skills, mobility, and overall performance through personalized guidance and in-depth coaching support.
        </p>
      </motion.div>

      {/* Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 glow-border mb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-heading text-primary uppercase tracking-widest font-bold mb-3">Payment Options</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="glass rounded-2xl px-8 py-4 border border-primary/50 glow-primary">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading text-primary uppercase tracking-wider font-bold">Most Popular</span>
              </div>
              <div className="font-heading font-bold text-4xl gradient-text">$40<span className="text-lg text-muted-foreground font-body font-normal">/week</span></div>
            </div>
            <div className="text-muted-foreground font-body text-sm">or</div>
            <div className="glass rounded-2xl px-8 py-4 border border-border/40">
              <div className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-1">Monthly — Save $10</div>
              <div className="font-heading font-bold text-4xl gradient-text">$150<span className="text-lg text-muted-foreground font-body font-normal">/month</span></div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Gift className="w-4 h-4 text-green-400" />
            <span className="text-sm font-body text-green-400 font-medium">Referral: Earn $5 credit every time a friend joins BTCALI coaching</span>
          </div>
        </div>
      </motion.div>

      {/* What BTCALI Helps With */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          What BTCALI Coaching <span className="gradient-text">Helps With</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-5">Skills &amp; Goals</p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => (
            <span key={s} className="text-sm font-body glass px-3 py-1.5 rounded-full border border-primary/20 text-foreground/80 hover:border-primary/50 hover:text-primary transition-all">{s}</span>
          ))}
        </div>
      </motion.div>

      {/* What's Included */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-5">
          {"What's "}
          <span className="gradient-text">Included</span>
        </h2>
        <GlassCard glow hover={false}>
          <div className="grid sm:grid-cols-2 gap-2">
            {INCLUDED.map(item => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-body text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Who It's For + Style */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-bold text-lg text-foreground">Who It's For</h3>
            </div>
            <ul className="space-y-2">
              {WHO_FOR.map(w => (
                <li key={w} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  {w}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-bold text-lg text-foreground">Coaching Style</h3>
            </div>
            <ul className="space-y-2">
              {COACHING_STYLE.map(c => (
                <li key={c} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  {c}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>

      {/* Goal */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 glow-border mb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">The Goal of BTCALI</h3>
          <p className="text-foreground/80 font-body text-sm max-w-2xl mx-auto leading-relaxed">
            To help athletes unlock elite bodyweight strength, master advanced calisthenics skills, and achieve insane proven progress through high-level personalized coaching and support.
          </p>
        </div>
      </motion.div>

      {/* Results CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5 mb-10 border border-primary/20 text-center">
        <p className="font-heading font-semibold text-foreground mb-3">See real BTCALI student progress</p>
        <Link to="/results">
          <GlowButton variant="secondary">
            <Trophy className="w-4 h-4" /> View Athlete Results <ArrowRight className="w-4 h-4" />
          </GlowButton>
        </Link>
      </motion.div>

      {/* Apply CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-3">Ready to Start?</h2>
        <p className="text-muted-foreground font-body mb-6">Apply now and BTCALI will review your diagnostic and reach out personally.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/diagnostic">
            <GlowButton size="lg">
              <Zap className="w-5 h-5" /> Take Athlete Diagnostic <ArrowRight className="w-4 h-4" />
            </GlowButton>
          </Link>
          <Link to="/purchase?type=coaching">
            <GlowButton variant="secondary" size="lg">Apply Directly</GlowButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}