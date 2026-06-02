import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';

export default function CoachingInquiryModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', instagram: '', email: '', message: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('New BTCALI Coaching Inquiry');
    const body = encodeURIComponent(
`Name: ${form.name}
Instagram handle: ${form.instagram}
Email: ${form.email}
Goal/message: ${form.message}`
    );
    window.location.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  const canSubmit = form.name.trim() && form.instagram.trim() && form.email.trim() && form.message.trim();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md glass rounded-2xl p-7 border border-primary/30 z-10"
            style={{ boxShadow: '0 0 60px hsl(var(--glow-primary)/0.2)' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-heading font-bold text-xl text-foreground mb-1">Inquire About Coaching</h2>
            <p className="text-sm text-muted-foreground font-body mb-6">Fill in the form and your email app will open ready to send.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Name *</label>
                <input
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full glass rounded-xl px-4 py-3 text-foreground font-body text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Instagram Handle *</label>
                <input
                  value={form.instagram}
                  onChange={e => set('instagram', e.target.value)}
                  placeholder="@yourhandle"
                  required
                  className="w-full glass rounded-xl px-4 py-3 text-foreground font-body text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full glass rounded-xl px-4 py-3 text-foreground font-body text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Coaching Goal / Message *</label>
                <textarea
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  placeholder="What are your goals? What do you want to achieve?"
                  required
                  rows={3}
                  className="w-full glass rounded-xl px-4 py-3 text-foreground font-body text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm flex items-center justify-center gap-2 glow-primary disabled:opacity-40 transition-opacity"
              >
                <Mail className="w-4 h-4" /> Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}