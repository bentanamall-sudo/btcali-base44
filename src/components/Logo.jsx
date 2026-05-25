import { useTheme } from '@/lib/useTheme';

// Transparent BTCALI logo PNGs — tight-cropped circular emblems
const LOGO_URLS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/7e6197939_generated_image.png',
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/0f29ee22e_generated_image.png',
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/acc557e8a_generated_image.png',
};

// Preload all logos on module load for instant theme switching
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

// NavbarLogo — 48px height
export function NavbarLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{ height: '48px', width: 'auto', display: 'block', background: 'transparent' }}
    />
  );
}

// PageLogo — page headers ~220px
export function PageLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{ width: '220px', height: 'auto', display: 'block', background: 'transparent' }}
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
      style={{ width: '320px', maxWidth: '85vw', height: 'auto', display: 'block', background: 'transparent' }}
    />
  );
}

// LogoBadge — configurable px size
export function LogoBadge({ size = 64 }) {
  const src = useLogoSrc();
  const px = typeof size === 'number' ? size : 64;
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{ width: `${px}px`, height: `${px}px`, objectFit: 'contain', display: 'block', background: 'transparent' }}
    />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}