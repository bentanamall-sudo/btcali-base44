import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BookOpen, Crown, Zap, Lock, Trophy } from 'lucide-react';
import { PageHeaderLogo } from '../components/Logo';

const FREE_SECTION = {
  title: 'Free Tutorials',
  subtitle: 'Open to everyone — no code required',
  accentColor: '#22c55e',
  badge: 'Free',
  badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  description: 'Build strong foundations in calisthenics with beginner and intermediate tutorials covering basics, handstand development, and planche conditioning.',
  includes: [
    'Master The Basics',
    'Handstand & Shoulder Foundations',
    'FREE Planche Conditioning',
  ],
  path: '/skills/free',
};

const PREMIUM_SECTION = {
  title: 'BTCALI Premium Tutorials',
  subtitle: 'BTCALI Members Only',
  accentColor: '#D4AF37',
  badge: 'Members Only',
  badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  description: 'Access tutorials covering all major calisthenics skills — including planche, front lever, front lever pull-ups, muscle-up, handstand, handstand push-up, L-sit to handstand, bent arm press, strength foundations, mobility, and much more.',
  includes: [
    'Planche',
    'Front Lever',
    'Front Lever Pull-Ups',
    'Muscle-Up',
    'Handstand & HSPU',
    'L-Sit to Handstand',
    'Bent Arm Press',
    'Mobility & Strength',
    'And Much More',
  ],
  path: '/skills/premium',
};

function SectionCard({ section, onClick }) {
  const isPremium = section.path === '/skills/premium';

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="cursor-pointer group rounded-2xl overflow-hidden relative flex flex-col h-full"
      style={{
        background: isPremium
          ? 'linear-gradient(145deg, hsl(var(--card)), hsl(42 78% 8%))'
          : 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))',
        border: isPremium
          ? '1.5px solid hsl(var(--primary)/0.35)'
          : '1px solid hsl(var(--border)/0.4)',
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${section.accentColor}, transparent)`, opacity: isPremium ? 0.6 : 0.35 }} />

      <div className="p-7 sm:p-8 flex flex-col flex-1">
        {/* Badge */}
        <div className="flex justify-end mb-5">
          <span className={`text-xs font-heading font-bold px-3 py-1.5 rounded-full border ${section.badgeClass}`}>
            {section.badge}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-1.5"
          style={{ color: isPremium ? 'hsl(var(--primary))' : undefined }}>
          {isPremium ? <span className="gradient-text">{section.title}</span> : section.title}
        </h2>
        <p className="font-heading font-semibold text-xs uppercase tracking-widest mb-4"
          style={{ color: isPremium ? 'hsl(var(--primary)/0.65)' : 'hsl(var(--muted-foreground))' }}>
          {section.subtitle}
        </p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
          {section.description}
        </p>

        {/* Includes list */}
        <div className="space-y-2 mb-7 flex-1">
          {section.includes.map(item => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: section.accentColor }} />
              <span className="text-sm font-body text-foreground/75">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA — always at bottom */}
        {isPremium ? (
          <div className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-heading font-bold text-base gradient-bg-strong text-primary-foreground transition-all duration-200"
            style={{ boxShadow: '0 0 16px hsl(var(--glow-primary)/0.15)' }}>
            <Crown className="w-4 h-4" /> Explore Premium Tutorials
          </div>
        ) : (
          <div className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-heading font-bold text-base border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200">
            <Zap className="w-4 h-4" /> Explore Free Tutorials
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SkillLibrary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="flex justify-center mb-6">
          <PageHeaderLogo />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-border/30">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">BTCALI Skill Library</span>
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-3 leading-tight">
          The <span className="gradient-text">Skill Library</span>
        </h1>
        <p className="font-body text-muted-foreground text-sm max-w-md mx-auto">
          Choose your path — free tutorials to build foundations, or premium member content for advanced skills.
        </p>
      </motion.div>

      {/* Two section cards — equal height */}
      <div className="grid sm:grid-cols-2 gap-5 items-stretch">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="flex">
          <SectionCard section={FREE_SECTION} onClick={() => navigate('/skills/free')} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex">
          <SectionCard section={PREMIUM_SECTION} onClick={() => navigate('/skills/premium')} />
        </motion.div>
      </div>

      {/* Coaching description + CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 glass rounded-2xl p-7 border border-primary/20">
        <h3 className="font-heading font-bold text-lg text-foreground mb-3">Skills I Coach</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
          I coach athletes through skills such as Planche, Front Lever, Handstand, Handstand Push-Ups, Muscle-Ups, L-Sit to Handstand, Bent Arm Press and many more.
        </p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
          Whether you're learning your first pike push-up, trying to unlock a muscle-up, building towards a front lever or working towards a full planche, BTCALI coaching is built around your current level and goals.
        </p>
        <Link to="/results">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary"
          >
            <Trophy className="w-5 h-5" /> See What BTCALI Athletes Have Achieved
          </motion.button>
        </Link>
        <p className="text-xs text-center font-body text-muted-foreground mt-3">
          This is what can be achieved through personalised BTCALI coaching.
        </p>
      </motion.div>

      {/* Bottom note */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-5 text-center">
        <div className="inline-flex items-center gap-2 glass px-5 py-3 rounded-xl border border-border/25">
          <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
          <p className="text-xs font-body text-muted-foreground">Premium tutorials require a BTCALI member access code or active coaching enrolment.</p>
        </div>
      </motion.div>
    </div>
  );
}