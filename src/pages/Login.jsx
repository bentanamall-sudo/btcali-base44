/**
 * /login — redirects to Base44 platform auth.
 * After login the platform returns to /#/my-program.
 * Shows a brief loading UI while the redirect happens.
 */
import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { NavbarLogo } from '@/components/Logo';

export default function Login() {
  useEffect(() => {
    base44.auth.redirectToLogin(window.location.origin + '/#/my-program');
  }, []);

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