import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GlassCard from '../components/GlassCard';

const systemPrompt = `You are the BTCALI AI Coaching Assistant — an elite, intelligent calisthenics coach. 
You specialize in handstands, planche, front lever, muscle-ups, HSPU, and all bodyweight strength skills.
You provide:
- Progress analysis based on user updates
- Next-step recommendations
- Weakness identification
- Roadmap advice
- Motivating, coaching-style responses

Be concise but thorough. Use calisthenics-specific terminology. 
Match the elite, premium BTCALI coaching philosophy.
Never recommend exercises you don't know are safe.
Always ask follow-up questions to better understand the athlete's level.`;

export default function AICoach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to BTCALI AI Coach. Tell me about your current training, goals, or ask any calisthenics question. I\'m here to guide your progression.' }
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
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const conversationHistory = messages.map(m => `${m.role === 'user' ? 'Athlete' : 'Coach'}: ${m.content}`).join('\n');
    const fullPrompt = `${systemPrompt}\n\nConversation so far:\n${conversationHistory}\nAthlete: ${userMessage}\n\nCoach:`;

    const response = await base44.integrations.Core.InvokeLLM({ prompt: fullPrompt });
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Bot className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">AI Coaching Assistant</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          BTCALI <span className="gradient-text">AI Coach</span>
        </h1>
        <p className="text-sm text-muted-foreground font-body mt-1">Ask about training, progressions, or get form feedback.</p>
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
              msg.role === 'user'
                ? 'glass glow-border'
                : 'bg-muted/30'
            }`}>
              <p className="text-sm font-body text-foreground whitespace-pre-wrap leading-relaxed">{msg.content}</p>
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
    </div>
  );
}