import { motion } from 'framer-motion';
import HoverAccordion from '@/components/HoverAccordion';
import TypewriterHeading from '@/components/TypewriterHeading';

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

export default function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            Common Questions
          </p>
          <TypewriterHeading
            text="Frequently Asked Questions"
            tag="h2"
            className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight"
            highlightWords={['Asked Questions']}
            speed={38}
          />
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'hsl(0 0% 7% / 0.65)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid hsl(40 25% 14% / 0.4)',
                }}
              >
                <HoverAccordion
                  trigger={
                    <span className="font-heading font-semibold text-foreground text-sm">{faq.q}</span>
                  }
                  triggerClassName="px-5 py-4 hover:bg-white/3 transition-colors"
                >
                  <div className="px-5 pb-5">
                    <div className="h-px mb-3" style={{ background: 'hsl(var(--border)/0.2)' }} />
                    <p className="text-sm font-body text-foreground/75 leading-relaxed">{faq.a}</p>
                  </div>
                </HoverAccordion>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}