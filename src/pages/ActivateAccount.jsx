/**
 * ActivateAccount — one-time flow to link a BTCALI access code to a Base44 account.
 * Step 1: Enter access code
 * Step 2: Create account (handled by Base44 auth — redirects to login/register)
 * Step 3: After login, call activateMemberAccount to link the code
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { callFunction } from '@/lib/callFunction';
import { useMember } from '@/lib/MemberContext';
import { Link, useNavigate } from 'react-router-dom';

export default function ActivateAccount() {
  const [step, setStep] = useState('enter_code'); // enter_code | activating | done | error
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { refresh } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.isAuthenticated().then(auth => {
      setIsLoggedIn(auth);
      // If user is already logged in and has a pending code in sessionStorage, activate it
      const pending = sessionStorage.getItem('btcali-pending-code');
      if (auth && pending) {
        sessionStorage.removeItem('btcali-pending-code');
        activateCode(pending);
      }
    });
  }, []);

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
        setTimeout(() => navigate('/my-program'), 2000);
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
      // Store the code and redirect to login/register
      sessionStorage.setItem('btcali-pending-code', trimmed);
      // Use origin only — after login Base44 returns to the root, then our useEffect picks up the pending code
      base44.auth.redirectToLogin(window.location.origin + '/#/activate');
      return;
    }

    await activateCode(trimmed);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border">

        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          {step === 'activating' ? <Loader2 className="w-7 h-7 text-primary-foreground animate-spin" />
            : step === 'done' ? <CheckCircle className="w-7 h-7 text-primary-foreground" />
            : step === 'error' ? <AlertCircle className="w-7 h-7 text-primary-foreground" />
            : <Lock className="w-7 h-7 text-primary-foreground" />}
        </div>

        {step === 'enter_code' && (
          <>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Activate Your <span className="gradient-text">Account</span>
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
              Enter your BTCALI access code to activate your account.
              {!isLoggedIn && ' You\'ll then create a login with your email and password.'}
            </p>

            <div className={`flex gap-2 rounded-xl overflow-hidden mb-3 ring-1 ring-border/40`}>
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

        {step === 'activating' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Activating...</h1>
            <p className="text-sm font-body text-muted-foreground">Linking your account to your program.</p>
          </>
        )}

        {step === 'done' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
              Account <span className="gradient-text">Activated!</span>
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-4">
              Your account is linked. Redirecting to your program...
            </p>
          </>
        )}

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