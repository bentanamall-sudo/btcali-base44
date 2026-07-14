import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/lib/cinemaContent';

export default function EditorialFAQ() {
  const [active, setActive] = useState(0);

  return (
    <section data-chapter className="relative py-24 sm:py-32 px-4 sm:px-8" style={{ background: '#050508' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em] block mb-3" style={{ color: 'rgba(79,157,255,0.5)' }}>
            11 — Questions
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-lg">
            Common questions,<br />direct answers.
          </h2>
        </div>

        {/* Desktop: split layout — questions left, answer right */}
        <div className="hidden lg:grid grid-cols-2 gap-12">
          {/* Questions */}
          <div className="space-y-1">
            {FAQS.map((faq, i) => (
              <button key={i} onClick={() => setActive(i)} className="w-full text-left group">
                <div className="flex items-start gap-4 py-4 transition-all duration-300" style={{ opacity: active === i ? 1 : 0.4 }}>
                  <span className="font-heading font-bold text-xs pt-1 transition-colors" style={{ color: active === i ? '#5EEBFF' : 'rgba(255,255,255,0.2)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-heading font-semibold text-lg transition-all duration-300"
                    style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: active === i ? '1.25rem' : '1.05rem' }}
                  >
                    {faq.q}
                  </span>
                </div>
                <div className="h-px transition-all duration-300" style={{ background: active === i ? 'rgba(94,235,255,0.3)' : 'rgba(255,255,255,0.04)' }} />
              </button>
            ))}
          </div>

          {/* Answer */}
          <div className="sticky top-32 self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-heading font-bold text-xs uppercase tracking-wider block mb-4" style={{ color: '#5EEBFF' }}>
                  Answer
                </span>
                <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed">
                  {FAQS[active].a}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="lg:hidden space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setActive(active === i ? -1 : i)} className="w-full flex items-center justify-between gap-3 text-left px-5 py-4">
                <span className="font-heading font-semibold text-sm text-white/85">{faq.q}</span>
                <motion.span animate={{ rotate: active === i ? 45 : 0 }} className="flex-shrink-0 text-lg text-white/30">+</motion.span>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm font-body text-white/55 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}