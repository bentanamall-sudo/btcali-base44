import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Copy, Save, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { useAuth } from '@/lib/AuthContext';

const ADMIN_EMAIL = 'ben.tanamall@gmail.com';

const EXERCISE_TYPES = ['warmup', 'attempt', 'volume', 'accessory', 'mobility', 'cooldown', 'optional'];

const TYPE_COLORS = {
  warmup: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300',
  attempt: 'bg-red-500/15 border-red-500/30 text-red-300',
  volume: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
  accessory: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
  mobility: 'bg-green-500/15 border-green-500/30 text-green-300',
  cooldown: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
  optional: 'bg-slate-500/15 border-slate-500/30 text-slate-400',
};

const TYPE_BADGE = {
  warmup: 'bg-yellow-500/20 text-yellow-300',
  attempt: 'bg-red-500/20 text-red-300',
  volume: 'bg-blue-500/20 text-blue-300',
  accessory: 'bg-purple-500/20 text-purple-300',
  mobility: 'bg-green-500/20 text-green-300',
  cooldown: 'bg-cyan-500/20 text-cyan-300',
  optional: 'bg-slate-500/20 text-slate-400',
};

const emptyRow = () => ({
  id: Date.now() + Math.random(),
  activity: '',
  sets_reps: '',
  type: 'warmup',
  rest: '90s',
  notes: '',
  category: '',
});

const DEFAULT_ROWS = [
  { id: 1, activity: 'Wrist Circles', sets_reps: '2x30s', type: 'warmup', rest: '30s', notes: 'Slow controlled circles', category: 'Warmup Block' },
  { id: 2, activity: 'Handstand Kick-Up Practice', sets_reps: '5x3 attempts', type: 'attempt', rest: '60s', notes: 'Focus on alignment', category: 'Main Block' },
  { id: 3, activity: 'Wall Handstand Hold', sets_reps: '4x20s', type: 'volume', rest: '90s', notes: 'Straight body line', category: 'Main Block' },
  { id: 4, activity: 'Pike Pushups', sets_reps: '3x8', type: 'accessory', rest: '60s', notes: 'Full range of motion', category: 'Accessory Block' },
  { id: 5, activity: 'Thoracic Mobility', sets_reps: '2x60s', type: 'mobility', rest: '30s', notes: 'Foam roll + cat-cow', category: 'Cooldown' },
];

export default function ProgramBuilder() {
  const { user } = useAuth();
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [programName, setProgramName] = useState('BTCALI Custom Program');
  const [saved, setSaved] = useState(false);

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard glow hover={false} className="text-center max-w-sm">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Coach Access Only</h2>
          <p className="text-muted-foreground font-body text-sm">This section is restricted to authorized coaches.</p>
        </GlassCard>
      </div>
    );
  }

  const updateRow = (id, field, value) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);

  const deleteRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const duplicateRow = (id) => {
    const idx = rows.findIndex((r) => r.id === id);
    const copy = { ...rows[idx], id: Date.now() + Math.random() };
    const next = [...rows];
    next.splice(idx + 1, 0, copy);
    setRows(next);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Program Builder</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            className="font-heading font-bold text-2xl sm:text-3xl bg-transparent text-foreground outline-none border-b border-border/30 focus:border-primary/50 transition-colors pb-1 flex-1"
          />
          <GlowButton onClick={handleSave}>
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Program'}
          </GlowButton>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {EXERCISE_TYPES.map((t) => (
          <span key={t} className={`text-xs px-3 py-1 rounded-full border font-body capitalize ${TYPE_COLORS[t]}`}>{t}</span>
        ))}
      </div>

      {/* Table - desktop */}
      <div className="hidden md:block">
        <div className="glass-strong rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1.2fr_1.2fr_0.8fr_2fr_1.5fr_auto] gap-3 px-4 py-3 border-b border-border/30 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">
            <span>Activity</span>
            <span>Sets / Reps</span>
            <span>Type</span>
            <span>Rest</span>
            <span>Coach Notes</span>
            <span>Category / Block</span>
            <span></span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/20">
            {rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`grid grid-cols-[2fr_1.2fr_1.2fr_0.8fr_2fr_1.5fr_auto] gap-3 px-4 py-2.5 items-center transition-colors hover:bg-muted/10 border-l-2 ${
                  row.type === 'warmup' ? 'border-l-yellow-500/50' :
                  row.type === 'attempt' ? 'border-l-red-500/50' :
                  row.type === 'volume' ? 'border-l-blue-500/50' :
                  row.type === 'accessory' ? 'border-l-purple-500/50' :
                  row.type === 'mobility' ? 'border-l-green-500/50' :
                  row.type === 'cooldown' ? 'border-l-cyan-500/50' :
                  'border-l-slate-500/50'
                }`}
              >
                <input value={row.activity} onChange={(e) => updateRow(row.id, 'activity', e.target.value)}
                  className="bg-transparent text-sm font-body text-foreground outline-none w-full" placeholder="Exercise name..." />
                <input value={row.sets_reps} onChange={(e) => updateRow(row.id, 'sets_reps', e.target.value)}
                  className="bg-transparent text-sm font-body text-foreground outline-none w-full" placeholder="e.g. 3x8" />
                <select value={row.type} onChange={(e) => updateRow(row.id, 'type', e.target.value)}
                  className={`text-xs font-body rounded-lg px-2 py-1.5 border outline-none cursor-pointer capitalize ${TYPE_COLORS[row.type]} bg-transparent`}>
                  {EXERCISE_TYPES.map((t) => <option key={t} value={t} className="bg-background text-foreground capitalize">{t}</option>)}
                </select>
                <input value={row.rest} onChange={(e) => updateRow(row.id, 'rest', e.target.value)}
                  className="bg-transparent text-sm font-body text-foreground outline-none w-full" placeholder="90s" />
                <input value={row.notes} onChange={(e) => updateRow(row.id, 'notes', e.target.value)}
                  className="bg-transparent text-sm font-body text-muted-foreground outline-none w-full" placeholder="Coach notes..." />
                <input value={row.category} onChange={(e) => updateRow(row.id, 'category', e.target.value)}
                  className="bg-transparent text-sm font-body text-muted-foreground outline-none w-full" placeholder="Block name..." />
                <div className="flex gap-1">
                  <button onClick={() => duplicateRow(row.id)} className="p-1.5 glass rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteRow(row.id)} className="p-1.5 glass rounded-lg text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row, i) => (
          <GlassCard key={row.id} hover={false} className={`border-l-4 ${
            row.type === 'attempt' ? 'border-l-red-500/60' :
            row.type === 'warmup' ? 'border-l-yellow-500/60' :
            row.type === 'volume' ? 'border-l-blue-500/60' :
            row.type === 'accessory' ? 'border-l-purple-500/60' : 'border-l-primary/40'
          }`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <input value={row.activity} onChange={(e) => updateRow(row.id, 'activity', e.target.value)}
                className="bg-transparent font-heading font-semibold text-foreground outline-none flex-1" placeholder="Exercise name..." />
              <span className={`text-xs px-2 py-0.5 rounded-full font-body capitalize flex-shrink-0 ${TYPE_BADGE[row.type]}`}>{row.type}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <input value={row.sets_reps} onChange={(e) => updateRow(row.id, 'sets_reps', e.target.value)}
                className="bg-muted/20 rounded-lg px-3 py-1.5 text-foreground font-body outline-none" placeholder="Sets/Reps" />
              <input value={row.rest} onChange={(e) => updateRow(row.id, 'rest', e.target.value)}
                className="bg-muted/20 rounded-lg px-3 py-1.5 text-foreground font-body outline-none" placeholder="Rest" />
            </div>
            <input value={row.notes} onChange={(e) => updateRow(row.id, 'notes', e.target.value)}
              className="bg-transparent text-xs font-body text-muted-foreground outline-none w-full mb-2" placeholder="Coach notes..." />
            <div className="flex gap-2">
              <button onClick={() => duplicateRow(row.id)} className="p-1.5 glass rounded-lg text-muted-foreground hover:text-foreground">
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteRow(row.id)} className="p-1.5 glass rounded-lg text-muted-foreground hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-4">
        <GlowButton variant="secondary" onClick={addRow}>
          <Plus className="w-4 h-4" /> Add Exercise
        </GlowButton>
      </div>
    </div>
  );
}