import { useState } from 'react';
import { CheckCircle, Circle, Flame } from 'lucide-react';
import GlassCard from '../GlassCard';

const MISSION_TITLE = "Complete today's workout.";

export default function DailyMissions() {
  const [done, setDone] = useState(false);

  return (
    <GlassCard glow hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          Daily Mission
        </h3>
        {done && <span className="text-xs text-primary font-heading font-semibold glass px-2 py-1 rounded-full">Done ✓</span>}
      </div>
      <button
        onClick={() => setDone(!done)}
        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left ${
          done ? 'glass glow-border' : 'hover:bg-muted/20 glass'
        }`}
      >
        {done ? (
          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
        ) : (
          <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
        )}
        <span className={`font-body text-base flex-1 ${done ? 'text-foreground line-through opacity-60' : 'text-foreground'}`}>
          {MISSION_TITLE}
        </span>
      </button>
    </GlassCard>
  );
}