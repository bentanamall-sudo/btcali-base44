import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const MILESTONES = [
  {
    year: 'Year 0',
    title: 'Started Training',
    desc: '10 pull-ups. No Planche, no Front Lever, no Handstand Push-Ups. No real understanding of how to structure training.',
  },
  {
    year: '~3 mo',
    title: 'First Muscle-Up',
    desc: 'Built the pulling foundation and unlocked the muscle-up — a turning point in understanding progressive overload.',
  },
  {
    year: '~6 mo',
    title: 'First Front Lever',
    desc: 'Dedicated straight-arm work paid off. Front lever became the first advanced skill I achieved.',
  },
  {
    year: '~1 yr',
    title: '90° Handstand Push-Ups',
    desc: 'Full depth handstand push-ups — achieved before the planche through consistent overhead pressing and shoulder conditioning work.',
  },
  {
    year: '~1.5 yr',
    title: 'First Planche',
    desc: 'The most demanding skill I\'d ever attempted. Hundreds of hours of conditioning, wrist prep, and targeted progressions. 1.5 years in the making.',
  },
  {
    year: 'Now',
    title: 'BTCALI Coaching',
    desc: 'I\'ve coached 40+ athletes from complete beginners to advanced. Every program I build comes from real experience — not theory.',
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
      className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 items-center mb-6"
    >
      <div className={`${isRight ? 'md:order-2 md:pl-10' : 'md:pr-10 md:text-right'}`}>
        <motion.div
          whileHover={{ y: -2 }}
          className="p-6 inline-block w-full"
          style={{
            background: milestone.highlight ? '#1A1A1A' : '#F4F4F2',
            color: milestone.highlight ? '#F4F4F2' : '#1A1A1A',
            border: milestone.highlight ? '2px solid #CCFF00' : '1px solid #D1D1CB',
          }}
        >
          <div className="flex items-center gap-2 mb-3" style={{ justifyContent: isRight ? 'flex-start' : 'flex-end' }}>
            <span className="eyebrow px-2 py-1" style={{
              background: milestone.highlight ? '#CCFF00' : '#1A1A1A',
              color: milestone.highlight ? '#F4F4F2' : '#F4F4F2',
            }}>
              {milestone.year}
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg mb-2" style={{ textTransform: 'uppercase' }}>{milestone.title}</h3>
          <p className="font-body" style={{
            color: milestone.highlight ? 'rgba(244,244,242,0.7)' : 'rgba(26,26,26,0.65)',
            fontSize: '18px', lineHeight: 1.6,
          }}>{milestone.desc}</p>
        </motion.div>
      </div>

      {/* Center line node */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
        <motion.div
          animate={inView ? { scale: [0.8, 1.2, 1], opacity: [0, 1, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="w-4 h-4"
          style={{
            background: milestone.highlight ? '#CCFF00' : '#F4F4F2',
            border: `2px solid ${milestone.highlight ? '#CCFF00' : '#1A1A1A'}`,
          }}
        />
      </div>

      <div className={`hidden md:block ${isRight ? 'md:order-1' : ''}`} />
    </motion.div>
  );
}

export default function MyStory() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: '#CCFF00' }} />
            <span className="eyebrow text-foreground/50">Behind BTCALI</span>
          </div>
          <h2 className="display-lg text-foreground" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            My Calisthenics<br />Journey
          </h2>
          <p className="font-body text-foreground/60 mt-5 max-w-lg" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            Two years ago I could barely do 10 pull-ups. Here's every step since.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: '#D1D1CB' }} />

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
          className="mt-12 px-8 py-10 text-center"
          style={{ background: '#1A1A1A', color: '#F4F4F2' }}
        >
          <p className="font-heading font-bold text-xl sm:text-2xl leading-snug max-w-2xl mx-auto" style={{ textTransform: 'none', letterSpacing: '-0.01em' }}>
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
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="b-cta btn-shine flex items-center gap-2.5 px-8 py-4 text-sm"
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