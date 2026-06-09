import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Crown, Zap, Lock } from 'lucide-react';
import { PageHeaderLogo } from '../components/Logo';

const FREE_SECTION = {
  title: 'Free Tutorials',
  subtitle: 'Open to everyone — no code required',
  icon: null,
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
  icon: null,
  accentColor: '#D4AF37',
  badge: 'Members Only',
  badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  description: 'The full BTCALI skill system — advanced progressions, premium categories, and exclusive coaching content for members.',
  includes: [
    'Front Lever',
    'L-Sit to Handstand Full Guide',
    'Planche — Coming Soon',
    'Handstand Pushups — Coming Soon',
    'Muscle Up — Coming Soon',
  ],
  path: '/skills/premium',
};

function SectionCard({ section, onClick }) {
  const isPremium = section.path === '/skills/premium';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="cursor-pointer group rounded-2xl overflow-hidden relative"
      style={{
        background: isPremium
          ? 'linear-gradient(145deg, hsl(var(--card)), hsl(42 78% 10%))'
          : 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))',
        border: isPremium
          ? '1.5px solid hsl(var(--primary)/0.45)'
          : '1px solid hsl(var(--border)/0.5)',
        boxShadow: isPremium ? '0 0 40px hsl(var(--glow-primary)/0.1)' : undefined,
      }}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${section.accentColor}, transparent)`,
          opacity: isPremium ? 0.7 : 0.4,
        }}
      />

      <div className="p-8 sm:p-10">
        {/* Badge row */}
        <div className="flex items-start justify-end mb-6">
          <span className={`text-xs font-heading font-bold px-3 py-1.5 rounded-full border ${section.badgeClass}`}>
            {section.badge}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-heading font-bold text-2xl sm:text-3xl mb-2"
          style={{ color: isPremium ? 'hsl(var(--primary))' : undefined }}
        >
          {isPremium ? (
            <span className="gradient-text">{section.title}</span>
          ) : section.title}
        </h2>
        <p className="font-heading font-semibold text-xs uppercase tracking-widest mb-4"
          style={{ color: isPremium ? 'hsl(var(--primary)/0.7)' : 'hsl(var(--muted-foreground))' }}>
          {section.subtitle}
        </p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
          {section.description}
        </p>

        {/* Includes list */}
        <div className="space-y-2 mb-8">
          {section.includes.map(item => (
            <div key={item} className="flex items-center gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: section.accentColor }}
              />
              <span className="text-sm font-body text-foreground/75">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-heading font-bold text-base transition-all duration-200"
          style={isPremium ? {} : {}}
          {...(isPremium
            ? { className: 'w-full py-4 rounded-xl flex items-center justify-center gap-2 font-heading font-bold text-base gradient-bg-strong text-primary-foreground glow-primary group-hover:glow-primary-strong transition-all duration-200' }
            : { className: 'w-full py-4 rounded-xl flex items-center justify-center gap-2 font-heading font-bold text-base border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200' }
          )}
        >
          {isPremium ? (
            <><Crown className="w-4 h-4" /> Explore Premium Tutorials</>
          ) : (
            <><Zap className="w-4 h-4" /> Explore Free Tutorials</>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillLibrary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <PageHeaderLogo />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5 border border-border/40">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">BTCALI Skill Library</span>
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4 leading-tight">
          The <span className="gradient-text">Skill Library</span>
        </h1>
        <p className="font-body text-muted-foreground text-base max-w-md mx-auto">
          Choose your path — free tutorials to build foundations, or premium member content for advanced skills.
        </p>
      </motion.div>

      {/* Two main section cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SectionCard section={FREE_SECTION} onClick={() => navigate('/skills/free')} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <SectionCard section={PREMIUM_SECTION} onClick={() => navigate('/skills/premium')} />
        </motion.div>
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-2 glass px-5 py-3 rounded-xl border border-border/30">
          <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />
          <p className="text-xs font-body text-muted-foreground">Premium tutorials require a BTCALI member access code or active coaching enrolment.</p>
        </div>
      </motion.div>
    </div>
  );
}