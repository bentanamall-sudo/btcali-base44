import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Zap, CheckCircle, Trophy } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { generateReport, buildEmailBody } from '@/lib/reportGenerator';
import DiagnosticReport from '../components/diagnostic/DiagnosticReport';

const GOALS_OPTIONS = [
  'Handstand','Handstand Push-Up','Pike Push-Up','Bent Arm Press','L-Sit',
  'L-Sit To Handstand','Muscle-Up','Front Lever','Front Lever Pull-Ups',
  'Planche','Planche Progressions','Increase Push-Up Reps','Increase Pull-Up Reps',
  'Increase Dip Reps','Build Muscle','Get Stronger','Improve Mobility','Improve Body Control'
];

const FL_LEVELS = ['None','Tuck FL','Advanced Tuck FL','One Leg FL','Straddle FL','Full FL'];
const MOBILITY = ['Poor','Average','Good','Excellent'];
const SLEEP = ['Poor (< 6hrs)','Okay (6-7hrs)','Good (7-8hrs)','Excellent (8+hrs)'];

const SECTIONS = ['Personal Info','Training Background','Current Strength','Goals','Mobility & Recovery','Coaching Fit','Consent'];

function OptionBtn({ label, selected, onClick, multi }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`px-4 py-3 rounded-xl text-sm font-heading font-semibold border transition-all duration-200 text-left w-full
        ${selected
          ? 'gradient-bg-strong text-primary-foreground glow-primary border-primary/60'
          : 'glass border-border/40 text-foreground/80 hover:border-primary/40 hover:text-foreground'
        }`}
    >
      <span className="flex items-center gap-2">
        {multi && <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-primary-foreground bg-primary-foreground/20' : 'border-muted-foreground'}`}>
          {selected && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
        </span>}
        {label}
      </span>
    </motion.button>
  );
}

function RepRangeSelect({ options, value, onChange }) {
  const [custom, setCustom] = useState(false);
  const [customVal, setCustomVal] = useState('');
  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
        {options.map(opt => (
          <motion.button
            key={opt}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setCustom(false); onChange(opt); }}
            className={`py-2.5 px-2 rounded-xl text-sm font-heading font-bold border transition-all duration-200 text-center
              ${value === opt && !custom
                ? 'gradient-bg-strong text-primary-foreground glow-primary border-primary/60'
                : 'glass border-border/40 text-foreground/80 hover:border-primary/40 hover:text-foreground'
              }`}
          >{opt}</motion.button>
        ))}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => { setCustom(true); onChange(customVal); }}
          className={`py-2.5 px-2 rounded-xl text-xs font-heading font-semibold border transition-all duration-200 text-center
            ${custom
              ? 'gradient-bg-strong text-primary-foreground glow-primary border-primary/60'
              : 'glass border-border/40 text-muted-foreground hover:border-primary/40'
            }`}
        >Other</motion.button>
      </div>
      {custom && (
        <input
          type="number"
          value={customVal}
          onChange={e => { setCustomVal(e.target.value); onChange(e.target.value); }}
          placeholder="Enter exact number"
          className="w-full glass rounded-xl px-4 py-2.5 text-foreground font-body text-sm border border-primary/40 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 bg-transparent mt-1"
        />
      )}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full glass rounded-xl px-4 py-3 text-foreground font-body text-base border border-border/40 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 bg-transparent"
    />
  );
}

function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full glass rounded-xl px-4 py-3 text-foreground font-body text-sm border border-border/40 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 bg-transparent resize-none"
    />
  );
}

function Label({ children }) {
  return <p className="font-heading font-semibold text-foreground text-sm mb-2">{children}</p>;
}

function Field({ children }) {
  return <div className="mb-5">{children}</div>;
}

export default function AthleteDiagnostic() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    full_name: '', email: '', age: '', country: '', instagram: '',
    training_experience: '', training_days: '', training_location: '',
    followed_program: '', has_coach: '',
    pushup_max: '', pullup_max: '', dip_max: '', pike_pushup_max: '',
    handstand_hold: '', lsit_hold: '', tuck_planche_hold: '',
    front_lever_level: 'None', can_muscle_up: '', can_hspu: '',
    can_bent_arm_press: '', can_lsit_to_hs: '',
    goals: [],
    wrist_mobility: '', shoulder_mobility: '', hamstring_mobility: '',
    injuries: '', pain_areas: '', sleep_quality: '', recovery_quality: '',
    coaching_investment: '', payment_option: '',
    consistency_answer: '', seriousness: '', why_btcali: '',
    media_consent: false, serious_applicant: false,
  });
  const [report, setReport] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }));
  const toggleGoal = (g) => set('goals', data.goals.includes(g) ? data.goals.filter(x => x !== g) : [...data.goals, g]);

  const yesNo = (key) => (
    <div className="grid grid-cols-2 gap-3">
      {['Yes', 'No'].map(v => (
        <OptionBtn key={v} label={v} selected={data[key] === v} onClick={() => set(key, v)} />
      ))}
    </div>
  );

  const optionRow = (key, options) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map(v => (
        <OptionBtn key={v} label={v} selected={data[key] === v} onClick={() => set(key, v)} />
      ))}
    </div>
  );

  const sections = [
    // 0 — Personal Info
    <div key="s0" className="space-y-0">
      <Field><Label>Full Name</Label><TextInput value={data.full_name} onChange={v => set('full_name', v)} placeholder="Your full name" /></Field>
      <Field><Label>Email</Label><TextInput value={data.email} onChange={v => set('email', v)} placeholder="your@email.com" type="email" /></Field>
      <Field><Label>Age</Label><TextInput value={data.age} onChange={v => set('age', v)} placeholder="e.g. 24" type="number" /></Field>
      <Field><Label>Country</Label><TextInput value={data.country} onChange={v => set('country', v)} placeholder="e.g. Australia" /></Field>
      <Field><Label>Instagram Username</Label><TextInput value={data.instagram} onChange={v => set('instagram', v)} placeholder="@handle" /></Field>
    </div>,

    // 1 — Training Background
    <div key="s1" className="space-y-0">
      <Field>
        <Label>How long have you trained calisthenics?</Label>
        {optionRow('training_experience', ['< 3 months','3–6 months','6–12 months','1–2 years','2–4 years','4+ years'])}
      </Field>
      <Field>
        <Label>Training days per week</Label>
        {optionRow('training_days', ['1–2 days','3–4 days','5–6 days','Every day'])}
      </Field>
      <Field>
        <Label>Training location</Label>
        {optionRow('training_location', ['Gym','Home','Both'])}
      </Field>
      <Field>
        <Label>Have you followed a calisthenics program before?</Label>
        {yesNo('followed_program')}
      </Field>
      <Field>
        <Label>Do you currently have a coach?</Label>
        {yesNo('has_coach')}
      </Field>
    </div>,

    // 2 — Current Strength
    <div key="s2" className="space-y-0">
      <Field>
        <Label>Push-up max reps</Label>
        <RepRangeSelect options={['0–5','6–10','11–20','21–30','31–40','41–50','50+']} value={data.pushup_max} onChange={v => set('pushup_max', v)} />
      </Field>
      <Field>
        <Label>Pull-up max reps</Label>
        <RepRangeSelect options={['0','1–3','4–6','7–10','11–15','16–20','20+']} value={data.pullup_max} onChange={v => set('pullup_max', v)} />
      </Field>
      <Field>
        <Label>Dip max reps</Label>
        <RepRangeSelect options={['0','1–5','6–10','11–15','16–20','21–30','30+']} value={data.dip_max} onChange={v => set('dip_max', v)} />
      </Field>
      <Field>
        <Label>Pike push-up max</Label>
        <RepRangeSelect options={['0','1–3','4–6','7–10','11–15','16–20','20+']} value={data.pike_pushup_max} onChange={v => set('pike_pushup_max', v)} />
      </Field>
      <Field>
        <Label>Handstand hold time</Label>
        <RepRangeSelect options={['0 seconds','1–5 sec','6–10 sec','11–20 sec','21–30 sec','30+ sec']} value={data.handstand_hold} onChange={v => set('handstand_hold', v)} />
      </Field>
      <Field>
        <Label>L-sit hold time</Label>
        <RepRangeSelect options={['0 seconds','1–5 sec','6–10 sec','11–20 sec','21–30 sec','30+ sec']} value={data.lsit_hold} onChange={v => set('lsit_hold', v)} />
      </Field>
      <Field>
        <Label>Tuck planche hold time</Label>
        <RepRangeSelect options={['0 seconds','1–3 sec','4–6 sec','7–10 sec','11–15 sec','15+ sec']} value={data.tuck_planche_hold} onChange={v => set('tuck_planche_hold', v)} />
      </Field>
      <Field>
        <Label>Front lever progression level</Label>
        {optionRow('front_lever_level', FL_LEVELS)}
      </Field>
      <Field><Label>Can you do a muscle-up?</Label>{yesNo('can_muscle_up')}</Field>
      <Field><Label>Can you do a handstand push-up?</Label>{yesNo('can_hspu')}</Field>
      <Field><Label>Can you do a bent arm press?</Label>{yesNo('can_bent_arm_press')}</Field>
      <Field><Label>Can you do an L-sit to handstand?</Label>{yesNo('can_lsit_to_hs')}</Field>
    </div>,

    // 3 — Goals
    <div key="s3">
      <p className="text-sm text-muted-foreground font-body mb-4">Select all that apply.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {GOALS_OPTIONS.map(g => (
          <OptionBtn key={g} label={g} selected={data.goals.includes(g)} onClick={() => toggleGoal(g)} multi />
        ))}
      </div>
    </div>,

    // 4 — Mobility & Recovery
    <div key="s4" className="space-y-0">
      <Field><Label>Wrist mobility</Label>{optionRow('wrist_mobility', MOBILITY)}</Field>
      <Field><Label>Shoulder mobility</Label>{optionRow('shoulder_mobility', MOBILITY)}</Field>
      <Field><Label>Hamstring mobility</Label>{optionRow('hamstring_mobility', MOBILITY)}</Field>
      <Field><Label>Injuries (describe or N/A)</Label><TextArea value={data.injuries} onChange={v => set('injuries', v)} placeholder="e.g. Left wrist pain, or N/A" /></Field>
      <Field><Label>Pain areas (describe or N/A)</Label><TextArea value={data.pain_areas} onChange={v => set('pain_areas', v)} placeholder="e.g. Lower back, or N/A" /></Field>
      <Field><Label>Sleep quality</Label>{optionRow('sleep_quality', SLEEP)}</Field>
      <Field><Label>Recovery quality</Label>{optionRow('recovery_quality', MOBILITY)}</Field>
    </div>,

    // 5 — Coaching Fit
    <div key="s5" className="space-y-0">
      <Field>
        <Label>Are you willing to invest in BTCALI coaching?</Label>
        {yesNo('coaching_investment')}
      </Field>
      <Field>
        <Label>Which payment option interests you most?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['$40/week','$150/month'].map(v => (
            <motion.button
              key={v}
              whileTap={{ scale: 0.97 }}
              onClick={() => set('payment_option', v)}
              className={`p-4 rounded-xl border text-center transition-all ${data.payment_option === v ? 'gradient-bg-strong glow-primary border-primary/60 text-primary-foreground' : 'glass border-border/40 text-foreground hover:border-primary/40'}`}
            >
              <div className="font-heading font-bold text-xl">{v}</div>
              {v === '$40/week' && <div className="text-xs mt-1 font-body opacity-80">⚡ Most Popular</div>}
            </motion.button>
          ))}
        </div>
      </Field>
      <Field>
        <Label>Are you willing to stay consistent for multiple months to reach your goals?</Label>
        {yesNo('consistency_answer')}
      </Field>
      <Field>
        <Label>How serious are you about your goals?</Label>
        {optionRow('seriousness', ['Casual','Serious','Very Serious','All-In'])}
      </Field>
      <Field>
        <Label>Why do you want BTCALI coaching?</Label>
        <TextArea value={data.why_btcali} onChange={v => set('why_btcali', v)} placeholder="Tell BTCALI why you want to work together..." />
      </Field>
    </div>,

    // 6 — Consent
    <div key="s6" className="space-y-4">
      <div
        onClick={() => set('media_consent', !data.media_consent)}
        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${data.media_consent ? 'glass glow-border border-primary/40' : 'glass border-border/30 hover:border-primary/20'}`}
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${data.media_consent ? 'border-primary bg-primary/20' : 'border-muted-foreground'}`}>
          {data.media_consent && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
        </div>
        <p className="text-sm font-body text-foreground/80">I allow BTCALI to use my progress videos, transformations, or achievements for testimonials and athlete showcases.</p>
      </div>
      <div
        onClick={() => set('serious_applicant', !data.serious_applicant)}
        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${data.serious_applicant ? 'glass glow-border border-primary/40' : 'glass border-border/30 hover:border-primary/20'}`}
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${data.serious_applicant ? 'border-primary bg-primary/20' : 'border-muted-foreground'}`}>
          {data.serious_applicant && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
        </div>
        <p className="text-sm font-body text-foreground/80">I understand this application is for serious BTCALI coaching applicants only.</p>
      </div>
    </div>,
  ];

  const canNext = () => {
    if (step === 0) return data.full_name && data.email;
    if (step === 3) return data.goals.length > 0;
    if (step === 6) return data.serious_applicant;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const r = generateReport(data);
    const fullData = { ...data, ...r };
    let savedId = null;
    try {
      const saved = await base44.entities.AthleteReport.create(fullData);
      savedId = saved?.id || null;
    } catch(e) { /* db save best-effort, don't block */ }
    setReportId(savedId);
    setReport(r);
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isMobile = () => /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const buildMobileSummary = (d, r) => {
    return `NEW BTCALI ATHLETE DIAGNOSTIC REPORT
=====================================
Athlete: ${d.full_name}
Email: ${d.email}
Age: ${d.age} | Country: ${d.country} | Instagram: @${d.instagram}

ATHLETE LEVEL: ${r.athlete_level}

STRENGTH RESULTS:
Push-ups: ${d.pushup_max} | Pull-ups: ${d.pullup_max} | Dips: ${d.dip_max}
Handstand: ${d.handstand_hold} | L-sit: ${d.lsit_hold} | Tuck Planche: ${d.tuck_planche_hold}
Front Lever: ${d.front_lever_level}
Muscle-Up: ${d.can_muscle_up} | HSPU: ${d.can_hspu}

GOALS: ${(d.goals || []).join(', ')}

STRENGTHS: ${r.strengths.join(', ')}
WEAKNESSES: ${r.weaknesses.join(', ')}
RECOMMENDED FOCUS: ${r.recommended_focus}
RECOMMENDED PROGRAMS: ${r.recommended_programs.join(', ')}
NEXT STEPS: ${r.next_steps.join(' | ')}

SUMMARY: ${r.athlete_summary}

COACHING:
Payment interest: ${d.payment_option} | Seriousness: ${d.seriousness}
Why BTCALI: ${d.why_btcali}
Media consent: ${d.media_consent ? 'YES' : 'NO'}`.trim();
  };

  const handleSend = async () => {
    setSending(true);
    setSendError(null);
    const subject = encodeURIComponent(`New BTCALI Athlete Diagnostic Report — ${data.full_name}`);
    // Save to DB
    try {
      if (reportId) {
        await base44.entities.AthleteReport.update(reportId, { status: 'pending' });
      }
    } catch(_) {}

    if (isMobile()) {
      // Mobile: use mailto so native email app opens
      const mobileBody = encodeURIComponent(buildMobileSummary(data, report));
      window.location.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${mobileBody}`;
    } else {
      // Desktop: open Gmail compose in new tab
      const fullBody = encodeURIComponent(buildEmailBody(data, report));
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=btcalisw%40gmail.com&su=${subject}&body=${fullBody}`, '_blank');
    }

    setSending(false);
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (sent) {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3 gradient-text">Email Prepared!</h1>
          <p className="text-muted-foreground font-body text-lg mb-10">Your email has been prepared. Please press <strong className="text-foreground">Send</strong> in your email app to submit your report to BTCALI.</p>
          <DiagnosticReport data={data} report={report} compact />
        </motion.div>
      </div>
    );
  }

  if (report) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <DiagnosticReport data={data} report={report} />
        {sendError && (
          <div className="mt-6 p-4 rounded-xl border border-destructive/50 bg-destructive/10 text-destructive font-body text-sm text-center">
            {sendError}
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSend}
          disabled={sending}
          className="w-full mt-6 py-5 rounded-2xl gradient-bg-strong glow-primary-strong text-primary-foreground font-heading font-bold text-xl flex items-center justify-center gap-3 disabled:opacity-60"
        >
          {sending ? (
            <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Sending to BTCALI...</span>
          ) : (
            <span className="flex items-center gap-2"><Zap className="w-6 h-6" /> SEND TO BTCALI</span>
          )}
        </motion.button>
      </div>
    );
  }

  const progress = ((step) / sections.length) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Athlete Diagnostic</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl gradient-text">BTCALI Athlete Scan</h1>
      </motion.div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-body text-muted-foreground mb-2">
          <span>{SECTIONS[step]}</span>
          <span>{step + 1} / {sections.length}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full progress-glow rounded-full"
            animate={{ width: `${progress + (100 / sections.length)}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {SECTIONS.map((s, i) => (
            <div key={s} className={`text-xs font-body transition-colors ${i <= step ? 'text-primary' : 'text-muted-foreground/30'}`}>·</div>
          ))}
        </div>
      </div>

      {/* Section */}
      <div className="glass rounded-2xl p-6 sm:p-8 glow-border mb-8">
        <h2 className="font-heading font-bold text-lg text-foreground mb-6 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full gradient-bg-strong flex items-center justify-center text-primary-foreground text-xs font-bold">{step + 1}</span>
          {SECTIONS[step]}
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {sections[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex gap-3">
        {step > 0 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-border/40 text-foreground font-heading font-semibold text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </motion.button>
        )}
        {step < sections.length - 1 ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { if (canNext()) setStep(s => s + 1); }}
            disabled={!canNext()}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-sm glow-primary disabled:opacity-40"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={!canNext() || submitting}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary disabled:opacity-40"
          >
            {submitting ? <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Generating...</> : <><Trophy className="w-5 h-5" /> Submit Report</>}
          </motion.button>
        )}
      </div>
    </div>
  );
}