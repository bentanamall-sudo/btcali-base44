/**
 * ActivateAccount — access code entry page.
 * Sends code to backend for validation — no codes in frontend.
 * Mobile-friendly: stacked layout, keyboard-safe submit button.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useMember } from '@/lib/MemberContext';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarLogo } from '@/components/Logo';

export default function ActivateAccount() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useMember();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) { setError('Please enter your access code.'); return; }
    setError('');
    setLoading(true);
    const result = await login(trimmed);
    setLoading(false);
    if (result.valid) {
      navigate('/my-program', { replace: true });
    } else {
      setError(result.error);
    }
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
        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          Enter Your <span className="gradient-text">Access Code</span>
        </h1>
        <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
          Enter your BTCALI access code to open your personalised program.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          {/* Stacked layout on mobile — no clipping */}
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
            placeholder="e.g. BTCALI123"
            autoCapitalize="characters"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
            className={`w-full bg-transparent text-foreground font-body text-sm px-4 py-4 rounded-xl outline-none placeholder:text-muted-foreground/40 uppercase tracking-widest border ${error ? 'border-destructive/60' : 'border-border/40'} focus:border-primary/60 transition-colors`}
            style={{ WebkitAppearance: 'none', fontSize: '16px' }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-bg-strong py-4 rounded-xl font-heading font-bold text-sm text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
            ) : (
              <>Enter <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 px-4 py-3 rounded-xl mt-3"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)' }}
          >
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm font-body text-left" style={{ color: 'hsl(var(--destructive))' }}>{error}</p>
          </motion.div>
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