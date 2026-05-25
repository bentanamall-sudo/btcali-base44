import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/useTheme';

const THEME_CONFIG = {
  carbon: {
    outerRing: 'conic-gradient(from 0deg, #6B4C08, #B8860B, #D4AF37, #F5E6A1, #D4AF37, #B8860B, #6B4C08)',
    innerRing: 'conic-gradient(from 60deg, #B8860B, #D4AF37, #F5E6A1, #D4AF37, #B8860B)',
    bg: 'radial-gradient(circle at 35% 30%, #2A1F00, #141414 60%, #0A0A0A)',
    athleteColor: '#B8860B',
    textGrad: 'linear-gradient(180deg, #F5E6A1 0%, #D4AF37 40%, #B8860B 100%)',
    glow: '0 0 30px rgba(184,134,11,0.6), 0 0 60px rgba(184,134,11,0.25), 0 0 100px rgba(184,134,11,0.1)',
    wordmarkBT: '#A1A1AA',
    wordmarkCALI: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F5E6A1 100%)',
    wordmarkGlow: 'drop-shadow(0 0 8px rgba(212,175,55,0.65))',
  },
  neon: {
    outerRing: 'conic-gradient(from 0deg, #4C1D95, #8B5CF6, #BB5CF6, #3B82F6, #60A5FA, #8B5CF6, #4C1D95)',
    innerRing: 'conic-gradient(from 60deg, #8B5CF6, #A78BFA, #3B82F6, #60A5FA, #8B5CF6)',
    bg: 'radial-gradient(circle at 35% 30%, #1A0A3A, #111827 60%, #0B0B12)',
    athleteColor: '#8B5CF6',
    textGrad: 'linear-gradient(180deg, #E0C3FC 0%, #BB5CF6 40%, #8B5CF6 100%)',
    glow: '0 0 30px rgba(139,92,246,0.65), 0 0 60px rgba(59,130,246,0.25), 0 0 100px rgba(139,92,246,0.12)',
    wordmarkBT: '#9CA3AF',
    wordmarkCALI: 'linear-gradient(135deg, #8B5CF6 0%, #BB5CF6 50%, #3B82F6 100%)',
    wordmarkGlow: 'drop-shadow(0 0 8px rgba(139,92,246,0.75))',
  },
  ice: {
    outerRing: 'conic-gradient(from 0deg, #BAE6FD, #3B82F6, #60A5FA, #E0F2FE, #60A5FA, #3B82F6, #BAE6FD)',
    innerRing: 'conic-gradient(from 60deg, #3B82F6, #60A5FA, #BAE6FD, #60A5FA, #3B82F6)',
    bg: 'radial-gradient(circle at 35% 30%, #EFF6FF, #F0F9FF 60%, #E0F2FE)',
    athleteColor: '#3B82F6',
    textGrad: 'linear-gradient(180deg, #1D4ED8 0%, #3B82F6 40%, #60A5FA 100%)',
    glow: '0 0 24px rgba(59,130,246,0.45), 0 0 48px rgba(59,130,246,0.18)',
    wordmarkBT: '#4B5563',
    wordmarkCALI: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 50%, #60A5FA 100%)',
    wordmarkGlow: 'drop-shadow(0 0 6px rgba(59,130,246,0.55))',
  },
};

const BADGE_SIZES = {
  xs:      { badge: 28,  padding: 2, inner1: 3,  inner2: 4,  font: 9  },
  sm:      { badge: 36,  padding: 2, inner1: 3,  inner2: 4,  font: 11 },
  default: { badge: 44,  padding: 2, inner1: 3,  inner2: 5,  font: 14 },
  lg:      { badge: 80,  padding: 3, inner1: 5,  inner2: 7,  font: 24 },
  xl:      { badge: 140, padding: 4, inner1: 8,  inner2: 12, font: 42 },
  '2xl':   { badge: 200, padding: 5, inner1: 11, inner2: 16, font: 60 },
};

const WORDMARK_SIZES = {
  xs:      '0.6rem',
  sm:      '0.7rem',
  default: '0.85rem',
  lg:      '1.15rem',
  xl:      '1.6rem',
  '2xl':   '2rem',
};

export function LogoBadge({ size = 'default', className }) {
  const { theme } = useTheme();
  const c = THEME_CONFIG[theme] || THEME_CONFIG.carbon;
  const s = BADGE_SIZES[size] || BADGE_SIZES.default;
  const d = s.badge;

  return (
    <div
      className={cn('rounded-full flex-shrink-0 transition-all duration-500 relative', className)}
      style={{ width: d, height: d, background: c.outerRing, padding: s.padding, boxShadow: c.glow }}
    >
      <div className="w-full h-full rounded-full" style={{ background: c.innerRing, padding: s.inner1 }}>
        <div
          className="w-full h-full rounded-full flex flex-col items-center justify-center"
          style={{ background: c.bg, padding: s.inner2 }}
        >
          <svg
            viewBox="0 0 32 28"
            style={{
              width: d * 0.36,
              height: d * 0.3,
              fill: c.athleteColor,
              filter: `drop-shadow(0 0 ${d * 0.04}px ${c.athleteColor})`,
            }}
          >
            <circle cx="16" cy="3" r="2.8" />
            <rect x="1" y="7.5" width="30" height="2" rx="1" />
            <rect x="7" y="8" width="2" height="7" rx="1" transform="rotate(-15,8,12)" />
            <rect x="23" y="8" width="2" height="7" rx="1" transform="rotate(15,24,12)" />
            <rect x="13.5" y="14" width="5" height="8" rx="1.5" />
            <rect x="12" y="21" width="3.5" height="6" rx="1.5" transform="rotate(-8,13,24)" />
            <rect x="16.5" y="21" width="3.5" height="6" rx="1.5" transform="rotate(8,18,24)" />
          </svg>
          <div
            className="font-heading font-black leading-none text-center"
            style={{
              fontSize: s.font,
              background: c.textGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            BTCALI
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Logo({ size = 'default', showWordmark = true, className }) {
  const { theme } = useTheme();
  const c = THEME_CONFIG[theme] || THEME_CONFIG.carbon;
  const wSize = WORDMARK_SIZES[size] || WORDMARK_SIZES.default;

  return (
    <div className={cn('flex items-center gap-2.5 transition-all duration-500', className)}>
      <LogoBadge size={size} />
      {showWordmark && (
        <div className="flex items-baseline leading-none">
          <span className="font-heading font-black tracking-tight" style={{ fontSize: wSize, color: c.wordmarkBT }}>
            BT
          </span>
          <span
            className="font-heading font-black tracking-tight"
            style={{
              fontSize: wSize,
              background: c.wordmarkCALI,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: c.wordmarkGlow,
            }}
          >
            CALI
          </span>
        </div>
      )}
    </div>
  );
}