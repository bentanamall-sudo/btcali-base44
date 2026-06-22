import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, GripVertical, ExternalLink, ChevronDown, Check, X, Edit3, Save } from 'lucide-react';
import { getTypeConfig } from '@/lib/exerciseTypeConfig';
import { base44 } from '@/api/base44Client';

const TYPE_OPTIONS = ['warmup','attempt','volume / intensity','volume','technique','basics','conditioning',''];

function TypeBadge({ type }) {
  const cfg = getTypeConfig(type);
  if (!type) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold whitespace-nowrap"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

function Cell({ value, onChange, readOnly, multiline, placeholder, className = '' }) {
  if (readOnly) {
    return (
      <div className={`text-sm font-body leading-relaxed text-foreground/85 ${className}`}
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {value || <span className="text-muted-foreground/30 italic">{placeholder}</span>}
      </div>
    );
  }
  if (multiline) {
    return (
      <textarea value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full bg-transparent text-sm font-body text-foreground/85 outline-none resize-none placeholder:text-muted-foreground/30 leading-relaxed ${className}`}
        style={{ minHeight: 36, fieldSizing: 'content' }}
        rows={1}
      />
    );
  }
  return (
    <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`w-full bg-transparent text-sm font-body text-foreground/85 outline-none placeholder:text-muted-foreground/30 ${className}`}
    />
  );
}

function TypeCell({ value, onChange, readOnly }) {
  const [open, setOpen] = useState(false);
  const cfg = getTypeConfig(value);

  if (readOnly) return <TypeBadge type={value} />;

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-heading font-bold w-full text-left"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
        <span className="flex-1 truncate">{cfg.label || 'Type'}</span>
        <ChevronDown className="w-3 h-3 flex-shrink-0 opacity-60" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 top-full mt-1 z-50 rounded-xl overflow-hidden shadow-xl"
            style={{ background: '#0D1117', border: '1px solid rgba(79,157,255,0.2)', minWidth: 160 }}>
            {TYPE_OPTIONS.map(t => {
              const c = getTypeConfig(t);
              return (
                <button key={t} type="button" onClick={() => { onChange(t); setOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-heading font-bold hover:bg-white/5 text-left transition-colors"
                  style={{ color: c.text || '#6B7280' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot || '#475569' }} />
                  {c.label || '(none)'}
                  {t === value && <Check className="w-3 h-3 ml-auto" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProgramRow({ row, rowIndex, onUpdate, onDelete, onDuplicate, readOnly, dragHandleProps }) {
  const cfg = getTypeConfig(row.exercise_type);

  return (
    <div className="group flex items-start gap-2 px-3 py-3 rounded-xl transition-colors hover:bg-white/[0.025]"
      style={{ borderLeft: `3px solid ${cfg.dot || 'transparent'}` }}>
      {!readOnly && (
        <div {...dragHandleProps} className="mt-1 flex-shrink-0 cursor-grab opacity-0 group-hover:opacity-40 hover:!opacity-70 transition-opacity">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      {/* Row number */}
      <span className="text-[10px] font-heading font-bold text-muted-foreground/30 mt-1 w-5 text-right flex-shrink-0">{rowIndex + 1}</span>

      {/* Activity */}
      <div className="flex-1 min-w-0" style={{ minWidth: 160 }}>
        <Cell value={row.activity} onChange={v => onUpdate('activity', v)} readOnly={readOnly} multiline placeholder="Exercise name..." />
      </div>

      {/* Rep Range */}
      <div className="w-36 flex-shrink-0">
        <Cell value={row.rep_range} onChange={v => onUpdate('rep_range', v)} readOnly={readOnly} multiline placeholder="Rep range..." className="text-muted-foreground/70" />
      </div>

      {/* Type */}
      <div className="w-36 flex-shrink-0">
        <TypeCell value={row.exercise_type} onChange={v => onUpdate('exercise_type', v)} readOnly={readOnly} />
      </div>

      {/* Notes */}
      <div className="flex-1 min-w-0">
        <Cell value={row.notes} onChange={v => onUpdate('notes', v)} readOnly={readOnly} multiline placeholder="Notes..." className="text-muted-foreground/60 text-xs" />
      </div>

      {/* Tutorial */}
      <div className="w-32 flex-shrink-0">
        {readOnly ? (
          row.tutorial_link ? (
            <a href={row.tutorial_link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-body">
              <ExternalLink className="w-3 h-3" /> Tutorial
            </a>
          ) : (
            <span className="text-xs text-muted-foreground/30 italic">—</span>
          )
        ) : (
          <Cell value={row.tutorial_link} onChange={v => onUpdate('tutorial_link', v)} readOnly={false} placeholder="https://..." className="text-primary/60 text-xs" />
        )}
      </div>

      {/* Row actions */}
      {!readOnly && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button type="button" onClick={onDuplicate} title="Duplicate row"
            className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={onDelete} title="Delete row"
            className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function TabHeader({ tab, isActive, onSelect, onRename, onDelete, onDuplicate, readOnly }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(tab.name);

  const commit = () => { onRename(val || tab.name); setEditing(false); };

  if (!readOnly && editing) {
    return (
      <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-primary/10 border border-primary/30">
        <input autoFocus value={val} onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setVal(tab.name); setEditing(false); } }}
          className="bg-transparent text-sm font-heading font-bold text-foreground outline-none w-24" />
        <button onClick={commit} className="text-primary"><Check className="w-3.5 h-3.5" /></button>
        <button onClick={() => { setVal(tab.name); setEditing(false); }} className="text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
      </div>
    );
  }

  return (
    <div className={`group flex items-center gap-1 cursor-pointer rounded-xl px-4 py-2 font-heading font-semibold text-sm transition-all border ${
      isActive ? 'gradient-bg-strong text-primary-foreground border-primary/40' : 'glass border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'
    }`} onClick={onSelect}>
      <span>{tab.name}</span>
      {!readOnly && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 ml-1 transition-opacity">
          <button type="button" onClick={e => { e.stopPropagation(); setEditing(true); }}
            className="w-4 h-4 flex items-center justify-center rounded hover:bg-white/10">
            <Edit3 className="w-2.5 h-2.5" />
          </button>
          <button type="button" onClick={e => { e.stopPropagation(); onDuplicate(); }}
            className="w-4 h-4 flex items-center justify-center rounded hover:bg-white/10">
            <Copy className="w-2.5 h-2.5" />
          </button>
          <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }}
            className="w-4 h-4 flex items-center justify-center rounded hover:bg-destructive/20 text-destructive/70">
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export default function ProgramTable({ program, readOnly = false }) {
  const [tabs, setTabs] = useState(() => (program?.tabs || []).map(t => ({
    ...t,
    id: t.id || genId(),
    rows: (t.rows || []).map(r => ({ ...r, id: r.id || genId() })),
  })));
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragOver, setDragOver] = useState(null);
  const dragRow = useRef(null);

  const activeTab = tabs[activeTabIdx];

  const updateTabs = useCallback((newTabs) => setTabs(newTabs), []);

  const updateRow = (rowId, field, value) => {
    setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : {
      ...t,
      rows: t.rows.map(r => r.id === rowId ? { ...r, [field]: value } : r),
    }));
  };

  const deleteRow = (rowId) => {
    setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : {
      ...t, rows: t.rows.filter(r => r.id !== rowId),
    }));
  };

  const duplicateRow = (rowId) => {
    setTabs(prev => prev.map((t, ti) => {
      if (ti !== activeTabIdx) return t;
      const idx = t.rows.findIndex(r => r.id === rowId);
      const copy = { ...t.rows[idx], id: genId() };
      const newRows = [...t.rows.slice(0, idx + 1), copy, ...t.rows.slice(idx + 1)];
      return { ...t, rows: newRows };
    }));
  };

  const addRow = () => {
    const newRow = { id: genId(), activity: '', rep_range: '', exercise_type: '', notes: '', tutorial_link: '' };
    setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : { ...t, rows: [...t.rows, newRow] }));
  };

  const addTab = () => {
    const newTab = { id: genId(), name: `Tab ${tabs.length + 1}`, rows: [] };
    setTabs(prev => [...prev, newTab]);
    setActiveTabIdx(tabs.length);
  };

  const renameTab = (idx, name) => {
    setTabs(prev => prev.map((t, i) => i === idx ? { ...t, name } : t));
  };

  const deleteTab = (idx) => {
    setTabs(prev => {
      const next = prev.filter((_, i) => i !== idx);
      if (activeTabIdx >= next.length) setActiveTabIdx(Math.max(0, next.length - 1));
      return next;
    });
  };

  const duplicateTab = (idx) => {
    setTabs(prev => {
      const copy = { ...prev[idx], id: genId(), name: prev[idx].name + ' (copy)', rows: prev[idx].rows.map(r => ({ ...r, id: genId() })) };
      const next = [...prev.slice(0, idx + 1), copy, ...prev.slice(idx + 1)];
      setActiveTabIdx(idx + 1);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.StudentProgram.update(program.id, { tabs });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Drag reorder
  const onDragStart = (rowId) => { dragRow.current = rowId; };
  const onDragOver = (e, rowId) => { e.preventDefault(); setDragOver(rowId); };
  const onDrop = (targetId) => {
    if (!dragRow.current || dragRow.current === targetId) { setDragOver(null); return; }
    setTabs(prev => prev.map((t, ti) => {
      if (ti !== activeTabIdx) return t;
      const fromIdx = t.rows.findIndex(r => r.id === dragRow.current);
      const toIdx = t.rows.findIndex(r => r.id === targetId);
      const newRows = [...t.rows];
      const [moved] = newRows.splice(fromIdx, 1);
      newRows.splice(toIdx, 0, moved);
      return { ...t, rows: newRows };
    }));
    setDragOver(null);
    dragRow.current = null;
  };

  if (!tabs.length && readOnly) {
    return (
      <div className="text-center py-16 text-muted-foreground font-body text-sm">No program content yet.</div>
    );
  }

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {tabs.map((t, i) => (
          <TabHeader key={t.id} tab={t} isActive={i === activeTabIdx}
            onSelect={() => setActiveTabIdx(i)}
            onRename={(name) => renameTab(i, name)}
            onDelete={() => deleteTab(i)}
            onDuplicate={() => duplicateTab(i)}
            readOnly={readOnly}
          />
        ))}
        {!readOnly && (
          <button onClick={addTab}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-heading font-semibold text-muted-foreground hover:text-primary glass border border-dashed border-border/40 hover:border-primary/30 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Tab
          </button>
        )}
        {!readOnly && (
          <button onClick={handleSave} disabled={saving}
            className="ml-auto flex items-center gap-2 px-5 py-2 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary disabled:opacity-60">
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Program'}
          </button>
        )}
      </div>

      {/* Column headers */}
      {activeTab && (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Header row */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30 bg-white/[0.02]"
            style={{ paddingLeft: readOnly ? 36 : 52 }}>
            <span className="flex-1 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50">Activity</span>
            <span className="w-36 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50 flex-shrink-0">Rep Range</span>
            <span className="w-36 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50 flex-shrink-0">Type</span>
            <span className="flex-1 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50">Notes</span>
            <span className="w-32 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50 flex-shrink-0">Tutorial</span>
            {!readOnly && <span className="w-14 flex-shrink-0" />}
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/20">
            {activeTab.rows.map((row, rowIndex) => (
              <div key={row.id}
                draggable={!readOnly}
                onDragStart={() => onDragStart(row.id)}
                onDragOver={(e) => onDragOver(e, row.id)}
                onDrop={() => onDrop(row.id)}
                style={{ opacity: dragOver === row.id ? 0.5 : 1, transition: 'opacity 0.15s' }}
              >
                <ProgramRow
                  row={row}
                  rowIndex={rowIndex}
                  readOnly={readOnly}
                  onUpdate={(field, value) => updateRow(row.id, field, value)}
                  onDelete={() => deleteRow(row.id)}
                  onDuplicate={() => duplicateRow(row.id)}
                  dragHandleProps={{
                    draggable: true,
                    onDragStart: () => onDragStart(row.id),
                  }}
                />
              </div>
            ))}
          </div>

          {/* Add row */}
          {!readOnly && (
            <div className="px-3 py-2 border-t border-border/20">
              <button onClick={addRow}
                className="flex items-center gap-2 text-xs font-heading font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-primary/5">
                <Plus className="w-3.5 h-3.5" /> Add Exercise
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}