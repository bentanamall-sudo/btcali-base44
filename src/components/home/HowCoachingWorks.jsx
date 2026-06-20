import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    num: '01',
    title: 'Complete the Athlete Scan',
    body: 'Tell me your level, goals, weaknesses, and training history. Takes 3–5 minutes.',
  },
  {
    num: '02',
    title: 'I build your programme',
    body: 'A routine built specifically around your data — nothing generic, nothing copied.',
  },
  {
    num: '03',
    title: 'You send every set',
    body: 'Film your working sets and send them to me. I analyse form, technique, and endurance.',
  },
  {
    num: '04',
    title: 'I give detailed feedback',
    body: 'Text, voice notes, screen recordings, and personalised tutorials — before your next session.',
  },
  {
    num: '05',
    title: 'Routine adapts as you improve',
    body: 'As you progress, I continuously update your programme so you never plateau.',
  },
];

export default function HowCoachingWorks() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-heading font-bold text-primary/50 uppercase tracking-[0.3em] mb-3 text-center">
            The Process
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            How Coaching <span className="gradient-text">Works</span>
          </h2>

          <div className="flex justify-center mb-10">
            <Link to="/apply">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
              >
                How 1-1 Coaching Works
              </motion.button>
            </Link>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-5 bottom-5 w-px hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, hsl(var(--primary)/0.4), hsl(var(--primary)/0.1))' }} />

            <div className="space-y-3.5">
              {STEPS.map(({ num, title, body }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5 group"
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full gradient-bg-strong flex items-center justify-center text-xs font-heading font-black text-primary-foreground z-10 transition-all duration-300 group-hover:scale-110"
                    style={{ boxShadow: '0 0 14px hsl(var(--glow-primary)/0.25)' }}
                  >
                    {num}
                  </div>
                  <div className="glass rounded-2xl px-5 py-4 border border-border/25 flex-1 transition-all duration-300 group-hover:border-primary/30"
                    style={{ background: 'hsl(var(--card)/0.6)' }}>
                    <p className="font-heading font-bold text-foreground text-sm mb-1">{title}</p>
                    <p className="font-body text-sm text-muted-foreground/80 leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}