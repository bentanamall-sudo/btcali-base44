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
                { to: '/skills', label: 'Skill Library' },
                { to: '/dashboard', label: 'Dashboard' },
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
              {['Instagram', 'YouTube', 'TikTok', 'Discord'].map((s) => (
                <li key={s}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body cursor-pointer">
                    {s}
                  </span>
                </li>
              ))}
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