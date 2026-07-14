import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ScanLine } from 'lucide-react';
import { NavbarLogo } from '@/components/Logo';
import { SOCIAL_LINKS } from '@/lib/cinemaContent';

const PLATFORM_LINKS = [
  { to: '/skills', label: 'Skill Library' },
  { to: '/diagnostic', label: 'Athlete Scan' },
  { to: '/results', label: 'Student Results' },
];

const COACHING_LINKS = [
  { to: '/apply', label: '1-on-1 Coaching' },
  { to: '/apply', label: 'Pricing' },
];

export default function CinemaFooter() {
  return (
    <footer className="relative pt-20 pb-10 px-4 sm:px-8 overflow-hidden" style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(79,157,255,0.15) 50%, transparent 90%)' }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <NavbarLogo />
            <p className="text-sm font-body mt-4 leading-relaxed max-w-[200px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Elite calisthenics coaching. Built around your progress.
            </p>
          </motion.div>

          {/* Platform links */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="text-sm font-body transition-colors duration-200 group inline-flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                    <span className="group-hover:text-white transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coaching links */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-4">Coaching</h4>
            <ul className="space-y-2.5">
              {COACHING_LINKS.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="text-sm font-body transition-colors duration-200 group inline-flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                    <span className="group-hover:text-white transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social + CTA */}
        <div className="pt-8 flex flex-col items-center gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex flex-wrap justify-center gap-6">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-body flex items-center gap-1.5 transition-colors duration-200 group" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <ExternalLink className="w-3 h-3" />
                <span className="font-semibold group-hover:text-white transition-colors">{s.label}</span>
                <span className="group-hover:text-primary/60 transition-colors">{s.handle}</span>
              </a>
            ))}
          </div>

          <Link to="/diagnostic">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-heading font-bold text-sm" style={{ background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)', color: 'white', boxShadow: '0 0 20px rgba(79,157,255,0.2)' }}>
              <ScanLine className="w-4 h-4" /> Start Athlete Scan
            </motion.button>
          </Link>

          <p className="text-xs font-body text-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
            © {new Date().getFullYear()} BTCALI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}