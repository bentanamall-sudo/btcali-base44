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

// NavbarLogo — 48px height, auto width
export function NavbarLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{
        height: '48px',
        width: 'auto',
        objectFit: 'contain',
        background: 'transparent',
        display: 'block',
      }}
    />
  );
}

// PageLogo — large centered logo for page headers
export function PageLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{
        width: '220px',
        height: 'auto',
        objectFit: 'contain',
        background: 'transparent',
        display: 'block',
      }}
    />
  );
}

// HeroLogo — large hero centerpiece
export function HeroLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      className="animate-float"
      style={{
        maxWidth: '380px',
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        background: 'transparent',
        display: 'block',
      }}
    />
  );
}

// LogoBadge — small configurable size
export function LogoBadge({ size = 64 }) {
  const src = useLogoSrc();
  const px = typeof size === 'number' ? size : 64;
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{
        width: `${px}px`,
        height: `${px}px`,
        objectFit: 'contain',
        background: 'transparent',
        display: 'block',
      }}
    />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}