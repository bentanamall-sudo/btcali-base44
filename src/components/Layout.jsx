import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { useTheme } from '@/lib/useTheme';

export default function Layout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="pt-16">
        <Outlet context={{ theme, setTheme }} />
      </main>
      {/* Floating theme cycle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const themes = ['carbon', 'neon', 'gold', 'ice'];
            const idx = themes.indexOf(theme);
            setTheme(themes[(idx + 1) % themes.length]);
          }}
          className="w-12 h-12 rounded-full glass-strong glow-border flex items-center justify-center text-lg shadow-lg hover:glow-primary transition-all duration-300"
          title="Cycle Theme"
        >
          {theme === 'carbon' ? '⚫' : theme === 'neon' ? '🟣' : theme === 'gold' ? '🥇' : '🤍'}
        </motion.button>
      </div>
    </div>
  );
}