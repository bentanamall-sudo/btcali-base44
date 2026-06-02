import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, Dumbbell, Layers, ShoppingBag, ExternalLink, Lock, ChevronRight } from 'lucide-react';
import { useAccessCodes } from '@/lib/useAccessCodes';
import { PageHeaderLogo } from '@/components/Logo';
import { Link } from 'react-router-dom';

const EQUIPMENT = [
  {
    name: 'P-bars (Parallettes)',
    url: 'https://www.amazon.com.au/BRITOR-Parallettes-Gymnastics-Bodybuilding-Non-Slip-Durable-1/dp/B08CMZMFCS',
  },
  {
    name: 'Dip Bars',
    url: 'https://www.amazon.com.au/Centra-Parallette-Adjustable-74CM-89CM-Equipment/dp/B0F2SJ1LK1',
  },
  {
    name: 'Resistance Bands',
    url: 'https://www.amazon.com.au/Essential-Resistance-Weightlifting-Physical-Mobility/dp/B08SW6DBX8',
  },
  {
    name: 'Tripod (for filming sets)',
    url: 'https://www.amazon.com.au/ULANZI-MT85-Lightweight-Extendable-Compatible/dp/B0GFVDGS3Y',
  },
];

function Section({ icon: Icon, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 sm:p-8 border border-border/30 mb-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl gradient-bg-strong flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary-foreground" />
        </div>
        <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm font-body text-foreground/80 leading-relaxed">
          <span className="text-primary mt-1 flex-shrink-0">▸</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function AccessGate({ onUnlocked }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { unlockCode } = useAccessCodes();

  const handleUnlock = () => {
    const result = unlockCode(code);
    if (result) {
      setError(false);
      onUnlocked();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border"
      >
        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          BTCALI <span className="gradient-text">Members</span>
        </h1>
        <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
          This area is exclusive to BTCALI coaching members. Enter your unique access code below to unlock your member content.
        </p>

        <div className={`flex gap-2 rounded-xl overflow-hidden mb-3 transition-all ${error ? 'ring-2 ring-destructive/60' : 'ring-1 ring-border/40'}`}>
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
            placeholder="Enter your member access code..."
            className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3.5 outline-none placeholder:text-muted-foreground/50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnlock}
            className="gradient-bg-strong px-4 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>

        {error && (
          <p className="text-xs text-destructive font-body mb-4">Invalid code. Please check your code and try again.</p>
        )}

        <p className="text-xs text-muted-foreground font-body mt-4">
          Not a BTCALI member?{' '}
          <Link to="/pricing" className="text-primary font-semibold hover:underline">Apply for coaching →</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function Members() {
  const { isAdmin, unlockedPrograms } = useAccessCodes();
  const isMember = isAdmin || (unlockedPrograms && unlockedPrograms.length > 0);
  const [unlocked, setUnlocked] = useState(isMember);

  // Show gate if not yet a member
  if (!unlocked) {
    return <AccessGate onUnlocked={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex justify-start mb-6">
          <PageHeaderLogo />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-primary/30">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-heading font-semibold gradient-text">BTCALI Members Area</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">
          Welcome, <span className="gradient-text">BTCALI Athlete</span>
        </h1>
        <p className="text-muted-foreground font-body text-base">
          Your exclusive coaching resources, training rules, and member equipment guide.
        </p>
      </motion.div>

      {/* Terms & Conditions */}
      <Section icon={Shield} title="BTCALI Coaching Terms & Conditions">
        <BulletList items={[
          'BTCALI response availability is 4–6 PM and 7–8 AM NSW time on weekdays.',
          'BTCALI will respond within these hours on weekdays.',
          'Outside these hours, BTCALI may respond, but it is not guaranteed.',
          'Coaching is AUD $40/week with a minimum 1-month commitment.',
          'If the athlete is not consistent, the standard price is AUD $50/week with no discount.',
          'Monthly discounted option: AUD $150/month.',
        ]} />
      </Section>

      {/* General Workout Info */}
      <Section icon={Dumbbell} title="General Training Rules">
        <div className="space-y-3">
          <BulletList items={[
            'Rest 3–5 minutes between sets.',
            'Train every day you do not feel sore.',
            'Generally train every second day, around 3–4 times per week.',
            'You can still train if you feel slightly sore — around 80% recovered and 20% sore.',
            'Always complete a wrist warm-up before training.',
            'Complete every single set of the program.',
            'Send every set to BTCALI so form and technique can be analysed.',
            'BTCALI will adapt your routine based on your performance so you continuously improve.',
          ]} />
          <div className="mt-4 glass rounded-xl p-4 border border-primary/20">
            <p className="text-sm font-heading font-semibold text-foreground mb-2">Wrist Warm-Up Video</p>
            <a
              href="https://youtube.com/shorts/A1YPZdLyXPI?si=NTII3TIGbomjKChN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-body text-primary hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Watch Wrist Warm-Up Tutorial
            </a>
          </div>
        </div>
      </Section>

      {/* Supersetting */}
      <Section icon={Layers} title="How Supersetting Works">
        <div className="space-y-4 text-sm font-body text-foreground/80 leading-relaxed">
          <p>
            You can start with either push or pull, or you can superset different muscle groups. Supersetting means doing one muscle group right after another. For example, push and pull use different muscle groups, so you can do a push set, then a pull set straight after with no rest or around 30 seconds rest.
          </p>
          <div className="glass rounded-xl p-4 border border-border/30">
            <p className="font-heading font-semibold text-foreground mb-2 text-sm">Example:</p>
            <ul className="space-y-1 text-sm text-foreground/70">
              <li>12:00 → Complete a push set.</li>
              <li>~12:00:30 → Start your pull set.</li>
              <li>~12:01 → Finish pull set.</li>
            </ul>
          </div>
          <p>
            This saves time while still allowing performance because the exercises use different muscle groups.
          </p>
        </div>
      </Section>

      {/* Equipment */}
      <Section icon={ShoppingBag} title="Essential Equipment">
        <p className="text-sm font-body text-muted-foreground mb-5 leading-relaxed">
          Recommended gear for your BTCALI training. These are the exact equipment links to get started.
        </p>
        <div className="space-y-3">
          {EQUIPMENT.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 glass rounded-xl px-4 py-3.5 border border-border/30 hover:border-primary/40 transition-all group"
            >
              <span className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{item.name}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
            </a>
          ))}
        </div>
      </Section>

      {/* Skill Library link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-6 border border-primary/20 text-center"
      >
        <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-heading font-bold text-lg text-foreground mb-2">Access Member Skill Libraries</h3>
        <p className="text-sm font-body text-muted-foreground mb-5">
          Your member access unlocks premium skill tutorials in the Skill Library.
        </p>
        <Link to="/skills">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary"
          >
            <Crown className="w-4 h-4" /> Go to Skill Library
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}