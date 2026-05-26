import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { ThemeProvider, useTheme, themes } from '@/lib/ThemeContext';

function LayoutInner() {
  const { theme, setTheme } = useTheme();
  const themeIds = themes.map(t => t.id);
  const currentTheme = themes.find(t => t.id === theme);

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
            const idx = themeIds.indexOf(theme);
            setTheme(themeIds[(idx + 1) % themeIds.length]);
          }}
          className="w-12 h-12 rounded-full glass-strong glow-border flex items-center justify-center text-lg shadow-lg hover:glow-primary transition-all duration-300"
          title="Cycle Theme"
        >
          {currentTheme?.icon || '🥇'}
        </motion.button>
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}