import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Target, TrendingUp, Award, Users, Dumbbell, ArrowRight } from 'lucide-react';

const ITEMS = [
  { icon: Zap, title: 'Complete Beginners', desc: '0 pull-ups to first progressions', color: '#4F9DFF' },
  { icon: Target, title: 'Handstand Goal', desc: 'Wall walks to freestanding HS', color: '#5EEBFF' },
  { icon: TrendingUp, title: 'Muscle-Up Goal', desc: 'Kipping to clean strict MU', color: '#7BB8FF' },
  { icon: Award, title: 'Front Lever', desc: 'Tuck to full front lever', color: '#4F9DFF' },
  { icon: Dumbbell, title: 'Planche Goal', desc: 'Lean to full planche', color: '#5EEBFF' },
  { icon: Users, title: 'Plateaus & Stalls', desc: 'Break through stuck progress', color: '#A6D4FF' },
  { icon: Award, title: 'Advanced Athletes', desc: 'Elite skill chasing', color: '#4F9DFF' },
];

function Card3D({ item, delay }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });
  const z = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleEnter = () => { scale.set(1.06); z.set(20); };
  const handleLeave = () => { mx.set(0); my.set(0); scale.set(1); z.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        z,
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
      className="relative rounded-2xl p-5 cursor-default overflow-hidden"
    >
      {/* Dynamic inner glow that follows cursor */}
      <motion.div
        className="absolute pointer-events-none rounded-2xl inset-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${item.color}20 0%, transparent 60%)`
          ),
        }}
      />
      {/* Static card bg */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.07)`,
      }} />
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px rounded-full" style={{
        background: `linear-gradient(90deg, transparent, ${item.color}50, transparent)`,
        opacity: 0.7,
      }} />

      {/* Content — lifted in Z */}
      <div style={{ transform: 'translateZ(20px)', position: 'relative' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
          style={{ background: `${item.color}18`, border: `1px solid ${item.color}25`, boxShadow: `0 0 12px ${item.color}20` }}>
          <item.icon className="w-4 h-4" style={{ color: item.color }} />
        </div>
        <h3 className="font-heading font-bold text-sm text-white mb-0.5">{item.title}</h3>
        <p className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.5)' }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function WhoThisIsFor() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ perspective: 1000 }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: 'rgba(79,157,255,0.5)' }}>All Levels Welcome</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Who BTCALI<br /><span className="gradient-text">Coaching Is For</span>
          </h2>
          <p className="text-base mt-4 max-w-md mx-auto" style={{ color: '#BFC9D9' }}>
            From zero to elite — coaching built around your exact level and goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10" style={{ transformStyle: 'preserve-3d' }}>
          {ITEMS.map((item, i) => (
            <Card3D key={i} item={item} delay={i * 0.06} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-body mb-4" style={{ color: 'rgba(191,201,217,0.55)' }}>
            Not sure if coaching is right for you?
          </p>
          <Link to="/diagnostic">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200"
              style={{
                background: 'rgba(79,157,255,0.08)',
                border: '1px solid rgba(79,157,255,0.2)',
                color: '#A6D4FF',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,157,255,0.16)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 0 20px rgba(79,157,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79,157,255,0.08)'; e.currentTarget.style.color = '#A6D4FF'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Take the Athlete Scan <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}