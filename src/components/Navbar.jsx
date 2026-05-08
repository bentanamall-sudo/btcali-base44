import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, User, BarChart3, BookOpen, Layers, Trophy, DollarSign, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/scan', label: 'Athlete Scan', icon: BarChart3 },
  { to: '/tutorials', label: 'Free Tutorials', icon: BookOpen },
  { to: '/programs', label: 'Programs', icon: Layers },
  { to: '/dashboard', label: 'Dashboard', icon: User },
  { to: '/results', label: 'Results', icon: Trophy },
  { to: '/pricing', label: 'Coaching', icon: DollarSign },
];

export default function Navbar({ theme, setTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo size="default" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 flex items-center gap-1.5',
                    active
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
            <Link to="/ai-coach" className="text-muted-foreground hover:text-foreground transition-colors">
              <Bot className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-body transition-all',
                      active
                        ? 'text-primary bg-primary/10 glow-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/ai-coach"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-body text-muted-foreground hover:text-foreground hover:bg-muted/20"
              >
                <Bot className="w-5 h-5" />
                AI Coach
              </Link>
              <div className="pt-3 px-4">
                <ThemeSwitcher theme={theme} setTheme={setTheme} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}