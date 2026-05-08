import { cn } from '@/lib/utils';

export default function Logo({ size = 'default', compact = false, className }) {
  const sizes = {
    sm: compact ? 'text-lg' : 'text-xl',
    default: compact ? 'text-xl' : 'text-2xl',
    lg: compact ? 'text-2xl' : 'text-4xl',
    xl: compact ? 'text-3xl' : 'text-5xl',
  };

  if (compact) {
    return (
      <span className={cn('font-heading font-bold gradient-text', sizes[size], className)}>
        B
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className={cn('font-heading font-bold gradient-text tracking-tight', sizes[size])}>
        BTC
      </span>
      <span className={cn('font-heading font-light text-foreground/80 tracking-tight', sizes[size])}>
        ALI
      </span>
    </div>
  );
}