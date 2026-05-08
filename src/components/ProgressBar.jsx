import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProgressBar({ value = 0, max = 100, className, showLabel = true, size = 'default' }) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const heights = {
    sm: 'h-1.5',
    default: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-body text-muted-foreground">{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full bg-muted/50 overflow-hidden', heights[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('h-full rounded-full progress-glow')}
        />
      </div>
    </div>
  );
}