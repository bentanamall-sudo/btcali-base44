import { useState } from 'react';
import { CheckCircle, Circle, Flame } from 'lucide-react';
import GlassCard from '../GlassCard';

const initialMissions = [
  { id: 1, title: 'Complete 30s Wall Handstand', xp: 50 },
  { id: 2, title: '10 Pike Pushups', xp: 30 },
  { id: 3, title: '15 Pullups', xp: 40 },
  { id: 4, title: '20s L-Sit Hold', xp: 35 },
];

export default function DailyMissions() {
  const [completed, setCompleted] = useState({});

  const toggle = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <GlassCard glow hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          Daily Missions
        </h3>
        <span className="text-xs glass px-2 py-1 rounded-full font-body text-muted-foreground">
          {completedCount}/{initialMissions.length}
        </span>
      </div>
      <div className="space-y-2">
        {initialMissions.map((mission) => {
          const done = completed[mission.id];
          return (
            <button
              key={mission.id}
              onClick={() => toggle(mission.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                done ? 'glass glow-border' : 'hover:bg-muted/20'
              }`}
            >
              {done ? (
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className={`font-body text-sm flex-1 ${done ? 'text-foreground line-through opacity-60' : 'text-foreground'}`}>
                {mission.title}
              </span>
              <span className="text-xs font-heading font-semibold text-primary">+{mission.xp} XP</span>
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}