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
  { to: '/apply', label: 'Apply Now' },
];

const SOCIAL = [
  { href: 'https://www.instagram.com/btcali_sw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram', handle: '@btcali_sw' },
  { href: 'https://youtube.com/@btcali_sw?si=vCNZ0my-iFFsr1-0', label: 'YouTube', handle: '@btcali_sw' },
  { href: 'https://www.tiktok.com/@btcali_sw?is_from_webapp=1&sender_device=pc', label: 'TikTok', handle: '@btcali_sw' },
];

export default function FooterSection() {
  return (
    <footer className="pt-16 pb-10 px-4 sm:px-6" style={{ borderTop: '1px solid #D1D1CB' }}>
      <div className="max-w-[1600px] mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Logo size="default" />
            <p className="font-body mt-4 leading-relaxed max-w-[220px] text-foreground/50" style={{ fontSize: '18px' }}>
              The elite calisthenics coaching platform. Master your bodyweight.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h4 className="eyebrow text-foreground mb-5">Platform</h4>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body plumb-underline magnetic inline-flex items-center gap-2 text-foreground/55 hover:text-foreground transition-colors" style={{ fontSize: '18px' }}>
                    <span className="w-1.5 h-1.5 flex-shrink-0" style={{ background: '#FF4D00' }} />
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
            <h4 className="eyebrow text-foreground mb-5">Coaching</h4>
            <ul className="space-y-3">
              {COACHING_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body plumb-underline magnetic inline-flex items-center gap-2 text-foreground/55 hover:text-foreground transition-colors" style={{ fontSize: '18px' }}>
                    <span className="w-1.5 h-1.5 flex-shrink-0" style={{ background: '#FF4D00' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-6" style={{ borderTop: '1px solid #D1D1CB' }}>
          <div className="flex flex-wrap justify-center gap-6">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="font-body flex items-center gap-1.5 text-foreground/45 hover:text-foreground transition-colors" style={{ fontSize: '18px' }}>
                <ExternalLink className="w-3 h-3" />
                <span className="font-heading font-semibold uppercase text-sm tracking-wider">{s.label}</span>
                <span>{s.handle}</span>
              </a>
            ))}
          </div>

          <Link to="/diagnostic">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="b-cta btn-shine inline-flex items-center gap-2 px-7 py-3.5 text-sm cursor-pointer"
            >
              <ScanLine className="w-4 h-4" /> Start Athlete Scan
            </motion.div>
          </Link>

          <p className="font-body text-center text-foreground/30" style={{ fontSize: '14px' }}>
            © {new Date().getFullYear()} BTCALI. All rights reserved. Built for elite athletes.
          </p>
        </div>
      </div>
    </footer>
  );
}