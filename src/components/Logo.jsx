import { useTheme } from '@/lib/useTheme';

// Official uploaded BTCALI logos — exact originals, one per theme
const LOGO_URLS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/7886a97bc_Screenshot2026-05-26at81207am.png', // Gold
  gold:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/7886a97bc_Screenshot2026-05-26at81207am.png', // Gold
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/8aaa479fc_Screenshot2026-05-26at81220am.png', // Purple/Blue
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/5a7235195_Screenshot2026-05-26at81230am.png', // Light Blue/White
};

function useLogoSrc() {
  const { theme } = useTheme();
  return LOGO_URLS[theme] || LOGO_URLS.carbon;
}

// NavbarLogo — 44px
export function NavbarLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{
        width: '44px',
        height: '44px',
        objectFit: 'contain',
        display: 'block',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        flexShrink: 0,
      }}
    />
  );
}

// PageLogo — page headers
export function PageLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{
        width: '180px',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      }}
    />
  );
}

// HeroLogo — overlay approach: glow behind, logo freely on top, no clipping
export function HeroLogo() {
  const src = useLogoSrc();
  return (
    <div style={{ position: 'relative', width: '360px', height: '360px', margin: '0 auto' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.06) 50%, transparent 75%)',
        filter: 'blur(12px)',
        pointerEvents: 'none',
      }} />
      {/* Logo — centered, no clipping */}
      <img
        src={src}
        alt="BTCALI"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '340px',
          height: 'auto',
          objectFit: 'contain',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          transition: 'none',
          animation: 'none',
        }}
      />
    </div>
  );
}

// LogoBadge — configurable px size
export function LogoBadge({ size = 64 }) {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'block',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      }}
    />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}