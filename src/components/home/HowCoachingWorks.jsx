import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import use3DHover from '@/hooks/use3DHover';
import TypewriterHeading from '@/components/TypewriterHeading';

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

function StepCard({ num, title, body, delay }) {
  const tilt = use3DHover({ intensity: 7, scale: 1.035 });
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5 group"
    >
      <motion.div
        whileHover={{ scale: 1.18, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 450, damping: 18 }}
        className="flex-shrink-0 w-9 h-9 rounded-full gradient-bg-strong flex items-center justify-center text-xs font-heading font-black text-primary-foreground z-10"
        style={{ boxShadow: '0 0 14px hsl(var(--glow-primary)/0.35)' }}
      >
        {num}
      </motion.div>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{
          ...tilt.style,
          background: 'hsl(0 0% 6% / 0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid hsl(40 25% 14% / 0.5)',
        }}
        className="rounded-2xl px-5 py-4 flex-1 cursor-default"
      >
        <p className="font-heading font-bold text-foreground text-sm mb-1">{title}</p>
        <p className="font-body text-sm text-muted-foreground/80 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

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
          <TypewriterHeading
            text="How Coaching Works"
            tag="h2"
            className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight"
            highlightWords={['Works']}
            speed={42}
          />

          <div className="flex justify-center mb-10">
            <Link to="/apply">
              <motion.button
                whileHover={{ scale: 1.06, y: -3, boxShadow: '0 0 32px hsl(45 85% 52% / 0.4)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm btn-shine"
                style={{ boxShadow: '0 0 20px hsl(45 85% 52% / 0.2)' }}
              >
                How 1-1 Coaching Works
              </motion.button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute left-[18px] top-5 bottom-5 w-px hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, hsl(var(--primary)/0.4), hsl(var(--primary)/0.05))' }} />
            <div className="space-y-3.5">
              {STEPS.map(({ num, title, body }, i) => (
                <StepCard key={num} num={num} title={title} body={body} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}