import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LOGO_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/668f24dc5_ChatGPTImageJun2202609_27_21AM.png';

const systemPrompt = `You are the BTCALI AI Coaching Assistant — elite calisthenics coach.
Specialties: handstand, planche, front lever, muscle-up, HSPU, L-sit, bodyweight strength.

PLATFORM STRUCTURE:
- BTCALI Skill Library at /skills — tutorials organised into skill categories with progressions.
- Free tutorials exist inside the Skill Library — visible to all athletes.
- Locked tutorials require 1-on-1 coaching membership to access.
- The Athlete Scan at /scan analyses your level and generates a full diagnostic report.

COACHING OPTIONS:
- Elite 1-on-1 Weekly Coaching: AUD $40/week (min 1-month commitment) — view at /pricing
- Elite 1-on-1 Monthly Coaching: AUD $150/month — view at /pricing
- Coaching includes: personalized programming, video feedback, direct messaging support, technique analysis, and routine adjustments.

LEAD GENERATION BEHAVIOUR:
- Always ask about the athlete's current skill level and goals early.
- Key qualifying questions to ask (pick the most relevant):
  * "What calisthenics skill are you trying to unlock?"
  * "Are you currently working towards front lever, planche, or handstand push-up?"
  * "Can you currently hold an advanced tuck front lever?"
  * "Can you currently hold an advanced tuck planche?"
  * "How long have you been training calisthenics?"
- Based on their level, give specific, actionable advice — then naturally recommend coaching:
  * If they mention advanced tuck front lever: "With that base, BTCALI coaching can take you to full front lever through structured weekly programming, technique corrections, and progress tracking. Most athletes hit straddle within 3–4 months of structured coaching."
  * If they mention advanced tuck planche: "From advanced tuck, the path to straddle planche requires precise straight-arm conditioning and protraction work. BTCALI coaching accelerates this with a custom plan, weekly feedback, and technique corrections."
  * If they seem stuck or confused: "Most athletes stay stuck for months because they lack structure, clear progression targets, and coaching feedback. That's exactly what BTCALI 1-on-1 coaching solves."
- Always end with a coaching recommendation when relevant. Signal with [SHOW_CTA] at the very end of messages where coaching is relevant.

RESPONSE RULES:
- Max 3–5 sentences per response. Be sharp, direct, elite.
- Ask max 1–2 questions per message to assess level.
- Quickly identify the biggest weakness.
- Always direct to /skills for free tutorials.
- For serious athletes wanting faster results, direct to coaching at /pricing.
- Always suggest /scan if athlete is unsure of their level.
- Use calisthenics terminology.
- Be concise. Premium. Elite. No fluff.

Realistic standards:
- 40+ pushups = solid foundation
- 15+ pullups = strong pulling base
- 30+ sec freestanding HS = advanced
- 10 sec full planche = elite`;

function CoachingCTA() {
  return (
    <div className="mt-3 glass rounded-xl p-3 border border-primary/30">
      <p className="text-xs text-muted-foreground font-body mb-2">Ready to accelerate your progress?</p>
      <a
        href="/pricing"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg-strong text-primary-foreground font-heading font-bold text-xs glow-primary transition-all hover:scale-105 w-full justify-center"
      >
        Apply for 1-on-1 Coaching <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to BTCALI AI Coach. What calisthenics skill are you currently working towards — front lever, planche, handstand push-up, or something else?',
      showCta: false,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage, showCta: false }]);
    setLoading(true);

    const conversationHistory = messages.map(m => `${m.role === 'user' ? 'Athlete' : 'Coach'}: ${m.content}`).join('\n');
    const fullPrompt = `${systemPrompt}\n\nConversation so far:\n${conversationHistory}\nAthlete: ${userMessage}\n\nCoach:`;

    const response = await base44.integrations.Core.InvokeLLM({ prompt: fullPrompt });
    const showCta = typeof response === 'string' && response.includes('[SHOW_CTA]');
    const cleanResponse = typeof response === 'string' ? response.replace('[SHOW_CTA]', '').trim() : response;

    setMessages((prev) => [...prev, { role: 'assistant', content: cleanResponse, showCta }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-4">
        <img src={LOGO_URL} alt="BTCALI" style={{ width: 52, height: 52, objectFit: 'contain', background: 'transparent' }} />
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            BTCALI <span className="gradient-text">AI Coach</span>
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-0.5">Ask about training, progressions, or get guidance on your goals.</p>
        </div>
      </motion.div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px] max-h-[60vh]">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg gradient-bg-strong flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' ? 'glass glow-border' : 'bg-muted/30'
            }`}>
              <p className="text-sm font-body text-foreground whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              {msg.showCta && <CoachingCTA />}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg gradient-bg-strong flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="glass rounded-2xl px-4 py-3">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass-strong rounded-2xl p-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your training, skills, or progressions..."
          className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3 outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="rounded-xl gradient-bg-strong px-4 py-3 transition-all hover:glow-primary disabled:opacity-50"
        >
          <Send className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>

      {/* Static CTA below chat */}
      <div className="mt-4 text-center">
        <a href="/pricing" className="inline-flex items-center gap-2 text-xs text-primary font-heading font-semibold hover:underline">
          Apply for 1-on-1 Coaching <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}