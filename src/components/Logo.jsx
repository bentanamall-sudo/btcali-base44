import { useTheme } from '@/lib/useTheme';

// Tight-cropped circular BTCALI emblem logos — no canvas padding
const LOGO_URLS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/01eabd7c2_generated_image.png',
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/2c5dc788a_generated_image.png',
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/a1cec0707_generated_image.png',
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
      style={{ height: '48px', width: 'auto', display: 'block', background: 'transparent', borderRadius: '50%' }}
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
      style={{ width: '220px', height: 'auto', display: 'block', background: 'transparent', borderRadius: '50%' }}
    />
  );
}

// HeroLogo — large hero centerpiece
export function HeroLogo() {
  const src = useLogoSrc();
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', height: 'fit-content', padding: 0, margin: '0 auto', background: 'transparent', border: 'none', boxShadow: 'none', overflow: 'visible' }}>
      <img
        src={src}
        alt="BTCALI"
        className="animate-float"
        style={{ display: 'block', width: '340px', maxWidth: '85vw', height: 'auto', objectFit: 'contain', background: 'transparent' }}
      />
    </div>
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
      style={{ width: `${px}px`, height: `${px}px`, objectFit: 'contain', display: 'block', background: 'transparent', borderRadius: '50%' }}
    />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}