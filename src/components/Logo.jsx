import { useTheme } from '@/lib/useTheme';

// Official BTCALI PNG logos — new clean uploads
const LOGO_URLS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/9086a44ef_Screenshot2026-05-26at81207am.png',
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/8e79feae7_Screenshot2026-05-26at81220am.png',
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/afb5818ec_Screenshot2026-05-26at81230am.png',
};

const GLOW_COLORS = {
  carbon: 'rgba(184,134,11,0.75)',
  neon:   'rgba(139,92,246,0.75)',
  ice:    'rgba(59,130,246,0.6)',
};

// Preload all logos on module load so theme switching is instant
if (typeof window !== 'undefined') {
  Object.values(LOGO_URLS).forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

function useLogoState() {
  const { theme } = useTheme();
  return {
    src: LOGO_URLS[theme] || LOGO_URLS.carbon,
    glow: GLOW_COLORS[theme] || GLOW_COLORS.carbon,
  };
}

// Shared logo img — clips to circle to eliminate checkerboard/padding
function LogoImg({ src, glow, size, style, className }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: `0 0 ${Math.round(size * 0.25)}px ${glow}, 0 0 ${Math.round(size * 0.5)}px ${glow.replace('0.75','0.25').replace('0.6','0.18')}`,
        transition: 'box-shadow 0.3s ease',
        ...style,
      }}
    >
      <img
        src={src}
        alt="BTCALI"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </div>
  );
}

// NavbarLogo — 48px circle, fits in navbar height
export function NavbarLogo() {
  const { src, glow } = useLogoState();
  return <LogoImg src={src} glow={glow} size={48} />;
}

// LogoBadge — configurable size, used across pages
export function LogoBadge({ size = 64, className }) {
  const { src, glow } = useLogoState();
  const px = typeof size === 'number' ? size : { xs: 28, sm: 36, default: 64, lg: 90, xl: 140, '2xl': 200 }[size] ?? 64;
  return <LogoImg src={src} glow={glow} size={px} className={className} />;
}

// PageLogo — large centered logo for page headers (~260px)
export function PageLogo({ className }) {
  const { src, glow } = useLogoState();
  return <LogoImg src={src} glow={glow} size={260} className={className} />;
}

// HeroLogo — massive floating hero centerpiece (~380px)
export function HeroLogo({ className }) {
  const { src, glow } = useLogoState();
  return (
    <div className={`relative flex items-center justify-center ${className || ''}`}>
      {/* Ambient glow behind */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '140%',
          height: '140%',
          background: `radial-gradient(circle, ${glow.replace('0.75','0.15').replace('0.6','0.12')} 0%, transparent 70%)`,
          transition: 'background 0.3s ease',
        }}
      />
      <LogoImg
        src={src}
        glow={glow}
        size={380}
        className="animate-float relative z-10"
        style={{ maxWidth: '90vw' }}
      />
    </div>
  );
}

// Default export for backward compat
export default function Logo() {
  return <NavbarLogo />;
}