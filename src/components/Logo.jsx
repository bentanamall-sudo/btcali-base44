import { useTheme } from '@/lib/useTheme';

// The ONE official uploaded BTCALI logo — used across all themes
// This is the original asset uploaded by the user. Do NOT replace with generated images.
const OFFICIAL_LOGO = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/7e6197939_generated_image.png';

// Clip wrapper: clips any baked-in transparent canvas so only the circle shows
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

// HeroLogo — large hero centerpiece 300px
export function HeroLogo() {
  return (
    <ClipCircle size={300}>
      <img
        src={OFFICIAL_LOGO}
        alt="BTCALI"
        style={{ width: '115%', height: '115%', objectFit: 'cover', display: 'block', background: 'transparent', transform: 'translate(-6.5%, -6.5%)', animation: 'none', transition: 'none' }}
      />
    </ClipCircle>
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