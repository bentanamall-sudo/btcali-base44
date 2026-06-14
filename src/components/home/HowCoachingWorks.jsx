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
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            The Process
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            How Coaching <span className="gradient-text">Works</span>
          </h2>

          <div className="flex justify-center mb-8">
            <Link to="/apply">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
              >
                How 1-1 Coaching Works
              </motion.button>
            </Link>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-5 bottom-5 w-px bg-border/30 hidden sm:block" />

            <div className="space-y-4">
              {STEPS.map(({ num, title, body }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full gradient-bg-strong flex items-center justify-center text-xs font-heading font-black text-primary-foreground z-10">
                    {num}
                  </div>
                  <div className="glass rounded-xl px-5 py-4 border border-border/30 flex-1">
                    <p className="font-heading font-bold text-foreground text-sm mb-1">{title}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{body}</p>
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