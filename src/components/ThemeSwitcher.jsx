import { motion } from 'framer-motion';
import { themes } from '@/lib/useTheme';

export default function ThemeSwitcher({ theme, setTheme }) {
  const currentIndex = themes.findIndex(t => t.id === theme);
  const current = themes[currentIndex];

  const cycleTheme = () => {
    const next = themes[(currentIndex + 1) % themes.length];
    setTheme(next.id);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={cycleTheme}
      title={`Theme: ${current?.name} — click to cycle`}
      className="w-10 h-10 rounded-full glass glow-border flex items-center justify-center text-base transition-all duration-300 hover:glow-primary"
    >
      {current?.icon}
    </motion.button>
  );
}