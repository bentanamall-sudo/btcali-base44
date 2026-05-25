import { useTheme } from '@/lib/useTheme';

// Official BTCALI PNG logos
const LOGO_URLS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/9086a44ef_Screenshot2026-05-26at81207am.png',
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/8e79feae7_Screenshot2026-05-26at81220am.png',
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/afb5818ec_Screenshot2026-05-26at81230am.png',
};

// Preload all logos on module load
if (typeof window !== 'undefined') {
  Object.values(LOGO_URLS).forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

function useLogoSrc() {
  const { theme } = useTheme();
  return LOGO_URLS[theme] || LOGO_URLS.carbon;
}

// Shared circular crop component
// The PNG has transparent padding around the circle — we use a square div with
// border-radius:50% + overflow:hidden and scale the image up so the circle
// fills the container, cropping out the transparent canvas edges.
function CircularLogo({ src, size }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        background: 'transparent',
      }}
    >
      <img
        src={src}
        alt="BTCALI"
        style={{
          // Scale slightly beyond 100% to push the transparent padding out of view.
          // The circular logo occupies roughly 88% of the PNG canvas width,
          // so scaling to ~114% brings the emblem edge flush with the container.
          width: '114%',
          height: '114%',
          marginLeft: '-7%',
          marginTop: '-7%',
          objectFit: 'cover',
          background: 'transparent',
          display: 'block',
        }}
      />
    </div>
  );
}

// NavbarLogo — 48px
export function NavbarLogo() {
  const src = useLogoSrc();
  return <CircularLogo src={src} size={48} />;
}

// PageLogo — page headers
export function PageLogo() {
  const src = useLogoSrc();
  return <CircularLogo src={src} size={220} />;
}

// HeroLogo — hero centerpiece
export function HeroLogo() {
  const src = useLogoSrc();
  return (
    <div className="animate-float" style={{ display: 'inline-block' }}>
      <CircularLogo src={src} size={320} />
    </div>
  );
}

// LogoBadge — configurable px size
export function LogoBadge({ size = 64 }) {
  const src = useLogoSrc();
  return <CircularLogo src={src} size={typeof size === 'number' ? size : 64} />;
}

export default function Logo() {
  return <NavbarLogo />;
}