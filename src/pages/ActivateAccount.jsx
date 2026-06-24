/**
 * ActivateAccount — pure access code entry page.
 * No email/password. Enter code → validated instantly → redirect to /my-program.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useMember } from '@/lib/MemberContext';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarLogo } from '@/components/Logo';

export default function ActivateAccount() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useMember();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(code.trim().toUpperCase());
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

        <form onSubmit={handleSubmit} className="w-full">
          <div className={`flex gap-2 rounded-xl overflow-hidden mb-3 ring-1 ${error ? 'ring-destructive/60' : 'ring-border/40'}`}>
            <input
              type="text"
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
              placeholder="e.g. BTCALI123"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3.5 outline-none placeholder:text-muted-foreground/40 uppercase tracking-widest"
            />
            <button
              type="submit"
              className="gradient-bg-strong px-5 font-heading font-bold text-sm text-primary-foreground whitespace-nowrap flex items-center gap-1.5"
            >
              Enter <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 px-4 py-3 rounded-xl mb-2"
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