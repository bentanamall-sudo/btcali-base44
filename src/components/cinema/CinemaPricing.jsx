import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScanLine, CheckCircle } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { RevealWords } from '@/lib/motion/RevealText';
import MagneticButton from '@/lib/motion/MagneticButton';
import { PRICING, PRICING_INCLUDED } from '@/lib/cinemaContent';

export default function CinemaPricing() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end center'] });

  // Monthly shifts left, quarterly enters
  const monthlyX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);
  const quarterlyX = useTransform(scrollYProgress, [0, 0.5], ['20%', '0%']);
  const quarterlyOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} data-chapter className="relative py-24 sm:py-32 px-4 sm:px-8 overflow-hidden" style={{ background: '#050508' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em] block mb-3" style={{ color: 'rgba(79,157,255,0.5)' }}>
            10 — Pricing
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            <RevealWords text="Invest in faster progress." />
          </h2>

          {/* Spots badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
            style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.2)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-heading font-semibold text-white">Currently Accepting New Athletes</span>
          </motion.div>
        </div>

        {/* Pricing cards — monthly shifts left, quarterly enters */}
        <div className="relative grid sm:grid-cols-2 gap-6 mb-12" style={{ minHeight: '340px' }}>
          {PRICING.map((tier, i) => (
            <motion.div
              key={tier.id}
              style={{
                x: reduced ? 0 : (i === 0 ? monthlyX : quarterlyX),
                opacity: reduced ? 1 : (i === 1 ? quarterlyOpacity : 1),
              }}
              className="rounded-2xl p-6 relative overflow-hidden"
              data-cursor="arrow"
              data-cursor-label="Apply"
            >
              <div className="absolute inset-0" style={{
                background: i === 0
                  ? 'rgba(255,255,255,0.02)'
                  : 'linear-gradient(145deg, rgba(79,157,255,0.08) 0%, rgba(94,235,255,0.04) 100%)',
                border: `1px solid ${i === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(79,157,255,0.25)'}`,
              }} />
              {i === 1 && (
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.5), transparent)' }} />
              )}

              <div className="relative">
                {tier.badge && (
                  <span className="text-xs font-heading font-bold px-3 py-1 rounded-full inline-block mb-4"
                    style={{ background: i === 1 ? 'rgba(79,157,255,0.15)' : 'rgba(94,235,255,0.1)', color: i === 1 ? '#A6D4FF' : '#5EEBFF', border: `1px solid ${i === 1 ? 'rgba(79,157,255,0.25)' : 'rgba(94,235,255,0.2)'}` }}>
                    {tier.badge}
                  </span>
                )}
                <p className="font-heading font-bold text-sm mb-3" style={{ color: i === 1 ? '#4F9DFF' : 'rgba(255,255,255,0.5)' }}>{tier.name}</p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="font-heading font-black text-4xl sm:text-5xl" style={{ color: '#fff' }}>{tier.price}</span>
                  <span className="text-sm font-body pb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{tier.unit}</span>
                </div>
                <p className="text-sm font-body mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{tier.desc}</p>

                <Link to="/diagnostic">
                  <MagneticButton className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl font-heading font-semibold text-sm flex items-center justify-center gap-2"
                      style={i === 1 ? { background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)', color: 'white', boxShadow: '0 0 20px rgba(79,157,255,0.25)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                    >
                      <ScanLine className="w-4 h-4" /> Start Athlete Scan
                    </motion.button>
                  </MagneticButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Included features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-heading font-bold text-sm text-white mb-5">Everything Included — All Plans</p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {PRICING_INCLUDED.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2.5"
              >
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#4F9DFF' }} />
                <span className="text-sm font-body" style={{ color: 'rgba(255,255,255,0.6)' }}>{item}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs font-body mt-5 pt-4" style={{ color: 'rgba(255,255,255,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            Support availability: Weekdays 4–6 PM NSW time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}