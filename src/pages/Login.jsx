/**
 * /login — redirects to Base44 platform auth.
 * If already logged in, sends to /activate (which auto-skips to /my-program if already activated).
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { NavbarLogo } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAuth) return;

    if (isAuthenticated) {
      navigate('/activate', { replace: true });
      return;
    }

    base44.auth.redirectToLogin(window.location.origin + '/#/activate');
  }, [isAuthenticated, isLoadingAuth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-8">
      <NavbarLogo />
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm font-body text-muted-foreground">Redirecting to login…</p>
      </div>
    </div>
  );
}