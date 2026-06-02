import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ChevronRight, X, ShieldCheck, Crown } from 'lucide-react';
import { useAccessCodes } from '@/lib/useAccessCodes';
import { useNavigate } from 'react-router-dom';

export default function CodeUnlock() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(null);
  const { isAdmin, isMember, unlockCode } = useAccessCodes();
  const navigate = useNavigate();

  const handleUnlock = () => {
    if (!code.trim()) return;
    const result = unlockCode(code);
    if (result === 'admin') {
      setStatus('success-admin');
      setCode('');
      setTimeout(() => {
        setOpen(false);
        navigate('/members');
      }, 1200);
    } else if (result === 'user') {
      setStatus('success-user');
      setCode('');
      setTimeout(() => {
        setOpen(false);
        navigate('/members');
      }, 1200);
    } else {
      setStatus('error');
      setTimeout(() => setStatus(null), 2000);
    }
  };

  if (isAdmin) {
    return (
      <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-heading font-semibold gradient-text">Admin</span>
      </div>
    );
  }

  if (isMember) {
    return (
      <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
        <Crown className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-heading font-semibold gradient-text">Member</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => { setOpen(!open); setStatus(null); }}
        className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
      >
        <KeyRound className="w-3.5 h-3.5" />
        <span className="text-xs font-heading">Member Code</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-10 z-50 w-72 glass-strong rounded-2xl p-4 border border-border/30"
            style={{ boxShadow: '0 0 30px hsl(var(--glow-primary) / 0.15)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary" />
                <span className="text-sm font-heading font-semibold text-foreground">Member Access Code</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground font-body mb-3">Enter your BTCALI member code to unlock exclusive content.</p>

            <div className={`flex gap-2 rounded-xl overflow-hidden transition-all duration-300 ${
              status === 'error' ? 'ring-1 ring-destructive/60' :
              status?.startsWith('success') ? 'ring-1 ring-primary/60' : 'ring-1 ring-border/30'
            }`}>
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setStatus(null); }}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Enter code..."
                className="flex-1 bg-transparent text-foreground text-sm font-body px-3 py-2.5 outline-none placeholder:text-muted-foreground/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                className="gradient-bg-strong px-3 flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 text-primary-foreground" />
              </motion.button>
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-destructive font-body mt-2 text-center"
                >
                  Invalid code. Try again.
                </motion.p>
              )}
              {status === 'success-admin' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-primary font-body mt-2 text-center flex items-center justify-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin access unlocked! Redirecting...
                </motion.p>
              )}
              {status === 'success-user' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-primary font-body mt-2 text-center"
                >
                  ✓ Member access granted! Redirecting...
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}