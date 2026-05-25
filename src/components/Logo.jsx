import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/useTheme';

// Per-theme logo color configs — exact BTCALI brand palette
const THEME_LOGO = {
  carbon: {
    // BTCALI Elite — metallic bronze/gold
    ring: 'conic-gradient(from 0deg, #B8860B, #D4AF37, #F5E6A1, #D4AF37, #B8860B)',
    bg: 'linear-gradient(145deg, #141414, #0A0A0A)',
    bt: '#A1A1AA',
    cali: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 45%, #F5E6A1 70%, #D4AF37 100%)',
    glow: '0 0 24px rgba(184,134,11,0.55), 0 0 48px rgba(184,134,11,0.2)',
    textGlow: 'drop-shadow(0 0 10px rgba(212,175,55,0.7))',
  },
  neon: {
    // Futuristic — electric purple/blue
    ring: 'conic-gradient(from 0deg, #8B5CF6, #BB5CF6, #3B82F6, #60A5FA, #8B5CF6)',
    bg: 'linear-gradient(145deg, #111827, #0B0B12)',
    bt: '#9CA3AF',
    cali: 'linear-gradient(135deg, #8B5CF6 0%, #BB5CF6 50%, #3B82F6 100%)',
    glow: '0 0 24px rgba(139,92,246,0.6), 0 0 48px rgba(59,130,246,0.2)',
    textGlow: 'drop-shadow(0 0 10px rgba(139,92,246,0.8))',
  },
  gold: {
    // Matte Black — graphite stealth
    ring: 'conic-gradient(from 0deg, #2A2A2A, #71717A, #A1A1AA, #71717A, #2A2A2A)',
    bg: 'linear-gradient(145deg, #0F0F0F, #000000)',
    bt: '#52525B',
    cali: 'linear-gradient(135deg, #3F3F46 0%, #71717A 50%, #A1A1AA 100%)',
    glow: '0 0 16px rgba(113,113,122,0.3), 0 0 32px rgba(113,113,122,0.1)',
    textGlow: 'drop-shadow(0 0 6px rgba(161,161,170,0.4))',
  },
  ice: {
    // Light — white/soft blue
    ring: 'conic-gradient(from 0deg, #BAE6FD, #3B82F6, #60A5FA, #BAE6FD, #3B82F6)',
    bg: 'linear-gradient(145deg, #F3F4F6, #E0F2FE)',
    bt: '#6B7280',
    cali: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #BAE6FD 100%)',
    glow: '0 0 20px rgba(59,130,246,0.35), 0 0 40px rgba(59,130,246,0.12)',
    textGlow: 'drop-shadow(0 0 8px rgba(59,130,246,0.5))',
  },
};

export default function Logo({ size = 'default', compact = false, className }) {
  const { theme } = useTheme();
  const c = THEME_LOGO[theme] || THEME_LOGO.carbon;

  // Size mapping for the badge
  const badgeSizes = {
    sm:      { badge: 32, text: '0.65rem', bt: '0.5rem' },
    default: { badge: 40, text: '0.8rem',  bt: '0.6rem' },
    lg:      { badge: 56, text: '1.1rem',  bt: '0.7rem' },
    xl:      { badge: 72, text: '1.4rem',  bt: '0.85rem' },
  };

  const s = badgeSizes[size] || badgeSizes.default;

  if (compact) {
    return (
      <span
        className={cn('font-heading font-black', className)}
        style={{
          fontSize: s.text,
          background: c.cali,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: c.textGlow,
        }}
      >
        B
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* Circular badge */}
      <div
        className="rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-500"
        style={{
          width: s.badge,
          height: s.badge,
          background: c.ring,
          padding: '2px',
          boxShadow: c.glow,
        }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{ background: c.bg }}
        >
          <span
            className="font-heading font-black leading-none"
            style={{
              fontSize: `calc(${s.badge}px * 0.38)`,
              background: c.cali,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            B
          </span>
        </div>
      </div>

      {/* Wordmark */}
      <div className="flex items-baseline gap-0 leading-none">
        <span
          className="font-heading font-black tracking-tight transition-colors duration-500"
          style={{ fontSize: s.text, color: c.bt }}
        >
          BT
        </span>
        <span
          className="font-heading font-black tracking-tight"
          style={{
            fontSize: s.text,
            background: c.cali,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: c.textGlow,
            transition: 'filter 0.5s ease',
          }}
        >
          CALI
        </span>
      </div>
    </div>
  );
}