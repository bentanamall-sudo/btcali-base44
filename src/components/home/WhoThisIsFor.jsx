import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ITEMS = [
  { title: 'Complete Beginners', desc: 'Never trained seriously before? I start from zero and build you a real foundation with push-ups, pull-ups, dips, and your first progressions.' },
  { title: 'First Handstand', desc: 'You want a freestanding handstand but don\'t know the steps. I\'ll take you from wall holds all the way to consistent freestanding balance.' },
  { title: 'First Muscle-Up', desc: 'You can pull-up but the muscle-up keeps escaping you. I\'ll fix your technique, build your explosive pulling strength, and get you there.' },
  { title: 'First Front Lever', desc: 'Straight-arm pulling is a completely different game. I\'ll build you through tuck, advanced tuck, straddle, and into a full front lever.' },
  { title: 'Progressing to Planche', desc: 'The hardest skill in calisthenics. If you\'re serious about planche, I know exactly what conditioning, wrist prep, and progressions it takes.' },
  { title: 'Stuck & Not Progressing', desc: 'Training hard but going nowhere? I\'ll diagnose exactly what\'s missing — whether it\'s programming, technique, volume, or recovery — and fix it.' },
];

function Card({ item, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="b-card p-6 lg:p-8 group"
      data-view-cursor
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 flex-shrink-0" style={{ background: '#FF4D00' }} />
        <h3 className="eyebrow text-foreground">{item.title}</h3>
      </div>
      <p className="font-body text-foreground/65" style={{ fontSize: '18px', lineHeight: 1.6 }}>{item.desc}</p>
    </motion.div>
  );
}

export default function WhoThisIsFor() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: '#FF4D00' }} />
            <span className="eyebrow text-foreground/50">All Levels Welcome</span>
          </div>
          <h2 className="display-lg text-foreground max-w-2xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Who BTCALI<br />Coaching Is For
          </h2>
          <p className="font-body text-foreground/60 mt-5 max-w-lg" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            From zero pull-ups to elite skills — coaching built around exactly where you are and where you want to go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mb-10" style={{ background: '#D1D1CB' }}>
          {ITEMS.map((item, i) => (
            <Card key={i} item={item} delay={i * 0.07} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
        >
          <p className="font-body text-foreground/50" style={{ fontSize: '18px' }}>
            + Handstand push-ups, L-sit to handstand, back lever, and many more skills supported.
          </p>
          <Link to="/diagnostic" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="b-cta-outline inline-flex items-center gap-2 px-6 py-3 text-sm"
            >
              Take the Athlete Scan <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}