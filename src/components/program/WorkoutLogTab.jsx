import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';

const WORKOUT_TYPES = ['Push', 'Pull', 'Weak Day', 'Planche', 'Front Lever', 'Full Body', 'Other'];

const EMPTY_LOG = {
  log_date: new Date().toISOString().split('T')[0],
  workout_type: '',
  difficulty_rating: 7,
  notes: '',
  video_link: '',
};

function LogCard({ log, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const diff = log.difficulty_rating || 0;
  const diffColor = diff <= 4 ? '#4ade80' : diff <= 7 ? '#facc15' : '#f87171';

  return (
    <motion.div layout className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/[0.02]" onClick={() => setExpanded(e => !e)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-heading font-bold text-sm text-foreground">{log.log_date}</span>
            {log.workout_type && (
              <span className="text-xs px-2 py-0.5 rounded-full font-heading font-semibold"
                style={{ background: 'rgba(79,157,255,0.1)', border: '1px solid rgba(79,157,255,0.2)', color: '#93C5FD' }}>
                {log.workout_type}
              </span>
            )}
            {diff > 0 && (
              <span className="text-xs font-heading font-bold" style={{ color: diffColor }}>RPE {diff}/10</span>
            )}
          </div>
          {log.notes && (
            <p className="text-xs font-body text-muted-foreground/60 mt-0.5 truncate">{log.notes}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); onDelete(log.id); }}
            className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="overflow-hidden border-t border-border/20">
            <div className="px-4 py-4 space-y-3 text-sm">
              {log.prs_hit && <Field label="PRs Hit Today 🏆" value={log.prs_hit} />}
              {log.weak_points && <Field label="What Felt Weak?" value={log.weak_points} />}
              {log.pain_issues && <Field label="Pain / Issues" value={log.pain_issues} />}
              {log.questions && <Field label="Questions for BTCALI" value={log.questions} />}
              {log.notes && <Field label="Additional Notes" value={log.notes} />}
              {log.video_link && (
                <div>
                  <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground/50 mb-1">Video Link</p>
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

function Field({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground/50 mb-0.5">{label}</p>
      <p className="text-sm font-body text-foreground/80 leading-relaxed whitespace-pre-wrap">{value}</p>
    </div>
  );
}

export default function WorkoutLogTab({ accessCode, studentName }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_LOG });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.WorkoutLog.filter({ access_code: accessCode }, '-log_date', 50);
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => { if (accessCode) load(); }, [accessCode]);

  const handleSave = async () => {
    if (!form.log_date) return;
    setSaving(true);
    await base44.entities.WorkoutLog.create({ ...form, access_code: accessCode, student_name: studentName });
    setForm({ ...EMPTY_LOG });
    setAdding(false);
    setSaving(false);
    load();
  };

  const handleDelete = async (id) => {
    await base44.entities.WorkoutLog.delete(id);
    load();
  };

  const f = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-1">Workout Log</h2>
          <p className="text-sm font-body text-muted-foreground">{logs.length} sessions logged</p>
        </div>
        <button onClick={() => setAdding(a => !a)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm">
          <Plus className="w-4 h-4" /> {adding ? 'Cancel' : 'Log Session'}
        </button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(79,157,255,0.04)', border: '1px solid rgba(79,157,255,0.15)' }}>
            <h3 className="font-heading font-bold text-base text-foreground mb-4">Session Reflection</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Date *</label>
                <input type="date" value={form.log_date} onChange={e => f('log_date', e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2.5" />
              </div>

              {/* Workout Type */}
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Workout Type</label>
                <select value={form.workout_type} onChange={e => f('workout_type', e.target.value)}
                  className="w-full bg-card text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2.5 appearance-none">
                  <option value="">Select type...</option>
                  {WORKOUT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Rating */}
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-2">
                  Workout Rating: <span className="text-primary">{form.difficulty_rating}/10</span>
                </label>
                <input type="range" min={1} max={10} value={form.difficulty_rating}
                  onChange={e => f('difficulty_rating', Number(e.target.value))}
                  className="w-full accent-blue-500" />
                <div className="flex justify-between text-[10px] text-muted-foreground/40 font-heading mt-1">
                  <span>Easy</span><span>Moderate</span><span>Hard</span>
                </div>
              </div>

              {/* PRs */}
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">PRs Hit Today 🏆</label>
                <textarea value={form.prs_hit || ''} onChange={e => f('prs_hit', e.target.value)}
                  placeholder="e.g. 10 sec FL hold, first muscle up, new max pushups..." rows={2}
                  className="w-full bg-transparent text-sm text-foreground outline-none resize-none border border-border/40 rounded-xl px-3 py-2.5" />
              </div>

              {/* Weak points */}
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">What Felt Weak?</label>
                <textarea value={form.weak_points || ''} onChange={e => f('weak_points', e.target.value)}
                  placeholder="e.g. Shoulders fatigued quickly, FL form breaking..." rows={2}
                  className="w-full bg-transparent text-sm text-foreground outline-none resize-none border border-border/40 rounded-xl px-3 py-2.5" />
              </div>

              {/* Pain */}
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Any Pain or Issues?</label>
                <textarea value={form.pain_issues || ''} onChange={e => f('pain_issues', e.target.value)}
                  placeholder="e.g. Left wrist clicking..." rows={2}
                  className="w-full bg-transparent text-sm text-foreground outline-none resize-none border border-border/40 rounded-xl px-3 py-2.5" />
              </div>

              {/* Questions */}
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Questions for BTCALI</label>
                <textarea value={form.questions || ''} onChange={e => f('questions', e.target.value)}
                  placeholder="Any questions about your program, technique, etc..." rows={2}
                  className="w-full bg-transparent text-sm text-foreground outline-none resize-none border border-border/40 rounded-xl px-3 py-2.5" />
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Additional Notes</label>
                <textarea value={form.notes} onChange={e => f('notes', e.target.value)}
                  placeholder="Anything else you want to note..." rows={2}
                  className="w-full bg-transparent text-sm text-foreground outline-none resize-none border border-border/40 rounded-xl px-3 py-2.5" />
              </div>

              {/* Video link */}
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Video Link (optional)</label>
                <input value={form.video_link} onChange={e => f('video_link', e.target.value)}
                  placeholder="Paste your set video link here..."
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2.5" />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Session'}
              </button>
              <button onClick={() => setAdding(false)}
                className="px-5 py-2.5 rounded-xl glass border border-border/30 text-sm font-heading text-muted-foreground">
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-body text-sm">
          <ClipboardList className="w-8 h-8 mx-auto mb-3 opacity-30" />
          No sessions logged yet. Log your first session above.
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <LogCard key={log.id} log={log} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}