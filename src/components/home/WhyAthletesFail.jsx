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
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: '#FF4D00' }} />
            <span className="eyebrow text-foreground/50">The Problem</span>
          </div>
          <h2 className="display-lg text-foreground" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Why Most Athletes Never<br />Unlock Their Skills
          </h2>
          <p className="font-body text-foreground/60 mt-5 max-w-md" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            It's not a lack of effort. It's a lack of direction.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-px" style={{ background: '#D1D1CB' }}>
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 lg:p-10 space-y-5"
            style={{ background: '#F4F4F2' }}
          >
            <p className="eyebrow text-foreground/50 mb-2 flex items-center gap-2">
              <span className="w-4 h-px" style={{ background: '#1A1A1A' }} />
              Without Coaching
            </p>
            {FAILS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 py-3"
                style={{ borderBottom: '1px solid #D1D1CB' }}
              >
                <XCircle className="w-4 h-4 flex-shrink-0 mt-1 text-foreground/40" />
                <span className="font-body text-foreground/70" style={{ fontSize: '18px', lineHeight: 1.6 }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 lg:p-10"
            style={{ background: '#1A1A1A', color: '#F4F4F2' }}
          >
            <p className="eyebrow mb-2 flex items-center gap-2" style={{ color: '#FF4D00' }}>
              <span className="w-4 h-px" style={{ background: '#FF4D00' }} />
              With BTCALI Coaching
            </p>

            <div className="space-y-5 mb-8">
              {SOLUTIONS.map((sol, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: '1px solid rgba(244,244,242,0.12)' }}
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#FF4D00' }} />
                  <span className="font-body" style={{ color: 'rgba(244,244,242,0.85)', fontSize: '18px', lineHeight: 1.6 }}>{sol}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="b-cta w-full py-4 text-sm flex items-center justify-center gap-2"
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