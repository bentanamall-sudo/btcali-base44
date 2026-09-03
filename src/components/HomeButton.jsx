import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function HomeButton({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-1.5 px-3 py-2 text-foreground/60 hover:text-foreground transition-colors font-heading font-semibold text-xs uppercase tracking-wider magnetic ${className}`} style={{ border: '1px solid #D1D1CB' }}>
      <Home className="w-3.5 h-3.5" />
      <span>Home</span>
    </Link>
  );
}