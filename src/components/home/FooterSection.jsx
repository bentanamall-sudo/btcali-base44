import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import { ScanLine, ExternalLink } from 'lucide-react';

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
    <footer className="relative pt-16 pb-10 px-4 sm:px-6 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(79,157,255,0.2) 50%, transparent 90%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(79,157,255,0.03), transparent 65%)' }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Logo size="default" />
            <p className="text-sm font-body mt-4 leading-relaxed max-w-[200px]"
              style={{ color: 'rgba(191,201,217,0.45)' }}>
              The elite calisthenics coaching platform. Master your bodyweight.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-sm font-body flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'rgba(191,201,217,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#4F9DFF'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(191,201,217,0.45)'}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-4">Coaching</h4>
            <ul className="space-y-2.5">
              {COACHING_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-sm font-body flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'rgba(191,201,217,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#4F9DFF'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(191,201,217,0.45)'}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex flex-wrap justify-center gap-6">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-sm font-body flex items-center gap-1.5 transition-colors duration-200"
                style={{ color: 'rgba(191,201,217,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#4F9DFF'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(191,201,217,0.4)'}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="font-semibold">{s.label}</span>
                <span>{s.handle}</span>
              </a>
            ))}
          </div>

          <Link to="/diagnostic">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl gradient-bg-strong text-white font-heading font-bold text-sm btn-shine cursor-pointer"
              style={{ boxShadow: '0 0 20px rgba(79,157,255,0.2)' }}
            >
              <ScanLine className="w-4 h-4" /> Start Athlete Scan
            </motion.div>
          </Link>

          <p className="text-xs font-body text-center" style={{ color: 'rgba(191,201,217,0.2)' }}>
            © {new Date().getFullYear()} BTCALI. All rights reserved. Built for elite athletes.
          </p>
        </div>
      </div>
    </footer>
  );
}