/**
 * CodeUnlock — replaced by Login button.
 * When logged in as member/admin, shows quick-access pill instead.
 */
import { useMember } from '@/lib/MemberContext';
import { useNavigate } from 'react-router-dom';
import { Crown, ShieldCheck, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function CodeUnlock() {
  const { isAdmin, isMember, logout } = useMember();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    logout();
    setOpen(false);
    await base44.auth.logout('/');
  };

  if (isAdmin) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full hover:border-primary/30 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-heading font-semibold gradient-text">Admin</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-10 z-50 w-48 glass-strong rounded-2xl p-4 border border-border/30"
              style={{ boxShadow: '0 0 30px hsl(var(--glow-primary) / 0.15)' }}
            >
              <button onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-semibold text-destructive border border-destructive/20 hover:bg-destructive/10 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (isMember) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full hover:border-primary/30 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Crown className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-heading font-semibold gradient-text">Member</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-10 z-50 w-56 glass-strong rounded-2xl p-4 border border-border/30"
              style={{ boxShadow: '0 0 30px hsl(var(--glow-primary) / 0.15)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-heading font-semibold text-foreground">Member Access</p>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { navigate('/my-program'); setOpen(false); }}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-heading font-semibold gradient-bg-strong text-primary-foreground">
                  My Program
                </button>
                <button onClick={handleLogout}
                  className="px-3 py-2 rounded-xl text-xs font-heading font-semibold text-destructive border border-destructive/20 hover:bg-destructive/10 transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Not logged in — simple Login button
  return (
    <button
      onClick={() => base44.auth.redirectToLogin(window.location.origin + '/#/activate')}
      className="flex items-center gap-1.5 glass px-4 py-1.5 rounded-full text-sm font-heading font-semibold text-foreground/80 hover:text-foreground hover:border-primary/30 transition-all"
      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
    >
      Login
    </button>
  );
}