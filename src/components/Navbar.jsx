import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, BookOpen, Trophy, Users, ScanLine, Crown, Settings, CreditCard, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarLogo } from './Logo';
import CodeUnlock from './CodeUnlock';
import { cn } from '@/lib/utils';
import { useAccessCodes } from '@/lib/useAccessCodes';

const BASE_NAV = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/pricing', label: '1-on-1 Coaching', icon: Users },
  { to: '/results', label: 'Results', icon: Trophy },
  { to: '/skills', label: 'Skill Library', icon: BookOpen },
  { to: '/diagnostic', label: 'Athlete Scan', icon: ScanLine },
];

const ADMIN_LINKS = [
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/diagnostics', label: 'Diagnostics', icon: Settings },
];

function AdminDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const isActive = ADMIN_LINKS.some(l => location.pathname === l.to);

  return (
    <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={cn(
          'px-3 py-2 rounded-lg text-sm font-heading font-semibold transition-all duration-200 flex items-center gap-1.5',
          isActive ? 'text-primary bg-primary/12' : 'text-primary/75 hover:text-primary hover:bg-primary/8'
        )}
      >
        <Settings className="w-4 h-4" />
        Admin
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, scale: 0.97, filter: 'blur(3px)' }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-0 top-full mt-1.5 overflow-hidden z-50 min-w-[165px] rounded-xl"
            style={{
              background: 'hsl(0 0% 7% / 0.92)',
              backdropFilter: 'blur(30px)',
              border: '1px solid hsl(40 30% 18% / 0.6)',
              boxShadow: '0 12px 40px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(43 74% 49% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
            }}
          >
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(43 74% 49% / 0.4), transparent)' }} />
            {ADMIN_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-3 text-sm font-heading font-medium transition-all duration-150',
                  location.pathname === to
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/8'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isMember, isAdmin } = useAccessCodes();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  const navLinks = isMember
    ? [...BASE_NAV, { to: '/members', label: 'BTCALI Members', icon: Crown }]
    : BASE_NAV;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-350"
      style={scrolled ? {
        background: 'hsl(0 0% 4% / 0.88)',
        backdropFilter: 'blur(40px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.3)',
        borderBottom: '1px solid hsl(40 25% 15% / 0.5)',
        boxShadow: '0 4px 30px hsl(0 0% 0% / 0.4)',
      } : {
        background: 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <NavbarLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-heading font-semibold transition-all duration-200 flex items-center gap-1.5 group',
                    link.to === '/members'
                      ? active ? 'text-primary bg-primary/10' : 'text-primary/80 hover:text-primary hover:bg-primary/8'
                      : active ? 'text-primary bg-primary/8' : 'text-foreground/55 hover:text-foreground hover:bg-white/4'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, hsl(44 85% 52%), hsl(38 70% 38%))' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {isAdmin && <AdminDropdown />}
            <CodeUnlock />
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={mobileOpen ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 10 }}
                transition={{ duration: 0.15 }}
              >
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
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden"
            style={{
              background: 'hsl(0 0% 4% / 0.96)',
              backdropFilter: 'blur(40px)',
              borderBottom: '1px solid hsl(40 25% 15% / 0.4)',
            }}
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
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-heading font-semibold transition-all duration-200',
                      link.to === '/members'
                        ? 'text-primary hover:bg-primary/8'
                        : active ? 'text-primary bg-primary/8' : 'text-foreground/60 hover:text-foreground hover:bg-white/4'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              {isAdmin && (
                <div className="border-t border-border/20 pt-2 mt-1 space-y-1">
                  <p className="text-xs font-heading font-bold text-primary/40 uppercase tracking-widest px-4 pt-1 pb-0.5">Admin</p>
                  {ADMIN_LINKS.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-heading font-semibold text-primary/75 hover:bg-primary/8 hover:text-primary transition-all"
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </Link>
                  ))}
                </div>
              )}
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