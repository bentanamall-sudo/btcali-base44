/**
 * /signup — New BTCALI student account creation.
 *
 * Since Base44 handles email/password creation on their platform,
 * we redirect to platform signup with /#/activate as the return URL.
 * The access code is collected on /activate immediately after signup.
 *
 * Already authenticated → /activate (skips to /my-program if already linked)
 */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { NavbarLogo } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';
import { UserPlus, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAuth) return;
    if (isAuthenticated) {
      navigate('/activate', { replace: true });
      return;
    }
    // Redirect to platform signup — returns to /activate after account creation
    const returnUrl = window.location.origin + '/#/activate';
    base44.auth.redirectToLogin(returnUrl);
  }, [isAuthenticated, isLoadingAuth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-10">
      <NavbarLogo />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border"
      >
        <div className="w-14 h-14 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          <UserPlus className="w-6 h-6 text-primary-foreground" />
        </div>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          New to <span className="gradient-text">BTCALI?</span>
        </h1>
        <p className="font-heading font-semibold text-base text-foreground mb-2">
          Create your member account
        </p>
        <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
          Only active BTCALI students with a valid access code can create an account. After signing up, you will enter your student code to unlock your program.
        </p>

        {/* What to expect */}
        <div className="text-left space-y-3 mb-8 rounded-xl p-4"
          style={{ background: 'rgba(79,157,255,0.05)', border: '1px solid rgba(79,157,255,0.15)' }}>
          {[
            { Icon: UserPlus, text: 'Create your account with email or Google' },
            { Icon: Key, text: 'Enter your student access code (XXXX-XXXX-XXXX-XXXX)' },
            { Icon: ShieldCheck, text: 'Your code is verified and linked to your account' },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full gradient-bg-strong flex items-center justify-center flex-shrink-0">
                <Icon className="w-3 h-3 text-primary-foreground" />  {/* eslint-disable-line */}
              </div>
              <p className="text-xs font-body text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => base44.auth.redirectToLogin(window.location.origin + '/#/activate')}
          className="w-full gradient-bg-strong py-4 rounded-xl font-heading font-bold text-sm text-primary-foreground flex items-center justify-center gap-2 mb-3"
        >
          Create Account <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-xs font-body text-muted-foreground/60">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Sign in →
          </Link>
        </p>

        <div className="mt-6 flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full gradient-bg-strong animate-pulse" />
          <p className="text-xs font-body text-muted-foreground/50">Redirecting to secure signup…</p>
        </div>
      </motion.div>

      <Link to="/" className="text-xs text-muted-foreground/40 hover:text-muted-foreground font-body transition-colors">
        ← Back to BTCALI
      </Link>
    </div>
  );
}