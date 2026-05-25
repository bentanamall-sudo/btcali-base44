import { useTheme } from '@/lib/useTheme';

const LOGO_URLS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/e6f632bc8_btcali-gold.png',
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/201b41220_btcali-purple.png',
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/9d0721a14_btcali-light.png',
};

const GLOW_COLORS = {
  carbon: 'rgba(184,134,11,0.7)',
  neon:   'rgba(139,92,246,0.7)',
  ice:    'rgba(59,130,246,0.55)',
};

// Size presets in px width
const SIZES = {
  xs:      32,
  sm:      48,
  default: 64,
  navbar:  160,  // desktop navbar
  'navbar-mobile': 110, // mobile navbar
  page:    260,  // page headers
  hero:    360,  // hero centerpiece
};

// LogoBadge — official PNG with theme glow
export function LogoBadge({ size = 'default', className, style }) {
  const { theme } = useTheme();
  const src = LOGO_URLS[theme] || LOGO_URLS.carbon;
  const glow = GLOW_COLORS[theme] || GLOW_COLORS.carbon;
  const w = typeof size === 'number' ? size : (SIZES[size] ?? SIZES.default);

  return (
    <img
      src={src}
      alt="BTCALI Logo"
      className={className}
      style={{
        width: w,
        height: 'auto',
        filter: `drop-shadow(0 0 ${Math.round(w * 0.1)}px ${glow}) drop-shadow(0 0 ${Math.round(w * 0.2)}px ${glow.replace('0.7', '0.3').replace('0.55', '0.2')})`,
        transition: 'all 0.5s ease',
        ...style,
      }}
    />
  );
}

// HeroLogo — massive floating hero centerpiece
export function HeroLogo({ className }) {
  const { theme } = useTheme();
  const src = LOGO_URLS[theme] || LOGO_URLS.carbon;
  const glow = GLOW_COLORS[theme] || GLOW_COLORS.carbon;

  return (
    <div className={`relative flex items-center justify-center ${className || ''}`}>
      {/* Ambient glow layer behind */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '130%',
          height: '130%',
          background: `radial-gradient(circle, ${glow.replace('0.7','0.18')} 0%, transparent 70%)`,
          transition: 'all 0.5s ease',
        }}
      />
      <img
        src={src}
        alt="BTCALI Logo"
        className="animate-float relative z-10"
        style={{
          width: '100%',
          maxWidth: 380,
          height: 'auto',
          filter: `drop-shadow(0 0 40px ${glow}) drop-shadow(0 0 80px ${glow.replace('0.7','0.25').replace('0.55','0.18')}) drop-shadow(0 8px 24px rgba(0,0,0,0.5))`,
          transition: 'filter 0.5s ease',
        }}
      />
    </div>
  );
}

// PageLogo — large centered logo for page headers
export function PageLogo({ className }) {
  const { theme } = useTheme();
  const src = LOGO_URLS[theme] || LOGO_URLS.carbon;
  const glow = GLOW_COLORS[theme] || GLOW_COLORS.carbon;

  return (
    <img
      src={src}
      alt="BTCALI Logo"
      className={className}
      style={{
        width: '100%',
        maxWidth: 280,
        height: 'auto',
        filter: `drop-shadow(0 0 24px ${glow}) drop-shadow(0 0 48px ${glow.replace('0.7','0.2').replace('0.55','0.15')})`,
        transition: 'all 0.5s ease',
      }}
    />
  );
}

// NavbarLogo — wide dominant navbar logo
export function NavbarLogo() {
  const { theme } = useTheme();
  const src = LOGO_URLS[theme] || LOGO_URLS.carbon;
  const glow = GLOW_COLORS[theme] || GLOW_COLORS.carbon;

  return (
    <img
      src={src}
      alt="BTCALI"
      style={{
        height: 52,
        width: 'auto',
        filter: `drop-shadow(0 0 12px ${glow}) drop-shadow(0 0 24px ${glow.replace('0.7','0.2').replace('0.55','0.15')})`,
        transition: 'all 0.5s ease',
      }}
    />
  );
}

// Default export — Logo (alias for NavbarLogo for backward compat)
export default function Logo() {
  return <NavbarLogo />;
}