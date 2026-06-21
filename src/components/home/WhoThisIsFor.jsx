import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ITEMS = [
  { title: 'Complete Beginners', desc: 'Never trained seriously before? I start from zero and build you a real foundation with push-ups, pull-ups, dips, and your first progressions.', color: '#4F9DFF' },
  { title: 'First Handstand', desc: 'You want a freestanding handstand but don\'t know the steps. I\'ll take you from wall holds all the way to consistent freestanding balance.', color: '#5EEBFF' },
  { title: 'First Muscle-Up', desc: 'You can pull-up but the muscle-up keeps escaping you. I\'ll fix your technique, build your explosive pulling strength, and get you there.', color: '#7BB8FF' },
  { title: 'First Front Lever', desc: 'Straight-arm pulling is a completely different game. I\'ll build you through tuck, advanced tuck, straddle, and into a full front lever.', color: '#4F9DFF' },
  { title: 'Progressing to Planche', desc: 'The hardest skill in calisthenics. If you\'re serious about planche, I know exactly what conditioning, wrist prep, and progressions it takes.', color: '#5EEBFF' },
  { title: 'Stuck & Not Progressing', desc: 'Training hard but going nowhere? I\'ll diagnose exactly what\'s missing — whether it\'s programming, technique, volume, or recovery — and fix it.', color: '#A6D4FF' },
];

function Card3D({ item, delay }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 22 });
  const glowX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(my, [-0.5, 0.5], [0, 100]);
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={() => scale.set(1.04)}
      onMouseLeave={() => { mx.set(0); my.set(0); scale.set(1); }}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', perspective: 700 }}
      className="relative rounded-2xl p-5 cursor-default overflow-hidden"
    >
      {/* Cursor-following glow */}
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
        background: useTransform([glowX, glowY], ([x, y]) =>
          `radial-gradient(circle at ${x}% ${y}%, ${item.color}1A 0%, transparent 65%)`),
      }} />
      {/* Shell */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(16px)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(90deg, transparent, ${item.color}45, transparent)`,
      }} />

      {/* Content lifted in Z */}
      <div style={{ transform: 'translateZ(18px)', position: 'relative' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
          <h3 className="font-heading font-bold text-sm" style={{ color: item.color }}>{item.title}</h3>
        </div>
        <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(191,201,217,0.65)' }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function WhoThisIsFor() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ perspective: 1200 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: 'rgba(79,157,255,0.5)' }}>All Levels Welcome</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-xl">
            Who BTCALI<br /><span className="gradient-text">Coaching Is For</span>
          </h2>
          <p className="text-base mt-4 max-w-lg" style={{ color: '#BFC9D9' }}>
            From zero pull-ups to elite skills — coaching built around exactly where you are and where you want to go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10" style={{ transformStyle: 'preserve-3d' }}>
          {ITEMS.map((item, i) => (
            <Card3D key={i} item={item} delay={i * 0.07} />
          ))}
        </div>

        {/* "And many more" line + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <p className="text-sm font-body" style={{ color: 'rgba(191,201,217,0.4)' }}>
            + Handstand push-ups, L-sit to handstand, back lever, and many more skills supported.
          </p>
          <Link to="/diagnostic" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 25px rgba(79,157,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm"
              style={{
                background: 'rgba(79,157,255,0.1)',
                border: '1px solid rgba(79,157,255,0.25)',
                color: '#A6D4FF',
              }}
            >
              Take the Athlete Scan <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}