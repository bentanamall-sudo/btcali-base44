import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScanLine, Code2, Video, MessageSquare, RefreshCw, ArrowRight } from 'lucide-react';

const STEPS = [
  { num: '01', icon: ScanLine, title: 'Athlete Scan', body: 'Tell me your level, goals, weaknesses, and training history. Takes 3–5 minutes.' },
  { num: '02', icon: Code2, title: 'Custom Program Built', body: 'A routine built specifically around your data — nothing generic, nothing copied.' },
  { num: '03', icon: Video, title: 'You Send Every Set', body: 'Film your working sets and send them through. I analyse form, technique, and endurance.' },
  { num: '04', icon: MessageSquare, title: 'Detailed Feedback', body: 'Text, voice notes, screen recordings, and personalised tutorials — before your next session.' },
  { num: '05', icon: RefreshCw, title: 'Program Adapts', body: 'As you progress, I continuously update your programme so you never plateau.' },
];

function StepNode({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5 group"
    >
      {/* Node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 flex items-center justify-center relative z-10"
          style={{ background: '#1A1A1A', color: '#F4F4F2' }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        {index < STEPS.length - 1 && (
          <div className="w-px flex-1 mt-2 min-h-[32px]" style={{ background: '#D1D1CB' }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 px-5 py-5 mb-2 b-card group" data-view-cursor>
        <div className="flex items-center gap-2 mb-2">
          <span className="eyebrow" style={{ color: '#CCFF00' }}>Step {step.num}</span>
        </div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-2" style={{ textTransform: 'uppercase' }}>{step.title}</h3>
        <p className="font-body text-foreground/60" style={{ fontSize: '18px', lineHeight: 1.6 }}>{step.body}</p>
      </div>
    </motion.div>
  );
}

export default function HowCoachingWorks() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: '#CCFF00' }} />
            <span className="eyebrow text-foreground/50">The Process</span>
          </div>
          <h2 className="display-lg text-foreground" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            How Coaching<br />Works
          </h2>
          <p className="font-body text-foreground/60 mt-5 max-w-md" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            A repeatable system that produces consistent results.
          </p>
          <Link to="/pricing" className="inline-block mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="b-cta-outline inline-flex items-center gap-2 px-6 py-3 text-sm"
            >
              Full Coaching Details <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        <div>
          {STEPS.map((step, i) => (
            <StepNode key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}