import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GlowButton({ children, className, variant = 'primary', size = 'default', onClick, disabled, ...props }) {
  const variants = {
    primary: 'gradient-bg-strong text-primary-foreground glow-primary hover:glow-primary-strong',
    secondary: 'glass glow-border text-foreground hover:bg-muted/40',
    ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'rounded-xl font-heading font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden',
        variants[variant],
        sizes[size],
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Top-edge light reflection */}
      {variant === 'primary' && (
        <span
          className="absolute top-0 left-4 right-4 h-px opacity-40 pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,hsl(0 0% 100%/0.8),transparent)' }}
        />
      )}
      {children}
    </motion.button>
  );
}