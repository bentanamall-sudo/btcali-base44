import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Zap, Lock, ChevronLeft, Clock } from 'lucide-react';

const FREE_CATEGORIES = [
  { id: 'master-basics', title: 'Master The Basics', description: 'Push, pull, and core fundamentals — the foundation everything is built on.', level: 'Beginner', icon: '📐' },
  { id: 'handstand-foundations', title: 'Handstand & Shoulder Foundations', description: 'Wrist warmups, pike push-ups, kick-ups, and beginner handstand development.', level: 'Beginner → Intermediate', icon: '⚡' },
  { id: 'planche-conditioning', title: 'FREE Planche Conditioning', description: 'Wrist prep, scapular strength, planche lean, straight arm conditioning.', level: 'Beginner → Intermediate', icon: '🔥', featured: true },
];

const PREMIUM_CATEGORIES = [
  { id: 'front-lever', title: 'Front Lever', description: 'Build horizontal pulling strength from hollow body to full front lever.', level: 'Intermediate → Advanced', icon: '🔱' },
  { id: 'l-sit-to-handstand', title: 'L-Sit to Handstand Full Guide', description: 'The complete system — bent arm press, L-sit to handstand, and all advanced progressions.', level: 'Intermediate → Elite', icon: '🏆' },
  { id: 'planche', title: 'Planche', description: 'Tuck, straddle, and full planche progressions.', level: 'Advanced → Elite', icon: '💪', comingSoon: true },
  { id: 'handstand-pushups', title: 'Handstand Pushups', description: 'Wall HSPU through to freestanding handstand push-up development.', level: 'Intermediate → Advanced', icon: '🏋️', comingSoon: true },
  { id: 'muscle-up', title: 'Muscle-Up', description: 'Explosive transition training — bar and rings.', level: 'Intermediate', icon: '⚡', comingSoon: true },
];

function CategoryCard({ cat, onClick, isPremium, isFree, locked }) {
  if (cat.comingSoon) {
    return (
      <div className="rounded-2xl overflow-hidden opacity-65"
        style={{ background: 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--surface-2)))', border: '1px solid hsl(var(--border)/0.35)' }}>
        <div className="h-px w-full opacity-20" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>{cat.icon}</div>
            <span className="flex items-center gap-1 text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-muted/40 text-muted-foreground border border-border/30">
              <Clock className="w-3 h-3" /> Coming Soon
            </span>
          </div>
          <h3 className="font-heading font-bold text-base text-foreground/60 mb-1.5">{cat.title}</h3>
          <p className="text-sm font-body text-muted-foreground/55 leading-relaxed mb-3">{cat.description}</p>
          <div className="pt-3 border-t border-border/20">
            <span className="text-xs font-body text-muted-foreground/40">{cat.level}</span>
          </div>
        </div>
      </div>
    );
  }

  if (isFree) {
    return (
      <motion.div whileHover={{ y: -2, transition: { duration: 0.2 } }} onClick={onClick}
        className="cursor-pointer group rounded-2xl overflow-hidden relative flex items-stretch"
        style={{
          background: cat.featured ? '#1A1A1A' : '#F4F4F2',
          color: cat.featured ? '#F4F4F2' : '#1A1A1A',
          border: cat.featured ? '2px solid #CCFF00' : '1px solid #D1D1CB',
          minHeight: '140px',
        }}
      >
        <div className="w-1 flex-shrink-0 rounded-l-2xl"
          style={{ background: cat.featured ? 'linear-gradient(180deg, #D4AF37, #B8860B)' : 'linear-gradient(180deg, #6B7280, transparent)' }} />
        <div className="flex items-center justify-center px-5 py-6 flex-shrink-0">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: cat.featured ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.08)', border: cat.featured ? '1.5px solid rgba(212,175,55,0.35)' : '1px solid rgba(212,175,55,0.15)' }}>
            {cat.icon}
          </div>
        </div>
        <div className="flex-1 py-6 pr-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {cat.featured && (
                <span className="inline-flex items-center gap-1 bg-primary/15 border border-primary/35 rounded-full px-2.5 py-0.5 text-xs font-heading font-bold text-primary uppercase tracking-wider">
                  <Zap className="w-3 h-3" /> Start Here
                </span>
              )}
              <span className="text-xs font-heading font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Free</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors">{cat.title}</h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">{cat.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
            <span className="text-xs font-body text-muted-foreground/55">{cat.level}</span>
            <span className="text-sm font-heading font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">Explore →</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Premium card — always shows lock if locked
  if (locked) {
    return (
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: '#F4F4F2', border: '2px solid #CCFF00' }}>
        <div className="h-px w-full opacity-40" style={{ background: 'linear-gradient(90deg, transparent, #CCFF00, transparent)' }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>{cat.icon}</div>
            <span className="flex items-center gap-1 text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
              <Lock className="w-3 h-3" /> Members Only
            </span>
          </div>
          <h3 className="font-heading font-bold text-base mb-1.5 gradient-text">{cat.title}</h3>
          <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">{cat.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <span className="text-xs font-body text-muted-foreground/50">{cat.level}</span>
            <span className="text-xs font-heading font-bold text-primary/50">Locked</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} onClick={onClick}
      className="cursor-pointer group rounded-2xl overflow-hidden relative"
      style={{ background: '#F4F4F2', border: '1px solid #CCFF00' }}>
      <div className="h-px w-full opacity-40 group-hover:opacity-80 transition-opacity"
        style={{ background: 'linear-gradient(90deg, transparent, #CCFF00, transparent)' }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>{cat.icon}</div>
          <span className="flex items-center gap-1 text-xs font-heading font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <Crown className="w-3 h-3" /> Members
          </span>
        </div>
        <h3 className="font-heading font-bold text-base mb-1.5 gradient-text">{cat.title}</h3>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">{cat.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <span className="text-xs font-body text-muted-foreground/50">{cat.level}</span>
          <span className="text-xs font-heading font-bold text-primary group-hover:translate-x-1 transition-transform">Explore →</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillLibrarySection({ sectionId: propSectionId }) {
  const { sectionId: paramSectionId } = useParams();
  const sectionId = propSectionId || paramSectionId;
  const navigate = useNavigate();

  const isFree = sectionId === 'free';
  const isPremium = sectionId === 'premium';

  if (!isFree && !isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-body mb-4">Section not found.</p>
          <Link to="/skills" className="text-primary font-heading font-semibold">← Back to Skill Library</Link>
        </div>
      </div>
    );
  }

  const categories = isFree ? FREE_CATEGORIES : PREMIUM_CATEGORIES;
  const title = isFree ? 'Free Tutorials' : 'BTCALI Premium Tutorials';
  const subtitle = isFree ? 'Open to everyone' : 'BTCALI Members Only — Contact BTCALI Coaching for access.';

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <Link to="/skills" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-body hover:text-foreground transition-colors mb-8">
        <ChevronLeft className="w-4 h-4" /> Back to Skill Library
      </Link>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          {isFree ? (
            <span className="text-xs font-heading font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Free</span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-heading font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
              <Lock className="w-3 h-3" /> Members Only
            </span>
          )}
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
          {isFree ? title : <span className="gradient-text">{title}</span>}
        </h1>
        <p className="text-muted-foreground font-body">{subtitle}</p>
      </motion.div>

      {/* Premium section CTA */}
      {isPremium && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="glass-strong rounded-2xl p-6 sm:p-8 border border-primary/30 mb-8 text-center glow-border">
          <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-heading font-bold text-lg text-foreground mb-1">BTCALI Members Only</h2>
          <p className="text-sm font-body text-muted-foreground mb-5">These tutorials are exclusively available to BTCALI coaching members. Contact BTCALI Coaching for access.</p>
          <Link to="/1-on-1-coaching">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary">
              <Crown className="w-4 h-4" /> Contact BTCALI Coaching
            </motion.button>
          </Link>
        </motion.div>
      )}

      {isFree && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 border border-primary/20 mb-8 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-heading font-bold text-foreground text-base mb-1">Want personalised coaching?</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              If you want a routine built around your exact level, goals, weaknesses and equipment, apply for 1-on-1 coaching.
            </p>
          </div>
          <Link to="/scan" className="flex-shrink-0">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm whitespace-nowrap"
              style={{ boxShadow: '0 0 16px hsl(var(--glow-primary)/0.2)' }}>
              <Crown className="w-4 h-4" /> Complete Athlete Scan
            </motion.button>
          </Link>
        </motion.div>
      )}

      <div className={isFree ? "space-y-4" : "grid sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
        {categories.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <CategoryCard
              cat={cat}
              isPremium={isPremium}
              isFree={isFree}
              locked={isPremium}
              onClick={() => {
                if (!cat.comingSoon && isFree) navigate(`/skills/${cat.id}`);
                // Premium cards navigate to the category page which shows the lock gate
                if (!cat.comingSoon && isPremium) navigate(`/skills/${cat.id}`);
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}