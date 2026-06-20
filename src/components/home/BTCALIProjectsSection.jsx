import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    num: '01',
    category: 'Athlete Transformation',
    name: 'Handstand & Planche',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    num: '02',
    category: 'Skill Progression',
    name: 'Front Lever & Muscle-Up',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    num: '03',
    category: 'Strength & Physique',
    name: 'Full Body Transformation',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

const TOTAL = PROJECTS.length;

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={cardRef} className="h-[85vh] flex items-start justify-center" style={{ paddingTop: `${index * 28}px` }}>
      <motion.div
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
        className="sticky w-full p-4 sm:p-6 md:p-8"
        layoutId={`card-${index}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '50px' }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 p-4 sm:p-6 md:p-8"
          style={{
            borderColor: '#D7E2EA',
            background: '#0C0C0C',
          }}
        >
          {/* Top row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className="font-black leading-none"
                style={{
                  color: '#D7E2EA',
                  fontSize: 'clamp(2.5rem, 7vw, 100px)',
                  fontFamily: "'Kanit', sans-serif",
                  opacity: 0.3,
                }}
              >
                {project.num}
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#D7E2EA', opacity: 0.5, fontFamily: "'Kanit', sans-serif" }}>
                  {project.category}
                </p>
                <p
                  className="font-bold uppercase tracking-tight"
                  style={{
                    color: '#D7E2EA',
                    fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {project.name}
                </p>
              </div>
            </div>
            <Link to="/results">
              <button
                className="rounded-full border-2 font-medium uppercase tracking-widest px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base transition-colors hover:bg-white/10"
                style={{
                  borderColor: '#D7E2EA',
                  color: '#D7E2EA',
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                See Results
              </button>
            </Link>
          </div>

          {/* Image grid */}
          <div className="flex gap-3 sm:gap-4">
            {/* Left col — 40% */}
            <div className="flex flex-col gap-3 sm:gap-4" style={{ width: '40%' }}>
              <img
                src={project.col1[0]}
                alt=""
                loading="lazy"
                className="object-cover w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
              <img
                src={project.col1[1]}
                alt=""
                loading="lazy"
                className="object-cover w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>
            {/* Right col — 60% */}
            <div style={{ width: '60%' }}>
              <img
                src={project.col2}
                alt=""
                loading="lazy"
                className="object-cover w-full h-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                style={{ minHeight: 'clamp(290px, 38vw, 570px)' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function BTCALIProjectsSection() {
  return (
    <section
      className="-mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
      style={{
        background: '#0C0C0C',
        borderRadius: '40px 40px 0 0',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '50px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="font-black uppercase text-center mb-16 leading-none tracking-tight hero-heading"
        style={{
          fontSize: 'clamp(3rem, 12vw, 160px)',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        Results
      </motion.h2>

      <div className="max-w-5xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}