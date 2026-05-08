import { motion } from 'framer-motion';
import GlassCard from '../GlassCard';
import ProgressBar from '../ProgressBar';

const skillProgress = [
  { name: 'Handstand', progress: 35, level: 'Wall Hold → Kick-Up' },
  { name: 'HSPU', progress: 10, level: 'Pike Pushups' },
  { name: 'Planche', progress: 5, level: 'Wrist Prep' },
  { name: 'Front Lever', progress: 15, level: 'Tuck Hold' },
  { name: 'Muscle-Up', progress: 20, level: 'High Pullups' },
];

export default function SkillsOverview() {
  return (
    <GlassCard glow hover={false}>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Skill Progress</h3>
      <div className="space-y-4">
        {skillProgress.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-sm text-foreground">{skill.name}</span>
              <span className="text-xs text-muted-foreground font-body">{skill.level}</span>
            </div>
            <ProgressBar value={skill.progress} showLabel={false} size="sm" />
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}