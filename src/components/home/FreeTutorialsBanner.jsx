import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ScanLine } from 'lucide-react';

export default function FreeTutorialsBanner() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-px" style={{ background: '#D1D1CB' }}>
        {/* Free Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6 sm:px-10 py-10"
          style={{ background: '#F4F4F2' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: '#1A1A1A', color: '#F4F4F2' }}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="eyebrow inline-block px-3 py-1.5 mb-3" style={{ background: '#CCFF00', color: '#F4F4F2' }}>
                100% Free — No Credit Card
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-1" style={{ textTransform: 'uppercase' }}>Start Training. No Cost.</h3>
              <p className="font-body text-foreground/60" style={{ fontSize: '18px', lineHeight: 1.6 }}>
                Free Handstand Guide and Free Planche Conditioning — real progressions, available now.
              </p>
            </div>
            <Link to="/skills">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="b-cta-outline flex-shrink-0 flex items-center gap-2 px-5 py-3 text-sm"
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
          className="px-6 sm:px-10 py-12 text-center"
          style={{ background: '#1A1A1A', color: '#F4F4F2' }}
        >
          <h3 className="font-heading font-bold text-3xl mb-3" style={{ textTransform: 'uppercase' }}>Want results like these?</h3>
          <p className="font-body mb-8 max-w-sm mx-auto" style={{ color: 'rgba(244,244,242,0.6)', fontSize: '18px', lineHeight: 1.6 }}>
            Complete the Athlete Scan. I'll review your level and reach out directly.
          </p>
          <Link to="/diagnostic">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="b-cta btn-shine inline-flex items-center gap-2 px-8 py-4 text-sm"
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