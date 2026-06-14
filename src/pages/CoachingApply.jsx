import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Crown, ChevronDown, Trophy, Flame } from 'lucide-react';

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

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl border border-border/30 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-muted/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-heading font-semibold text-foreground text-sm sm:text-base">{title}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/30">
              <div className="space-y-3 pt-2">
                {children.detail.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm font-body text-foreground/75 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CoachingApply() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [includedOpen, setIncludedOpen] = useState(false);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-border/30">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">$150/month · $40/week · $50/week</span>
        </div>
        <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-2">PRICING</p>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-3 leading-tight">
          <span className="gradient-text">Pricing</span>
        </h1>
        <p className="text-sm font-heading font-semibold text-primary/70 uppercase tracking-widest">Currently Accepting New Athletes</p>
      </motion.div>

      {/* 1. Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
        className="glass rounded-xl px-5 py-4 border border-primary/20 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="relative flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-heading font-bold text-2xl gradient-text leading-none">$150 <span className="text-sm font-semibold text-muted-foreground">AUD/month</span></div>
              <div className="text-xs font-body text-muted-foreground mt-0.5">Paid upfront monthly</div>
            </div>
            <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-full gradient-bg-strong text-primary-foreground">Best Value</span>
          </div>
          <div className="h-px bg-border/30" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-heading font-bold text-2xl gradient-text leading-none">$40 <span className="text-sm font-semibold text-muted-foreground">AUD/week</span></div>
              <div className="text-xs font-body text-muted-foreground mt-0.5">Minimum 1 month commitment</div>
            </div>
          </div>
          <div className="h-px bg-border/30" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-heading font-bold text-2xl text-foreground/80 leading-none">$50 <span className="text-sm font-semibold text-muted-foreground">AUD/week</span></div>
              <div className="text-xs font-body text-muted-foreground mt-0.5">No minimum commitment</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Application Section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-xl px-5 py-5 border border-border/30 mb-6">
        <h3 className="font-heading font-bold text-lg text-foreground mb-1">Apply For 1-on-1 Coaching</h3>
        <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed">
          Complete the Athlete Scan so I can analyse your current level, goals and weaknesses before reviewing your coaching application.
        </p>
        <Link to="/scan">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base"
            style={{ boxShadow: '0 0 16px hsl(var(--glow-primary)/0.18)' }}
          >
            <Flame className="w-5 h-5" /> Apply For 1-on-1 Coaching Through Athlete Scan
          </motion.button>
        </Link>
      </motion.div>

      {/* 3. BTCALI Coaching Details */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mb-6">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDetailsOpen(o => !o)}
          className="w-full flex items-center justify-between gap-3 glass rounded-xl px-5 py-4 border border-border/30 hover:border-primary/30 transition-all"
        >
          <span className="font-heading font-bold text-foreground text-base">BTCALI Coaching Details</span>
          <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.span>
        </motion.button>

        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="glass rounded-b-xl px-5 pb-6 pt-4 border border-t-0 border-border/30 space-y-5">

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
                  <div className="space-y-3">
                    {FAQ_ITEMS.map((faq, i) => (
                      <div key={i} className="glass rounded-xl p-4 border border-border/20">
                        <p className="font-heading font-semibold text-foreground text-sm mb-1">{faq.q}</p>
                        <p className="font-body text-sm text-foreground/75 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why BTCALI */}
                <div className="glass rounded-xl p-4 border border-primary/20">
                  <p className="font-heading font-bold text-primary text-sm mb-2">Why BTCALI Coaching?</p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed mb-2">
                    Throughout coaching you'll receive direct support, personalised guidance and clear explanations so you always know exactly what to focus on next.
                  </p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    The difference between watching random tutorials online and receiving coaching is that every piece of feedback, every exercise and every adjustment is built specifically around you. Instead of guessing what to do next, you'll always have a clear path towards your goals.
                  </p>
                </div>

                {/* Availability */}
                <div className="glass rounded-xl p-4 border border-border/20">
                  <p className="font-heading font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Support Availability</p>
                  <p className="text-sm font-body text-foreground/80">Main availability: 4–6 PM Australian time</p>
                  <p className="text-xs font-body text-muted-foreground mt-1">I aim to respond before your next session whenever possible. I may also respond outside of these hours when available.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 4. What's Included — single outer dropdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIncludedOpen(o => !o)}
          className="w-full flex items-center justify-between gap-3 glass rounded-xl px-5 py-4 border border-border/30 hover:border-primary/30 transition-all"
        >
          <span className="font-heading font-bold text-foreground text-base">What Is Included</span>
          <motion.span animate={{ rotate: includedOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.span>
        </motion.button>

        <AnimatePresence initial={false}>
          {includedOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="glass rounded-b-xl border border-t-0 border-border/30 px-4 pb-4 pt-3">
                <p className="text-xs text-muted-foreground font-body mb-3">Tap each item to expand</p>
                <div className="space-y-2">
                  {INCLUSION_ITEMS.map((item, i) => (
                    <AccordionItem key={i} title={item.title}>
                      {item}
                    </AccordionItem>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 5. Skills */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Main Calisthenics Skills I Help Athletes Achieve
        </h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          These are some of the most common skills I help athletes achieve through BTCALI Coaching. Every program is built around your specific goals, meaning many additional skills, strength goals and movement patterns can also be coached.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {SKILLS.map(s => (
            <span key={s} className="text-sm font-body glass px-3 py-1.5 rounded-full border border-border/30 text-foreground/80 hover:border-primary/40 hover:text-primary transition-all cursor-default">
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
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary"
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