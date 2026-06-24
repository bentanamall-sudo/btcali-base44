/**
 * /login — entry point for unauthenticated users.
 * Redirects to Base44 platform auth with /activate as the return URL.
 * If already authenticated, skips straight to /activate (which skips to /my-program if already linked).
 * CRITICAL: never pass /login as the return URL — that causes an infinite loop.
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
      // Already logged in — check activation status via /activate
      navigate('/activate', { replace: true });
      return;
    }

    // Not logged in — send to platform auth, return to /activate (NOT /login)
    const returnUrl = window.location.origin + '/#/activate';
    base44.auth.redirectToLogin(returnUrl);
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