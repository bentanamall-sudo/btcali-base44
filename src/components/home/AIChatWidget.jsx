import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Loader2, ArrowRight, MessageCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LOGO_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/668f24dc5_ChatGPTImageJun2202609_27_21AM.png';



function CoachingCTA() {
  return (
    <div className="mt-3 pt-3 border-t border-border/30">
      <a
        href="/pricing"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg-strong text-primary-foreground font-heading font-bold text-xs glow-primary transition-all hover:scale-105 w-full justify-center"
      >
        Apply for 1-on-1 Coaching <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! What calisthenics skill are you currently working towards — front lever, planche, handstand push-up, or something else?', showCta: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, showCta: false }]);
    setLoading(true);

    const res = await base44.functions.invoke('aiCoach', { history: messages, userMessage });
    const response = res.data?.response ?? '';
    const showCta = typeof response === 'string' && response.includes('[SHOW_CTA]');
    const clean = typeof response === 'string' ? response.replace('[SHOW_CTA]', '').trim() : String(response);
    setMessages(prev => [...prev, { role: 'assistant', content: clean, showCta }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong rounded-2xl border border-border/40 shadow-2xl flex flex-col"
              style={{ width: 'min(380px, calc(100vw - 24px))', height: '480px' }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
                <img src={LOGO_URL} alt="BTCALI" style={{ width: 32, height: 32, objectFit: 'contain', background: 'transparent' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-foreground">BTCALI AI Coach</p>
                  <p className="text-xs text-primary font-body">● Online</p>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg gradient-bg-strong flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 ${msg.role === 'user' ? 'glass glow-border' : 'bg-muted/30'}`}>
                      <p className="text-xs font-body text-foreground leading-relaxed">{msg.content}</p>
                      {msg.showCta && <CoachingCTA />}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg gradient-bg-strong flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <div className="glass rounded-2xl px-3 py-2">
                      <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/30">
                <div className="glass rounded-xl p-1.5 flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about your training..."
                    className="flex-1 bg-transparent text-foreground font-body text-xs px-3 py-2 outline-none placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="rounded-lg gradient-bg-strong px-3 py-2 hover:glow-primary disabled:opacity-50 transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(prev => !prev)}
          className="w-14 h-14 rounded-full gradient-bg-strong glow-primary-strong flex items-center justify-center shadow-2xl"
        >
          {open ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
        </motion.button>
      </div>
    </>
  );
}