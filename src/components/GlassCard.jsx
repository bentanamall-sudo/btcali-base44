import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GlassCard({ children, className, glow, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'p-6 b-card',
        glow && 'b-card-accent',
        hover && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}