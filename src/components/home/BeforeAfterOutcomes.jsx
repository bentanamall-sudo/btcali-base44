import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';

export default function BeforeAfterOutcomes() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-4"
            style={{ color: 'rgba(79,157,255,0.5)' }}>Real Athletes. Real Progress.</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
            See What Athletes<br /><span className="gradient-text">Actually Achieve</span>
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(191,201,217,0.65)' }}>
            Planche, Front Lever, Handstand Push-Ups — documented results from real coached athletes.
          </p>
          <Link to="/results">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-heading font-bold text-base text-white btn-shine relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4F9DFF, #3B7DD8)',
                boxShadow: '0 0 40px rgba(79,157,255,0.35), 0 4px 24px rgba(79,157,255,0.2)',
              }}
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