import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ScanLine } from 'lucide-react';

export default function FreeTutorialsBanner() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Free Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden px-6 sm:px-10 py-8"
          style={{
            background: 'linear-gradient(145deg, rgba(94,235,255,0.07) 0%, rgba(79,157,255,0.05) 100%)',
            border: '1px solid rgba(94,235,255,0.18)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(94,235,255,0.4), transparent)' }} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(94,235,255,0.06) 0%, transparent 65%)' }} />
          </div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(94,235,255,0.12)', border: '1px solid rgba(94,235,255,0.25)' }}>
              <BookOpen className="w-6 h-6" style={{ color: '#5EEBFF' }} />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold mb-2"
                style={{ background: 'rgba(94,235,255,0.1)', color: '#5EEBFF', border: '1px solid rgba(94,235,255,0.2)' }}>
                100% FREE — No Credit Card
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-1">Start Training. No Cost.</h3>
              <p className="text-sm font-body" style={{ color: 'rgba(191,201,217,0.6)' }}>
                Free Handstand Guide and Free Planche Conditioning — real progressions, available now.
              </p>
            </div>
            <Link to="/skills">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200"
                style={{
                  background: 'rgba(94,235,255,0.1)',
                  border: '1px solid rgba(94,235,255,0.25)',
                  color: '#5EEBFF',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(94,235,255,0.16)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(94,235,255,0.1)'; e.currentTarget.style.color = '#5EEBFF'; }}
              >
                Free Tutorials <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Coaching CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden px-6 sm:px-10 py-8 text-center"
          style={{
            background: 'linear-gradient(145deg, rgba(79,157,255,0.08) 0%, rgba(79,157,255,0.04) 100%)',
            border: '1px solid rgba(79,157,255,0.15)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.4), transparent)' }} />
          <h3 className="font-heading font-bold text-2xl text-white mb-2">Want results like these?</h3>
          <p className="text-sm font-body mb-6 max-w-sm mx-auto" style={{ color: 'rgba(191,201,217,0.6)' }}>
            Complete the Athlete Scan. I'll review your level and reach out directly.
          </p>
          <Link to="/diagnostic">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg-strong text-white font-heading font-bold text-base btn-shine"
              style={{ boxShadow: '0 0 28px rgba(79,157,255,0.25)' }}
            >
              <ScanLine className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Start Athlete Scan</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}