import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How long until I see results?',
    a: 'Most athletes start seeing visible progress within 2–4 weeks. Skills like handstand and front lever can take longer — but with the right structure, stalled athletes typically start moving again within the first month.',
  },
  {
    q: 'Is coaching beginner friendly?',
    a: 'Yes. I coach athletes from complete beginners working towards their first push-up progressions, all the way to advanced athletes chasing the full planche. Your programme is built entirely around your current level.',
  },
  {
    q: 'What equipment do I need?',
    a: 'Most BTCALI athletes train with parallettes (p-bars) and a pull-up bar. I build your programme around whatever you have available — home setup, gym, or both.',
  },
  {
    q: 'Can I cancel?',
    a: 'There is a minimum 1-month commitment. After that, you are free to pause or cancel. No lock-in contracts beyond the first month.',
  },
  {
    q: 'What if I train at a gym?',
    a: 'Gym training works perfectly. I structure your programme around the equipment you have access to.',
  },
  {
    q: 'What if I train at home?',
    a: 'Home training is fully supported. Most BTCALI athletes train at home with basic equipment.',
  },
  {
    q: 'How does messaging support work?',
    a: 'You send your working sets via video and I reply with detailed feedback — text, voice notes, or screen recordings. My main availability is weekdays 4–6 PM NSW time. I aim to respond before your next session whenever possible.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl border border-border/30 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/5 transition-colors"
      >
        <span className="font-heading font-semibold text-foreground text-sm">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
            <div className="px-5 pb-5 pt-1 border-t border-border/20">
              <p className="text-sm font-body text-foreground/75 leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            Common Questions
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            FAQ
          </h2>
          <div className="space-y-2">
            {FAQS.map(faq => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}