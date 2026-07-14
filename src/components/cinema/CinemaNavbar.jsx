import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarLogo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/results', label: 'Results' },
  { to: '/skills', label: 'Skill Library' },
  { to: '/apply', label: 'Coaching' },
  { to: '/diagnostic', label: 'Athlete Scan' },
];

export default function CinemaNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          height: scrolled ? 56 : 72,
          backgroundColor: scrolled ? 'rgba(5,5,8,0.85)' : 'rgba(5,5,8,0)',
          backdropFilter: scrolled ? 'blur(40px) saturate(1.4)' : 'blur(0px)',
          borderBottomWidth: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex-shrink-0" data-cursor="arrow" data-cursor-label="">
            <NavbarLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={cn(
                      'font-heading font-medium text-sm transition-all duration-200',
                      active ? 'text-white' : 'text-white/40 group-hover:text-white/80'
                    )}
                  >
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px"
                    style={{ background: '#5EEBFF' }}
                    animate={{ width: active ? '100%' : '0%' }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px"
                    style={{ background: 'rgba(255,255,255,0.3)' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link to="/diagnostic">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)',
                  color: 'white',
                  boxShadow: '0 0 20px rgba(79,157,255,0.25)',
                }}
              >
                <ScanLine className="w-4 h-4" /> Start Scan
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors relative z-50"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(40px)' }}
            />
            <motion.div
              className="fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-heading font-bold text-2xl text-center"
                    style={{
                      color: location.pathname === link.to ? '#5EEBFF' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.08 + NAV_LINKS.length * 0.06, duration: 0.3 }}
                className="mt-8"
              >
                <Link to="/diagnostic" onClick={() => setMobileOpen(false)}>
                  <button
                    className="flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)',
                      color: 'white',
                      boxShadow: '0 0 24px rgba(79,157,255,0.3)',
                    }}
                  >
                    <ScanLine className="w-4 h-4" /> Start Athlete Scan
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}