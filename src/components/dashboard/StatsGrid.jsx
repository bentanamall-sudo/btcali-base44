import { motion } from 'framer-motion';
import { Zap, Flame, Trophy, Dumbbell } from 'lucide-react';
import GlassCard from '../GlassCard';

const stats = [
  { label: 'Total XP', value: '1,240', icon: Zap, color: 'text-purple-400' },
  { label: 'Streak', value: '7 days', icon: Flame, color: 'text-orange-400' },
  { label: 'Rank', value: 'Warrior', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Workouts', value: '23', icon: Dumbbell, color: 'text-blue-400' },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard glow hover={false}>
              <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="font-heading font-bold text-2xl text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-body">{stat.label}</div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}