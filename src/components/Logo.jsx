const LOGO_URL = 'https://BTCALI.b-cdn.net/logos/ChatGPT%20Image%20Jun%205%2C%202026%2C%2006_00_36%20PM.jpeg';

const logoStyle = {
  objectFit: 'contain',
  background: 'transparent',
  display: 'block',
  border: 'none',
  boxShadow: 'none',
};

// Fallback: if CDN fails, show text brand mark
const onError = (e) => {
  e.target.style.display = 'none';
  const span = document.createElement('span');
  span.textContent = 'BTCALI';
  span.style.cssText = 'font-family:var(--font-heading);font-weight:900;font-size:1.25rem;color:hsl(var(--primary));letter-spacing:0.05em;';
  e.target.parentNode.appendChild(span);
};

export function NavbarLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchPriority="high" onError={onError}
      style={{ ...logoStyle, height: '48px', width: 'auto' }} />
  );
}

export function PageLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchPriority="high" onError={onError}
      style={{ ...logoStyle, width: '320px', height: '320px' }} />
  );
}

export function PageHeaderLogo() {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchPriority="high" onError={onError}
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
      <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchPriority="high" onError={onError}
        style={{ ...logoStyle, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '420px', height: 'auto' }} />
    </div>
  );
}

export function LogoBadge({ size = 64 }) {
  return (
    <img src={LOGO_URL} alt="BTCALI" loading="eager" fetchPriority="high" onError={onError}
      style={{ ...logoStyle, width: `${size}px`, height: `${size}px` }} />
  );
}

export default function Logo() {
  return <NavbarLogo />;
}