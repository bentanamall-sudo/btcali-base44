import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarLogo } from './Logo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Coaching' },
  { to: '/results', label: 'Results' },
  { to: '/skills', label: 'Skill Library' },
  { to: '/diagnostic', label: 'Athlete Scan' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(244,244,242,0.92)' : '#F4F4F2',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #D1D1CB',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 magnetic">
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
                  className={`magnetic plumb-underline relative px-4 py-2 text-xs font-heading font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    active ? 'text-foreground' : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link to="/diagnostic">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="b-cta btn-shine px-5 py-2.5 text-xs"
              >
                Start Scan
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={mobileOpen ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 10 }}
                transition={{ duration: 0.15 }}
                className="block"
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
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden"
            style={{ background: '#F4F4F2', borderTop: '1px solid #D1D1CB' }}
          >
            <div className="px-4 py-4 space-y-0">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-2 py-4 text-sm font-heading font-semibold uppercase tracking-wider transition-colors duration-200 ${
                      active ? 'text-foreground' : 'text-foreground/55 hover:text-foreground'
                    }`}
                    style={{ borderBottom: '1px solid #D1D1CB' }}
                  >
                    {link.label}
                    <span className="text-foreground/30">→</span>
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link to="/diagnostic" onClick={() => setMobileOpen(false)}>
                  <button className="b-cta w-full py-4 text-sm">
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