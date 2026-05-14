import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function FooterSection() {
  return (
    <footer className="border-t border-border/30 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo size="default" />
            <p className="text-sm text-muted-foreground font-body mt-3 leading-relaxed">
              The elite calisthenics operating system. Master your bodyweight.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Platform</h4>
            <ul className="space-y-2">
              {[
                { to: '/scan', label: 'Athlete Scan' },
                { to: '/tutorials', label: 'Free Tutorials' },
                { to: '/programs', label: 'Programs' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Coaching</h4>
            <ul className="space-y-2">
              {[
                { to: '/pricing', label: 'Pricing' },
                { to: '/results', label: 'Proven Results' },
                { to: '/ai-coach', label: 'AI Coach' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.instagram.com/btcali_sw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  @btcali_sw (Instagram)
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@btcali_sw?si=vCNZ0my-iFFsr1-0" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  BTCALI (YouTube)
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@btcali_sw?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  @btcali_sw (TikTok)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/30 pt-8 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} BTCALI. All rights reserved. Built for elite athletes.
          </p>
        </div>
      </div>
    </footer>
  );
}