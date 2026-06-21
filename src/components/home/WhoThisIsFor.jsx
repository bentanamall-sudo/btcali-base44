import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Target, TrendingUp, Award, Users, Dumbbell, ArrowRight } from 'lucide-react';

const ITEMS = [
  { icon: Zap, title: 'Complete Beginners', desc: '0 pull-ups to first progressions', color: '#4F9DFF' },
  { icon: Target, title: 'Handstand Goal', desc: 'Wall walks to freestanding HS', color: '#5EEBFF' },
  { icon: TrendingUp, title: 'Muscle-Up Goal', desc: 'Kipping to clean strict MU', color: '#7BB8FF' },
  { icon: Award, title: 'Front Lever Goal', desc: 'Tuck to full front lever', color: '#4F9DFF' },
  { icon: Dumbbell, title: 'Planche Goal', desc: 'Lean to full planche', color: '#5EEBFF' },
  { icon: Users, title: 'Plateaus & Stalls', desc: 'Break through stuck progress', color: '#A6D4FF' },
  { icon: Award, title: 'Advanced Athletes', desc: 'Elite skill chasing', color: '#4F9DFF' },
];

export default function WhoThisIsFor() {
  return (
    <section className="py-20 px-4 sm:px-6">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-5 cursor-default group overflow-hidden transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `linear-gradient(145deg, ${item.color}0A 0%, rgba(255,255,255,0.02) 100%)`;
                e.currentTarget.style.borderColor = `${item.color}30`;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}20` }}>
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <h3 className="font-heading font-bold text-sm text-white mb-0.5">{item.title}</h3>
                <p className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.5)' }}>{item.desc}</p>
              </motion.div>
            </div>
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200"
              style={{
                background: 'rgba(79,157,255,0.08)',
                border: '1px solid rgba(79,157,255,0.2)',
                color: '#A6D4FF',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,157,255,0.14)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79,157,255,0.08)'; e.currentTarget.style.color = '#A6D4FF'; }}
            >
              Take the Athlete Scan <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}