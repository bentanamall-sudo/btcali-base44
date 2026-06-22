import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, AlertTriangle, TrendingUp, Film, MessageCircle,
  Send, Clock, ShieldAlert, BookOpen, Zap, Dumbbell
} from 'lucide-react';

const RULES = [
  { icon: BookOpen,      color: '#4F9DFF', text: 'Review the General Tutorials section before starting — form, technique, and execution questions are covered there.' },
  { icon: Film,          color: '#93C5FD', text: 'Film every working set when possible.' },
  { icon: MessageCircle, color: '#67E8F9', text: 'Let me know if you need help or have any questions.' },
  { icon: Send,          color: '#4F9DFF', text: 'Send your sets to BTCALI for feedback.' },
  { icon: Clock,         color: '#A6D4FF', text: 'Rest 3–5 minutes between working sets.' },
  { icon: ShieldAlert,   color: '#F87171', text: 'Stop immediately if pain feels sharp or unsafe.' },
  { icon: Zap,           color: '#FCD34D', text: 'Log your session after training.' },
  { icon: TrendingUp,    color: '#34D399', text: 'Stay consistent and trust the process.' },
];

const PROGRESS_MARKERS = [
  'Increased strength',
  'Improved technique and form',
  'Improved endurance',
  'Improved energy levels',
  'Improved mobility and flexibility',
  'Reps feeling easier and more controlled',
  'Better body awareness and coordination',
];

const STORAGE_KEY = 'btcali-rules-open';

function loadOpen() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}
function saveOpen(key, val) {
  const cur = loadOpen();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, [key]: val }));
}

function DropSection({ storageKey, icon: Icon, iconColor, title, defaultOpen = false, children }) {
  const stored = loadOpen()[storageKey];
  const [open, setOpen] = useState(() => stored !== undefined ? stored : defaultOpen);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    saveOpen(storageKey, next);
  };
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={toggle} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: iconColor }} />
          <span className="font-heading font-bold text-sm" style={{ color: iconColor }}>{title}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/5 pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TrainingRulesCard() {
  const stored = loadOpen()['main'];
  const [open, setOpen] = useState(() => stored !== undefined ? stored : false);

  const toggleMain = () => {
    const next = !open;
    setOpen(next);
    saveOpen('main', next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl mb-5 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(4,4,10,0.98) 0%, rgba(6,10,22,0.98) 100%)',
        border: '1px solid rgba(79,157,255,0.22)',
        boxShadow: '0 0 40px rgba(79,157,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Top accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.7), rgba(252,211,77,0.5), transparent)' }} />

      {/* Collapsed header — always visible */}
      <button onClick={toggleMain} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(252,211,77,0.1)', border: '1px solid rgba(252,211,77,0.2)' }}>
            <Dumbbell className="w-4 h-4" style={{ color: '#FCD34D' }} />
          </div>
          <div>
            <p className="font-heading font-black text-sm tracking-[0.12em] uppercase" style={{ color: '#FCD34D' }}>BTCALI Training Rules</p>
            <p className="text-[11px] font-body" style={{ color: 'rgba(166,212,255,0.5)' }}>
              {open ? 'Tap to collapse' : 'Tap to expand — read before every session'}
            </p>
          </div>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(79,157,255,0.5)' }} />
        </motion.span>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">

              {/* Rules list */}
              <div className="space-y-2">
                {RULES.map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl px-3.5 py-2.5"
                    style={{ background: 'rgba(79,157,255,0.03)', border: '1px solid rgba(79,157,255,0.07)' }}
                  >
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(79,157,255,0.08)', border: `1px solid ${rule.color}25` }}>
                      <rule.icon className="w-3.5 h-3.5" style={{ color: rule.color }} />
                    </div>
                    <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: 'rgba(200,215,235,0.85)' }}>{rule.text}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.12), transparent)' }} />

              {/* Important Notes dropdown */}
              <DropSection storageKey="notes" icon={AlertTriangle} iconColor="#FCD34D" title="Important Notes" defaultOpen={false}>
                <div className="space-y-3">
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(200,215,235,0.8)' }}>
                    Everyone experiences weak days every now and then. Some sessions will feel amazing, while others may feel harder than normal. <span style={{ color: '#A6D4FF' }}>This is completely normal.</span>
                  </p>
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(200,215,235,0.8)' }}>
                    As long as this does not continue for weeks of training and you are still progressing overall, everything is fine.
                  </p>
                  <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(79,157,255,0.06)', border: '1px solid rgba(79,157,255,0.15)' }}>
                    <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: '#A6D4FF' }}>
                      If you ever have concerns, questions, unusual pain, or feel like your progress has completely stalled — let me know and I will help you.
                    </p>
                  </div>
                </div>
              </DropSection>

              {/* Progress Reminder dropdown */}
              <DropSection storageKey="progress" icon={TrendingUp} iconColor="#4F9DFF" title="Progress Reminder" defaultOpen={false}>
                <div className="space-y-4">
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(200,215,235,0.8)' }}>
                    Progress is not always linear due to the nature of our bodies. Some days you will feel stronger, some days weaker. <span style={{ color: '#A6D4FF' }}>Long-term consistency is what matters.</span>
                  </p>
                  <div>
                    <p className="text-xs font-heading font-bold uppercase tracking-wider mb-2.5" style={{ color: 'rgba(166,212,255,0.5)' }}>You can track progress through:</p>
                    <div className="grid sm:grid-cols-2 gap-1.5">
                      {PROGRESS_MARKERS.map((m, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4F9DFF' }} />
                          <p className="text-xs font-body" style={{ color: 'rgba(200,215,235,0.75)' }}>{m}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl px-4 py-3.5 space-y-2" style={{ background: 'rgba(252,211,77,0.04)', border: '1px solid rgba(252,211,77,0.15)' }}>
                    <p className="text-xs font-heading font-bold uppercase tracking-wider" style={{ color: '#FCD34D' }}>Important:</p>
                    <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: 'rgba(200,215,235,0.8)' }}>
                      Progress does <strong style={{ color: '#FCD34D' }}>NOT</strong> necessarily mean increased strength every session.
                    </p>
                    <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: 'rgba(200,215,235,0.75)' }}>
                      For example, if your form improves significantly, a movement may actually feel <em>harder</em> because you are performing it correctly. This does not mean you got weaker — it usually means you improved your technique and are building a stronger foundation for future progress.
                    </p>
                  </div>
                </div>
              </DropSection>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.1), transparent)' }} />
    </motion.div>
  );
}