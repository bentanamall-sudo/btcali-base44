import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, ChevronDown, ChevronUp, Zap, Trophy, AlertTriangle, MessageCircle, FileText, Video, Target, Flame, Star } from 'lucide-react';

const SESSION_TYPES = ['Push', 'Pull', 'Planche', 'Front Lever', 'Weak Day', 'Full Body', 'Other'];

const TYPE_COLORS = {
  Push: { bg: 'rgba(79,157,255,0.12)', border: 'rgba(79,157,255,0.3)', color: '#93C5FD' },
  Pull: { bg: 'rgba(94,235,255,0.12)', border: 'rgba(94,235,255,0.3)', color: '#67E8F9' },
  Planche: { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)', color: '#C4B5FD' },
  'Front Lever': { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', color: '#6EE7B7' },
  'Weak Day': { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', color: '#FCD34D' },
  'Full Body': { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)', color: '#FB923C' },
  Other: { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)', color: '#94A3B8' },
};

const EMPTY_FORM = {
  log_date: new Date().toISOString().split('T')[0],
  workout_type: '',
  difficulty_rating: 7,
  energy_rating: 7,
  prs_hit: '',
  strong_points: '',
  weak_points: '',
  pain_issues: '',
  questions: '',
  notes: '',
  video_link: '',
};

function RatingSlider({ label, value, onChange, icon: Icon, lowLabel, highLabel, color = '#4F9DFF' }) {
  const pct = ((value - 1) / 9) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60">
          <Icon className="w-3.5 h-3.5" /> {label}
        </label>
        <span className="text-lg font-heading font-black" style={{ color }}>{value}<span className="text-xs text-muted-foreground/40 font-body font-normal">/10</span></span>
      </div>
      <input type="range" min={1} max={10} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: color, background: `linear-gradient(to right, ${color} ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }} />
      <div className="flex justify-between text-[10px] text-muted-foreground/30 font-heading mt-1">
        <span>{lowLabel}</span><span>{highLabel}</span>
      </div>
    </div>
  );
}

function FormField({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/50 mb-1.5">
        {Icon && <Icon className="w-3.5 h-3.5" />} {label}
      </label>
      {children}
    </div>
  );
}

const textareaClass = "w-full bg-transparent text-sm text-foreground font-body outline-none resize-none leading-relaxed placeholder:text-muted-foreground/25 border-b border-border/25 pb-1.5 focus:border-primary/40 transition-colors";

function SessionCard({ log, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const typeStyle = TYPE_COLORS[log.workout_type] || TYPE_COLORS.Other;
  const rpe = log.difficulty_rating || 0;
  const energy = log.energy_rating || 0;

  const rpeColor = rpe >= 8 ? '#f87171' : rpe >= 6 ? '#facc15' : '#4ade80';
  const energyColor = energy >= 8 ? '#4ade80' : energy >= 5 ? '#93C5FD' : '#f87171';

  const fields = [
    log.prs_hit && { icon: Trophy, label: 'PRs Hit 🏆', value: log.prs_hit, color: '#FCD34D' },
    log.strong_points && { icon: Zap, label: 'What Felt Strong', value: log.strong_points, color: '#4ade80' },
    log.weak_points && { icon: Target, label: 'What Felt Weak', value: log.weak_points, color: '#93C5FD' },
    log.pain_issues && { icon: AlertTriangle, label: 'Pain / Issues', value: log.pain_issues, color: '#f87171' },
    log.questions && { icon: MessageCircle, label: 'Questions for BTCALI', value: log.questions, color: '#A6D4FF' },
    log.notes && { icon: FileText, label: 'Notes', value: log.notes, color: '#94A3B8' },
  ].filter(Boolean);

  return (
    <motion.div layout className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Card top accent */}
      {log.workout_type && (
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${typeStyle.color}, transparent)` }} />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none" onClick={() => setExpanded(e => !e)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-heading font-bold text-sm text-foreground">{log.log_date}</span>
            {log.workout_type && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-heading font-bold"
                style={{ background: typeStyle.bg, border: `1px solid ${typeStyle.border}`, color: typeStyle.color }}>
                {log.workout_type}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {rpe > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-heading font-semibold" style={{ color: rpeColor }}>
                <Flame className="w-3 h-3" /> RPE {rpe}/10
              </span>
            )}
            {energy > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-heading font-semibold" style={{ color: energyColor }}>
                <Star className="w-3 h-3" /> Energy {energy}/10
              </span>
            )}
            {log.prs_hit && (
              <span className="flex items-center gap-1 text-[11px] font-heading font-semibold text-yellow-400/80">
                <Trophy className="w-3 h-3" /> PR session
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); onDelete(log.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground/40" /> : <ChevronDown className="w-4 h-4 text-muted-foreground/40" />}
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-border/15">
              {fields.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {fields.map((f, i) => (
                    <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <f.icon className="w-3 h-3 flex-shrink-0" style={{ color: f.color }} />
                        <p className="text-[10px] font-heading font-bold uppercase tracking-wider" style={{ color: f.color }}>{f.label}</p>
                      </div>
                      <p className="text-xs font-body text-foreground/75 leading-relaxed whitespace-pre-wrap">{f.value}</p>
                    </div>
                  ))}
                </div>
              )}
              {log.video_link && (
                <div className="mt-3 flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                  <a href={log.video_link} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline font-body break-all">{log.video_link}</a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WorkoutLogTab({ accessCode, studentName }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.WorkoutLog.filter({ access_code: accessCode }, '-log_date', 50);
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => { if (accessCode) load(); }, [accessCode]);

  const f = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.log_date) return;
    setSaving(true);
    await base44.entities.WorkoutLog.create({ ...form, access_code: accessCode, student_name: studentName });
    setForm({ ...EMPTY_FORM });
    setAdding(false);
    setSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3500);
    load();
  };

  const handleDelete = async (id) => {
    await base44.entities.WorkoutLog.delete(id);
    load();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-heading font-black text-2xl text-foreground mb-1">Session Reflection</h2>
            <p className="text-sm font-body text-muted-foreground/60">
              Log your session so BTCALI can adjust your program faster.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setAdding(a => !a)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-sm gradient-bg-strong text-primary-foreground flex-shrink-0"
            style={{ boxShadow: '0 0 20px rgba(79,157,255,0.25)' }}>
            <Plus className="w-4 h-4" /> {adding ? 'Cancel' : 'Log Session'}
          </motion.button>
        </div>

        {/* Stats row */}
        {logs.length > 0 && (
          <div className="flex gap-4 mt-4 flex-wrap">
            {[
              { label: 'Sessions', value: logs.length, color: '#4F9DFF' },
              { label: 'PRs Logged', value: logs.filter(l => l.prs_hit).length, color: '#FCD34D' },
              { label: 'Avg RPE', value: logs.filter(l => l.difficulty_rating).length ? (logs.reduce((s, l) => s + (l.difficulty_rating || 0), 0) / logs.filter(l => l.difficulty_rating).length).toFixed(1) : '—', color: '#f87171' },
            ].map(s => (
              <div key={s.label} className="rounded-xl px-4 py-2.5 text-center"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', minWidth: 80 }}>
                <p className="font-heading font-black text-xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground/50">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Just saved banner */}
      <AnimatePresence>
        {justSaved && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl px-5 py-4 mb-5 flex items-center gap-3"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <Trophy className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="font-heading font-bold text-sm text-green-400">Session saved. Keep stacking wins.</p>
              <p className="text-xs font-body text-muted-foreground/60">Your coach will review this in the next session.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Log Form */}
      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl mb-6 overflow-hidden"
            style={{ border: '1px solid rgba(79,157,255,0.2)', background: 'rgba(8,11,22,0.7)' }}>

            {/* Form header */}
            <div className="px-5 py-4 border-b border-border/20 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(79,157,255,0.08) 0%, rgba(94,235,255,0.04) 100%)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.5), transparent)' }} />
              <p className="font-heading font-black text-base text-foreground">New Session Reflection</p>
              <p className="text-xs font-body text-muted-foreground/50 mt-0.5">Fill in what you can — every detail helps.</p>
            </div>

            <div className="p-5 space-y-5">
              {/* Date + Type */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date" icon={null}>
                  <input type="date" value={form.log_date} onChange={e => f('log_date', e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none border border-border/30 rounded-xl px-3 py-2.5 focus:border-primary/50 transition-colors" />
                </FormField>

                <FormField label="Session Type" icon={null}>
                  <div className="flex flex-wrap gap-1.5">
                    {SESSION_TYPES.map(t => {
                      const style = TYPE_COLORS[t] || TYPE_COLORS.Other;
                      const active = form.workout_type === t;
                      return (
                        <button key={t} type="button" onClick={() => f('workout_type', t)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-heading font-bold transition-all"
                          style={active ? { background: style.bg, border: `1px solid ${style.border}`, color: style.color } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.6)' }}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </FormField>
              </div>

              {/* Ratings */}
              <div className="grid sm:grid-cols-2 gap-5 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <RatingSlider label="Workout Rating" value={form.difficulty_rating}
                  onChange={v => f('difficulty_rating', v)} icon={Flame}
                  lowLabel="Too Easy" highLabel="Destroyed" color="#f87171" />
                <RatingSlider label="Energy Rating" value={form.energy_rating}
                  onChange={v => f('energy_rating', v)} icon={Star}
                  lowLabel="Drained" highLabel="On Fire" color="#4F9DFF" />
              </div>

              {/* PRs */}
              <FormField label="PRs Hit Today 🏆" icon={Trophy}>
                <textarea value={form.prs_hit} onChange={e => f('prs_hit', e.target.value)} rows={2}
                  placeholder="e.g. 12 sec full FL, first clean bent arm press, new max pushups..."
                  className={textareaClass} />
              </FormField>

              {/* Strong / Weak */}
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="What Felt Strong?" icon={Zap}>
                  <textarea value={form.strong_points} onChange={e => f('strong_points', e.target.value)} rows={2}
                    placeholder="e.g. FL felt rock solid, shoulder strength up..."
                    className={textareaClass} />
                </FormField>
                <FormField label="What Felt Weak?" icon={Target}>
                  <textarea value={form.weak_points} onChange={e => f('weak_points', e.target.value)} rows={2}
                    placeholder="e.g. Wrists fatigued early, press collapsing..."
                    className={textareaClass} />
                </FormField>
              </div>

              {/* Pain + Questions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Pain or Issues?" icon={AlertTriangle}>
                  <textarea value={form.pain_issues} onChange={e => f('pain_issues', e.target.value)} rows={2}
                    placeholder="e.g. Left wrist clicking on warmup..."
                    className={textareaClass} />
                </FormField>
                <FormField label="Questions for BTCALI" icon={MessageCircle}>
                  <textarea value={form.questions} onChange={e => f('questions', e.target.value)} rows={2}
                    placeholder="Ask your coach anything..."
                    className={textareaClass} />
                </FormField>
              </div>

              {/* Extra notes */}
              <FormField label="Extra Notes" icon={FileText}>
                <textarea value={form.notes} onChange={e => f('notes', e.target.value)} rows={2}
                  placeholder="Anything else worth noting..."
                  className={textareaClass} />
              </FormField>

              {/* Video link */}
              <FormField label="Video Links Sent" icon={Video}>
                <input value={form.video_link} onChange={e => f('video_link', e.target.value)}
                  placeholder="Paste link to your set video (Instagram, YouTube, Google Drive...)"
                  className="w-full bg-transparent text-sm text-foreground font-body outline-none border-b border-border/25 pb-1.5 focus:border-primary/40 transition-colors placeholder:text-muted-foreground/25" />
              </FormField>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm disabled:opacity-60"
                  style={{ boxShadow: '0 0 20px rgba(79,157,255,0.25)' }}>
                  {saving ? 'Saving...' : <><Trophy className="w-4 h-4" /> Save Session</>}
                </motion.button>
                <button onClick={() => setAdding(false)}
                  className="px-5 py-3 rounded-xl glass border border-border/30 text-sm font-heading text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Log list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-7 h-7 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : logs.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-16 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-14 h-14 rounded-2xl gradient-bg-strong flex items-center justify-center mx-auto mb-4"
            style={{ boxShadow: '0 0 24px rgba(79,157,255,0.2)' }}>
            <Flame className="w-6 h-6 text-primary-foreground" />
          </div>
          <p className="font-heading font-bold text-base text-foreground mb-1">No sessions yet</p>
          <p className="text-sm font-body text-muted-foreground/60 max-w-xs mx-auto">
            Every session you log gives your coach more data to push you further.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <SessionCard key={log.id} log={log} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}