import { useTheme } from '@/lib/useTheme';

// Sprite sheet: 3 circular logos side by side on transparent background
// Order: gold (left), purple (center), light (right)
const SPRITE_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/25cbd54a9_ChatGPTImageMay26202607_57_50AM.png';

// X position as percentage of (spriteWidth - containerWidth)
// The sprite has 3 equal columns. To show col N (0-indexed) in a container:
// backgroundPosition = N * 50% (0%, 50%, 100%)
const LOGO_BG_POSITION = {
  carbon: '0% 50%',    // gold — left column
  neon:   '50% 50%',   // purple — center column
  ice:    '100% 50%',  // light — right column
};

const GLOW_COLORS = {
  carbon: 'rgba(184,134,11,0.75)',
  neon:   'rgba(139,92,246,0.75)',
  ice:    'rgba(59,130,246,0.6)',
};

// Core sprite renderer — uses background-image so we can show 1/3 of the sheet
function LogoSprite({ theme, size, className, extraStyle }) {
  const pos = LOGO_BG_POSITION[theme] || LOGO_BG_POSITION.carbon;
  const glow = GLOW_COLORS[theme] || GLOW_COLORS.carbon;
  const g1 = Math.round(size * 0.1);
  const g2 = Math.round(size * 0.22);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        // background-size: 300% = sprite is 3x wide → shows 1 of 3 logos
        backgroundImage: `url(${SPRITE_URL})`,
        backgroundSize: '300% 100%',
        backgroundPosition: pos,
        backgroundRepeat: 'no-repeat',
        // instant switch — no transition delay on background-position
        transition: 'filter 0.3s ease',
        filter: `drop-shadow(0 0 ${g1}px ${glow}) drop-shadow(0 0 ${g2}px ${glow.replace('0.75','0.25').replace('0.6','0.18')})`,
        ...extraStyle,
      }}
    />
  );
}

// ── Public components ────────────────────────────────────────────────────────

export function LogoBadge({ size = 64, className, style }) {
  const { theme } = useTheme();
  const px = typeof size === 'number' ? size : ({
    xs: 28, sm: 40, default: 64, lg: 80, xl: 140, '2xl': 200,
  }[size] ?? 64);
  return <LogoSprite theme={theme} size={px} className={className} extraStyle={style} />;
}

export function NavbarLogo() {
  const { theme } = useTheme();
  return <LogoSprite theme={theme} size={52} />;
}

export function HeroLogo({ className }) {
  const { theme } = useTheme();
  const glow = GLOW_COLORS[theme] || GLOW_COLORS.carbon;

  return (
    <div className={`relative flex items-center justify-center ${className || ''}`}>
      {/* Ambient glow atmosphere */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '150%',
          height: '150%',
          background: `radial-gradient(circle, ${glow.replace('0.75','0.12').replace('0.6','0.09')} 0%, transparent 70%)`,
          transition: 'background 0.3s ease',
        }}
      />
      {/* Responsive hero logo: 240px mobile → 360px desktop */}
      <LogoSprite
        theme={theme}
        size={360}
        className="animate-float relative z-10 hidden md:block"
      />
      <LogoSprite
        theme={theme}
        size={280}
        className="animate-float relative z-10 md:hidden"
      />
    </div>
  );
}

export function PageLogo({ className }) {
  const { theme } = useTheme();
  return <LogoSprite theme={theme} size={220} className={className} />;
}

export default function Logo() {
  return <NavbarLogo />;
}