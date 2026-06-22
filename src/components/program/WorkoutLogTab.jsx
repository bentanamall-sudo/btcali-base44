import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';

const DIFFICULTIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EMPTY_LOG = {
  log_date: new Date().toISOString().split('T')[0],
  workout_type: '',
  exercises_completed: '',
  sets_reps: '',
  hold_times: '',
  band_used: '',
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
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02]" onClick={() => setExpanded(e => !e)}>
        <div className="flex-1">
          <div className="flex items-center gap-3">
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
          {log.exercises_completed && (
            <p className="text-xs font-body text-muted-foreground/60 mt-0.5 truncate">{log.exercises_completed}</p>
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
            <div className="px-4 py-4 grid sm:grid-cols-2 gap-3 text-sm">
              {log.sets_reps && <Field label="Sets / Reps" value={log.sets_reps} />}
              {log.hold_times && <Field label="Hold Times" value={log.hold_times} />}
              {log.band_used && <Field label="Band Used" value={log.band_used} />}
              {log.notes && <Field label="Notes" value={log.notes} full />}
              {log.video_link && (
                <div className="sm:col-span-2">
                  <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground/50 mb-1">Video</p>
                  <a href={log.video_link} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline font-body">{log.video_link}</a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Field({ label, value, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-1">Workout Log</h2>
          <p className="text-sm font-body text-muted-foreground">{logs.length} sessions logged</p>
        </div>
        <button onClick={() => setAdding(a => !a)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm">
          <Plus className="w-4 h-4" /> Log Workout
        </button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(79,157,255,0.04)', border: '1px solid rgba(79,157,255,0.15)' }}>
            <h3 className="font-heading font-bold text-base text-foreground mb-4">Log New Workout</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Date *</label>
                <input type="date" value={form.log_date} onChange={e => setForm(f => ({ ...f, log_date: e.target.value }))}
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Workout Type</label>
                <input value={form.workout_type} onChange={e => setForm(f => ({ ...f, workout_type: e.target.value }))}
                  placeholder="Push / Pull / Full Body"
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Exercises Completed</label>
                <textarea value={form.exercises_completed} onChange={e => setForm(f => ({ ...f, exercises_completed: e.target.value }))}
                  placeholder="List exercises you completed..." rows={3}
                  className="w-full bg-transparent text-sm text-foreground outline-none resize-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Sets / Reps</label>
                <input value={form.sets_reps} onChange={e => setForm(f => ({ ...f, sets_reps: e.target.value }))}
                  placeholder="e.g. 3x5, 2x8 sec hold"
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Hold Times</label>
                <input value={form.hold_times} onChange={e => setForm(f => ({ ...f, hold_times: e.target.value }))}
                  placeholder="e.g. 8 sec FL hold"
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Band Used</label>
                <input value={form.band_used} onChange={e => setForm(f => ({ ...f, band_used: e.target.value }))}
                  placeholder="e.g. Red band, Purple band"
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Difficulty (RPE 1-10): {form.difficulty_rating}</label>
                <input type="range" min={1} max={10} value={form.difficulty_rating}
                  onChange={e => setForm(f => ({ ...f, difficulty_rating: Number(e.target.value) }))}
                  className="w-full accent-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="How did it feel? Any wins? Any issues?" rows={2}
                  className="w-full bg-transparent text-sm text-foreground outline-none resize-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Video Link (optional)</label>
                <input value={form.video_link} onChange={e => setForm(f => ({ ...f, video_link: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Log'}
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
          No workout logs yet. Log your first session above.
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