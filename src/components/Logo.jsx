import { useTheme } from '@/lib/useTheme';

// The ONE official uploaded BTCALI logo — used across all themes
// This is the original asset uploaded by the user. Do NOT replace with generated images.
const OFFICIAL_LOGO = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/7e6197939_generated_image.png';

// Simple circle clip for small logos (navbar/page headers)
function ClipCircle({ children, size }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      background: 'transparent',
      flexShrink: 0,
      display: 'block',
    }}>
      {children}
    </div>
  );
}

// NavbarLogo — 44px
export function NavbarLogo() {
  return (
    <ClipCircle size={44}>
      <img
        src={OFFICIAL_LOGO}
        alt="BTCALI"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: 'transparent' }}
      />
    </ClipCircle>
  );
}

// PageLogo — page headers 180px
export function PageLogo() {
  return (
    <ClipCircle size={180}>
      <img
        src={OFFICIAL_LOGO}
        alt="BTCALI"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: 'transparent' }}
      />
    </ClipCircle>
  );
}

// HeroLogo — overlay approach: glow behind, logo freely on top, no clipping
export function HeroLogo() {
  return (
    <div style={{ position: 'relative', width: '380px', height: '380px', margin: '0 auto' }}>
      {/* Background glow ring */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.08) 45%, transparent 75%)',
        filter: 'blur(10px)',
      }} />
      {/* Actual logo — centered on top, no clipping */}
      <img
        src={OFFICIAL_LOGO}
        alt="BTCALI"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
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
  return (
    <ClipCircle size={size}>
      <img
        src={OFFICIAL_LOGO}
        alt="BTCALI"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: 'transparent' }}
      />
    </ClipCircle>
  );
}

export default function Logo() {
  return <NavbarLogo />;
}