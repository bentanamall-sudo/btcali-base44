import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

export default function TutorialCoachingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto mt-12 mb-4 rounded-2xl px-6 py-8 text-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--gradient-start)/0.1), hsl(var(--gradient-end)/0.1))',
        border: '1px solid hsl(var(--primary)/0.3)',
        boxShadow: '0 0 30px hsl(var(--glow-primary)/0.08)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent)' }} />
      <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-2">
        Want personalised coaching?
      </h3>
      <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
        If you want a routine built around your exact level, goals, weaknesses and equipment — complete the Athlete Scan and apply for 1-on-1 coaching.
      </p>
      <Link to="/scan">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base"
          style={{ boxShadow: '0 0 20px hsl(var(--glow-primary)/0.2)' }}
        >
          <Flame className="w-5 h-5" /> Complete Athlete Scan
        </motion.button>
      </Link>
    </motion.div>
  );
}