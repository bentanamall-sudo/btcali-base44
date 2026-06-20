import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Quote } from 'lucide-react';

const STORY_SEGMENTS = [
  {
    type: 'opener',
    text: 'Two years ago I could only do around 10 pull-ups.',
    sub: 'No Planche. No Front Lever. No Handstand Push-Ups. No Muscle-Up. I had no real understanding of how to structure my training or what to focus on to make progress.',
  },
  {
    type: 'quote',
    text: 'The biggest lesson I learned is that most athletes don\'t fail because they aren\'t working hard enough. They fail because they don\'t know what to focus on next.',
  },
  {
    type: 'journey',
    text: 'Over the last two years I spent thousands of hours learning calisthenics — overcoming plateaus, refining technique, managing injuries, and figuring out what actually works.',
    sub: 'Along the way I received coaching and guidance from some of the best athletes in the world. That\'s one of the biggest reasons I started BTCALI Coaching — because I know firsthand how much structured coaching can accelerate progress.',
  },
  {
    type: 'milestone',
    title: 'After ~1.5 years of dedicated training:',
    items: [
      'Full Planche unlocked',
      'Front Lever Pull-Ups',
      'No Dip Muscle-Ups',
      '90° Handstand Push-Ups',
      'Bent Arm Press, L-Sit to Handstand, and more',
    ],
  },
  {
    type: 'mission',
    text: 'I\'ve been through the plateaus. I\'ve dealt with injuries. I\'ve made the mistakes. Now I know how to help athletes avoid those same mistakes and progress faster.',
    sub: 'Whether you\'re a beginner going from 0–5 pull-ups, an intermediate athlete working towards L-Sit to Handstand, or a stronger athlete chasing Planche or Front Lever — my coaching is built around your exact goals, level and weaknesses.',
  },
];

function RevealBlock({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-8% 0px -8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.2, y: 10, filter: 'blur(2px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0.2, y: 10, filter: 'blur(2px)' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HoverPara({ children, className = '' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <p
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'color 0.3s ease',
        color: hovered ? 'hsl(0 0% 88%)' : undefined,
      }}
    >
      {children}
    </p>
  );
}

export default function MyStory() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            Behind BTCALI
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            My <span className="gradient-text">Story</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {STORY_SEGMENTS.map((seg, i) => (
            <RevealBlock key={i} delay={0}>
              {seg.type === 'quote' ? (
                <div
                  className="rounded-2xl px-6 py-5 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, hsl(45 85% 52% / 0.1), hsl(40 75% 38% / 0.06))',
                    border: '1px solid hsl(45 85% 52% / 0.25)',
                    boxShadow: '0 0 30px hsl(45 85% 52% / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, hsl(45 85% 52% / 0.4), transparent)' }} />
                  <Quote className="w-5 h-5 mb-3" style={{ color: 'hsl(45 85% 52% / 0.6)' }} />
                  <p className="font-heading font-bold text-base sm:text-lg leading-snug"
                    style={{ color: 'hsl(47 92% 68%)' }}>
                    {seg.text}
                  </p>
                </div>
              ) : seg.type === 'milestone' ? (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'hsl(0 0% 7% / 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(40 25% 14% / 0.6)',
                    boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)',
                  }}
                >
                  <p className="font-heading font-bold text-sm text-primary mb-3">{seg.title}</p>
                  <ul className="space-y-2">
                    {seg.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'hsl(47 92% 68%)' }} />
                        <span className="font-body text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-5 group cursor-default"
                  style={{
                    background: 'hsl(0 0% 6% / 0.6)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid hsl(40 20% 12% / 0.5)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'hsl(45 85% 52% / 0.2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'hsl(40 20% 12% / 0.5)'}
                >
                  {seg.type === 'opener' && (
                    <p className="font-heading font-black text-lg text-foreground mb-2">{seg.text}</p>
                  )}
                  <HoverPara className="font-body text-sm text-foreground/75 leading-relaxed">
                    {seg.type === 'opener' ? seg.sub : seg.text}
                  </HoverPara>
                  {seg.sub && seg.type !== 'opener' && (
                    <>
                      <div className="my-3 h-px" style={{ background: 'hsl(40 25% 14% / 0.8)' }} />
                      <HoverPara className="font-body text-sm text-foreground/65 leading-relaxed">
                        {seg.sub}
                      </HoverPara>
                    </>
                  )}
                </div>
              )}
            </RevealBlock>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <Link to="/results">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base relative overflow-hidden group"
              style={{ boxShadow: '0 0 28px hsl(45 85% 52% / 0.28), 0 4px 20px hsl(45 85% 52% / 0.14)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, hsl(0 0% 100%/0.08), transparent 60%)' }} />
              <Trophy className="w-5 h-5 relative z-10" />
              <span className="relative z-10">View Student Results</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}