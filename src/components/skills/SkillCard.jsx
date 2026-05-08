import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import GlassCard from '../GlassCard';
import ProgressBar from '../ProgressBar';

export default function SkillCard({ skill, progress = 0 }) {
  return (
    <GlassCard glow className="group overflow-hidden p-0 relative">
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={skill.thumbnail}
          alt={skill.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Lock overlay */}
        {skill.locked && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
            <div className="glass rounded-full p-4 glow-border">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground">{skill.name}</h3>
          {!skill.locked && (
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>

        <ProgressBar value={progress} size="sm" />

        {/* Roadmap preview */}
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

        {skill.locked && (
          <div className="mt-3">
            <span className="text-xs font-heading font-semibold gradient-text">Unlock with Pro →</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}