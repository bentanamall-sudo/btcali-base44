import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Trophy, Flame } from 'lucide-react';
import HoverAccordion from '@/components/HoverAccordion';
import ControlledAccordion from '@/components/ControlledAccordion';

const SKILLS = [
  'Planche','Front Lever','Handstand','Handstand Push-Up','Muscle-Up',
  'L-Sit','L-Sit to Handstand','Bent Arm Press','Strength','Hypertrophy',
  'Mobility','Weighted Calisthenics','Body Control',
];

const INCLUSION_ITEMS = [
  {
    title: 'Personalised training routine / program',
    detail: `As soon as coaching begins, I analyse your Athlete Scan and build a personalised training routine designed specifically around you. Every exercise, progression and training method is selected with the purpose of helping you reach your goals as quickly and safely as possible.

Since every athlete is different, every program is different. Whether you're a complete beginner going from 0–5 pullups, an intermediate athlete working towards the L-Sit to Handstand and Handstand Pushup, or a stronger athlete progressing from Handstand Pushups to Planche or building your pullup foundation into a Full Front Lever and Muscle-Up, your program will be built specifically around your current level, goals, strengths, weaknesses, available equipment, mobility and schedule.

Nothing is copied. Nothing is generic. Every program starts from scratch.`,
  },
  {
    title: 'Full technique and form analysis',
    detail: `As you complete your training, you record your sets and send the videos through to me for analysis. I review your clips in depth and provide detailed feedback — usually during my available hours of 4–6 PM Australian time, though I may also respond outside of these hours when available. You will always receive feedback before your next workout, and in most cases feedback is returned within 24 hours.

I don't simply tell you that your form is wrong. I show you exactly what needs to change and how to fix it. Feedback may include text explanations, voice messages, personalised tutorials, movement demonstrations, video breakdowns and premium skill tutorials available through the BTCALI Members Area.`,
  },
  {
    title: 'Video feedback and movement breakdowns',
    detail: `One of the most effective methods I use is visually breaking down your clips frame by frame. I often record your footage on my laptop and analyse it in detail, showing you exactly where you should be looking, where certain body parts should be moving and how your positioning can be improved.

I also take screenshots and annotate them by drawing directly onto the image to highlight movement pathways, lean angles, body positioning and technique corrections. This helps you clearly understand things such as how much you should lean, the correct angle of specific movements, how to activate the right muscles and how to reduce unnecessary stress on your joints.

The goal is to make sure you fully understand the feedback being given so you can apply it immediately during your next session.`,
  },
  {
    title: 'Routine adjustments based on progress',
    detail: `As your strength and skill level increase, your program evolves with you. Many athletes progress quickly and outgrow certain exercises within just a few weeks. For example, an athlete may progress from Pike Pushups to Bent Arm Press variations much faster than expected. When this happens, I update the program to match their new strength level and continue moving them towards bigger goals.

Programs are regularly adjusted based on your progress, technique, strengths and weaknesses to make sure your training continues moving in the right direction.`,
  },
  {
    title: 'Direct messaging support',
    detail: `Message whenever you need help or have a question about your training. My main availability is 4–6 PM Australian time, though I may also respond outside of these hours when available. You will always receive feedback before your next workout.

You can send videos through Instagram, WhatsApp or Messages — whichever is most convenient for you. Response timing will never negatively affect your progress; corrections and advice will always be provided before your next session.`,
  },
  {
    title: 'Skill-specific programming',
    detail: `Whether your goal is Handstand, Planche, Front Lever, Muscle-Up, L-Sit to Handstand, Bent Arm Press or general strength, the programme is built entirely around your specific target. Every exercise and progression chosen for your routine is there for a reason — to move you closer to your goal.

My coaching works around your schedule too. I can create programs specifically designed to help you make progress in shorter training sessions. Even training once every two days for under an hour can still produce significant results when programmed correctly.`,
  },
  {
    title: 'Personalised tutorials',
    detail: `You will receive detailed personalised tutorials explaining exactly how to improve your specific movements and perform exercises correctly. These tutorials are created specifically for you based on what I observe in your submitted clips — not generic guides, but targeted explanations built around your current technique, weaknesses and goals.

Premium skill tutorials are also available through the BTCALI Members Area, giving you access to in-depth breakdowns of specific calisthenics skills.`,
  },
  {
    title: 'Progress tracking',
    detail: `I track your progress across every set you send through. This allows me to see exactly how your strength, technique and skill level are developing over time. Based on this data, I continuously refine your programme to ensure your training is always moving in the right direction.

As your strength increases and you begin achieving your goals, your program is updated to reflect your new level and set you up for your next progression target.`,
  },
];

const WHAT_I_ANALYZE = [
  'Current level', 'Goals', 'Weaknesses', 'Form', 'Technique', 'Mobility', 'Strengths', 'Limitations', 'Equipment', 'Schedule',
];

const FAQ_ITEMS = [
  {
    q: 'How do I send my videos?',
    a: 'You can send videos through Instagram, WhatsApp or Messages — whichever is most convenient for you.',
  },
  {
    q: 'What are your available hours?',
    a: 'My main availability is 4–6 PM Australian time. I may also respond outside of these hours when available. You will always receive feedback before your next workout.',
  },
  {
    q: 'What if I don\'t have much time?',
    a: 'That\'s completely fine. My coaching works around your schedule. I can create programs specifically designed to help you make progress in shorter training sessions while still working towards your goals. Even training once every two days for under an hour can still produce significant results when programmed correctly.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'I currently accept PayPal, BSB Bank Transfer, PayID and Wise. Additional payment methods may also be available if needed.',
  },
];



export default function CoachingApply() {

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
          style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.18)' }}>
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-body" style={{ color: 'rgba(191,201,217,0.7)' }}>$150/month · $40/week · $50/week</span>
        </div>
        <p className="text-xs font-heading font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'rgba(79,157,255,0.5)' }}>Pricing</p>
        <h1 className="font-heading font-black text-4xl sm:text-5xl mb-3 leading-tight">
          <span className="gradient-text">1-on-1 Coaching</span>
        </h1>
        <p className="text-sm font-heading font-semibold uppercase tracking-widest" style={{ color: 'rgba(79,157,255,0.6)' }}>Currently Accepting New Athletes</p>
      </motion.div>

      {/* 1. Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
        className="rounded-2xl px-5 py-5 mb-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, rgba(79,157,255,0.08) 0%, rgba(94,235,255,0.05) 100%)', border: '1px solid rgba(79,157,255,0.2)' }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.5), transparent)' }} />
        <div className="flex flex-col gap-4">
          {[
            { price: '$150', unit: 'AUD/month', desc: 'Paid upfront monthly', badge: 'Best Value' },
            { price: '$40',  unit: 'AUD/week',  desc: 'Minimum 1 month commitment' },
            { price: '$50',  unit: 'AUD/week',  desc: 'No minimum commitment', muted: true },
          ].map((tier, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className={`font-heading font-black text-2xl leading-none ${tier.muted ? '' : 'gradient-text'}`}
                    style={tier.muted ? { color: 'rgba(255,255,255,0.65)' } : {}}>
                    {tier.price} <span className="text-sm font-semibold" style={{ color: 'rgba(191,201,217,0.5)' }}>{tier.unit}</span>
                  </div>
                  <div className="text-xs font-body mt-0.5" style={{ color: 'rgba(191,201,217,0.45)' }}>{tier.desc}</div>
                </div>
                {tier.badge && (
                  <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(79,157,255,0.15)', color: '#A6D4FF', border: '1px solid rgba(79,157,255,0.25)' }}>
                    {tier.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. Application Section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-xl px-5 py-5 mb-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="font-heading font-bold text-lg text-white mb-1">Apply For 1-on-1 Coaching</h3>
        <p className="text-sm font-body mb-4 leading-relaxed" style={{ color: 'rgba(191,201,217,0.6)' }}>
          Complete the Athlete Scan so I can analyse your current level, goals and weaknesses before reviewing your coaching application.
        </p>
        <Link to="/scan">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-bg-strong text-white font-heading font-bold text-base btn-shine"
            style={{ boxShadow: '0 0 20px rgba(79,157,255,0.2)' }}
          >
            <Flame className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Apply For 1-on-1 Coaching Through Athlete Scan</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* 3. BTCALI Coaching Details */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mb-6">
        <div className="rounded-xl overflow-hidden transition-colors"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,157,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
          <HoverAccordion
            trigger={<span className="font-heading font-bold text-foreground text-base">BTCALI Coaching Details</span>}
            triggerClassName="px-5 py-4"
          >
              <div className="px-5 pb-6 pt-2 space-y-5">
                <div className="h-px" style={{ background: 'hsl(var(--border)/0.25)' }} />

                {/* Intro */}
                <p className="font-body text-sm text-foreground/85 leading-relaxed">
                  As soon as we begin coaching through your first payment, I will analyse your Athlete Scan and create a personalised training routine designed to help you achieve your goals as efficiently as possible.
                </p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  Since every athlete is different, every program is different. Whether you're a complete beginner trying to go from 0–5 pullups, an intermediate athlete working towards skills such as the L-Sit to Handstand and Handstand Pushup, or a stronger athlete looking to progress from Handstand Pushups to Planche, or build your pullup foundation into a Full Front Lever and Muscle-Up — your program will be built specifically around you.
                </p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  I take into account your current skill level, goals, strengths, weaknesses, available equipment, mobility, schedule and individual needs. Every exercise, progression and training method is selected with the purpose of helping you reach your goals as quickly and safely as possible.
                </p>

                {/* What I analyse */}
                <div className="glass rounded-xl p-4 border border-primary/20">
                  <p className="font-heading font-semibold text-primary text-xs uppercase tracking-wider mb-2">What I analyse</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {WHAT_I_ANALYZE.map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm font-body text-foreground/75">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Framework */}
                <div>
                  <p className="font-heading font-bold text-foreground text-sm mb-2">The Framework I Use To Help My Students Progress</p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    The main way athletes progress through my coaching is by following the exact framework I have used to help many of my students achieve amazing results. You follow the program I create for you, record your sets and send the videos through to me for analysis. I review your clips in depth and provide detailed feedback — usually during my available hours of 4–6 PM Australian time, though I may also respond outside of these hours. You will always receive feedback before your next workout, and in most cases feedback is returned within 24 hours.
                  </p>
                </div>

                {/* Video analysis */}
                <div>
                  <p className="font-heading font-bold text-foreground text-sm mb-2">How I Analyse Your Clips</p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed mb-2">
                    One of the biggest advantages of BTCALI Coaching is the level of detail that goes into the feedback you receive. I don't simply tell you that your form is wrong. I show you exactly what needs to change and how to fix it.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed mb-2">
                    I often record your footage on my laptop and analyse it frame by frame, showing you exactly where you should be looking, where certain body parts should be moving and how your positioning can be improved.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    I also take screenshots and annotate them by drawing directly onto the image to highlight movement pathways, lean angles, body positioning and technique corrections — helping you clearly understand things such as how much you should lean, the correct angle of specific movements, how to activate the right muscles and how to reduce unnecessary stress on your joints.
                  </p>
                </div>

                {/* Program updates */}
                <div>
                  <p className="font-heading font-bold text-foreground text-sm mb-2">Program Updates As You Improve</p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    As your strength and skill level increase, your program will evolve with you. Many athletes progress quickly and outgrow certain exercises within just a few weeks. For example, an athlete may progress from Pike Pushups to Bent Arm Press variations much faster than expected. When this happens, I update the program to match their new strength level and continue moving them towards bigger goals.
                  </p>
                </div>

                {/* FAQ */}
                <div>
                  <p className="font-heading font-bold text-foreground text-sm mb-3">Frequently Asked Questions</p>
                  <div className="space-y-2">
                    {FAQ_ITEMS.map((faq, i) => (
                      <div key={i} className="rounded-xl overflow-hidden" style={{
                        background: 'hsl(0 0% 7% / 0.6)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid hsl(40 25% 14% / 0.4)',
                      }}>
                        <HoverAccordion
                          trigger={<span className="font-heading font-semibold text-foreground text-sm">{faq.q}</span>}
                          triggerClassName="px-4 py-3 hover:bg-white/3 transition-colors"
                        >
                          <div className="px-4 pb-4">
                            <div className="h-px mb-2" style={{ background: 'hsl(var(--border)/0.2)' }} />
                            <p className="font-body text-sm text-foreground/75 leading-relaxed">{faq.a}</p>
                          </div>
                        </HoverAccordion>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why BTCALI */}
                <div className="glass rounded-xl p-4 border border-primary/20 space-y-3">
                  <p className="font-heading font-bold text-primary text-sm">Why BTCALI Coaching?</p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    Throughout coaching you'll receive direct support, personalised guidance and clear explanations so you always know exactly what to focus on next.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    One thing that's important to me is that BTCALI Coaching was never created purely to make money. I started BTCALI because I know exactly how frustrating it feels to train hard, stay consistent and still feel stuck. I've experienced the plateaus. I've dealt with injuries. I've spent months focusing on the wrong things. I've wasted time on advice that simply didn't apply to me. That's why one of my biggest goals is helping athletes avoid those same mistakes and progress faster.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    My coaching is currently only $150 per month, which is significantly lower than many coaches who charge $500+ per month for similar services. The goal isn't to be the most expensive coach. The goal is to help as many athletes as possible achieve skills they once thought were impossible.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    Whether your goal is your first pull-up, first handstand, muscle-up, front lever, planche, handstand push-up, bent arm press or something completely different, every part of your coaching experience is built specifically around helping you reach that goal. You'll receive a personalised training program, detailed technique feedback, ongoing support and routine adjustments based on your progress so you always know exactly what to focus on next.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    As a calisthenics coach, I have worked with athletes across a wide range of ages and skill levels, both online and in person. The coaching system has consistently produced results because it focuses on personalised programming, detailed feedback and continuous adjustments based on real progress.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    The difference between watching random tutorials online and receiving coaching is that every exercise, every correction and every adjustment is built specifically around YOU. Instead of guessing what to do next, you'll always have a clear path towards your goals.
                  </p>
                </div>

                {/* Availability */}
                <div className="glass rounded-xl p-4 border border-border/20">
                  <p className="font-heading font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Support Availability</p>
                  <p className="text-sm font-body text-foreground/80">Main availability: 4–6 PM Australian time</p>
                  <p className="text-xs font-body text-muted-foreground mt-1">I aim to respond before your next session whenever possible. I may also respond outside of these hours when available.</p>
                </div>
              </div>
          </HoverAccordion>
        </div>
      </motion.div>


      {/* 4. What's Included */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
        <div className="rounded-xl overflow-hidden transition-colors"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,157,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
          <HoverAccordion
            trigger={<span className="font-heading font-bold text-foreground text-base">What Is Included</span>}
            triggerClassName="px-5 py-4"
          >
            <div className="px-4 pb-4 pt-2">
              <div className="h-px mb-3" style={{ background: 'hsl(var(--border)/0.25)' }} />
              <ControlledAccordion items={INCLUSION_ITEMS} />
            </div>
          </HoverAccordion>
        </div>
      </motion.div>

      {/* 5. Skills */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="font-heading font-bold text-2xl text-white mb-2">
          Main Calisthenics Skills I Help Athletes Achieve
        </h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          These are some of the most common skills I help athletes achieve through BTCALI Coaching. Every program is built around your specific goals, meaning many additional skills, strength goals and movement patterns can also be coached.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {SKILLS.map(s => (
            <span key={s} className="text-sm font-body px-3 py-1.5 rounded-full cursor-default transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(191,201,217,0.75)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,157,255,0.35)'; e.currentTarget.style.color = '#A6D4FF'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(191,201,217,0.75)'; }}
            >
              {s}
            </span>
          ))}
        </div>
        <p className="font-body text-sm text-muted-foreground italic mb-6">And many more skills and goals specific to YOU.</p>
        <div className="glass rounded-xl p-5 border border-border/30 space-y-3 mb-6">
          <p className="font-body text-sm text-foreground/80 leading-relaxed">
            I coach athletes through skills such as Planche, Front Lever, Handstand, Handstand Push-Ups, Muscle-Ups, L-Sit to Handstand, Bent Arm Press and many more.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Whether you're learning your first pike push-up, trying to unlock a muscle-up, building towards a front lever or working towards a full planche, BTCALI coaching is built around your current level and goals.
          </p>
        </div>
        <Link to="/results">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-bg-strong text-white font-heading font-bold text-base btn-shine"
            style={{ boxShadow: '0 0 20px rgba(79,157,255,0.2)' }}
          >
            <Trophy className="w-5 h-5" /> See What BTCALI Athletes Have Achieved
          </motion.button>
        </Link>
        <p className="text-center text-xs font-body text-muted-foreground/60 mt-2">
          This is what can be achieved through personalised BTCALI coaching.
        </p>
      </motion.div>

    </div>
  );
}