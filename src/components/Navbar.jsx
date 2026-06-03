import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, BookOpen, Trophy, Users, ScanLine, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarLogo } from './Logo';
import CodeUnlock from './CodeUnlock';
import { cn } from '@/lib/utils';
import { useAccessCodes } from '@/lib/useAccessCodes';

const BASE_NAV = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/skills', label: 'Skill Library', icon: BookOpen },
  { to: '/results', label: 'Results', icon: Trophy },
  { to: '/pricing', label: '1-on-1 Coaching', icon: Users },
  { to: '/diagnostic', label: 'Athlete Scan', icon: ScanLine },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isMember } = useAccessCodes();

  const navLinks = isMember
    ? [...BASE_NAV, { to: '/members', label: 'BTCALI Members', icon: Crown }]
    : BASE_NAV;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <NavbarLogo />
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
                    link.to === '/members'
                      ? active
                        ? 'text-primary bg-primary/15 font-semibold'
                        : 'text-primary/80 hover:text-primary hover:bg-primary/10 font-semibold'
                      : active
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
            <CodeUnlock />
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
                      link.to === '/members'
                        ? 'text-primary font-semibold hover:bg-primary/10'
                        : active
                          ? 'text-primary bg-primary/10 glow-border'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <CodeUnlock />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}