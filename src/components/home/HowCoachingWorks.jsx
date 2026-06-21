import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScanLine, Code2, Video, MessageSquare, RefreshCw, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: ScanLine,
    title: 'Athlete Scan',
    body: 'Tell me your level, goals, weaknesses, and training history. Takes 3–5 minutes.',
    color: '#4F9DFF',
  },
  {
    num: '02',
    icon: Code2,
    title: 'Custom Program Built',
    body: 'A routine built specifically around your data — nothing generic, nothing copied.',
    color: '#5EEBFF',
  },
  {
    num: '03',
    icon: Video,
    title: 'You Send Every Set',
    body: 'Film your working sets and send them through. I analyse form, technique, and endurance.',
    color: '#7BB8FF',
  },
  {
    num: '04',
    icon: MessageSquare,
    title: 'Detailed Feedback',
    body: 'Text, voice notes, screen recordings, and personalised tutorials — before your next session.',
    color: '#4F9DFF',
  },
  {
    num: '05',
    icon: RefreshCw,
    title: 'Program Adapts',
    body: 'As you progress, I continuously update your programme so you never plateau.',
    color: '#5EEBFF',
  },
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
          whileHover={{ scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="w-11 h-11 rounded-2xl flex items-center justify-center relative z-10"
          style={{
            background: `${step.color}12`,
            border: `1px solid ${step.color}35`,
            boxShadow: `0 0 20px ${step.color}20`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: step.color }} />
        </motion.div>
        {index < STEPS.length - 1 && (
          <div className="w-px flex-1 mt-2 min-h-[32px]"
            style={{ background: `linear-gradient(to bottom, ${step.color}40, transparent)` }} />
        )}
      </div>

      {/* Content */}
      <div
        className="flex-1 pb-8 rounded-2xl px-5 py-4 cursor-default transition-all duration-200 mb-2"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = `${step.color}06`;
          e.currentTarget.style.borderColor = `${step.color}20`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-heading font-bold" style={{ color: `${step.color}80` }}>STEP {step.num}</span>
        </div>
        <h3 className="font-heading font-bold text-base text-white mb-1">{step.title}</h3>
        <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(191,201,217,0.6)' }}>{step.body}</p>
      </div>
    </motion.div>
  );
}

export default function HowCoachingWorks() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: 'rgba(79,157,255,0.5)' }}>The Process</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            How Coaching<br /><span className="gradient-text">Works</span>
          </h2>
          <p className="text-base mt-4 max-w-md mx-auto" style={{ color: '#BFC9D9' }}>
            A repeatable system that produces consistent results.
          </p>
          <Link to="/pricing" className="inline-block mt-6">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm gradient-bg-strong text-white btn-shine"
              style={{ boxShadow: '0 0 20px rgba(79,157,255,0.2)' }}
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