import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function HomeButton({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all font-heading font-semibold text-xs ${className}`}>
      <Home className="w-3.5 h-3.5" />
      <span>Home</span>
    </Link>
  );
}