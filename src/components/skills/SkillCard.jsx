import { motion } from 'framer-motion';
import { Lock, ArrowRight, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../GlassCard';
import ProgressBar from '../ProgressBar';

export default function SkillCard({ skill, progress = 0 }) {
  return (
    <div className="relative group">
      <GlassCard glow className="overflow-hidden p-0 relative">
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={skill.thumbnail}
          alt={skill.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${skill.locked ? 'blur-sm scale-105' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className={`p-4 ${skill.locked ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground">{skill.name}</h3>
          {!skill.locked && (
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        <ProgressBar value={progress} size="sm" />
        <div className="mt-3 flex flex-wrap gap-1">
          {skill.roadmap.slice(0, 3).map((stage, i) => (
            <span key={i} className="text-xs glass px-2 py-0.5 rounded-md text-muted-foreground font-body">
              {stage.name}
            </span>
          ))}
          {skill.roadmap.length > 3 && (
            <span className="text-xs text-muted-foreground font-body">+{skill.roadmap.length - 3} more</span>
          )}
        </div>
      </div>
      </GlassCard>

      {/* Premium Lock Overlay */}
      {skill.locked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center z-10"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--background) / 0.85), hsl(var(--primary) / 0.12))',
            backdropFilter: 'blur(2px)',
            border: '1px solid hsl(var(--glow-primary) / 0.3)',
            boxShadow: '0 0 30px hsl(var(--glow-primary) / 0.15), inset 0 0 30px hsl(var(--glow-primary) / 0.05)',
          }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 15px hsl(var(--glow-primary) / 0.4)', '0 0 30px hsl(var(--glow-primary) / 0.7)', '0 0 15px hsl(var(--glow-primary) / 0.4)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-full glass p-4 mb-3"
          >
            <Lock className="w-7 h-7 text-primary" />
          </motion.div>
          <p className="font-heading font-bold text-foreground text-sm mb-1">{skill.name}</p>
          <p className="text-xs text-muted-foreground font-body mb-4 px-4 text-center">Full roadmap locked</p>
          <Link to="/pricing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg-strong text-primary-foreground text-xs font-heading font-semibold glow-primary"
            >
              <Crown className="w-3.5 h-3.5" /> Unlock Pro
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}