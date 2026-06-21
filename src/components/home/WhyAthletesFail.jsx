import { motion } from 'framer-motion';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAILS = [
  'Following random YouTube videos without a clear plan',
  'Unsure which exercises to actually focus on',
  'No expert feedback on technique or form',
  'Getting stuck on the same skills for months',
  'Losing motivation with no visible progress',
];

const SOLUTIONS = [
  'A roadmap built specifically around your goals',
  'Personalised training for your current level',
  'Detailed form and technique feedback',
  'Ongoing accountability and support',
  'Program adjustments as you progress',
];

export default function WhyAthletesFail() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'rgba(79,157,255,0.5)' }}>
            The Problem
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Why Most Athletes Never<br />
            <span className="gradient-text">Unlock Their Skills</span>
          </h2>
          <p className="text-base mt-4 max-w-md mx-auto" style={{ color: '#BFC9D9' }}>
            It's not a lack of effort. It's a lack of direction.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <p className="text-xs font-heading font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: 'rgba(255,80,80,0.6)' }}>
              <span className="w-4 h-px bg-red-400/40 rounded-full" />
              Without Coaching
            </p>
            {FAILS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,60,60,0.12)',
                }}
              >
                <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,100,100,0.6)' }} />
                <span className="text-sm font-body" style={{ color: 'rgba(191,201,217,0.65)' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(79,157,255,0.07) 0%, rgba(94,235,255,0.04) 100%)',
              border: '1px solid rgba(79,157,255,0.2)',
              boxShadow: '0 0 40px rgba(79,157,255,0.06)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.5), transparent)' }} />

            <p className="text-xs font-heading font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: 'rgba(79,157,255,0.7)' }}>
              <span className="w-4 h-px rounded-full" style={{ background: '#4F9DFF' }} />
              With BTCALI Coaching
            </p>

            <div className="space-y-3 mb-6">
              {SOLUTIONS.map((sol, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" />
                  <span className="text-sm font-body text-foreground/85">{sol}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-heading font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  background: 'rgba(79,157,255,0.1)',
                  border: '1px solid rgba(79,157,255,0.3)',
                  color: '#A6D4FF',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(79,157,255,0.16)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(79,157,255,0.1)';
                  e.currentTarget.style.color = '#A6D4FF';
                }}
              >
                View Full Coaching Details
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}