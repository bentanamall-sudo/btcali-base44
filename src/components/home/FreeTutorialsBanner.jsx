import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Gift, Users } from 'lucide-react';
import GlowButton from '../GlowButton';


export default function FreeTutorialsBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Free Tutorials Promo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden mb-10"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--gradient-start) / 0.12), hsl(var(--gradient-end) / 0.12))',
          border: '1px solid hsl(var(--glow-primary) / 0.25)',
          boxShadow: '0 0 40px hsl(var(--glow-primary) / 0.1)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 px-6 sm:px-10 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl gradient-bg-strong flex items-center justify-center glow-primary">
              <Gift className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3">
              100% FREE — No Credit Card
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Start Training. No Cost.
            </h2>
            <p className="text-muted-foreground font-body text-sm sm:text-base max-w-lg">
              Free Handstand Guide and Free Planche Conditioning — real progressions, available now.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/skills">
              <GlowButton size="lg">
                <BookOpen className="w-5 h-5" />
                Free Tutorials
                <ArrowRight className="w-4 h-4" />
              </GlowButton>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Coaching CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 rounded-2xl glass p-8 text-center glow-border"
      >
        <Users className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-2">
          Want results like these?
        </h3>
        <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto mb-5">
          Complete the Athlete Scan. I'll review your level and reach out.
        </p>
        <Link to="/scan">
          <GlowButton size="lg">
            Start Athlete Scan <ArrowRight className="w-4 h-4" />
          </GlowButton>
        </Link>
      </motion.div>
    </section>
  );
}