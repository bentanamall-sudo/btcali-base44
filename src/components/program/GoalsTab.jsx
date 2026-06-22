import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Plus, Check, Target, Trash2, Edit3, X, Save } from 'lucide-react';

function GoalCard({ goal, onUpdate, onDelete, isAdmin }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...goal });

  const save = async () => {
    await base44.entities.StudentGoal.update(goal.id, form);
    setEditing(false);
  };

  const toggleComplete = async () => {
    const updated = { ...goal, completed: !goal.completed };
    await base44.entities.StudentGoal.update(goal.id, { completed: updated.completed });
    onUpdate();
  };

  return (
    <motion.div layout className="rounded-2xl p-4 relative overflow-hidden"
      style={{
        background: goal.completed ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${goal.completed ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.07)'}`,
      }}>
      {editing ? (
        <div className="space-y-3">
          <input value={form.goal_text} onChange={e => setForm(f => ({ ...f, goal_text: e.target.value }))}
            className="w-full bg-transparent text-sm font-body text-foreground outline-none border-b border-border/40 pb-1" placeholder="Goal..." />
          <input type="date" value={form.target_date || ''} onChange={e => setForm(f => ({ ...f, target_date: e.target.value }))}
            className="w-full bg-transparent text-xs font-body text-muted-foreground outline-none border border-border/30 rounded-lg px-3 py-1.5" />
          <textarea value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Notes..." rows={2}
            className="w-full bg-transparent text-xs font-body text-muted-foreground outline-none resize-none border border-border/30 rounded-lg px-3 py-2" />
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground font-body">Progress: {form.progress_percent || 0}%</label>
            <input type="range" min={0} max={100} value={form.progress_percent || 0}
              onChange={e => setForm(f => ({ ...f, progress_percent: Number(e.target.value) }))}
              className="flex-1 accent-blue-500" />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-bg-strong text-primary-foreground text-xs font-heading font-bold">
              <Save className="w-3 h-3" /> Save
            </button>
            <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg glass border border-border/30 text-xs font-heading text-muted-foreground">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <button onClick={toggleComplete}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${goal.completed ? 'bg-green-500/20 border-green-500' : 'border-muted-foreground/40 hover:border-primary/60'}`}>
              {goal.completed && <Check className="w-3 h-3 text-green-400" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-body font-semibold leading-snug ${goal.completed ? 'line-through text-muted-foreground/50' : 'text-foreground'}`}>
                {goal.goal_text}
              </p>
              {goal.target_date && (
                <p className="text-xs font-body text-muted-foreground/50 mt-0.5">Target: {goal.target_date}</p>
              )}
              {goal.notes && (
                <p className="text-xs font-body text-muted-foreground/60 mt-1 leading-relaxed">{goal.notes}</p>
              )}
              {goal.progress_percent > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-heading font-bold text-muted-foreground/50 uppercase tracking-wider">Progress</span>
                    <span className="text-[10px] font-heading font-bold text-primary">{goal.progress_percent}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full progress-glow transition-all" style={{ width: `${goal.progress_percent}%` }} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => setEditing(true)}
                className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={async () => { await base44.entities.StudentGoal.delete(goal.id); onUpdate(); }}
                className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function GoalsTab({ accessCode, studentName, isAdmin = false }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ goal_text: '', target_date: '', notes: '', progress_percent: 0 });

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.StudentGoal.filter({ access_code: accessCode });
    setGoals(data);
    setLoading(false);
  };

  useEffect(() => { if (accessCode) load(); }, [accessCode]);

  const handleAdd = async () => {
    if (!newGoal.goal_text.trim()) return;
    await base44.entities.StudentGoal.create({ ...newGoal, access_code: accessCode, student_name: studentName });
    setNewGoal({ goal_text: '', target_date: '', notes: '', progress_percent: 0 });
    setAdding(false);
    load();
  };

  const completed = goals.filter(g => g.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-1">Goals & Progress</h2>
          <p className="text-sm font-body text-muted-foreground">{completed}/{goals.length} goals completed</p>
        </div>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm">
          <Plus className="w-4 h-4" /> Add Goal
        </button>
      </div>

      {/* Progress bar */}
      {goals.length > 0 && (
        <div className="mb-6">
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full progress-glow transition-all" style={{ width: `${(completed / goals.length) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Add goal form */}
      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(79,157,255,0.05)', border: '1px solid rgba(79,157,255,0.2)' }}>
            <div className="space-y-3">
              <input value={newGoal.goal_text} onChange={e => setNewGoal(f => ({ ...f, goal_text: e.target.value }))}
                placeholder="What's your goal? e.g. Achieve freestanding handstand"
                className="w-full bg-transparent text-sm font-body text-foreground outline-none border-b border-border/40 pb-1.5" />
              <input type="date" value={newGoal.target_date} onChange={e => setNewGoal(f => ({ ...f, target_date: e.target.value }))}
                className="bg-transparent text-xs font-body text-muted-foreground outline-none border border-border/30 rounded-lg px-3 py-1.5" />
              <textarea value={newGoal.notes} onChange={e => setNewGoal(f => ({ ...f, notes: e.target.value }))}
                placeholder="Notes..." rows={2}
                className="w-full bg-transparent text-xs font-body text-muted-foreground outline-none resize-none border border-border/30 rounded-lg px-3 py-2" />
              <div className="flex gap-2">
                <button onClick={handleAdd}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg-strong text-primary-foreground text-sm font-heading font-bold">
                  <Target className="w-3.5 h-3.5" /> Add Goal
                </button>
                <button onClick={() => setAdding(false)}
                  className="px-4 py-2 rounded-xl glass border border-border/30 text-sm font-heading text-muted-foreground">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : goals.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-body text-sm">
          <Target className="w-8 h-8 mx-auto mb-3 opacity-30" />
          No goals set yet. Add your first goal above.
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {goals.map(g => (
              <motion.div key={g.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GoalCard goal={g} onUpdate={load} isAdmin={isAdmin} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}