/**
 * /login — BTCALI member login page.
 * 
 * Already authenticated → /activate (which skips to /my-program if already linked)
 * Not authenticated → platform login, returns to /#/activate
 * 
 * NEVER pass /login as return URL — causes infinite loop.
 */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { NavbarLogo } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';
import { LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAuth) return;
    if (isAuthenticated) {
      // Already logged in — check activation status
      navigate('/activate', { replace: true });
      return;
    }
    // Send to Base44 platform auth, return to /activate after
    const returnUrl = window.location.origin + '/#/activate';
    base44.auth.redirectToLogin(returnUrl);
  }, [isAuthenticated, isLoadingAuth]);

  // Show branded loading while redirecting
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-10">
      <NavbarLogo />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border"
      >
        <div className="w-14 h-14 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-6 h-6 text-primary-foreground" />
        </div>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          Already a <span className="gradient-text">BTCALI member?</span>
        </h1>
        <p className="text-sm font-body text-muted-foreground mb-2 leading-relaxed">
          Sign in to access your personalised training program.
        </p>
        <p className="text-xs font-body text-muted-foreground/60 mb-8">
          New to BTCALI?{' '}
          <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Create an account with your student access code →
          </Link>
        </p>

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => base44.auth.redirectToLogin(window.location.origin + '/#/activate')}
            className="w-full gradient-bg-strong py-4 rounded-xl font-heading font-bold text-sm text-primary-foreground flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </motion.button>

          <Link to="/signup">
            <button className="w-full glass border border-border/40 py-3 rounded-xl font-heading font-semibold text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
              Create Account
            </button>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full gradient-bg-strong animate-pulse" />
          <p className="text-xs font-body text-muted-foreground/50">Redirecting to secure login…</p>
        </div>
      </motion.div>

      <Link to="/" className="text-xs text-muted-foreground/40 hover:text-muted-foreground font-body transition-colors">
        ← Back to BTCALI
      </Link>
    </div>
  );
}