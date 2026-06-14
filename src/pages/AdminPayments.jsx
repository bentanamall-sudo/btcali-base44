import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Settings, Eye, CheckCircle, AlertCircle, Link2 } from 'lucide-react';
import { useAccessCodes } from '@/lib/useAccessCodes';

const METHODS = [
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '💳',
    status: 'pending',
    statusLabel: 'Pending Setup',
    placeholder: 'Paste your PayPal.me or payment link here',
    note: 'e.g. https://paypal.me/yourusername/150AUD',
  },
  {
    id: 'directdebit',
    name: 'Direct Debit',
    icon: '🏦',
    status: 'pending',
    statusLabel: 'Pending Setup',
    placeholder: 'Paste your Direct Debit setup link or BSB/Account info here',
    note: 'e.g. BSB 062-714 / Account 1011 2122',
  },
];

function MethodCard({ method }) {
  const [link, setLink] = useState('');
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState('');

  const handleSave = () => {
    setSaved(link);
    setEditing(false);
  };

  return (
    <div className="glass rounded-2xl border border-border/30 overflow-hidden">
      <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{method.icon}</span>
          <div>
            <p className="font-heading font-bold text-foreground text-sm">{method.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {method.status === 'pending' ? (
                <AlertCircle className="w-3 h-3 text-amber-400" />
              ) : (
                <Settings className="w-3 h-3 text-muted-foreground/50" />
              )}
              <span className={`text-xs font-body ${method.status === 'pending' ? 'text-amber-400' : 'text-muted-foreground/50'}`}>
                {method.statusLabel}
              </span>
            </div>
          </div>
        </div>
        {saved && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
      </div>
      <div className="p-5 space-y-3">
        {saved && !editing ? (
          <div className="glass rounded-xl px-4 py-3 border border-primary/20">
            <p className="text-xs font-heading font-bold text-primary/70 uppercase tracking-wider mb-1">Saved Link</p>
            <p className="text-sm font-body text-foreground/80 break-all">{saved}</p>
          </div>
        ) : (
          <input
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder={method.placeholder}
            className="w-full glass rounded-xl px-4 py-2.5 text-foreground text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent font-body"
          />
        )}
        <p className="text-xs font-body text-muted-foreground/50">{method.note}</p>
        <div className="flex gap-2">
          {editing || !saved ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={!link.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-bg-strong text-primary-foreground font-heading font-bold text-xs disabled:opacity-40"
            >
              <Link2 className="w-3.5 h-3.5" /> Save Link
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg glass border border-border/40 text-foreground font-heading font-bold text-xs"
            >
              <Settings className="w-3.5 h-3.5" /> Edit
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

function AthletePaymentPreview() {
  return (
    <div className="glass rounded-2xl border border-primary/20 overflow-hidden">
      <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
        <Eye className="w-4 h-4 text-primary" />
        <p className="font-heading font-bold text-sm text-foreground">Athlete Payment Step Preview</p>
        <span className="ml-auto text-xs font-body text-muted-foreground/50 bg-muted/30 px-2 py-0.5 rounded-full">Admin Preview Only</span>
      </div>
      <div className="p-6">
        <div className="max-w-sm mx-auto glass rounded-2xl p-6 border border-border/30 text-center">
          <CreditCard className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-heading font-bold text-foreground text-lg mb-2">Payment Setup</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
            Your coaching application has been accepted. Complete payment setup to begin BTCALI coaching and receive members access.
          </p>
          <div className="space-y-3">
            {['💳 PayPal', '🏦 Direct Debit'].map(method => (
              <div key={method} className="glass rounded-xl px-4 py-3 border border-border/30 flex items-center justify-between">
                <span className="font-heading font-semibold text-sm text-foreground">{method}</span>
                <span className="text-xs font-body text-muted-foreground/50 bg-muted/30 px-2 py-1 rounded-full">Pending setup</span>
              </div>
            ))}
          </div>
          <p className="text-xs font-body text-muted-foreground/40 mt-4">Payment buttons will activate once links are configured above.</p>
        </div>
      </div>
    </div>
  );
}

function AccessGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { unlockCode } = useAccessCodes();

  const handle = () => {
    const result = unlockCode(code);
    if (result === 'admin') onUnlock();
    else { setError(true); setTimeout(() => setError(false), 2500); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 border border-primary/30 max-w-sm w-full text-center glow-border">
        <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
        <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Admin Access Required</h1>
        <p className="text-sm font-body text-muted-foreground mb-6">Enter your admin code to manage payment settings.</p>
        <div className={`flex gap-2 rounded-xl overflow-hidden mb-3 transition-all ${error ? 'ring-2 ring-destructive/60' : 'ring-1 ring-border/40'}`}>
          <input type="password" value={code} onChange={e => { setCode(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && handle()}
            placeholder="Admin code..."
            className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3.5 outline-none placeholder:text-muted-foreground/50" />
          <motion.button whileTap={{ scale: 0.95 }} onClick={handle}
            className="gradient-bg-strong px-4 flex items-center justify-center">
            <Lock className="w-4 h-4 text-primary-foreground" />
          </motion.button>
        </div>
        {error && <p className="text-xs text-destructive font-body">Invalid admin code.</p>}
      </motion.div>
    </div>
  );
}

export default function AdminPayments() {
  const { isAdmin } = useAccessCodes();
  const [localUnlocked, setLocalUnlocked] = useState(false);

  if (!isAdmin && !localUnlocked) {
    return <AccessGate onUnlock={() => setLocalUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-primary/30 mb-4">
          <Lock className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Admin Only</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">
          Payment <span className="gradient-text">Management</span>
        </h1>
        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg">
          Configure payment links for BTCALI coaching. These will be shown to athletes after their application is accepted.
        </p>
      </motion.div>

      <div className="space-y-4 mb-10">
        {METHODS.map((method, i) => (
          <motion.div key={method.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <MethodCard method={method} />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <AthletePaymentPreview />
      </motion.div>
    </div>
  );
}