import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { Mail } from 'lucide-react';
import CoachingInquiryModal from './CoachingInquiryModal';

export default function FooterSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CoachingInquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <footer className="border-t border-border/30 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Top: Brand + Nav links */}
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <Logo size="default" />
              <p className="text-sm text-muted-foreground font-body mt-3 leading-relaxed">
                The elite calisthenics coaching platform. Master your bodyweight.
              </p>
            </div>

            {/* Platform links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-3">Platform</h4>
              <ul className="space-y-2">
                {[
                  { to: '/skills', label: 'Skill Library' },
                  { to: '/diagnostic', label: 'Athlete Scan' },
                  { to: '/results', label: 'Student Results' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coaching links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-3">Coaching</h4>
              <ul className="space-y-2">
                {[
                  { to: '/pricing', label: '1-on-1 Coaching' },
                  { to: '/members', label: 'BTCALI Members' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social + Inquire — centred */}
          <div className="border-t border-border/30 pt-8 flex flex-col items-center gap-5">
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="https://www.instagram.com/btcali_sw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                Instagram @btcali_sw
              </a>
              <a
                href="https://youtube.com/@btcali_sw?si=vCNZ0my-iFFsr1-0"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                YouTube @btcali_sw
              </a>
              <a
                href="https://www.tiktok.com/@btcali_sw?is_from_webapp=1&sender_device=pc"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                TikTok @btcali_sw
              </a>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary hover:scale-105 transition-transform"
            >
              <Mail className="w-4 h-4" /> Inquire About Coaching
            </button>

            <p className="text-xs text-muted-foreground font-body text-center">
              © {new Date().getFullYear()} BTCALI. All rights reserved. Built for elite athletes.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}