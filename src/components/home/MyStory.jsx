import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const MILESTONES = [
  {
    year: 'Year 0',
    title: 'Started Training',
    desc: '10 pull-ups. No Planche, no Front Lever, no Handstand Push-Ups. No real understanding of how to structure training.',
    accent: '#4F9DFF',
  },
  {
    year: '~3 mo',
    title: 'First Muscle-Up',
    desc: 'Built the pulling foundation and unlocked the muscle-up — a turning point in understanding progressive overload.',
    accent: '#5EEBFF',
  },
  {
    year: '~6 mo',
    title: 'First Front Lever',
    desc: 'Dedicated straight-arm work paid off. Front lever became the first advanced skill I achieved.',
    accent: '#7BB8FF',
  },
  {
    year: '~1.5 yr',
    title: 'First Planche',
    desc: 'The most demanding skill I\'d ever attempted. Hundreds of hours of conditioning, wrist prep, and targeted progressions. 1.5 years in the making.',
    accent: '#4F9DFF',
  },
  {
    year: '~1 yr',
    title: '90° Handstand Push-Ups',
    desc: 'Pressing strength peaked before the planche — full depth handstand push-ups achieved through consistent overhead pressing work.',
    accent: '#5EEBFF',
  },
  {
    year: 'Now',
    title: 'BTCALI Coaching',
    desc: 'I\'ve coached 40+ athletes from complete beginners to advanced. Every program I build comes from real experience — not theory.',
    accent: '#A6D4FF',
    highlight: true,
  },
];

function TimelineNode({ milestone, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isRight = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 30 : -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 items-center mb-6`}
    >
      {/* Desktop: alternating layout */}
      <div className={`${isRight ? 'md:order-2 md:pl-10' : 'md:pr-10 md:text-right'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="rounded-2xl p-5 relative overflow-hidden cursor-default inline-block w-full"
          style={{
            background: milestone.highlight
              ? `linear-gradient(145deg, rgba(79,157,255,0.1) 0%, rgba(94,235,255,0.06) 100%)`
              : 'rgba(255,255,255,0.03)',
            border: `1px solid ${milestone.highlight ? 'rgba(79,157,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
            boxShadow: milestone.highlight ? '0 0 30px rgba(79,157,255,0.1)' : 'none',
          }}
        >
          {milestone.highlight && (
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.6), transparent)' }} />
          )}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${milestone.accent}18`, color: milestone.accent, border: `1px solid ${milestone.accent}30` }}>
              {milestone.year}
            </span>
          </div>
          <h3 className="font-heading font-bold text-base text-white mb-1.5">{milestone.title}</h3>
          <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(191,201,217,0.65)' }}>{milestone.desc}</p>
        </motion.div>
      </div>

      {/* Center line node */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
        <motion.div
          animate={inView ? { scale: [0.8, 1.2, 1], opacity: [0, 1, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="w-4 h-4 rounded-full border-2 relative"
          style={{
            background: milestone.highlight ? milestone.accent : '#0D1117',
            borderColor: milestone.accent,
            boxShadow: `0 0 12px ${milestone.accent}60`,
          }}
        >
          {milestone.highlight && (
            <div className="absolute inset-0 rounded-full animate-pulse-ring"
              style={{ background: milestone.accent, opacity: 0.25 }} />
          )}
        </motion.div>
      </div>

      {/* Empty cell for alternating */}
      <div className={`hidden md:block ${isRight ? 'md:order-1' : ''}`} />
    </motion.div>
  );
}

export default function MyStory() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(79,157,255,0.03) 0%, transparent 65%)' }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: 'rgba(79,157,255,0.5)' }}>Behind BTCALI</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            The Journey Behind<br /><span className="gradient-text">Every Program I Build</span>
          </h2>
          <p className="text-base mt-4 max-w-lg mx-auto" style={{ color: '#BFC9D9' }}>
            Two years ago I could only do 10 pull-ups. Here's what changed.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(79,157,255,0.4), rgba(79,157,255,0.05))' }} />

          <div className="space-y-4">
            {MILESTONES.map((m, i) => (
              <TimelineNode key={i} milestone={m} index={i} />
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 rounded-2xl px-8 py-7 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(79,157,255,0.06) 0%, rgba(94,235,255,0.04) 100%)',
            border: '1px solid rgba(79,157,255,0.15)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.4), transparent)' }} />
          <p className="font-heading font-bold text-lg sm:text-xl leading-snug max-w-2xl mx-auto" style={{ color: '#A6D4FF' }}>
            "Most athletes don't fail because they aren't working hard enough. They fail because they don't know what to focus on next."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-8"
        >
          <Link to="/results">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-7 py-4 rounded-xl gradient-bg-strong text-white font-heading font-bold text-base btn-shine relative overflow-hidden"
              style={{ boxShadow: '0 0 28px rgba(79,157,255,0.25)' }}
            >
              <Trophy className="w-4 h-4 relative z-10" />
              <span className="relative z-10">View Student Results</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}