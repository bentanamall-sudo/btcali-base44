import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Crown, Zap, Lock, Trophy } from 'lucide-react';
import { PageHeaderLogo } from '../components/Logo';
import HomeButton from '../components/HomeButton';

const FREE_SECTION = {
  title: 'Free Tutorials',
  subtitle: 'Open to everyone — no code required',
  description: 'Build strong foundations in calisthenics with beginner and intermediate tutorials covering basics, handstand development, and planche conditioning.',
  includes: [
    'Master The Basics',
    'Handstand & Shoulder Foundations',
    'FREE Planche Conditioning',
  ],
  path: '/skills/free',
};

const PREMIUM_SECTION = {
  title: 'BTCALI Premium Tutorials',
  subtitle: 'BTCALI Members Only',
  description: 'Access tutorials covering all major calisthenics skills — including planche, front lever, front lever pull-ups, muscle-up, handstand, handstand push-up, L-sit to handstand, bent arm press, strength foundations, mobility, and much more.',
  includes: [
    'Planche',
    'Front Lever',
    'Front Lever Pull-Ups',
    'Muscle-Up',
    'Handstand & HSPU',
    'L-Sit to Handstand',
    'Bent Arm Press',
    'Mobility & Strength',
    'And Much More',
  ],
  path: '/skills/premium',
};

function SectionCard({ section, onClick }) {
  const isPremium = section.path === '/skills/premium';

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="cursor-pointer group flex flex-col h-full"
      style={{
        background: isPremium ? '#1A1A1A' : '#F4F4F2',
        color: isPremium ? '#F4F4F2' : '#1A1A1A',
        border: isPremium ? '2px solid #FF4D00' : '1px solid #D1D1CB',
      }}
      data-view-cursor
    >
      <div className="p-7 sm:p-8 flex flex-col flex-1">
        {/* Badge */}
        <div className="flex justify-end mb-6">
          <span className="eyebrow px-3 py-1.5" style={{
            background: isPremium ? '#FF4D00' : '#1A1A1A',
            color: '#F4F4F2',
          }}>
            {isPremium ? 'Members Only' : 'Free'}
          </span>
        </div>

        {/* Title */}
        <h2 className="display-lg mb-2" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: isPremium ? '#FF4D00' : '#1A1A1A' }}>
          {section.title}
        </h2>
        <p className="eyebrow mb-5" style={{ color: isPremium ? 'rgba(244,244,242,0.5)' : 'rgba(26,26,26,0.5)' }}>
          {section.subtitle}
        </p>
        <p className="font-body leading-relaxed mb-6" style={{ color: isPremium ? 'rgba(244,244,242,0.7)' : 'rgba(26,26,26,0.65)', fontSize: '18px' }}>
          {section.description}
        </p>

        {/* Includes list */}
        <div className="space-y-2.5 mb-8 flex-1">
          {section.includes.map(item => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: isPremium ? '#FF4D00' : '#1A1A1A' }} />
              <span className="font-body" style={{ color: isPremium ? 'rgba(244,244,242,0.75)' : 'rgba(26,26,26,0.75)', fontSize: '18px' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        {isPremium ? (
          <div className="b-cta w-full py-3.5 flex items-center justify-center gap-2 text-sm">
            <Crown className="w-4 h-4" /> Explore Premium Tutorials
          </div>
        ) : (
          <div className="b-cta-outline w-full py-3.5 flex items-center justify-center gap-2 text-sm">
            <Zap className="w-4 h-4" /> Explore Free Tutorials
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SkillLibrary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <PageHeaderLogo />
          <HomeButton />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px" style={{ background: '#FF4D00' }} />
          <span className="eyebrow text-foreground/50">BTCALI Skill Library</span>
        </div>
        <h1 className="display-xl text-foreground mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          The Skill Library
        </h1>
        <p className="font-body text-foreground/60 max-w-lg" style={{ fontSize: '18px', lineHeight: 1.6 }}>
          Choose your path — free tutorials to build foundations, or premium member content for advanced skills.
        </p>
      </motion.div>

      {/* Two section cards */}
      <div className="grid sm:grid-cols-2 gap-px items-stretch mb-8" style={{ background: '#D1D1CB' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="flex">
          <SectionCard section={FREE_SECTION} onClick={() => navigate('/skills/free')} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex">
          <SectionCard section={PREMIUM_SECTION} onClick={() => navigate('/skills/premium')} />
        </motion.div>
      </div>

      {/* Coaching pitch */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="p-8 text-center" style={{ background: '#F4F4F2', border: '1px solid #D1D1CB' }}>
        <p className="font-body text-foreground/80 leading-relaxed mb-3" style={{ fontSize: '18px' }}>
          I coach athletes through skills such as Planche, Front Lever, Handstand, Handstand Push-Ups, Muscle-Ups, L-Sit to Handstand, Bent Arm Press and many more.
        </p>
        <p className="font-body text-foreground/55 leading-relaxed mb-6" style={{ fontSize: '18px' }}>
          Whether you're learning your first pike push-up, trying to unlock a muscle-up, building towards a front lever or working towards a full planche, BTCALI coaching is built around your current level and goals.
        </p>
        <button
          onClick={() => navigate('/results')}
          className="b-cta inline-flex items-center gap-2.5 px-7 py-3.5 text-sm"
        >
          <Trophy className="w-4 h-4" /> See What BTCALI Athletes Have Achieved
        </button>
        <p className="font-body text-foreground/40 mt-4" style={{ fontSize: '14px' }}>
          This is what can be achieved through personalised BTCALI coaching.
        </p>
      </motion.div>

      {/* Bottom note */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-3" style={{ border: '1px solid #D1D1CB' }}>
          <Lock className="w-3.5 h-3.5 text-foreground/40" />
          <p className="font-body text-foreground/55" style={{ fontSize: '14px' }}>Premium tutorials require a BTCALI member access code or active coaching enrolment.</p>
        </div>
      </motion.div>
    </div>
  );
}