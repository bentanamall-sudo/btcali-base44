import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Zap, CheckCircle, Trophy, BookOpen } from 'lucide-react';
import { PageHeaderLogo } from '@/components/Logo';
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

const SECTIONS = ['Personal Info','Coaching Fit','Training Background','Current Strength','Goals','Mobility & Recovery','Extra Details','Consent'];

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

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
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
  const navigate = useNavigate();
  const [gateAccepted, setGateAccepted] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    full_name: '', email: '', age: '', height: '', weight: '', country: '', instagram: '',
    training_experience: '', training_days: '', training_location: '',
    followed_program: '', has_coach: '',
    pushup_max: '', pullup_max: '', dip_max: '', pike_pushup_max: '',
    handstand_hold: '', lsit_hold: '', tuck_planche_hold: '',
    front_lever_level: '', can_muscle_up: '', can_hspu: '',
    can_bent_arm_press: '', can_lsit_to_hs: '',
    goals: [],
    wrist_mobility: '', shoulder_mobility: '', hamstring_mobility: '',
    injuries: '', pain_areas: '', sleep_quality: '', recovery_quality: '',
    coaching_investment: '', payment_option: '',
    consistency_answer: '', seriousness: '', why_btcali: '',
    equipment_available: '', exact_current_skills: '', additional_notes: '',
    media_consent: false, serious_applicant: false,
  });
  const [report, setReport] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
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
      <Field><Label>Height (cm or ft)</Label><TextInput value={data.height} onChange={v => set('height', v)} placeholder="e.g. 178cm or 5'10" /></Field>
      <Field><Label>Weight (kg or lbs)</Label><TextInput value={data.weight} onChange={v => set('weight', v)} placeholder="e.g. 75kg or 165lbs" /></Field>
      <Field><Label>Country</Label><TextInput value={data.country} onChange={v => set('country', v)} placeholder="e.g. Australia" /></Field>
      <Field><Label>Instagram Username</Label><TextInput value={data.instagram} onChange={v => set('instagram', v)} placeholder="@handle" /></Field>
    </div>,

    // 1 — Coaching Fit (moved to page 2)
    <div key="s-coaching" className="space-y-0">
      {/* Why athletes invest */}
      <div className="glass rounded-xl p-4 border border-primary/20 mb-5">
        <p className="font-heading font-bold text-primary text-xs uppercase tracking-wider mb-3">Why athletes invest in BTCALI coaching:</p>
        <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
          {['Personalised programming','Direct coach feedback','Faster skill progression','Accountability','Technique corrections','Individual support'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-xs font-body text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <Field>
        <Label>Which coaching option would you realistically consider?</Label>
        <div className="grid grid-cols-1 gap-2">
          {[
            'AUD $40/week',
            'AUD $150/month',
            'I would like more information first',
            'I am not interested in coaching',
          ].map(v => (
            <OptionBtn key={v} label={v} selected={data.coaching_investment === v} onClick={() => set('coaching_investment', v)} />
          ))}
        </div>
        {!data.coaching_investment && (
          <p className="text-xs text-muted-foreground/60 font-body mt-2">Please select a coaching option before continuing.</p>
        )}
        {data.coaching_investment === 'I am not interested in coaching' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-amber-500/40 p-5 text-center space-y-3"
            style={{ background: 'rgba(245,158,11,0.06)' }}
          >
            <p className="font-heading font-bold text-amber-400 text-base">BTCALI 1-on-1 coaching is only available for athletes willing to invest in coaching.</p>
            <p className="font-body text-sm text-foreground/75 leading-relaxed">
              If you are not interested in paid coaching, please return to the Skill Library where you can access free tutorials and training resources.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/skills')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-amber-500/40 text-amber-400 font-heading font-semibold text-sm hover:border-amber-500/70 transition-all"
            >
              <BookOpen className="w-4 h-4" /> Go to Skill Library
            </motion.button>
          </motion.div>
        )}
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

    // 2 — Training Background
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

    // 5 — Extra Details
    <div key="s6" className="space-y-0">
      <Field>
        <Label>Equipment Available</Label>
        <TextArea
          rows={4}
          value={data.equipment_available}
          onChange={v => set('equipment_available', v)}
          placeholder="What equipment do you currently have access to?"
        />
      </Field>
      <Field>
        <Label>Current Skills / Goals</Label>
        <TextArea
          rows={4}
          value={data.exact_current_skills}
          onChange={v => set('exact_current_skills', v)}
          placeholder="Briefly describe your current level and goals."
        />
      </Field>
      <Field>
        <Label>Additional Notes</Label>
        <TextArea
          rows={4}
          value={data.additional_notes}
          onChange={v => set('additional_notes', v)}
          placeholder="Anything else BTCALI should know?"
        />
      </Field>
    </div>,

    // 7 — Consent
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
    if (step === 1) return !!data.coaching_investment && data.coaching_investment !== 'I am not interested in coaching';
    if (step === 4) return data.goals.length > 0;
    if (step === 7) return data.serious_applicant;
    return true;
  };

  // Payment filter — redirect non-interested users when they try to continue
  const handleNext = () => {
    if (step === 1 && data.coaching_investment === 'I am not interested in coaching') {
      navigate('/skills');
      return;
    }
    if (canNext()) setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const snapshot = { ...data }; // capture full data snapshot before any state changes
    const r = generateReport(snapshot);
    const fullData = { ...snapshot, ...r };
    let savedId = null;
    try {
      const saved = await base44.entities.AthleteReport.create(fullData);
      savedId = saved?.id || null;
    } catch(e) { /* db save best-effort, don't block */ }
    setReportId(savedId);
    setSubmittedData(snapshot); // save exact snapshot for send/copy
    setReport(r);
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Always use submittedData snapshot so send/copy always reflects exactly what was submitted
  const buildReportText = () => buildEmailBody(submittedData || data, report);

  const handleWaitingList = (programName) => {
    const subject = encodeURIComponent('BTCALI Custom Program Enquiry — AUD $50');
    const body = encodeURIComponent(
`I want to enquire about this BTCALI custom program (AUD $50):

Program:
${programName}

My goal/skill:
${(report?.goals || data.goals || []).join(', ') || 'N/A'}

Name:
${data.full_name || 'N/A'}

Email:
${data.email || 'N/A'}

Quiz results:
Athlete Level: ${report?.athlete_level || 'N/A'}
Push-ups: ${data.pushup_max} | Pull-ups: ${data.pullup_max} | Dips: ${data.dip_max}
Front Lever: ${data.front_lever_level}
Strengths: ${(report?.strengths || []).join(', ')}
Weaknesses: ${(report?.weaknesses || []).join(', ')}`
    );
    const a = document.createElement('a');
    a.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSend = () => {
    const d = submittedData || data;
    const subject = encodeURIComponent(`New BTCALI Athlete Diagnostic Report — ${d.full_name}`);
    const body = encodeURIComponent(buildReportText());
    const a = document.createElement('a');
    a.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = async () => {
    const text = buildReportText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (_) {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // ── Gate screen ─────────────────────────────────────────────────────────
  if (!gateAccepted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full glass rounded-2xl p-8 glow-border text-center"
        >
          <div className="flex justify-center mb-6">
            <PageHeaderLogo />
          </div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Athlete Diagnostic</span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl gradient-text mb-4">BTCALI Athlete Scan</h1>
          <div className="glass rounded-xl p-5 border border-primary/30 mb-6 text-left space-y-4">
            <p className="font-heading font-semibold text-foreground text-sm">
              BTCALI Athlete Scan is only for athletes genuinely interested in BTCALI 1-on-1 coaching.
            </p>
            <div className="rounded-xl border border-primary/40 bg-primary/8 p-4 space-y-2">
              <p className="font-heading font-bold text-primary text-sm uppercase tracking-wide">Coaching starts from:</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-heading font-bold text-foreground text-sm">AUD $40/week</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-heading font-bold text-foreground text-sm">AUD $150/month</span>
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-foreground/80">
              This application is for athletes willing to <span className="text-primary font-semibold">invest in coaching</span> to accelerate their progress.
            </p>
            <p className="font-body text-sm text-muted-foreground">
              If you are not interested in paid coaching, please enjoy the free tutorials available in the Skill Library instead.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setGateAccepted(true)}
              className="w-full py-4 rounded-xl gradient-bg-strong glow-primary text-primary-foreground font-heading font-bold text-base"
            >
              I am a serious applicant willing to invest in coaching — Continue
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/skills')}
              className="w-full py-3 rounded-xl glass border border-border/40 text-muted-foreground font-heading font-semibold text-sm flex items-center justify-center gap-2 hover:border-primary/30 transition-all"
            >
              <BookOpen className="w-4 h-4" /> Browse Free Tutorials Instead
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (report) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <DiagnosticReport data={data} report={report} />

        <div className="mt-8 space-y-3">
          {/* Completion message */}
          <div className="glass rounded-2xl p-6 border border-primary/30 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p className="font-heading font-bold text-foreground text-lg mb-1">Athlete Scan Complete</p>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              Thank you for completing the Athlete Scan. I will review your answers before assessing your coaching application.
            </p>
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSend}
            className="w-full py-5 rounded-2xl gradient-bg-strong glow-primary-strong text-primary-foreground font-heading font-bold text-xl flex items-center justify-center gap-3"
          >
            <Zap className="w-6 h-6" /> Submit Your Report to BTCALI
          </motion.button>

          <p className="text-center text-sm font-body text-muted-foreground px-2">
            After your email app opens, press <strong className="text-foreground">Send</strong> to complete your submission.
          </p>
          <p className="text-center text-xs font-body text-muted-foreground/70 px-2">
            If the button does not open your email app, press <strong className="text-foreground">COPY REPORT TO SEND MANUALLY</strong>, paste the report into Gmail, and send it to <strong className="text-foreground">btcalisw@gmail.com</strong>.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopy}
            className="w-full py-4 rounded-2xl glass border border-border/40 text-foreground font-heading font-semibold text-base flex items-center justify-center gap-2 hover:border-primary/40 transition-all"
          >
            {copied ? (
              <><CheckCircle className="w-5 h-5 text-green-400" /> Report Copied!</>
            ) : (
              <><Trophy className="w-5 h-5" /> COPY REPORT TO SEND MANUALLY</>
            )}
          </motion.button>

          {copied && (
            <p className="text-center text-sm font-body text-muted-foreground px-2">
              Report copied. Paste into Gmail and send to <strong className="text-foreground">btcalisw@gmail.com</strong>.
            </p>
          )}

          {/* Navigation CTAs */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <Link to="/apply">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl gradient-bg-strong glow-primary text-primary-foreground font-heading font-bold text-sm flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> View Coaching Information
              </motion.button>
            </Link>
            <Link to="/results">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl glass border border-primary/30 text-primary font-heading font-bold text-sm flex items-center justify-center gap-2 hover:border-primary/60 transition-all"
              >
                <Trophy className="w-4 h-4" /> View Athlete Results
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((step) / sections.length) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex justify-start mb-5">
          <PageHeaderLogo />
        </div>
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Athlete Diagnostic</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl gradient-text">BTCALI Athlete Scan</h1>
        <p className="text-sm font-body text-foreground/90 font-semibold mt-3 max-w-sm mx-auto leading-relaxed">
          Complete the Athlete Scan to inquire about BTCALI coaching.
        </p>
        <p className="text-sm font-body text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          This helps BTCALI understand your current level, goals, strengths, weaknesses and commitment so we can determine how best to help you progress.
        </p>
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
            onClick={handleNext}
            disabled={!canNext()}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-semibold text-sm glow-primary disabled:opacity-40"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <div className="flex-1 space-y-2">
            <p className="text-center text-xs font-body text-primary font-semibold uppercase tracking-wide">Final Step — Generate Your Report</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={!canNext() || submitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary disabled:opacity-40"
            >
              {submitting
                ? <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Generating Report...</>
                : <><Trophy className="w-5 h-5" /> Generate & Submit Report to BTCALI</>
              }
            </motion.button>
            <p className="text-center text-xs font-body text-muted-foreground">Your report will be generated, then you'll submit it directly to BTCALI via email.</p>
          </div>
        )}
      </div>
    </div>
  );
}