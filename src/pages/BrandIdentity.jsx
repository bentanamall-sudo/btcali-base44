import { motion } from 'framer-motion';
import { useTheme } from '@/lib/useTheme';
import { themes } from '@/lib/useTheme';
import { Crown, Check } from 'lucide-react';

const LOGO_VARIANTS = [
  {
    id: 'carbon',
    name: 'BTCALI Elite',
    tagline: 'Luxury bronze/gold athlete academy theme.',
    subtitle: 'OG LOGO THEME',
    bg: 'linear-gradient(145deg, #0A0A0A, #141414)',
    border: '#B8860B40',
    titleColor: '#D4AF37',
    palette: [
      { name: 'Matte Black', hex: '#0A0A0A', dark: true },
      { name: 'Charcoal', hex: '#141414', dark: true },
      { name: 'Bronze', hex: '#B8860B', dark: false },
      { name: 'Gold', hex: '#D4AF37', dark: false },
      { name: 'Light Gold', hex: '#F5E6A1', dark: false },
      { name: 'White', hex: '#FFFFFF', dark: false },
    ],
    logoGradient: 'linear-gradient(135deg, #B8860B, #D4AF37, #F5E6A1)',
    logoGlow: '0 0 20px rgba(184,134,11,0.6)',
    btColor: '#A1A1AA',
  },
  {
    id: 'neon',
    name: 'Futuristic BTCALI',
    tagline: 'Electric purple/blue futuristic athlete theme.',
    subtitle: 'PURPLE & BLUE THEME',
    bg: 'linear-gradient(145deg, #0B0B12, #111827)',
    border: '#8B5CF640',
    titleColor: '#BB5CF6',
    palette: [
      { name: 'Deep Black', hex: '#0B0B12', dark: true },
      { name: 'Dark Navy', hex: '#111827', dark: true },
      { name: 'Electric Purple', hex: '#BB5CF6', dark: false },
      { name: 'Neon Blue', hex: '#3B82F6', dark: false },
      { name: 'Soft Blue', hex: '#60A5FA', dark: false },
      { name: 'Light Grey', hex: '#9CA3AF', dark: false },
    ],
    logoGradient: 'linear-gradient(135deg, #8B5CF6, #BB5CF6, #3B82F6)',
    logoGlow: '0 0 20px rgba(139,92,246,0.7)',
    btColor: '#9CA3AF',
  },
  {
    id: 'gold',
    name: 'Matte Black BTCALI',
    tagline: 'Stealth graphite — tactical and powerful.',
    subtitle: 'STEALTH THEME',
    bg: 'linear-gradient(145deg, #000000, #0F0F0F)',
    border: '#3F3F4640',
    titleColor: '#A1A1AA',
    palette: [
      { name: 'Matte Black', hex: '#000000', dark: true },
      { name: 'Dark Grey', hex: '#0F0F0F', dark: true },
      { name: 'Graphite', hex: '#1A1A1A', dark: true },
      { name: 'Steel Grey', hex: '#2A2A2A', dark: true },
      { name: 'Light Grey', hex: '#A1A1AA', dark: false },
      { name: 'White', hex: '#FFFFFF', dark: false },
    ],
    logoGradient: 'linear-gradient(135deg, #3F3F46, #71717A, #A1A1AA)',
    logoGlow: '0 0 12px rgba(161,161,170,0.25)',
    btColor: '#71717A',
  },
  {
    id: 'ice',
    name: 'Light BTCALI',
    tagline: 'Apple-inspired clean white/blue precision.',
    subtitle: 'WHITE & LIGHT BLUE THEME',
    bg: 'linear-gradient(145deg, #F3F4F6, #E0F2FE)',
    border: '#3B82F640',
    titleColor: '#3B82F6',
    palette: [
      { name: 'White', hex: '#FFFFFF', dark: false },
      { name: 'Very Light Grey', hex: '#F3F4F6', dark: false },
      { name: 'Light Blue', hex: '#E0F2FE', dark: false },
      { name: 'Soft Blue', hex: '#BAE6FD', dark: false },
      { name: 'Blue', hex: '#3B82F6', dark: false },
      { name: 'Dark Grey', hex: '#1F2937', dark: true },
    ],
    logoGradient: 'linear-gradient(135deg, #3B82F6, #BAE6FD)',
    logoGlow: '0 0 16px rgba(59,130,246,0.4)',
    btColor: '#6B7280',
  },
];

function PaletteChip({ name, hex, dark }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0"
        style={{ background: hex }}
      />
      <div className="min-w-0">
        <p className="text-xs font-body leading-none" style={{ color: dark ? '#71717A' : '#A1A1AA' }}>{name}</p>
        <p className="text-xs font-heading font-bold" style={{ color: dark ? '#71717A' : '#71717A' }}>{hex}</p>
      </div>
    </div>
  );
}

function LogoCard({ variant, isActive, onActivate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: variant.bg,
        border: `1px solid ${variant.border}`,
        boxShadow: isActive ? `0 0 40px ${variant.border}` : 'none',
      }}
    >
      {isActive && (
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 text-xs font-heading font-bold px-2 py-1 rounded-full bg-white/10 text-white border border-white/20">
            <Check className="w-3 h-3" /> Active
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-5">
          <p className="text-xs font-heading font-bold tracking-widest mb-1" style={{ color: variant.titleColor }}>
            {String(LOGO_VARIANTS.indexOf(variant) + 1)}. {variant.name.toUpperCase()}
          </p>
          <p className="text-xs font-body" style={{ color: '#6B7280' }}>({variant.subtitle})</p>
        </div>

        {/* Logo preview placeholder */}
        <div
          className="w-full aspect-square max-w-[180px] mx-auto rounded-full flex flex-col items-center justify-center mb-5 relative overflow-hidden"
          style={{
            background: variant.bg,
            border: `2px solid ${variant.border}`,
            boxShadow: `0 0 30px ${variant.border}`,
          }}
        >
          {/* Logo placeholder — replace src with actual logo PNG per theme */}
          <div className="text-center px-4">
            <div
              className="text-xs font-heading font-semibold tracking-widest mb-1 opacity-50"
              style={{ color: variant.btColor }}
            >
              BTCALI COACHING
            </div>
            <div
              className="font-heading font-black text-4xl tracking-tight"
              style={{
                background: variant.logoGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(${variant.logoGlow})`,
              }}
            >
              BTCALI
            </div>
            <div
              className="text-xs font-heading font-semibold tracking-widest mt-1 opacity-50"
              style={{ color: variant.btColor }}
            >
              BTCALI COACHING
            </div>
          </div>
          {/* Upload placeholder overlay */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span className="text-xs font-body opacity-30" style={{ color: variant.btColor }}>logo placeholder</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-xs font-body mb-5" style={{ color: '#6B7280' }}>{variant.tagline}</p>

        {/* Colour palette */}
        <div className="space-y-2 mb-5">
          {variant.palette.map(p => (
            <PaletteChip key={p.hex} {...p} />
          ))}
        </div>

        {/* Activate button */}
        <button
          onClick={onActivate}
          className="w-full py-2.5 rounded-xl font-heading font-bold text-sm transition-all duration-200"
          style={{
            background: isActive ? variant.logoGradient : 'transparent',
            border: `1px solid ${variant.border}`,
            color: isActive ? '#fff' : variant.titleColor,
            boxShadow: isActive ? variant.logoGlow : 'none',
          }}
        >
          {isActive ? '✓ Active Theme' : 'Activate Theme'}
        </button>
      </div>
    </motion.div>
  );
}

export default function BrandIdentity() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5 border border-primary/20">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">Brand Identity</span>
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-3">
          BTCALI Logo <span className="gradient-text">— 4 Colourways</span>
        </h1>
        <p className="font-heading text-sm tracking-widest text-muted-foreground uppercase">Premium. Elite. Timeless.</p>
        <p className="font-body text-sm text-muted-foreground mt-3 max-w-md mx-auto">
          Each theme has a dedicated logo colourway. Activate a theme below to apply it across the entire platform.
        </p>
      </motion.div>

      {/* Active theme indicator */}
      <div className="glass rounded-xl border border-border/40 px-5 py-3 mb-10 flex items-center justify-between max-w-sm mx-auto">
        <span className="text-sm font-body text-muted-foreground">Active Theme</span>
        <span className="font-heading font-bold text-sm gradient-text">
          {LOGO_VARIANTS.find(v => v.id === theme)?.name || 'BTCALI Elite'}
        </span>
      </div>

      {/* 4 Logo Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {LOGO_VARIANTS.map(variant => (
          <LogoCard
            key={variant.id}
            variant={variant}
            isActive={theme === variant.id}
            onActivate={() => setTheme(variant.id)}
          />
        ))}
      </div>

      {/* Upload instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 glass rounded-2xl border border-border/40 p-8 text-center"
      >
        <h3 className="font-heading font-bold text-foreground text-lg mb-2">Upload Your Logo Assets</h3>
        <p className="text-sm font-body text-muted-foreground max-w-lg mx-auto">
          To replace the logo placeholders with your final PNG assets, update the <code className="text-primary font-mono text-xs bg-muted/30 px-1 py-0.5 rounded">Logo.jsx</code> component with your image URLs. Each theme variant supports a transparent PNG for clean rendering on any background.
        </p>
      </motion.div>
    </div>
  );
}