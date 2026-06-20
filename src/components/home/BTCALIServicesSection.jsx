import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    num: '01',
    name: 'Personalised Programming',
    desc: 'Every program is built from scratch around your current level, goals, strengths, weaknesses, equipment and schedule. Nothing generic. Nothing copied.',
  },
  {
    num: '02',
    name: 'Form & Technique Analysis',
    desc: 'You record your sets, I review them in depth. Frame-by-frame breakdowns, annotated screenshots and voice notes so you know exactly what to fix and how.',
  },
  {
    num: '03',
    name: 'Skill-Specific Progressions',
    desc: 'Whether you\'re working towards Handstand, Planche, Front Lever, Muscle-Up or any other skill — every exercise in your program is selected with your specific target in mind.',
  },
  {
    num: '04',
    name: 'Ongoing Routine Adjustments',
    desc: 'As you get stronger your program evolves with you. Regular updates ensure you\'re always training at the right intensity and moving towards the next progression.',
  },
  {
    num: '05',
    name: 'Direct Messaging Support',
    desc: 'Message whenever you have a question. My main availability is 4–6 PM Australian time. You will always receive feedback before your next workout.',
  },
];

export default function BTCALIServicesSection() {
  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{
        background: '#FFFFFF',
        borderRadius: '40px 40px 0 0',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '50px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
        style={{
          color: '#0C0C0C',
          fontSize: 'clamp(3rem, 12vw, 160px)',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        What&apos;s Included
      </motion.h2>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-start gap-6 sm:gap-10 md:gap-14"
            style={{
              borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : 'none',
              borderBottom: '1px solid rgba(12,12,12,0.15)',
              paddingTop: 'clamp(2rem, 3vw, 3rem)',
              paddingBottom: 'clamp(2rem, 3vw, 3rem)',
            }}
          >
            <span
              className="font-black leading-none flex-shrink-0"
              style={{
                color: '#0C0C0C',
                fontSize: 'clamp(3rem, 10vw, 140px)',
                fontFamily: "'Kanit', sans-serif",
                lineHeight: 1,
              }}
            >
              {svc.num}
            </span>
            <div className="flex flex-col justify-center pt-1 sm:pt-2 md:pt-3">
              <p
                className="font-medium uppercase leading-tight mb-2"
                style={{
                  color: '#0C0C0C',
                  fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {svc.name}
              </p>
              <p
                className="font-light leading-relaxed max-w-2xl"
                style={{
                  color: '#0C0C0C',
                  opacity: 0.6,
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {svc.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link to="/scan">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full font-medium uppercase tracking-widest text-white px-10 py-4 text-sm sm:text-base"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
              outline: '2px solid white',
              outlineOffset: '-3px',
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            Apply For Coaching
          </motion.button>
        </Link>
      </div>
    </section>
  );
}