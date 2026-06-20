import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import { ScanLine, Instagram, Youtube } from 'lucide-react';

const PLATFORM_LINKS = [
  { to: '/skills', label: 'Skill Library' },
  { to: '/diagnostic', label: 'Athlete Scan' },
  { to: '/results', label: 'Student Results' },
];

const COACHING_LINKS = [
  { to: '/pricing', label: '1-on-1 Coaching' },
  { to: '/members', label: 'BTCALI Members' },
];

const SOCIAL = [
  { href: 'https://www.instagram.com/btcali_sw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram', handle: '@btcali_sw' },
  { href: 'https://youtube.com/@btcali_sw?si=vCNZ0my-iFFsr1-0', label: 'YouTube', handle: '@btcali_sw' },
  { href: 'https://www.tiktok.com/@btcali_sw?is_from_webapp=1&sender_device=pc', label: 'TikTok', handle: '@btcali_sw' },
];

export default function FooterSection() {
  return (
    <footer className="relative border-t border-border/20 pt-16 pb-10 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.2), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--glow-primary)/0.03), transparent 60%)' }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Logo size="default" />
            <p className="text-sm text-muted-foreground/70 font-body mt-4 leading-relaxed max-w-[200px]">
              The elite calisthenics coaching platform. Master your bodyweight.
            </p>
          </motion.div>

          {/* Platform links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h4 className="font-heading font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-all duration-200 font-body flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coaching links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <h4 className="font-heading font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Coaching</h4>
            <ul className="space-y-2.5">
              {COACHING_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-all duration-200 font-body flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border/15 pt-8 flex flex-col items-center gap-6">
          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-6">
            {SOCIAL.map((s) => (
              <a key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground/60 hover:text-primary transition-all duration-200 font-body group flex items-center gap-1.5"
              >
                <span className="font-semibold text-muted-foreground/40 group-hover:text-primary/60 transition-colors">{s.label}</span>
                <span>{s.handle}</span>
              </a>
            ))}
          </div>

          <Link to="/diagnostic">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary cursor-pointer"
            >
              <ScanLine className="w-4 h-4" /> Start Athlete Scan
            </motion.div>
          </Link>

          <p className="text-xs text-muted-foreground/35 font-body text-center">
            © {new Date().getFullYear()} BTCALI. All rights reserved. Built for elite athletes.
          </p>
        </div>
      </div>
    </footer>
  );
}