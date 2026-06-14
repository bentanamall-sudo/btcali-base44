import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, MessageSquare, CheckCircle, Users, X, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GlassCard from '../components/GlassCard';
import DiagnosticReport from '../components/diagnostic/DiagnosticReport';

const STATUS_COLORS = {
  pending: 'text-amber-400 bg-amber-400/15',
  contacted: 'text-cyan-400 bg-cyan-400/15',
  enrolled: 'text-green-400 bg-green-400/15',
};

const LEVEL_COLORS = {
  Beginner: 'text-slate-400',
  Intermediate: 'text-cyan-400',
  Advanced: 'text-amber-400',
};

export default function AdminDiagnostics() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await base44.entities.AthleteReport.list('-created_date', 200);
        setReports(r || []);
      } catch (err) {
        console.error('Failed to load reports:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = reports.filter(r => {
    const matchSearch = !search || r.full_name?.toLowerCase().includes(search.toLowerCase()) || r.email?.toLowerCase().includes(search.toLowerCase());
    const matchLevel = !filterLevel || r.athlete_level === filterLevel;
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchLevel && matchStatus;
  });

  const openReport = (r) => {
    setSelected(r);
    setNotes(r.coach_notes || '');
  };

  const saveStatus = async (id, status) => {
    await base44.entities.AthleteReport.update(id, { status });
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const [deleteTarget, setDeleteTarget] = useState(null);

  const deleteReport = async (id) => {
    await base44.entities.AthleteReport.delete(id);
    setReports(prev => prev.filter(r => r.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeleteTarget(null);
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    await base44.entities.AthleteReport.update(selected.id, { coach_notes: notes });
    setReports(prev => prev.map(r => r.id === selected.id ? { ...r, coach_notes: notes } : r));
    setSavingNotes(false);
  };

  const goalsMatch = (r, goal) => (r.goals || []).includes(goal);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-3">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Admin</span>
        </div>
        <h1 className="font-heading font-bold text-3xl gradient-text">Athlete Diagnostics</h1>
        <p className="text-muted-foreground font-body text-sm mt-1">{reports.length} total submissions</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="w-full glass rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent"
          />
        </div>
        <select
          value={filterLevel}
          onChange={e => setFilterLevel(e.target.value)}
          className="glass rounded-xl px-4 py-2.5 text-sm text-foreground border border-border/40 focus:outline-none bg-transparent"
        >
          <option value="">All Levels</option>
          {['Beginner','Intermediate','Advanced'].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="glass rounded-xl px-4 py-2.5 text-sm text-foreground border border-border/40 focus:outline-none bg-transparent"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="enrolled">Enrolled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground font-body">No submissions found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard hover={false} className="h-full relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteTarget(r); }}
                  className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all z-10"
                  title="Delete report"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-start justify-between gap-2 mb-3 pl-7">
                  <div>
                    <p className="font-heading font-semibold text-foreground">{r.full_name}</p>
                    <p className="text-xs text-muted-foreground font-body">{r.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-heading font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[r.status] || STATUS_COLORS.pending}`}>{r.status || 'pending'}</span>
                    <span className={`text-xs font-heading font-semibold ${LEVEL_COLORS[r.athlete_level] || ''}`}>{r.athlete_level}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {(r.goals || []).slice(0, 3).map(g => (
                    <span key={g} className="text-xs glass px-2 py-0.5 rounded-full text-foreground/60 font-body">{g}</span>
                  ))}
                  {(r.goals || []).length > 3 && <span className="text-xs text-muted-foreground font-body">+{r.goals.length - 3}</span>}
                </div>
                <p className="text-xs text-muted-foreground font-body mb-1">{r.training_experience} · {r.country}</p>
                {r.created_date && (
                  <p className="text-xs text-muted-foreground/50 font-body mb-4">
                    Submitted: {new Date(r.created_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
                <button
                  onClick={() => openReport(r)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl glass border border-primary/30 text-primary text-sm font-heading font-semibold hover:glow-border transition-all"
                >
                  <Eye className="w-4 h-4" /> View Report
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setDeleteTarget(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative glass-strong rounded-2xl border border-destructive/40 p-6 max-w-sm w-full text-center"
            onClick={e => e.stopPropagation()}
          >
            <Trash2 className="w-8 h-8 text-destructive mx-auto mb-3" />
            <h3 className="font-heading font-bold text-foreground text-lg mb-2">Delete Report?</h3>
            <p className="text-sm font-body text-muted-foreground mb-6">
              Are you sure you want to delete <span className="text-foreground font-semibold">{deleteTarget.full_name}</span>'s report? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl glass border border-border/40 text-foreground font-heading font-semibold text-sm hover:border-primary/30 transition-all">
                Cancel
              </button>
              <button onClick={() => deleteReport(deleteTarget.id)} className="flex-1 py-2.5 rounded-xl bg-destructive/20 border border-destructive/50 text-destructive font-heading font-bold text-sm hover:bg-destructive/30 transition-all">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl h-screen bg-card border-l border-border/30 overflow-y-auto p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground">{selected.full_name}</h2>
                <p className="text-xs text-muted-foreground font-body">{selected.email} · @{selected.instagram}</p>
              </div>
              <button onClick={() => setSelected(null)} className="glass w-8 h-8 rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status change */}
            <div className="flex gap-2 mb-5">
              {['pending','contacted','enrolled'].map(s => (
                <button
                  key={s}
                  onClick={() => saveStatus(selected.id, s)}
                  className={`flex-1 py-2 rounded-xl text-xs font-heading font-semibold capitalize transition-all border ${selected.status === s ? `${STATUS_COLORS[s]} border-current/40` : 'glass border-border/30 text-muted-foreground hover:border-primary/30'}`}
                >
                  {s}
                </button>
              ))}
            </div>

            {selected.athlete_level && selected.strengths && (
              <DiagnosticReport
                data={selected}
                report={{
                  athlete_level: selected.athlete_level,
                  strengths: selected.strengths || [],
                  weaknesses: selected.weaknesses || [],
                  recommended_focus: selected.recommended_focus || '',
                  recommended_programs: selected.recommended_programs || [],
                  athlete_summary: selected.athlete_summary || '',
                  next_steps: selected.next_steps || [],
                }}
              />
            )}

            {/* Coach notes */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <p className="font-heading font-semibold text-sm text-foreground">Coach Notes (private)</p>
              </div>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add private coaching notes..."
                rows={4}
                className="w-full glass rounded-xl px-4 py-3 text-sm text-foreground border border-border/40 focus:border-primary/60 focus:outline-none bg-transparent resize-none mb-2"
              />
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg-strong text-primary-foreground text-sm font-heading font-semibold glow-primary disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" /> {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}