import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, BookOpen, Trophy, Users, ScanLine, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarLogo } from './Logo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/pricing', label: '1-on-1 Coaching', icon: Users },
  { to: '/results', label: 'Results', icon: Trophy },
  { to: '/skills', label: 'Skill Library', icon: BookOpen },
  { to: '/diagnostic', label: 'Athlete Scan', icon: ScanLine },
  { to: '/members', label: 'Members', icon: Crown },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (mobileOpen) setMobileOpen(false);
      const doc = document.documentElement;
      setScrollProgress(Math.min(y / (doc.scrollHeight - doc.clientHeight), 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={scrolled ? {
        background: 'rgba(5,5,8,0.88)',
        backdropFilter: 'blur(40px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
      } : { background: 'transparent' }}
    >
      <div className="scroll-progress transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <NavbarLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to}
                  className={cn(
                    'relative px-3.5 py-2 rounded-lg text-sm font-heading font-medium transition-all duration-200 flex items-center gap-1.5 group',
                    link.to === '/members'
                      ? active ? 'text-primary bg-primary/10' : 'text-primary/70 hover:text-primary hover:bg-primary/8'
                      : active ? 'text-foreground bg-white/6' : 'text-foreground/45 hover:text-foreground/90 hover:bg-white/4'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #4F9DFF, #5EEBFF)' }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/diagnostic">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-lg text-sm font-heading font-semibold gradient-bg-strong text-primary-foreground btn-shine relative overflow-hidden"
                style={{ boxShadow: '0 0 16px hsl(213 100% 65% / 0.2)' }}
              >
                <span className="relative z-10">Start Scan</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground/60 hover:text-foreground transition-colors">
            <AnimatePresence mode="wait">
              <motion.span key={mobileOpen ? 'x' : 'menu'} initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 10 }} transition={{ duration: 0.15 }}>
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.span>
            </AnimatePresence>
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
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(40px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const active = location.pathname === link.to;
                return (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-heading font-medium transition-all duration-200',
                      link.to === '/members'
                        ? 'text-primary hover:bg-primary/8'
                        : active ? 'text-foreground bg-white/6' : 'text-foreground/55 hover:text-foreground hover:bg-white/4'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 px-1">
                <Link to="/diagnostic" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-sm">
                    Start Athlete Scan
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}