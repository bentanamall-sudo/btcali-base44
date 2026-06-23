import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl gradient-bg-strong flex items-center justify-center mx-auto mb-6"
          style={{ boxShadow: '0 0 24px rgba(79,157,255,0.2)' }}>
          <span className="font-heading font-black text-2xl text-primary-foreground">?</span>
        </div>
        <h1 className="font-heading font-black text-5xl gradient-text mb-3">404</h1>
        <h2 className="font-heading font-bold text-xl text-foreground mb-3">Page Not Found</h2>
        <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
          This page doesn't exist. You may have followed an outdated link.
        </p>
        <Link to="/">
          <button className="px-7 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm"
            style={{ boxShadow: '0 0 18px rgba(79,157,255,0.25)' }}>
            ← Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}