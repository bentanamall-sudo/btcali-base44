import { useTheme } from '@/lib/useTheme';

/**
 * Single sprite sheet — 3 circular logos side by side, transparent background.
 * Layout: [GOLD | PURPLE | LIGHT] — each occupies exactly 1/3 of the width.
 * Aspect ratio of the full image is approximately 3:1 (wide).
 * Each individual logo is roughly square/circular.
 */
const SPRITE_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/25cbd54a9_ChatGPTImageMay26202607_57_50AM.png';

// Which 1/3 of the sprite to show per theme
// We clip via a wrapper div + negative margin trick using <img>
const LOGO_SLOT = {
  carbon: 0,  // left — gold
  neon:   1,  // center — purple
  ice:    2,  // right — light
};

const GLOW = {
  carbon: 'rgba(184,134,11,0.7)',
  neon:   'rgba(139,92,246,0.7)',
  ice:    'rgba(59,130,246,0.55)',
};

/**
 * Renders the correct logo from the sprite sheet.
 * Uses a clipping wrapper + oversized <img> to show only 1 of the 3 logos.
 * No border-radius crop, no white background, no overflow distortion.
 * The PNG transparency is fully preserved.
 */
function LogoImg({ theme, size }) {
  const slot = LOGO_SLOT[theme] ?? 0;
  const glow = GLOW[theme] || GLOW.carbon;
  // The full image is 3 logos wide, so each logo column = size px when the
  // full image is rendered at (3 * size) wide.
  const fullWidth = size * 3;

  return (
    <div
      style={{
        width: size,
        height: size,
        overflow: 'hidden',
        flexShrink: 0,
        // No background, no border-radius — pure transparent
        background: 'transparent',
        filter: `drop-shadow(0 0 ${Math.round(size * 0.08)}px ${glow}) drop-shadow(0 0 ${Math.round(size * 0.2)}px ${glow.replace('0.7','0.2').replace('0.55','0.15')})`,
      }}
    >
      <img
        src={SPRITE_URL}
        alt="BTCALI Coaching Logo"
        style={{
          width: fullWidth,
          height: size,
          objectFit: 'contain',
          // Shift left by slot * size to show the correct logo column
          marginLeft: -(slot * size),
          display: 'block',
          flexShrink: 0,
          imageRendering: 'auto',
          // No transition on position — instant logo swap
        }}
      />
    </div>
  );
}

// Preload all logos on module load so switching is instant
const _preload = new Image();
_preload.src = SPRITE_URL;

// ── Public exports ────────────────────────────────────────────────────────────

/** Navbar: height 48px, auto width */
export function NavbarLogo() {
  const { theme } = useTheme();
  return <LogoImg theme={theme} size={48} />;
}

/** Hero centerpiece: up to 420px */
export function HeroLogo() {
  const { theme } = useTheme();
  const glow = GLOW[theme] || GLOW.carbon;

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow atmosphere — purely decorative, behind the logo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '160%',
          height: '160%',
          background: `radial-gradient(circle, ${glow.replace('0.7','0.1').replace('0.55','0.08')} 0%, transparent 65%)`,
        }}
      />
      {/* Desktop */}
      <div className="relative z-10 animate-float hidden sm:block">
        <LogoImg theme={theme} size={360} />
      </div>
      {/* Mobile */}
      <div className="relative z-10 animate-float sm:hidden">
        <LogoImg theme={theme} size={240} />
      </div>
    </div>
  );
}

/** Page header logo ~220px */
export function PageLogo({ className }) {
  const { theme } = useTheme();
  return (
    <div className={className}>
      <LogoImg theme={theme} size={220} />
    </div>
  );
}

/** Generic badge with configurable px size */
export function LogoBadge({ size = 64, className, style }) {
  const { theme } = useTheme();
  return (
    <div className={className} style={style}>
      <LogoImg theme={theme} size={typeof size === 'number' ? size : 64} />
    </div>
  );
}

export default function Logo() {
  return <NavbarLogo />;
}