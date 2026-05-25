import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/useTheme';

// Per-theme logo color configs matching the BTCALI brand image
const THEME_LOGO = {
  carbon: {
    bt: '#A1A1AA',                            // muted grey
    cali: 'linear-gradient(135deg, #B8860B, #D4AF37, #F5E6A1)', // bronze → gold
    glow: 'drop-shadow(0 0 8px rgba(184,134,11,0.55))',
  },
  neon: {
    bt: '#9CA3AF',
    cali: 'linear-gradient(135deg, #8B5CF6, #BB5CF6, #3B82F6)', // electric purple → blue
    glow: 'drop-shadow(0 0 8px rgba(139,92,246,0.65))',
  },
  gold: {
    bt: '#71717A',                            // graphite
    cali: 'linear-gradient(135deg, #3F3F46, #71717A, #A1A1AA)', // matte black → steel grey
    glow: 'drop-shadow(0 0 6px rgba(161,161,170,0.3))',
  },
  ice: {
    bt: '#6B7280',
    cali: 'linear-gradient(135deg, #3B82F6, #BAE6FD)',           // blue → light blue
    glow: 'drop-shadow(0 0 8px rgba(59,130,246,0.4))',
  },
};

export default function Logo({ size = 'default', compact = false, className }) {
  const { theme } = useTheme();
  const colors = THEME_LOGO[theme] || THEME_LOGO.carbon;

  const sizes = {
    sm: compact ? 'text-lg' : 'text-xl',
    default: compact ? 'text-xl' : 'text-2xl',
    lg: compact ? 'text-2xl' : 'text-4xl',
    xl: compact ? 'text-3xl' : 'text-5xl',
  };

  if (compact) {
    return (
      <span
        className={cn('font-heading font-bold', sizes[size], className)}
        style={{
          background: colors.cali,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: colors.glow,
        }}
      >
        B
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-0', className)}>
      <span
        className={cn('font-heading font-bold tracking-tight transition-colors duration-500', sizes[size])}
        style={{ color: colors.bt }}
      >
        BT
      </span>
      <span
        className={cn('font-heading font-bold tracking-tight', sizes[size])}
        style={{
          background: colors.cali,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: colors.glow,
          transition: 'filter 0.5s ease',
        }}
      >
        CALI
      </span>
    </div>
  );
}