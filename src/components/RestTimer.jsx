import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, RotateCcw, Play, Pause } from 'lucide-react';

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '2 min', seconds: 120 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
];

export default function RestTimer({ className = '' }) {
  const [totalSeconds, setTotalSeconds] = useState(180);
  const [remaining, setRemaining] = useState(180);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) { setRunning(false); return 0; }
          return r - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, remaining]);

  const setPreset = (s) => {
    setTotalSeconds(s);
    setRemaining(s);
    setRunning(false);
  };

  const reset = () => {
    setRemaining(totalSeconds);
    setRunning(false);
  };

  const toggle = () => {
    if (remaining === 0) reset();
    else setRunning((r) => !r);
  };

  const pct = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0;
  const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
  const secs = String(remaining % 60).padStart(2, '0');
  const done = remaining === 0;
  const circumference = 2 * Math.PI * 54;

  return (
    <div className={`glass-strong rounded-2xl p-6 text-center ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Timer className="w-4 h-4 text-primary" />
        <span className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-widest">Rest Timer</span>
      </div>

      {/* Circular progress */}
      <div className="relative inline-flex items-center justify-center mb-5">
        <svg width="128" height="128" className="-rotate-90">
          <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--muted)/0.3)" strokeWidth="6" />
          <motion.circle
            cx="64" cy="64" r="54" fill="none"
            stroke="hsl(var(--gradient-start))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
            transition={{ duration: 0.5 }}
            style={{ filter: 'drop-shadow(0 0 6px hsl(var(--glow-primary) / 0.6))' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`font-heading font-bold text-3xl ${done ? 'text-primary' : 'text-foreground'}`}>
            {mins}:{secs}
          </span>
          {done && <span className="text-xs text-primary font-body animate-pulse">REST DONE</span>}
        </div>
      </div>

      {/* Presets */}
      <div className="flex justify-center gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p.seconds}
            onClick={() => setPreset(p.seconds)}
            className={`text-xs px-3 py-1.5 rounded-lg font-body transition-all ${
              totalSeconds === p.seconds
                ? 'gradient-bg-strong text-primary-foreground glow-primary'
                : 'glass text-muted-foreground hover:text-foreground'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-sm glow-primary"
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? 'Pause' : done ? 'Restart' : 'Start'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="p-2.5 glass rounded-xl text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}