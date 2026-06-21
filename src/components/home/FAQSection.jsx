import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'How long until I see results?', a: 'Most athletes start seeing visible progress within 2–4 weeks. Skills like handstand and front lever can take longer — but with the right structure, stalled athletes typically start moving again within the first month.' },
  { q: 'Is coaching beginner friendly?', a: 'Yes. I coach athletes from complete beginners working towards their first push-up progressions, all the way to advanced athletes chasing the full planche. Your programme is built entirely around your current level.' },
  { q: 'What equipment do I need?', a: 'Most BTCALI athletes train with parallettes (p-bars) and a pull-up bar. I build your programme around whatever you have available — home setup, gym, or both.' },
  { q: 'Can I cancel?', a: 'There is a minimum 1-month commitment. After that, you are free to pause or cancel. No lock-in contracts beyond the first month.' },
  { q: 'What if I train at a gym?', a: 'Gym training works perfectly. I structure your programme around the equipment you have access to.' },
  { q: 'What if I train at home?', a: 'Home training is fully supported. Most BTCALI athletes train at home with basic equipment.' },
  { q: 'How does messaging support work?', a: 'You send your working sets via video and I reply with detailed feedback — text, voice notes, or screen recordings. My main availability is weekdays 4–6 PM NSW time. I aim to respond before your next session whenever possible.' },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: open ? 'rgba(79,157,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: open ? '1px solid rgba(79,157,255,0.2)' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 text-left px-5 py-4"
      >
        <span className="font-heading font-semibold text-sm text-white">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4" style={{ color: open ? '#4F9DFF' : 'rgba(255,255,255,0.3)' }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="h-px mb-3" style={{ background: 'rgba(79,157,255,0.15)' }} />
              <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(191,201,217,0.7)' }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: 'rgba(79,157,255,0.5)' }}>Common Questions</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Frequently Asked<br /><span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
        </div>
      </div>
    </section>
  );
}