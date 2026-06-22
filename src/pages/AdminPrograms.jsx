import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Search, Plus, Users, ArrowLeft, Copy, Trash2, UserPlus } from 'lucide-react';
import ProgramTable from '@/components/program/ProgramTable';
import GoalsTab from '@/components/program/GoalsTab';
import WorkoutLogTab from '@/components/program/WorkoutLogTab';

const STUDENT_TABS = [
  { id: 'program', label: 'Program' },
  { id: 'goals', label: 'Goals' },
  { id: 'log', label: 'Workout Log' },
];

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

function StudentCard({ student, onSelect }) {
  const hasTabs = student.tabs && student.tabs.length > 0;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => onSelect(student)}
      className="rounded-2xl p-4 cursor-pointer transition-all"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-base text-foreground">{student.student_name}</h3>
          <p className="text-xs font-body text-muted-foreground font-mono mt-0.5">{student.access_code}</p>
        </div>
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full ${hasTabs ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-muted-foreground bg-white/5 border border-border/20'}`}>
          {hasTabs ? `${student.tabs.length} tabs` : 'No program'}
        </span>
      </div>
      {hasTabs && (
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {student.tabs.map(t => (
            <span key={t.id} className="text-[10px] font-heading px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.15)', color: '#93C5FD' }}>
              {t.name}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CreateStudentModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || !code.trim()) return;
    setCreating(true);
    const student = await base44.entities.StudentProgram.create({
      student_name: name.trim(),
      access_code: code.toUpperCase().trim(),
      tabs: [],
    });
    setCreating(false);
    onCreate(student);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-6 w-full max-w-sm" style={{ background: '#0D1117', border: '1px solid rgba(79,157,255,0.2)' }}>
        <h2 className="font-heading font-bold text-lg text-foreground mb-4">Create New Student</h2>
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Student Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Lennon"
              className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2" />
          </div>
          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">Access Code</label>
            <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="e.g. NEWSTUDENT100"
              className="w-full bg-transparent text-sm text-foreground outline-none border border-border/40 rounded-xl px-3 py-2 font-mono uppercase" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCreate} disabled={creating || !name.trim() || !code.trim()}
            className="flex-1 py-2.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm disabled:opacity-50">
            {creating ? 'Creating...' : 'Create Student'}
          </button>
          <button onClick={onClose}
            className="px-4 py-2.5 rounded-xl glass border border-border/30 text-muted-foreground font-heading font-semibold text-sm">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminPrograms() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [activeSection, setActiveSection] = useState('program');
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      // Use backend function (service role) to bypass RLS on live site
      const res = await Promise.race([
        base44.functions.invoke('getStudentPrograms', { admin_code: 'BTCALI999' }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000)),
      ]);
      setStudents(res?.data?.students || []);
    } catch (err) {
      console.error('AdminPrograms load error:', err);
      setStudents([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = students.filter(s =>
    s.student_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.access_code?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDuplicate = async (student) => {
    const newCode = prompt('Enter access code for the duplicate student:');
    if (!newCode) return;
    const newName = prompt('Enter name for the duplicate student:');
    if (!newName) return;
    const copy = {
      student_name: newName.trim(),
      access_code: newCode.toUpperCase().trim(),
      tabs: (student.tabs || []).map(t => ({ ...t, id: genId(), rows: (t.rows || []).map(r => ({ ...r, id: genId() })) })),
    };
    // Direct entity create is OK here — admin is authenticated via Base44 auth in production
    await base44.entities.StudentProgram.create(copy);
    load();
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`Delete ${student.student_name}'s program? This cannot be undone.`)) return;
    await base44.entities.StudentProgram.delete(student.id);
    if (selected?.id === student.id) setSelected(null);
    load();
  };

  if (selected) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-border/30 text-muted-foreground hover:text-foreground font-heading font-semibold text-sm transition-all">
            <ArrowLeft className="w-4 h-4" /> All Students
          </button>
          <div className="flex-1">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {selected.student_name} <span className="text-muted-foreground/40 font-mono text-lg">— {selected.access_code}</span>
            </h1>
          </div>
          <button onClick={() => handleDuplicate(selected)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 font-heading font-semibold text-sm transition-all">
            <Copy className="w-3.5 h-3.5" /> Duplicate to...
          </button>
          <button onClick={() => handleDelete(selected)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-destructive/20 text-destructive/70 hover:text-destructive hover:border-destructive/40 font-heading font-semibold text-sm transition-all">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-6">
          {STUDENT_TABS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`px-4 py-2 rounded-xl font-heading font-semibold text-sm transition-all border ${
                activeSection === s.id
                  ? 'gradient-bg-strong text-primary-foreground border-primary/40'
                  : 'glass border-border/30 text-muted-foreground hover:border-primary/30'
              }`}>
              {s.label}
            </button>
          ))}
        </div>

        {activeSection === 'program' && (
          selected.tabs && selected.tabs.length === 0 ? (
            <div className="text-center py-12 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-body text-muted-foreground text-sm mb-4">No program yet — start building below.</p>
              <ProgramTable program={selected} readOnly={false} />
            </div>
          ) : (
            <ProgramTable program={selected} readOnly={false} />
          )
        )}
        {activeSection === 'goals' && (
          <GoalsTab accessCode={selected.access_code} studentName={selected.student_name} isAdmin />
        )}
        {activeSection === 'log' && (
          <WorkoutLogTab accessCode={selected.access_code} studentName={selected.student_name} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-primary/60">Admin</span>
          </div>
          <h1 className="font-heading font-black text-3xl text-foreground">
            Program <span className="gradient-text">Manager</span>
          </h1>
          <p className="text-sm font-body text-muted-foreground mt-1">{students.length} students registered</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary">
          <UserPlus className="w-4 h-4" /> New Student
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or access code..."
          className="w-full bg-transparent glass border border-border/30 rounded-xl pl-10 pr-4 py-3 text-sm font-body text-foreground outline-none focus:border-primary/40 transition-colors" />
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(s => (
            <div key={s.id} className="relative group">
              <StudentCard student={s} onSelect={setSelected} />
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={e => { e.stopPropagation(); handleDuplicate(s); }}
                  className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary bg-background/80 backdrop-blur-sm border border-border/30">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button onClick={e => { e.stopPropagation(); handleDelete(s); }}
                  className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive bg-background/80 backdrop-blur-sm border border-border/30">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground font-body text-sm">
              No students found matching "{search}"
            </div>
          )}
        </div>
      )}

      {showCreate && (
        <CreateStudentModal
          onClose={() => setShowCreate(false)}
          onCreate={(s) => { setStudents(prev => [s, ...prev]); setSelected(s); }}
        />
      )}
    </div>
  );
}