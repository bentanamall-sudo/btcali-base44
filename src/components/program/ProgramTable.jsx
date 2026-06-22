import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, GripVertical, ExternalLink, ChevronDown, Check, X, Edit3, Save, Link2, Wand2 } from 'lucide-react';
import { getTypeConfig } from '@/lib/exerciseTypeConfig';
import { getTutorialLink, matchTutorial } from '@/lib/tutorialMatcher';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';

const TYPE_OPTIONS = ['warmup', 'attempt', 'volume / intensity', 'volume', 'technique', 'basics', 'conditioning', ''];

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

function TutorialButton({ exerciseName, overrideLink, readOnly, onOverride }) {
  const [showPicker, setShowPicker] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // Determine what link to show
  const matched = overrideLink !== undefined ? null : getTutorialLink(exerciseName);
  const effectiveLink = overrideLink !== undefined ? overrideLink : (matched ? (matched.internal || matched.url) : null);
  const effectiveTitle = overrideLink !== undefined ? 'Tutorial' : (matched ? matched.title : null);

  if (readOnly) {
    if (!effectiveLink) {
      return <span className="text-[10px] font-body text-muted-foreground/30 italic">Tutorial coming soon</span>;
    }
    if (effectiveLink.startsWith('/')) {
      return (
        <Link to={effectiveLink}>
          <span className="inline-flex items-center gap-1 text-[11px] text-primary font-heading font-semibold hover:underline cursor-pointer">
            <ExternalLink className="w-3 h-3" /> {effectiveTitle || 'View Tutorial'}
          </span>
        </Link>
      );
    }
    return (
      <a href={effectiveLink} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[11px] text-primary font-heading font-semibold hover:underline">
        <ExternalLink className="w-3 h-3" /> {effectiveTitle || 'View Tutorial'}
      </a>
    );
  }

  // Admin edit mode
  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {effectiveLink ? (
          <span className="text-[10px] text-primary font-body truncate max-w-[80px]" title={effectiveTitle || effectiveLink}>
            {effectiveTitle || 'Linked'}
          </span>
        ) : (
          <span className="text-[10px] text-muted-foreground/30 italic">No tutorial</span>
        )}
        <button type="button" onClick={() => setShowPicker(p => !p)}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
          <Link2 className="w-3 h-3" />
        </button>
        {effectiveLink && (
          <button type="button" onClick={() => onOverride('')}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {showPicker && (
        <div className="absolute left-0 top-full mt-1 z-50 rounded-xl shadow-xl overflow-hidden"
          style={{ background: '#0D1117', border: '1px solid rgba(79,157,255,0.2)', minWidth: 220, maxHeight: 260, overflowY: 'auto' }}>
          <div className="p-2 border-b border-border/20">
            <input
              autoFocus
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search tutorials or paste URL..."
              className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/40 px-2 py-1"
            />
          </div>
          <div className="p-1">
            <button type="button" onClick={() => { onOverride(searchVal); setShowPicker(false); }}
              className="w-full text-left px-3 py-2 text-xs font-body text-primary hover:bg-primary/10 rounded-lg">
              Set custom URL: {searchVal || '(empty)'}
            </button>
            <button type="button" onClick={() => {
              const auto = getTutorialLink(exerciseName);
              onOverride(undefined); // clear override — use auto
              setShowPicker(false);
            }}
              className="w-full text-left px-3 py-2 text-xs font-body text-muted-foreground hover:bg-white/5 rounded-lg">
              ↺ Reset to auto-match
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TypeCell({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const cfg = getTypeConfig(value);

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-heading font-bold w-full text-left"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
        <span className="flex-1 truncate">{cfg.label || 'Type'}</span>
        <ChevronDown className="w-2.5 h-2.5 flex-shrink-0 opacity-60" />
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
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-heading font-bold hover:bg-white/5 text-left transition-colors"
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

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

// ── MOBILE ROW: card layout ──────────────────────────────────────────────────
function MobileRow({ row, rowIndex, readOnly, onUpdate, onDelete, onDuplicate }) {
  const cfg = getTypeConfig(row.exercise_type);
  const tutLink = row.tutorial_link !== undefined ? row.tutorial_link : null;
  const matched = getTutorialLink(row.activity);
  const effectiveLink = tutLink || (matched ? (matched.internal || matched.url) : null);
  const effectiveTitle = tutLink ? 'Tutorial' : (matched ? matched.title : null);

  return (
    <div className="rounded-xl p-3 mb-2 relative"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid rgba(255,255,255,0.06)`,
        borderLeft: `3px solid ${cfg.dot || 'rgba(255,255,255,0.1)'}`,
      }}>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className="text-sm font-body font-semibold text-foreground leading-snug flex-1">{row.activity || <span className="text-muted-foreground/30 italic">Exercise</span>}</p>
        <TypeBadge type={row.exercise_type} />
      </div>

      {row.rep_range && (
        <p className="text-xs font-body text-primary/70 mb-1">📋 {row.rep_range}</p>
      )}

      {row.notes && (
        <p className="text-xs font-body text-muted-foreground/65 leading-relaxed mb-2 whitespace-pre-wrap">{row.notes}</p>
      )}

      {effectiveLink && (
        effectiveLink.startsWith('/') ? (
          <Link to={effectiveLink}>
            <span className="inline-flex items-center gap-1 text-[11px] text-primary font-heading font-semibold">
              <ExternalLink className="w-3 h-3" /> {effectiveTitle || 'View Tutorial'}
            </span>
          </Link>
        ) : (
          <a href={effectiveLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-primary font-heading font-semibold">
            <ExternalLink className="w-3 h-3" /> {effectiveTitle || 'View Tutorial'}
          </a>
        )
      )}
      {!effectiveLink && (
        <span className="text-[10px] font-body text-muted-foreground/25 italic">Tutorial coming soon</span>
      )}

      {!readOnly && (
        <div className="flex gap-1.5 mt-2 pt-2 border-t border-border/20">
          <button type="button" onClick={onDuplicate}
            className="text-[10px] font-heading text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            <Copy className="w-3 h-3" /> Duplicate
          </button>
          <button type="button" onClick={onDelete}
            className="text-[10px] font-heading text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 ml-2">
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── DESKTOP ROW ──────────────────────────────────────────────────────────────
function DesktopRow({ row, rowIndex, readOnly, onUpdate, onDelete, onDuplicate }) {
  const cfg = getTypeConfig(row.exercise_type);

  return (
    <div className="group flex items-start gap-2 px-3 py-2.5 hover:bg-white/[0.02] transition-colors"
      style={{ borderLeft: `3px solid ${cfg.dot || 'transparent'}` }}>
      {!readOnly && (
        <GripVertical className="w-4 h-4 text-muted-foreground/20 group-hover:text-muted-foreground/40 flex-shrink-0 mt-1 cursor-grab" />
      )}
      <span className="text-[10px] font-heading text-muted-foreground/25 mt-1 w-5 text-right flex-shrink-0">{rowIndex + 1}</span>

      {/* Activity */}
      <div className="flex-1 min-w-0" style={{ minWidth: 140 }}>
        {readOnly ? (
          <p className="text-sm font-body text-foreground/85 leading-snug whitespace-pre-wrap">{row.activity}</p>
        ) : (
          <textarea value={row.activity || ''} onChange={e => onUpdate('activity', e.target.value)}
            placeholder="Exercise name..."
            className="w-full bg-transparent text-sm font-body text-foreground/85 outline-none resize-none placeholder:text-muted-foreground/30 leading-snug"
            rows={1} style={{ fieldSizing: 'content' }} />
        )}
      </div>

      {/* Rep Range */}
      <div className="w-32 flex-shrink-0">
        {readOnly ? (
          <p className="text-xs font-body text-muted-foreground/65 leading-snug whitespace-pre-wrap">{row.rep_range}</p>
        ) : (
          <textarea value={row.rep_range || ''} onChange={e => onUpdate('rep_range', e.target.value)}
            placeholder="Rep range..."
            className="w-full bg-transparent text-xs font-body text-muted-foreground/65 outline-none resize-none placeholder:text-muted-foreground/30 leading-snug"
            rows={1} style={{ fieldSizing: 'content' }} />
        )}
      </div>

      {/* Type */}
      <div className="w-32 flex-shrink-0">
        {readOnly ? (
          <TypeBadge type={row.exercise_type} />
        ) : (
          <TypeCell value={row.exercise_type} onChange={v => onUpdate('exercise_type', v)} />
        )}
      </div>

      {/* Notes */}
      <div className="flex-1 min-w-0">
        {readOnly ? (
          <p className="text-xs font-body text-muted-foreground/60 leading-relaxed whitespace-pre-wrap">{row.notes}</p>
        ) : (
          <textarea value={row.notes || ''} onChange={e => onUpdate('notes', e.target.value)}
            placeholder="Notes..."
            className="w-full bg-transparent text-xs font-body text-muted-foreground/60 outline-none resize-none placeholder:text-muted-foreground/25 leading-relaxed"
            rows={1} style={{ fieldSizing: 'content' }} />
        )}
      </div>

      {/* Tutorial */}
      <div className="w-28 flex-shrink-0">
        <TutorialButton
          exerciseName={row.activity}
          overrideLink={row.tutorial_link && row.tutorial_link !== '' ? row.tutorial_link : undefined}
          readOnly={readOnly}
          onOverride={v => onUpdate('tutorial_link', v)}
        />
      </div>

      {/* Row actions */}
      {!readOnly && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button type="button" onClick={onDuplicate}
            className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Copy className="w-3 h-3" />
          </button>
          <button type="button" onClick={onDelete}
            className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="w-3 h-3" />
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
      <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-primary/10 border border-primary/30 flex-shrink-0">
        <input autoFocus value={val} onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setVal(tab.name); setEditing(false); } }}
          className="bg-transparent text-sm font-heading font-bold text-foreground outline-none w-20" />
        <button onClick={commit} className="text-primary"><Check className="w-3.5 h-3.5" /></button>
        <button onClick={() => { setVal(tab.name); setEditing(false); }} className="text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
      </div>
    );
  }

  return (
    <div className={`group flex items-center gap-1 cursor-pointer rounded-xl px-3 sm:px-4 py-2 font-heading font-semibold text-sm transition-all border flex-shrink-0 whitespace-nowrap ${
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

export default function ProgramTable({ program, readOnly = false }) {
  const [tabs, setTabs] = useState(() => (program?.tabs || []).map(t => ({
    ...t,
    id: t.id || genId(),
    rows: (t.rows || []).map(r => ({ ...r, id: r.id || genId() })),
  })));
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const dragRow = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const activeTab = tabs[activeTabIdx];

  const updateRow = (rowId, field, value) => {
    setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : {
      ...t, rows: t.rows.map(r => r.id === rowId ? { ...r, [field]: value } : r),
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
    setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : {
      ...t, rows: [...t.rows, { id: genId(), activity: '', rep_range: '', exercise_type: '', notes: '', tutorial_link: '' }],
    }));
  };

  const addTab = () => {
    const newTab = { id: genId(), name: `Tab ${tabs.length + 1}`, rows: [] };
    setTabs(prev => [...prev, newTab]);
    setActiveTabIdx(tabs.length);
  };

  const renameTab = (idx, name) => setTabs(prev => prev.map((t, i) => i === idx ? { ...t, name } : t));

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

  const autoMatchAll = () => {
    setTabs(prev => prev.map(t => ({
      ...t,
      rows: t.rows.map(r => ({ ...r, tutorial_link: '' })), // clear overrides so auto-match takes over
    })));
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.StudentProgram.update(program.id, { tabs });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
    return <div className="text-center py-16 text-muted-foreground font-body text-sm">No program content yet.</div>;
  }

  return (
    <div className="w-full">
      {/* Tab bar — scrollable */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
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
          <>
            <button onClick={addTab}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-heading font-semibold text-muted-foreground hover:text-primary glass border border-dashed border-border/40 hover:border-primary/30 transition-all flex-shrink-0">
              <Plus className="w-3.5 h-3.5" /> Tab
            </button>
            <button onClick={autoMatchAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-heading font-semibold text-muted-foreground hover:text-primary glass border border-border/30 hover:border-primary/30 transition-all flex-shrink-0">
              <Wand2 className="w-3.5 h-3.5" /> Auto-Match Tutorials
            </button>
            <button onClick={handleSave} disabled={saving}
              className="ml-auto flex items-center gap-2 px-5 py-2 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm glow-primary disabled:opacity-60 flex-shrink-0">
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Program'}
            </button>
          </>
        )}
      </div>

      {/* ── MOBILE: card layout ─────────────────────────────────── */}
      {activeTab && (
        <>
          <div className="sm:hidden">
            {activeTab.rows.length === 0 && readOnly ? (
              <p className="text-center py-8 text-muted-foreground text-sm">No exercises in this tab.</p>
            ) : (
              activeTab.rows.map((row, rowIndex) => (
                <MobileRow
                  key={row.id}
                  row={row}
                  rowIndex={rowIndex}
                  readOnly={readOnly}
                  onUpdate={(field, val) => updateRow(row.id, field, val)}
                  onDelete={() => deleteRow(row.id)}
                  onDuplicate={() => duplicateRow(row.id)}
                />
              ))
            )}
            {!readOnly && (
              <button onClick={addRow}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-heading font-semibold text-muted-foreground hover:text-primary glass border border-dashed border-border/40 hover:border-primary/30 transition-all mt-2">
                <Plus className="w-4 h-4" /> Add Exercise
              </button>
            )}
          </div>

          {/* ── DESKTOP: spreadsheet layout ─────────────────────── */}
          <div className="hidden sm:block rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Column headers */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30 bg-white/[0.02]"
              style={{ paddingLeft: readOnly ? 28 : 44 }}>
              <span className="flex-1 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50">Activity</span>
              <span className="w-32 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50 flex-shrink-0">Rep Range</span>
              <span className="w-32 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50 flex-shrink-0">Type</span>
              <span className="flex-1 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50">Notes</span>
              <span className="w-28 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/50 flex-shrink-0">Tutorial</span>
              {!readOnly && <span className="w-14 flex-shrink-0" />}
            </div>

            {/* Rows */}
            <div className="divide-y divide-border/15">
              {activeTab.rows.map((row, rowIndex) => (
                <div key={row.id}
                  draggable={!readOnly}
                  onDragStart={() => onDragStart(row.id)}
                  onDragOver={(e) => onDragOver(e, row.id)}
                  onDrop={() => onDrop(row.id)}
                  style={{ opacity: dragOver === row.id ? 0.5 : 1, transition: 'opacity 0.15s' }}
                >
                  <DesktopRow
                    row={row} rowIndex={rowIndex} readOnly={readOnly}
                    onUpdate={(field, val) => updateRow(row.id, field, val)}
                    onDelete={() => deleteRow(row.id)}
                    onDuplicate={() => duplicateRow(row.id)}
                  />
                </div>
              ))}
            </div>

            {!readOnly && (
              <div className="px-3 py-2 border-t border-border/15">
                <button onClick={addRow}
                  className="flex items-center gap-2 text-xs font-heading font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-primary/5">
                  <Plus className="w-3.5 h-3.5" /> Add Exercise
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}