import { motion } from 'framer-motion';
import { useAccessCodes } from '@/lib/useAccessCodes';
import { Link } from 'react-router-dom';
import { Layers, Lock, ArrowRight, Crown, CheckCircle, Clock, Users, Target, AlertCircle, Gift, Zap, Mail } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { programs } from '@/lib/programsData';
import CoachingCTA from '../components/programs/CoachingCTA';

function ProgramCard({ program, index, isProgramUnlocked }) {
  const unlocked = isProgramUnlocked(program.id);
  const isLocked = !program.available && !unlocked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="relative group"
    >
      <div className={`rounded-2xl overflow-hidden glass transition-all duration-300 ${
        program.featured ? 'ring-2 ring-primary/50' : 'hover:ring-1 hover:ring-primary/20'
      }`}>
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={program.thumbnail}
            alt={program.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLocked ? 'brightness-50' : 'brightness-75'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

          {/* Tag badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full backdrop-blur-sm ${program.tagColor}`}>
              {program.tag}
            </span>
          </div>

          {isLocked && (
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 glass rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          )}

          {program.featured && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 gradient-bg-strong text-primary-foreground px-2 py-1 rounded-full text-xs font-heading font-bold">
                <Crown className="w-3 h-3" /> Available Now
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-heading font-bold text-lg text-foreground leading-tight">{program.name}</h3>
            <span className="text-2xl flex-shrink-0">{program.emoji}</span>
          </div>

          <p className="text-sm text-muted-foreground font-body mb-1">
            <span className="text-primary">For:</span> {program.for}
          </p>
          <p className="text-sm text-foreground/80 font-body mb-4 leading-relaxed">{program.description}</p>

          {/* Requirements */}
          {program.requirements?.length > 0 && (
            <div className="glass rounded-xl p-3 mb-3 border border-amber-400/20">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-xs font-heading font-bold text-amber-400 uppercase tracking-wider">Requirements</span>
              </div>
              <div className="space-y-1">
                {program.requirements.map((req) => (
                  <div key={req} className="flex items-start gap-2 text-xs font-body text-foreground/75">
                    <div className="w-1 h-1 rounded-full bg-amber-400/70 flex-shrink-0 mt-1.5" />
                    {req}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goals */}
          {program.goals?.length > 0 && (
            <div className="glass rounded-xl p-3 mb-3 border border-primary/25">
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Goals</span>
              </div>
              <div className="space-y-1">
                {program.goals.map((goal) => (
                  <div key={goal} className="flex items-start gap-2 text-xs font-body text-foreground/80">
                    <CheckCircle className="w-3 h-3 text-primary/70 flex-shrink-0 mt-0.5" />
                    {goal}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bundle Note */}
          {program.bundleNote && (
            <div className="flex items-center gap-2 glass rounded-lg px-3 py-2 mb-3 border border-green-400/20">
              <Gift className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              <span className="text-xs font-body text-green-400 font-medium">{program.bundleNote}</span>
            </div>
          )}

          {/* Recommended */}
          {program.recommended?.length > 0 && (
            <div className="glass rounded-lg px-3 py-2 mb-3 border border-primary/15">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-3 h-3 text-primary/70" />
                <span className="text-xs font-heading font-semibold text-primary/80">Recommended Also</span>
              </div>
              {program.recommended.map((r) => (
                <p key={r} className="text-xs text-muted-foreground font-body">{r}</p>
              ))}
            </div>
          )}

          {/* Includes */}
          <div className="space-y-1.5 mb-5">
            {program.includes.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-body text-foreground/60">
                <CheckCircle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA */}
          {isLocked ? (
            <div className="space-y-3">
              <div className="glass rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-heading font-semibold text-amber-400">Coming Soon — $30</span>
                </div>
                <p className="text-xs text-muted-foreground font-body">
                  Apply for the waiting list to be notified when this program launches.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const subject = encodeURIComponent('BTCALI $30 Program Waiting List Application');
                  const body = encodeURIComponent(`I want to apply for the waiting list for this BTCALI $30 program:\n\nProgram:\n${program.name}\n\nMy goal/skill:\n${program.skill}\n\nName:\n[Your name]\n\nEmail:\n[Your email]`);
                  const a = document.createElement('a');
                  a.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
                  a.rel = 'noopener';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground text-sm font-heading font-semibold glow-primary"
              >
                <Mail className="w-4 h-4" />
                Apply for {program.name} Waiting List
              </motion.button>
            </div>
          ) : program.tag === 'AVAILABLE NOW' || program.tag === 'PREMIUM' ? (
            <Link to={program.to}>
              <GlowButton className="w-full" variant="primary">
                <Crown className="w-4 h-4" /> {program.cta}
                <ArrowRight className="w-4 h-4" />
              </GlowButton>
            </Link>
          ) : (
            <Link to={program.to}>
              <GlowButton className="w-full" variant={program.featured ? 'primary' : 'secondary'}>
                {program.cta}
                <ArrowRight className="w-4 h-4" />
              </GlowButton>
            </Link>
          )}
        </div>
      </div>

      {/* Glow border for featured */}
      {program.featured && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: '0 0 40px hsl(var(--glow-primary) / 0.2), inset 0 0 20px hsl(var(--glow-primary) / 0.05)' }}
        />
      )}
    </motion.div>
  );
}

export default function Programs() {
  const { isProgramUnlocked } = useAccessCodes();
  const freePrograms = programs.filter(p => p.tag === 'FREE');
  const availableNow = programs.filter(p => p.tag === 'AVAILABLE NOW');
  const planchePrograms = programs.filter(p => p.tag === 'PREMIUM' && p.skill === 'Planche');
  const frontLeverPrograms = programs.filter(p => p.tag === 'PREMIUM' && p.skill === 'Front Lever');
  const otherPremium = programs.filter(p => p.tag === 'PREMIUM' && p.skill !== 'Planche' && p.skill !== 'Front Lever');
  const comingSoon = programs.filter(p => p.tag === 'COMING SOON');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">BTCALI Programs</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Training <span className="gradient-text">Programs</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
          Structured calisthenics pathways built for real results. Start free. Scale up.
        </p>
      </motion.div>

      {/* Coming soon notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 mb-12 max-w-3xl mx-auto text-center glow-border"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-primary" />
          <span className="font-heading font-semibold text-foreground">Full Programs Are Being Built</span>
        </div>
        <p className="text-sm text-muted-foreground font-body">
          Full BTCALI skill programs are currently in development. In the meantime, our free guides are live and 
          <strong className="text-foreground"> 1-on-1 coaching</strong> is available for athletes who want custom programming, video feedback, and direct guidance now.
        </p>
      </motion.div>

      {/* Free Programs */}
      {freePrograms.length > 0 && (
        <div className="mb-12">
          <h2 className="font-heading font-bold text-xl mb-6 text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Free Programs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freePrograms.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} isProgramUnlocked={isProgramUnlocked} />
            ))}
          </div>
        </div>
      )}

      {/* Available Now */}
      {availableNow.length > 0 && (
        <div className="mb-12">
          <h2 className="font-heading font-bold text-xl mb-6 text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
            Available Now
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableNow.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} isProgramUnlocked={isProgramUnlocked} />
            ))}
          </div>
        </div>
      )}

      {/* Planche Programs */}
      {planchePrograms.length > 0 && (
        <div className="mb-12">
          <h2 className="font-heading font-bold text-xl mb-2 text-foreground flex items-center gap-2">
            <Crown className="w-4 h-4 text-primary" />
            <span>Planche Programs</span>
          </h2>
          <p className="text-sm text-muted-foreground font-body mb-6">V1 → V4 structured progression pathway</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {planchePrograms.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} isProgramUnlocked={isProgramUnlocked} />
            ))}
          </div>
        </div>
      )}

      {/* Front Lever Programs */}
      {frontLeverPrograms.length > 0 && (
        <div className="mb-12">
          <h2 className="font-heading font-bold text-xl mb-2 text-foreground flex items-center gap-2">
            <Crown className="w-4 h-4 text-cyan-400" />
            <span className="text-foreground">Front Lever Programs</span>
          </h2>
          <p className="text-sm text-muted-foreground font-body mb-6">V1 → Advanced V6 structured progression pathway</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontLeverPrograms.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} isProgramUnlocked={isProgramUnlocked} />
            ))}
          </div>
        </div>
      )}

      {/* Other Premium */}
      {otherPremium.length > 0 && (
        <div className="mb-12">
          <h2 className="font-heading font-bold text-xl mb-6 text-foreground flex items-center gap-2">
            <Crown className="w-4 h-4 text-primary" />
            <span>Premium Programs</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPremium.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} isProgramUnlocked={isProgramUnlocked} />
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon */}
      {comingSoon.length > 0 && (
        <div className="mb-12">
          <h2 className="font-heading font-bold text-xl mb-6 text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Coming Soon</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoon.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} isProgramUnlocked={isProgramUnlocked} />
            ))}
          </div>
        </div>
      )}

      <CoachingCTA />
    </div>
  );
}