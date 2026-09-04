import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'How long until I see results?', a: 'Most athletes start seeing visible progress within 2–4 weeks. Skills like handstand and front lever can take longer — but with the right structure, stalled athletes typically start moving again within the first month.' },
  { q: 'Is coaching beginner friendly?', a: 'Yes. I coach athletes from complete beginners working towards their first push-up progressions, all the way to advanced athletes chasing the full planche. Your programme is built entirely around your current level.' },
  { q: 'What equipment do I need?', a: 'Most BTCALI athletes train with parallettes (p-bars) and a pull-up bar. I build your programme around whatever you have available — home setup, gym, or both.' },
  { q: 'Can I cancel?', a: 'Monthly coaching ($160/month) has a minimum 1-month commitment. After that, you are free to pause or cancel. The 3-month plan ($450) is paid upfront for 12 weeks. No long-term lock-in contracts.' },
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
      className="transition-all duration-200"
      style={{
        background: open ? '#1A1A1A' : 'transparent',
        color: open ? '#F4F4F2' : '#1A1A1A',
        borderBottom: '1px solid #D1D1CB',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 text-left px-2 py-6"
      >
        <span className="font-heading font-bold text-base uppercase tracking-tight" style={{ color: open ? '#F4F4F2' : '#1A1A1A' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" style={{ color: open ? '#FF4D00' : '#1A1A1A' }} />
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
            <div className="px-2 pb-6">
              <p className="font-body" style={{ color: 'rgba(244,244,242,0.7)', fontSize: '18px', lineHeight: 1.6 }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: '#FF4D00' }} />
            <span className="eyebrow text-foreground/50">Common Questions</span>
          </div>
          <h2 className="display-lg text-foreground" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Frequently Asked<br />Questions
          </h2>
        </motion.div>

        <div>
          {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
        </div>
      </div>
    </section>
  );
}