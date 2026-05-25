import { useTheme } from '@/lib/useTheme';

// True-transparent PNG logos — one per theme
const THEME_LOGOS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/5ff33fc8c_btcali-gold-true-transparent.png',
  gold:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/5ff33fc8c_btcali-gold-true-transparent.png',
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/2a285b96a_btcali-purple-true-transparent.png',
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/707977bbc_btcali-light-true-transparent.png',
};

export function useLogoSrc() {
  const { theme } = useTheme();
  return THEME_LOGOS[theme] || THEME_LOGOS.carbon;
}

const logoStyle = {
  objectFit: 'contain',
  background: 'transparent',
  display: 'block',
  border: 'none',
  boxShadow: 'none',
};

// NavbarLogo — top-left, reacts to theme instantly
export function NavbarLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{ ...logoStyle, width: '44px', height: '44px' }}
    />
  );
}

// PageLogo — section headers
export function PageLogo() {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{ ...logoStyle, width: '160px', height: '160px' }}
    />
  );
}

// HeroLogo — large hero section
export function HeroLogo() {
  const src = useLogoSrc();
  return (
    <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto' }}>
      {/* Ambient glow ring behind logo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.12) 0%, transparent 70%)',
        filter: 'blur(16px)',
        pointerEvents: 'none',
      }} />
      <img
        src={src}
        alt="BTCALI"
        style={{
          ...logoStyle,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
        }}
      />
    </div>
  );
}

// LogoBadge — configurable size
export function LogoBadge({ size = 64 }) {
  const src = useLogoSrc();
  return (
    <img
      src={src}
      alt="BTCALI"
      style={{ ...logoStyle, width: `${size}px`, height: `${size}px` }}
    />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}