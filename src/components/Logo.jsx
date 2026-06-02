const LOGO_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/668f24dc5_ChatGPTImageJun2202609_27_21AM.png';

const logoStyle = {
  objectFit: 'contain',
  background: 'transparent',
  display: 'block',
  border: 'none',
  boxShadow: 'none',
};

export function NavbarLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchpriority="high"
      style={{ ...logoStyle, height: '48px', width: 'auto' }} />
  );
}

export function PageLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchpriority="high"
      style={{ ...logoStyle, width: '320px', height: '320px' }} />
  );
}

export function PageHeaderLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchpriority="high"
      style={{ ...logoStyle, width: '100px', height: '100px' }} />
  );
}

export function HeroLogo() {
  return (
    <div style={{ position: 'relative', width: '420px', height: '420px', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle,hsl(var(--glow-primary)/0.15) 0%,transparent 70%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />
      <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchpriority="high"
        style={{ ...logoStyle, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '420px', height: 'auto' }} />
    </div>
  );
}

export function LogoBadge({ size = 64 }) {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchpriority="high"
      style={{ ...logoStyle, width: `${size}px`, height: `${size}px` }} />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}