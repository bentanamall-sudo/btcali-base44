import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, BookOpen, Trophy, Users, ScanLine, Crown, Settings, CreditCard, ChevronDown, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarLogo } from './Logo';
import CodeUnlock from './CodeUnlock';
import { cn } from '@/lib/utils';
import { useMember } from '@/lib/MemberContext';

const BASE_NAV = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/pricing', label: '1-on-1 Coaching', icon: Users },
  { to: '/results', label: 'Results', icon: Trophy },
  { to: '/skills', label: 'Skill Library', icon: BookOpen },
  { to: '/diagnostic', label: 'Athlete Scan', icon: ScanLine },
];

const ADMIN_LINKS = [
  { to: '/admin/programs', label: 'Programs', icon: Settings },
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/diagnostics', label: 'Diagnostics', icon: Settings },
];

function AdminDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = ADMIN_LINKS.some(l => location.pathname === l.to);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className={cn(
        'px-3 py-2 rounded-lg text-sm font-heading font-medium transition-all duration-200 flex items-center gap-1.5',
        isActive
          ? 'text-primary bg-primary/10'
          : 'text-foreground/40 hover:text-foreground/80 hover:bg-white/4'
      )}>
        <Settings className="w-3.5 h-3.5" />
        Admin
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-0 top-full mt-2 overflow-hidden z-50 min-w-[160px] rounded-xl"
            style={{
              background: 'rgba(8,11,18,0.95)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,157,255,0.08)',
            }}
          >
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.4), transparent)' }} />
            {ADMIN_LINKS.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-2.5 text-sm font-heading font-medium transition-all duration-150',
                  location.pathname === to ? 'text-primary bg-primary/10' : 'text-foreground/60 hover:text-primary hover:bg-primary/8'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { isMember, isAdmin } = useMember();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (mobileOpen) setMobileOpen(false);
      const doc = document.documentElement;
      const progress = y / (doc.scrollHeight - doc.clientHeight);
      setScrollProgress(Math.min(progress, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  const navLinks = isMember
    ? [...BASE_NAV, { to: '/my-program', label: 'My Program', icon: ClipboardList }, { to: '/members', label: 'Members', icon: Crown }]
    : BASE_NAV;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={scrolled ? {
        background: 'rgba(5,5,8,0.88)',
        backdropFilter: 'blur(40px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,157,255,0.04)',
      } : { background: 'transparent' }}
    >
      {/* Scroll progress bar */}
      <div
        className="scroll-progress transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

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
                    'relative px-3.5 py-2 rounded-lg text-sm font-heading font-medium transition-all duration-200 flex items-center gap-1.5 group',
                    link.to === '/members'
                      ? active ? 'text-primary bg-primary/10' : 'text-primary/70 hover:text-primary hover:bg-primary/8'
                      : active ? 'text-foreground bg-white/6' : 'text-foreground/45 hover:text-foreground/90 hover:bg-white/4'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #4F9DFF, #5EEBFF)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {isAdmin && <AdminDropdown />}
            <CodeUnlock />
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

          {/* Mobile button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden"
            style={{
              background: 'rgba(5,5,8,0.97)',
              backdropFilter: 'blur(40px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
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
              {isAdmin && (
                <div className="border-t border-white/6 pt-2 mt-1 space-y-1">
                  <p className="text-xs font-heading font-bold text-primary/40 uppercase tracking-widest px-4 pt-1 pb-0.5">Admin</p>
                  {ADMIN_LINKS.map(({ to, label, icon: Icon }) => (
                    <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-heading font-medium text-primary/70 hover:bg-primary/8 hover:text-primary transition-all"
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="pt-3 px-1">
                <Link to="/diagnostic" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-sm">
                    Start Athlete Scan
                  </button>
                </Link>
              </div>
              <div className="pt-1 px-1">
                <CodeUnlock />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}