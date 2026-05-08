import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GlassCard({ children, className, glow, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-xl glass p-6',
        glow && 'glow-border',
        hover && 'cursor-pointer transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}