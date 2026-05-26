import { useTheme } from '@/lib/ThemeContext';

const logoStyle = {
  objectFit: 'contain',
  background: 'transparent',
  display: 'block',
  border: 'none',
  boxShadow: 'none',
};

export function NavbarLogo() {
  const { logoSrc } = useTheme();
  return (
    <img src={logoSrc} alt="BTCALI" style={{ ...logoStyle, height: '48px', width: 'auto' }} />
  );
}

export function PageLogo() {
  const { logoSrc } = useTheme();
  return (
    <img src={logoSrc} alt="BTCALI" style={{ ...logoStyle, width: '140px', height: '140px' }} />
  );
}

export function HeroLogo() {
  const { logoSrc } = useTheme();
  return (
    <div style={{ position: 'relative', width: '360px', height: '360px', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.12) 0%, transparent 70%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />
      <img
        src={logoSrc}
        alt="BTCALI"
        style={{ ...logoStyle, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '360px', height: 'auto' }}
      />
    </div>
  );
}

export function LogoBadge({ size = 64 }) {
  const { logoSrc } = useTheme();
  return (
    <img src={logoSrc} alt="BTCALI" style={{ ...logoStyle, width: `${size}px`, height: `${size}px` }} />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}