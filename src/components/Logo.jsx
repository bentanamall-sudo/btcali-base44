// Single official BTCALI logo — no theme switching
const LOGO_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/ed73dd1f3_ChatGPTImageJun2202609_10_56AM.png';

const logoStyle = {
  objectFit: 'contain',
  background: 'transparent',
  display: 'block',
  border: 'none',
  boxShadow: 'none',
};

export function NavbarLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" style={{ ...logoStyle, height: '48px', width: 'auto' }} fetchpriority="high" />
  );
}

export function PageLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" style={{ ...logoStyle, width: '140px', height: '140px' }} fetchpriority="high" />
  );
}

export function HeroLogo() {
  return (
    <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle, hsl(var(--glow-primary)/0.15) 0%, transparent 70%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />
      <img
        src={LOGO_URL}
        alt="BTCALI"
        fetchpriority="high"
        style={{ ...logoStyle, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '280px', height: 'auto' }}
      />
    </div>
  );
}

export function LogoBadge({ size = 64 }) {
  return (
    <img src={LOGO_URL} alt="BTCALI" style={{ ...logoStyle, width: `${size}px`, height: `${size}px` }} />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}