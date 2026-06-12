import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Shield, Dumbbell, Layers, ShoppingBag, ExternalLink, Lock, ChevronRight, ChevronLeft, ChevronDown, CheckCircle, Send, Clock } from 'lucide-react';
import { useAccessCodes } from '@/lib/useAccessCodes';
import { PageHeaderLogo } from '@/components/Logo';
import { Link } from 'react-router-dom';

const EQUIPMENT = [
  { name: 'P-bars (Parallettes)', url: 'https://www.amazon.com.au/BRITOR-Parallettes-Gymnastics-Bodybuilding-Non-Slip-Durable-1/dp/B08CMZMFCS' },
  { name: 'Dip Bars', url: 'https://www.amazon.com.au/Centra-Parallette-Adjustable-74CM-89CM-Equipment/dp/B0F2SJ1LK1' },
  { name: 'Resistance Bands', url: 'https://www.amazon.com.au/Essential-Resistance-Weightlifting-Physical-Mobility/dp/B08SW6DBX8' },
  { name: 'Tripod (for filming sets)', url: 'https://www.amazon.com.au/ULANZI-MT85-Lightweight-Extendable-Compatible/dp/B0GFVDGS3Y' },
];

const TERMS_ITEMS = [
  'Coaching support availability is weekdays 4–6 PM NSW time.',
  'I will do my best to respond before your next workout whenever possible, with most replies during availability hours.',
  'Outside these hours I may respond, but it is not guaranteed.',
  'Coaching is AUD $40/week with a minimum 1-month commitment.',
  'If the athlete is not consistent, the standard price is AUD $50/week with no discount.',
  'Monthly discounted option: AUD $150/month.',
  'Athletes must send every working set to BTCALI so form, technique, endurance, strength, weaknesses, and progress can be analysed properly.',
  'BTCALI will adapt the athlete\'s routine based on performance so they continuously improve.',
  'All physical training carries some risk.',
  'By joining BTCALI coaching, the athlete understands they are training at their own risk.',
  'BTCALI is not responsible for injuries.',
  'BTCALI will guide the athlete as safely as possible and help minimise injury risk as much as possible.',
];

const TRAINING_RULES = [
  'Rest 3–5 minutes between sets.',
  'Train every day you do not feel sore.',
  'Generally train every second day, around 3–4 times per week.',
  'You can still train if you feel slightly sore — around 80% recovered and 20% sore.',
  'Always complete a wrist warm-up before training.',
  'Complete every single set of the program.',
  'Send every set to BTCALI so form and technique can be analysed.',
  'BTCALI will adapt your routine based on your performance so you continuously improve.',
];

const CONSENT_CHECKBOXES = [
  'I agree to the BTCALI Coaching Terms & Conditions.',
  'I agree to follow the General Training Rules.',
  'I understand coaching support is primarily available weekdays 4–6 PM NSW time. Responses outside these hours are not guaranteed.',
  'I understand coaching is AUD $40/week with a minimum 1-month commitment.',
  'I understand inconsistent athletes may be charged AUD $50/week with no discount.',
  'I understand the monthly discounted option is AUD $150/month.',
  'I understand I must send every working set to BTCALI so my form, technique, endurance, strength, weaknesses, and progress can be analysed.',
  'I understand BTCALI will adjust my routine based on my performance and progress.',
  'I understand all physical training carries risk.',
  'I understand I am training at my own risk.',
  'I understand BTCALI is not responsible for injuries.',
  'I understand BTCALI will guide me as safely as possible and help minimise injury risk as much as possible.',
  'I understand BTCALI does not offer regular coaching calls. Calls may only be provided if I am consistently struggling to understand a movement after applying BTCALI coaching feedback and corrections multiple times. Any call support is provided solely at BTCALI\'s discretion.',
  'I understand BTCALI may use my submitted videos, progress updates, training footage, screenshots, transformations, achievements, and results for educational, coaching, promotional, website, and social media purposes.',
  'I consent to BTCALI posting my training footage, progress videos, skill achievements, and results on social media platforms, the BTCALI website, and other BTCALI content for the purpose of documenting progress, showcasing coaching results, and inspiring other athletes.',
];

function AccordionSection({ icon: Icon, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl border border-border/30 mb-4 overflow-hidden"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 p-6 text-left hover:bg-muted/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg-strong flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-primary-foreground" />
          </div>
          <h2 className="font-heading font-bold text-base sm:text-lg text-foreground">{title}</h2>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border/30 pt-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

function ConsentForm() {
  const [checked, setChecked] = useState(Array(CONSENT_CHECKBOXES.length).fill(false));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const allChecked = checked.every(Boolean) && name.trim() && email.trim();

  const toggle = (i) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));

  const handleSubmit = () => {
    const now = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });
    const checklist = CONSENT_CHECKBOXES.map((c, i) => `[${checked[i] ? '✓' : '✗'}] ${c}`).join('\n');
    const subject = encodeURIComponent('BTCALI Terms & Conditions Agreement — ' + name);
    const body = encodeURIComponent(
`BTCALI Coaching Terms & Conditions Agreement

Athlete Name: ${name}
Athlete Email: ${email}
Instagram: ${instagram || 'N/A'}
Submitted: ${now} (Sydney)

--- AGREED TERMS ---
${checklist}

--- CONFIRMATION ---
This athlete has read, understood, and accepted all BTCALI Coaching Terms & Conditions and Training Rules.`
    );
    const a = document.createElement('a');
    a.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <p className="font-heading font-bold text-green-400 text-lg">Terms & Conditions Report Sent Successfully.</p>
        <p className="text-sm font-body text-muted-foreground mt-2">Make sure you pressed Send in your email app to complete the submission.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4 border border-primary/20 mb-4">
        <p className="font-heading font-semibold text-primary text-xs uppercase tracking-wider mb-1">Step 2 — Complete the Agreement</p>
        <p className="text-sm font-body text-muted-foreground leading-relaxed">
          Read every item carefully. Tick each box to confirm you understand and agree, then enter your details and submit.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-2">
        <div>
          <label className="block text-xs font-heading font-semibold text-foreground mb-1.5">Full Name *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            className="w-full glass rounded-xl px-4 py-2.5 text-foreground text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent" />
        </div>
        <div>
          <label className="block text-xs font-heading font-semibold text-foreground mb-1.5">Email *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
            className="w-full glass rounded-xl px-4 py-2.5 text-foreground text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-heading font-semibold text-foreground mb-1.5">Instagram (optional)</label>
        <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@handle"
          className="w-full glass rounded-xl px-4 py-2.5 text-foreground text-sm border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent" />
      </div>
      <div className="space-y-2 mt-2">
        {CONSENT_CHECKBOXES.map((label, i) => (
          <div key={i} onClick={() => toggle(i)}
            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${checked[i] ? 'glass border-primary/40 bg-primary/5' : 'glass border-border/30 hover:border-primary/20'}`}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${checked[i] ? 'border-primary bg-primary/20' : 'border-muted-foreground'}`}>
              {checked[i] && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
            </div>
            <p className="text-sm font-body text-foreground/80 leading-relaxed">{label}</p>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: allChecked ? 1.02 : 1 }}
        whileTap={{ scale: allChecked ? 0.97 : 1 }}
        onClick={handleSubmit}
        disabled={!allChecked}
        className="w-full py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
      >
        <Send className="w-5 h-5" /> Send Terms & Conditions Report
      </motion.button>
      {!allChecked && (
        <p className="text-xs text-center font-body text-muted-foreground">Tick all boxes and fill in your name and email to continue.</p>
      )}
    </div>
  );
}

function AccessGate() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { unlockCode } = useAccessCodes();

  const handleUnlock = () => {
    const result = unlockCode(code);
    if (!result) {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border">
        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          BTCALI <span className="gradient-text">Members</span>
        </h1>
        <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
          This area is exclusive to BTCALI coaching members. Enter your unique access code below.
        </p>
        <div className={`flex gap-2 rounded-xl overflow-hidden mb-3 transition-all ${error ? 'ring-2 ring-destructive/60' : 'ring-1 ring-border/40'}`}>
          <input type="text" value={code} onChange={e => { setCode(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
            placeholder="Enter your member access code..."
            className="flex-1 bg-transparent text-foreground font-body text-sm px-4 py-3.5 outline-none placeholder:text-muted-foreground/50" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleUnlock} className="gradient-bg-strong px-4 flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>
        {error && <p className="text-xs text-destructive font-body mb-4">Invalid code. Please check and try again.</p>}
        <p className="text-xs text-muted-foreground font-body mt-4">
          Not a BTCALI member?{' '}
          <Link to="/1-on-1-coaching" className="text-primary font-semibold hover:underline">Apply for coaching →</Link>
        </p>
      </motion.div>
    </div>
  );
}

// ── Main Members page — two-slide onboarding flow ──────────────────────────
export default function Members() {
  const { isMember } = useAccessCodes();
  const [slide, setSlide] = useState(0); // 0 = coaching dashboard, 1 = agreement form

  if (!isMember) return <AccessGate />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
          Your exclusive coaching resources, training rules, and member content.
        </p>
      </motion.div>

      {/* Slide container */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {slide === 0 ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* BTCALI Coaching Terms & Conditions */}
              <AccordionSection icon={Shield} title="BTCALI Coaching Terms & Conditions">
                <BulletList items={TERMS_ITEMS} />
              </AccordionSection>

              {/* General Training Rules */}
              <AccordionSection icon={Dumbbell} title="General Training Rules">
                <div className="space-y-4">
                  <BulletList items={TRAINING_RULES} />
                  <div className="glass rounded-xl p-4 border border-primary/20 mt-4">
                    <p className="text-sm font-heading font-semibold text-foreground mb-2">Wrist Warm-Up Video</p>
                    <a href="https://youtube.com/shorts/A1YPZdLyXPI?si=NTII3TIGbomjKChN" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-body text-primary hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" /> Watch Wrist Warm-Up Tutorial
                    </a>
                  </div>
                </div>
              </AccordionSection>

              {/* Supersetting */}
              <AccordionSection icon={Layers} title="How Supersetting Works">
                <div className="space-y-4 text-sm font-body text-foreground/80 leading-relaxed">
                  <p>
                    Supersetting means alternating two exercises that use different muscle groups. For example, you can perform a push exercise followed immediately by a pull exercise, then rest 3–5 minutes before repeating.
                  </p>
                  <SupersetExample />
                </div>
              </AccordionSection>

              {/* Equipment */}
              <AccordionSection icon={ShoppingBag} title="Essential Equipment">
                <p className="text-sm font-body text-muted-foreground mb-5 leading-relaxed">
                  Recommended gear for your BTCALI training.
                </p>
                <div className="space-y-3">
                  {EQUIPMENT.map((item) => (
                    <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 glass rounded-xl px-4 py-3.5 border border-border/30 hover:border-primary/40 transition-all group">
                      <span className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{item.name}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </AccordionSection>

              {/* Skill Library CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass rounded-2xl p-6 border border-primary/20 text-center mb-6">
                <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">Access Member Skill Libraries</h3>
                <p className="text-sm font-body text-muted-foreground mb-5">
                  Your member access unlocks premium skill tutorials in the Skill Library.
                </p>
                <Link to="/skills">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary">
                    <Crown className="w-4 h-4" /> Go to Skill Library
                  </motion.button>
                </Link>
              </motion.div>

              {/* Next: Agreement */}
              <div className="flex justify-center mb-4">
                <motion.button
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSlide(1)}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-primary/30 hover:border-primary/60 transition-all group"
                  style={{ boxShadow: '0 0 20px hsl(var(--glow-primary)/0.08)' }}
                >
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm text-left">Terms & Conditions Agreement</p>
                    <p className="font-body text-xs text-muted-foreground text-left">Complete your coaching onboarding</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl gradient-bg-strong flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <ChevronRight className="w-5 h-5 text-primary-foreground" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="agreement"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Back button */}
              <div className="flex justify-start mb-6">
                <motion.button
                  whileHover={{ scale: 1.03, x: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSlide(0)}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl glass border border-border/30 hover:border-primary/40 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg gradient-bg-strong flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <ChevronLeft className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-heading font-semibold text-sm text-foreground">Back to Coaching Resources</span>
                </motion.button>
              </div>

              {/* Agreement header */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl border border-primary/30 mb-6 overflow-hidden">
                <div className="flex items-center gap-3 p-6 border-b border-border/30">
                  <div className="w-9 h-9 rounded-xl gradient-bg-strong flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-base sm:text-lg text-foreground">Terms & Conditions Agreement</h2>
                    <p className="text-xs font-body text-muted-foreground mt-0.5">Step 2 of your BTCALI coaching onboarding</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-5">
                  <ConsentForm />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SupersetExample() {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl border border-border/30 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-muted/10 transition-colors">
        <span className="font-heading font-semibold text-foreground text-sm">Example Superset Schedule</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-border/30 pt-3 space-y-1 text-sm text-foreground/75">
              <p>12:00 → Complete a push set.</p>
              <p>12:00:30 → Start your pull set.</p>
              <p>12:01 → Finish your pull set.</p>
              <p>12:01–12:04 or 12:06 → Rest for 3–5 minutes depending on your required rest time.</p>
              <p>12:04–12:06 → Begin your next push set.</p>
              <p className="text-muted-foreground pt-1">Repeat the process for all working sets.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}