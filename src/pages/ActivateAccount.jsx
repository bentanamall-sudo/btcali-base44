/**
 * ActivateAccount — one-time flow to link a BTCALI access code to a Base44 account.
 * Step 1: Enter access code
 * Step 2: Create account (handled by Base44 auth — redirects to login/register)
 * Step 3: After login, call activateMemberAccount to link the code
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { callFunction } from '@/lib/callFunction';
import { useMember } from '@/lib/MemberContext';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarLogo } from '@/components/Logo';

export default function ActivateAccount() {
  const [step, setStep] = useState('enter_code'); // enter_code | activating | done | error
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { refresh, isMember, loading: memberLoading } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.isAuthenticated().then(auth => {
      setIsLoggedIn(auth);
      if (auth) {
        // If user is already a member, go straight to their program
        // (checked after memberLoading resolves — see second useEffect)
        const pending = sessionStorage.getItem('btcali-pending-code');
        if (pending) {
          sessionStorage.removeItem('btcali-pending-code');
          activateCode(pending);
        }
      }
    });
  }, []);

  // Once member context loads, if already a member redirect straight to program
  useEffect(() => {
    if (!memberLoading && isMember) {
      navigate('/my-program', { replace: true });
    }
  }, [memberLoading, isMember]);

  const activateCode = async (codeToActivate) => {
    setStep('activating');
    setErrorMsg('');
    try {
      const result = await callFunction('activateMemberAccount', { access_code: codeToActivate });
      if (result?.error) {
        setErrorMsg(result.error);
        setStep('error');
      } else {
        await refresh();
        setStep('done');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Activation failed. Please try again.');
      setStep('error');
    }
  };

  const handleSubmitCode = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    if (!isLoggedIn) {
      // Store the code and redirect to login/register — return to this page after login
      sessionStorage.setItem('btcali-pending-code', trimmed);
      base44.auth.redirectToLogin(window.location.origin + '/#/activate');
      return;
    }

    await activateCode(trimmed);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <NavbarLogo />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border">

        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          {step === 'activating' ? <Loader2 className="w-7 h-7 text-primary-foreground animate-spin" />
            : step === 'done' ? <CheckCircle className="w-7 h-7 text-primary-foreground" />
            : step === 'error' ? <AlertCircle className="w-7 h-7 text-primary-foreground" />
            : <Lock className="w-7 h-7 text-primary-foreground" />}
        </div>

        {/* ── Step: Enter Code ── */}
        {step === 'enter_code' && (
          <>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Activate Your <span className="gradient-text">Account</span>
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
              Enter your BTCALI access code to activate your account.
              {!isLoggedIn && " You'll then create a login with your email and password."}
            </p>

            <div className="flex gap-2 rounded-xl overflow-hidden mb-3 ring-1 ring-border/40">
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleSubmitCode()}
                placeholder="Enter your access code"
                className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3.5 outline-none placeholder:text-muted-foreground/50 uppercase tracking-widest"
              />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleSubmitCode}
                className="gradient-bg-strong px-5 font-heading font-bold text-sm text-primary-foreground">
                {isLoggedIn ? 'Activate' : 'Continue'}
              </motion.button>
            </div>

            {!isLoggedIn && (
              <p className="text-xs font-body text-muted-foreground mt-4">
                Already activated?{' '}
                <button onClick={() => base44.auth.redirectToLogin(window.location.origin + '/#/my-program')}
                  className="text-primary font-semibold hover:underline">
                  Log in →
                </button>
              </p>
            )}
          </>
        )}

        {/* ── Step: Activating ── */}
        {step === 'activating' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Activating...</h1>
            <p className="text-sm font-body text-muted-foreground">Linking your account to your program.</p>
          </>
        )}

        {/* ── Step: Done ── */}
        {step === 'done' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-3">
              Account <span className="gradient-text">Created!</span>
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-2 leading-relaxed">
              Your BTCALI account has been created successfully.
            </p>
            <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
              Your login details have been saved. You can now access your personalised coaching program.
            </p>
            <Link to="/my-program">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base flex items-center justify-center gap-2"
                style={{ boxShadow: '0 0 28px rgba(79,157,255,0.35)' }}>
                Go To My Program <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </>
        )}

        {/* ── Step: Error ── */}
        {step === 'error' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Activation Failed</h1>
            <p className="text-sm font-body text-destructive mb-6">{errorMsg}</p>
            <button onClick={() => { setStep('enter_code'); setErrorMsg(''); }}
              className="px-6 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm">
              Try Again
            </button>
          </>
        )}

        <div className="mt-6">
          <Link to="/" className="text-xs text-muted-foreground/50 hover:text-muted-foreground font-body transition-colors">← Back to home</Link>
        </div>
      </motion.div>
    </div>
  );
}