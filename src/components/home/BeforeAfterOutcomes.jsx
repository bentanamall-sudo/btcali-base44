import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';

export default function BeforeAfterOutcomes() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: '#FF4D00' }} />
            <span className="eyebrow text-foreground/50">Real Athletes. Real Progress.</span>
            <span className="w-8 h-px" style={{ background: '#FF4D00' }} />
          </div>
          <h2 className="display-lg text-foreground mb-5" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            See What Athletes<br />Actually Achieve
          </h2>
          <p className="font-body text-foreground/60 mb-10 max-w-xl mx-auto" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            Planche, Front Lever, Handstand Push-Ups — documented results from real coached athletes.
          </p>
          <Link to="/results">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="b-cta btn-shine inline-flex items-center gap-3 px-8 py-4 text-sm"
            >
              <Trophy className="w-5 h-5 relative z-10" />
              <span className="relative z-10">View All Results</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}