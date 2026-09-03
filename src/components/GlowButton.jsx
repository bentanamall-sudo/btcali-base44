import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GlowButton({ children, className, variant = 'primary', size = 'default', onClick, disabled, ...props }) {
  const variants = {
    primary: 'b-cta btn-shine',
    secondary: 'b-cta-outline',
    ghost: 'text-foreground/60 hover:text-foreground hover:bg-[#D1D1CB]/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    default: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-sm',
    xl: 'px-10 py-5 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'font-heading font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 relative overflow-hidden',
        variants[variant],
        sizes[size],
        disabled && 'opacity-40 cursor-not-allowed',
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