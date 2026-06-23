/**
 * ActivateAccount
 *
 * Flow:
 * 1. User enters access code → validated client-side first
 * 2. If not logged in: save code to sessionStorage, send to Base44 login/register
 *    with return URL = /#/activate  (hash route, never 404s)
 * 3. On return (now logged in + pending code in sessionStorage): auto-activate
 * 4. Show success screen with "Go To My Program" button
 * 5. Already-activated members are redirected directly to /my-program
 */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { callFunction } from '@/lib/callFunction';
import { useMember } from '@/lib/MemberContext';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarLogo } from '@/components/Logo';

// Valid codes — client-side pre-check only (real validation is in the backend)
const VALID_CODE_PREFIXES = [
  'HENRY-', 'HAEJUN-', 'ANDEAS-', 'TANUSH-', 'RYAN-', 'JULIAN-',
  'MACK-', 'MARCUS-', 'ALISTAIR-', 'JAYDEN-', 'LUKE-', 'GAON-',
  'SEAN-', 'DANIEL-', 'MATHEW-', 'HAYDEN-', 'HUGO-', 'CEDRICK-',
  'LENNON-', 'BTCALI-ADMIN-',
];

// Old codes that are permanently disabled
const OLD_CODES = new Set([
  'HENRY173', 'HAEJUN142', 'ANDREAS189', 'TANUSH157', 'RYAN128',
  'JULIAN194', 'MACK136', 'MARCUS181', 'ALISTAIR149', 'JAYDEN165',
  'LUKE121', 'GAON176', 'SEAN138', 'DANIEL192', 'MATHEW154',
  'HAYDEN167', 'HUGO144', 'CEDRICK185', 'LENNON184', 'BTCALI999',
]);

function isPlausiblyValid(code) {
  if (OLD_CODES.has(code)) return false;
  return VALID_CODE_PREFIXES.some(p => code.startsWith(p));
}

export default function ActivateAccount() {
  const [step, setStep] = useState('enter_code'); // enter_code | activating | done | error
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { refresh, isMember, loading: memberLoading } = useMember();
  const navigate = useNavigate();
  const activatingRef = useRef(false); // prevent double-activation

  // On mount: check auth state and handle pending code from sessionStorage
  useEffect(() => {
    const init = async () => {
      // Clear any old localStorage keys that might cause stale sessions
      try {
        const oldKeys = ['btcali_access_code', 'btcali_member', 'accessCode', 'member_access'];
        oldKeys.forEach(k => localStorage.removeItem(k));
        sessionStorage.removeItem('btcali-pending-code'); // cleared only after use below
      } catch {}

      const isAuth = await base44.auth.isAuthenticated();

      if (!isAuth) {
        // Not logged in — show code entry form
        // (pending code stays in sessionStorage until they log in and return)
        return;
      }

      // Logged in — check for a pending activation code
      const pending = sessionStorage.getItem('btcali-pending-code');
      if (pending && !activatingRef.current) {
        sessionStorage.removeItem('btcali-pending-code');
        activatingRef.current = true;
        await activateCode(pending);
        return;
      }

      // Logged in, no pending code — if already a member, go to program
      // (wait for memberLoading to resolve via second useEffect)
    };

    init();
  }, []);

  // Once member context resolves, redirect if already activated
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
        activatingRef.current = false;
      } else {
        await refresh();
        setStep('done');
      }
    } catch (err) {
      const msg = err.message || 'Activation failed. Please try again.';
      setErrorMsg(msg);
      setStep('error');
      activatingRef.current = false;
    }
  };

  const handleSubmitCode = async (e) => {
    if (e) e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    // Client-side check for permanently disabled old codes
    if (OLD_CODES.has(trimmed)) {
      setErrorMsg('This access code is no longer valid. Please contact BTCALI for your new secure code.');
      setStep('error');
      return;
    }

    const isAuth = await base44.auth.isAuthenticated();

    if (!isAuth) {
      // Save code, send to Base44 login — MUST use hash route to avoid 404
      sessionStorage.setItem('btcali-pending-code', trimmed);
      // Use the full origin + hash path so Base44 redirects back inside the SPA
      const returnUrl = window.location.origin + '/#/activate';
      base44.auth.redirectToLogin(returnUrl);
      return;
    }

    await activateCode(trimmed);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8">
        <NavbarLogo />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          {step === 'activating' && <Loader2 className="w-7 h-7 text-primary-foreground animate-spin" />}
          {step === 'done'       && <CheckCircle className="w-7 h-7 text-primary-foreground" />}
          {step === 'error'      && <AlertCircle className="w-7 h-7 text-primary-foreground" />}
          {step === 'enter_code' && <Lock className="w-7 h-7 text-primary-foreground" />}
        </div>

        {/* ── STEP: Enter Code ── */}
        {step === 'enter_code' && (
          <>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Activate Your <span className="gradient-text">Account</span>
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
              Enter your BTCALI access code to create your account. You'll set up an email and password to log in on future visits.
            </p>

            <form onSubmit={handleSubmitCode} className="w-full">
              <div className="flex gap-2 rounded-xl overflow-hidden mb-3 ring-1 ring-border/40">
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. MEMBER-XXXXXX"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3.5 outline-none placeholder:text-muted-foreground/40 uppercase tracking-widest"
                />
                <button
                  type="submit"
                  className="gradient-bg-strong px-5 font-heading font-bold text-sm text-primary-foreground whitespace-nowrap"
                >
                  Continue →
                </button>
              </div>
            </form>

            <p className="text-xs font-body text-muted-foreground mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => base44.auth.redirectToLogin(window.location.origin + '/#/my-program')}
                className="text-primary font-semibold hover:underline"
              >
                Log in →
              </button>
            </p>
          </>
        )}

        {/* ── STEP: Activating ── */}
        {step === 'activating' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Activating...</h1>
            <p className="text-sm font-body text-muted-foreground">Linking your account to your program. Please wait.</p>
          </>
        )}

        {/* ── STEP: Done ── */}
        {step === 'done' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-3">
              Account <span className="gradient-text">Activated!</span>
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-2 leading-relaxed">
              Your BTCALI account has been created successfully.
            </p>
            <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
              Your login details have been saved. You can now access your personalised coaching program anytime.
            </p>
            <Link to="/my-program">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base flex items-center justify-center gap-2"
                style={{ boxShadow: '0 0 28px rgba(79,157,255,0.35)' }}
              >
                Go To My Program <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </>
        )}

        {/* ── STEP: Error ── */}
        {step === 'error' && (
          <>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Activation Failed</h1>
            <p className="text-sm font-body leading-relaxed mb-6" style={{ color: 'hsl(var(--destructive))' }}>
              {errorMsg}
            </p>
            <button
              type="button"
              onClick={() => { setStep('enter_code'); setErrorMsg(''); setCode(''); }}
              className="px-6 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm"
            >
              Try Again
            </button>
          </>
        )}

        <div className="mt-6">
          <Link to="/" className="text-xs text-muted-foreground/50 hover:text-muted-foreground font-body transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}