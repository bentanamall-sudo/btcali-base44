import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GlowButton({ children, className, variant = 'primary', size = 'default', onClick, disabled, ...props }) {
  const variants = {
    primary: 'gradient-bg-strong text-primary-foreground glow-primary hover:glow-primary-strong',
    secondary: 'glass glow-border text-foreground hover:bg-muted/50',
    ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'rounded-xl font-heading font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}