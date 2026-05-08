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
              Start Training For Free — Right Now
            </h2>
            <p className="text-muted-foreground font-body text-sm sm:text-base max-w-lg">
              Get instant access to our <span className="text-foreground font-medium">Free Handstand Beginner Guide</span> and <span className="text-foreground font-medium">Free Planche Conditioning</span> program. Real training, zero cost.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/tutorials">
              <GlowButton size="lg">
                <BookOpen className="w-5 h-5" />
                Free Tutorials
                <ArrowRight className="w-4 h-4" />
              </GlowButton>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Two tutorial cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          {
            title: 'Free Handstand Guide',
            subtitle: 'Beginner → Freestanding',
            desc: 'Master wrist prep, wall drills, kick-up mechanics, and your first freestanding hold. Completely free.',
            badge: 'Handstand',
            to: '/tutorials/handstand',
            color: 'from-purple-500/20 to-blue-500/20',
          },
          {
            title: 'Free Planche Conditioning',
            subtitle: 'Foundation → Tuck Planche',
            desc: 'Straight arm conditioning, scapula prep, planche leans, and your first tuck hold. Start today.',
            badge: 'Planche',
            to: '/tutorials/planche',
            color: 'from-orange-500/20 to-pink-500/20',
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to={card.to}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative rounded-2xl p-6 cursor-pointer overflow-hidden`}
                style={{
                  background: 'hsl(var(--glass-bg) / 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid hsl(var(--glass-border) / 0.3)',
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-30`} />
                <div className="relative z-10">
                  <span className="text-xs font-heading font-semibold gradient-text uppercase tracking-widest">{card.badge}</span>
                  <h3 className="font-heading font-bold text-xl text-foreground mt-1 mb-1">{card.title}</h3>
                  <p className="text-xs text-primary font-body mb-3">{card.subtitle}</p>
                  <p className="text-sm text-muted-foreground font-body mb-4">{card.desc}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-heading font-semibold">
                    Start Free <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Coaching CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 rounded-2xl glass p-8 text-center glow-border"
      >
        <Users className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-2">
          Ready for <span className="gradient-text">1-on-1 Coaching?</span>
        </h3>
        <p className="text-muted-foreground font-body text-sm max-w-md mx-auto mb-5">
          Work directly with an elite BTCALI coach. Custom programs, video feedback, and weekly check-ins. Apply now and transform your training.
        </p>
        <Link to="/pricing">
          <GlowButton size="lg">
            Apply for Coaching <ArrowRight className="w-4 h-4" />
          </GlowButton>
        </Link>
      </motion.div>
    </section>
  );
}