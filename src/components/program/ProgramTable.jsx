import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, GripVertical, ExternalLink, ChevronDown, Check, X, Edit3, Save, Link2, Wand2, PlayCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { getTypeConfig } from '@/lib/exerciseTypeConfig';
import { getTutorialMatch } from '@/lib/tutorialMatcher';
import { base44 } from '@/api/base44Client';

// ── Inline Tutorial Modal (opens Skill Library video directly) ──────────────
function TutorialModal({ match, onClose }) {
  // Try to find the tutorial in CATEGORY_DATA — we need the videoId
  // We pass it in directly via the match object (enriched below)
  if (!match) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}>
        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="w-full max-w-sm rounded-2xl overflow-hidden border border-primary/30"
          style={{ background: 'hsl(var(--card))' }}
          onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/30">
            <p className="font-heading font-bold text-sm text-foreground">{match.title}</p>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/40 transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          {match.videoId ? (
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${match.videoId}?autoplay=1&rel=0`}
                title={match.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground font-body">Tutorial coming soon.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Enrich a match with its videoId from the Skill Library CATEGORY_DATA
// We import a flat lookup table here so we don't need to import the whole SkillLibraryCategory
const VIDEO_LOOKUP = {
  // handstand-foundations
  'hf-wrist-warmup': 'A1YPZdLyXPI',
  'hf-lsit-entry': 'JV2QPQFlpZQ',
  'hf-bent-knee-pike': '5HRq7xpcBkw',
  'hf-pike-pushup': 'PSHF4b99J0Q',
  'hf-where-to-look': 'pgKP61v2kz8',
  'hf-kickup': '8GLA_c0jueA',
  'hf-bail': 'rGoEHcIPeFY',
  'hf-decline-pike': '3OfR0Kd1u-Q',
  'hf-toe-taps': 'yDYk7w7uqTA',
  'hf-floating-pike': 'AfLQJ-cCF2I',
  // master-basics
  'core-lsit-entry': 'JV2QPQFlpZQ',
  'pull-form': 'DzU28xYSCjU',
  'push-dip-form': 'qG4dnoWpr94',
  'push-bent-knee-pike': '5HRq7xpcBkw',
  'push-pike-pushup': 'PSHF4b99J0Q',
  // planche-conditioning
  'pc-wrist-warmup': 'A1YPZdLyXPI',
  'pc-scap-protract': 'QppuGF94PLc',
  'pc-scap-to-normal': 'D_8_yzV6Jdk',
  'pc-lean': '-cGOxgIccqU',
  'pc-lean-press': 'pAn5RJZCvR0',
  'pc-zanettis': 'IsiqiYLuVdA',
  'pc-pbars-grip': 'boazomcMT7c',
  'pc-dolphin-press': 'SWJn6e7Kc50',
  // front-lever
  'fl-hollow-body': 'DQu4UNPY8BU',
  'fl-activations': 'QVqbRvkFlx0',
  'fl-tuck': '08DECfSNf8Y',
  'fl-adv-tuck': '9FBurAs5q58',
  'fl-full-banded-entry': 'xeNxL7ygiHg',
  'fl-band-raises': 'aku6BVmhuck',
  'fl-hip-thrust': 'IEbuq-vlXgs',
  'fl-inv-deadlift': 'VT77Hlo1uoM',
  // l-sit-to-handstand
  'lshs-bent-arm-raise': 'jUYGq7sBxI0',
  'lshs-bent-arm-cues': 'jD7JOlacCgg',
  'lshs-bent-arm-tuck-pos': 'WRflJHXBIrA',
  'lshs-bent-arm-quick': '6MpY6iLDtQM',
  'lshs-momentum-press': 'cIZRmKLMlQ4',
  'lshs-momentum-press-exp': 'yLn96dEdHWE',
  'lshs-clean-press': 'BouVt_LNI7k',
  'lshs-bent-arm-raise-prog': 'qAuVf2KGFUI',
  'lshs-indepth-press': 'UO7pBH4FnOI',
  'lshs-lsit-to-hs': '8SOeZroRebI',
  'lshs-wrist-warmup': 'A1YPZdLyXPI',
  'lshs-lsit-entry': 'JV2QPQFlpZQ',
  'lshs-bent-knee-pike': '5HRq7xpcBkw',
  'lshs-pike-pushup': 'PSHF4b99J0Q',
  'lshs-where-to-look': 'pgKP61v2kz8',
  'lshs-kickup': '8GLA_c0jueA',
  'lshs-bail': 'rGoEHcIPeFY',
  'lshs-decline-pike': '3OfR0Kd1u-Q',
  'lshs-toe-taps': 'yDYk7w7uqTA',
  'lshs-floating-pike': 'AfLQJ-cCF2I',
  // handstand-pushups
  'hspu-chest-wall': 'GwHgAPqMMq0',
};

function enrichMatch(match) {
  if (!match) return null;
  return { ...match, videoId: VIDEO_LOOKUP[match.tutorialId] || null };
}

// ── Type Badge ───────────────────────────────────────────────────────────────
function TypeBadge({ type }) {
  const cfg = getTypeConfig(type);
  if (!type) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold whitespace-nowrap flex-shrink-0"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

// ── Type Selector (admin) ────────────────────────────────────────────────────
const TYPE_OPTIONS = ['warmup', 'attempt', 'volume / intensity', 'volume', 'technique', 'basics', 'conditioning', ''];

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
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-heading font-bold hover:bg-white/5 text-left"
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

// ── Tutorial Button ──────────────────────────────────────────────────────────
function TutorialButton({ exerciseName, overrideLink, readOnly, onOverride, onOpenModal }) {
  const [showPicker, setShowPicker] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const autoMatch = enrichMatch(getTutorialMatch(exerciseName));
  const hasOverride = overrideLink !== undefined && overrideLink !== '';
  const effectiveTitle = hasOverride ? 'Tutorial' : (autoMatch ? autoMatch.title : null);
  const hasLink = hasOverride || !!autoMatch;

  if (readOnly) {
    if (!hasLink) return <span className="text-[10px] font-body text-muted-foreground/30 italic">Coming soon</span>;
    if (hasOverride) {
      return (
        <a href={overrideLink} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-heading font-semibold transition-colors"
          style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.2)', color: '#93C5FD' }}>
          <PlayCircle className="w-3 h-3" /> Tutorial
        </a>
      );
    }
    // Auto-matched → open inline modal
    return (
      <button onClick={() => onOpenModal(autoMatch)} type="button"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-heading font-semibold transition-all hover:scale-105"
        style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.2)', color: '#93C5FD' }}>
        <PlayCircle className="w-3 h-3" /> {effectiveTitle ? effectiveTitle.length > 18 ? 'Watch' : effectiveTitle : 'Watch'}
      </button>
    );
  }

  // Admin edit mode
  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {hasLink ? (
          <span className="text-[10px] text-primary font-body truncate max-w-[80px]">
            {hasOverride ? 'Custom' : (autoMatch?.title?.split(' ').slice(0, 2).join(' ') || 'Linked')}
          </span>
        ) : (
          <span className="text-[10px] text-muted-foreground/30 italic">Auto</span>
        )}
        <button type="button" onClick={() => setShowPicker(p => !p)}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
          <Link2 className="w-3 h-3" />
        </button>
        {hasOverride && (
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
            <input autoFocus value={searchVal} onChange={e => setSearchVal(e.target.value)}
              placeholder="Paste custom URL or leave blank..."
              className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/40 px-2 py-1" />
          </div>
          <div className="p-1">
            {autoMatch && (
              <div className="px-3 py-2 text-[10px] text-muted-foreground/60 font-body border-b border-border/20">
                Auto-match: <span className="text-primary">{autoMatch.title}</span>
              </div>
            )}
            <button type="button" onClick={() => { onOverride(searchVal); setShowPicker(false); }}
              className="w-full text-left px-3 py-2 text-xs font-body text-primary hover:bg-primary/10 rounded-lg">
              Set custom URL: {searchVal || '(empty)'}
            </button>
            <button type="button" onClick={() => { onOverride(''); setShowPicker(false); }}
              className="w-full text-left px-3 py-2 text-xs font-body text-muted-foreground hover:bg-white/5 rounded-lg">
              ↺ Reset to auto-match
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

// ── MOBILE ROW ───────────────────────────────────────────────────────────────
function MobileRow({ row, rowIndex, readOnly, onUpdate, onDelete, onDuplicate, onOpenModal, checked, onCheck }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = getTypeConfig(row.exercise_type);
  const hasOverride = row.tutorial_link && row.tutorial_link !== '';
  const autoMatch = enrichMatch(getTutorialMatch(row.activity));
  const hasLink = hasOverride || !!autoMatch;

  return (
    <motion.div layout className="rounded-xl mb-2 overflow-hidden relative"
      style={{
        background: checked ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${checked ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)'}`,
        borderLeft: `3px solid ${cfg.dot || 'rgba(255,255,255,0.1)'}`,
      }}>
      {/* Header row */}
      <div className="flex items-center gap-2.5 px-3 pt-3 pb-2">
        {readOnly && (
          <button onClick={onCheck} type="button" className="flex-shrink-0">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'bg-green-500/20 border-green-500' : 'border-muted-foreground/30 hover:border-primary/60'}`}>
              {checked && <Check className="w-2.5 h-2.5 text-green-400" />}
            </div>
          </button>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-sm font-body font-semibold leading-snug ${checked ? 'line-through text-muted-foreground/50' : 'text-foreground'}`}>
              {row.activity || <span className="text-muted-foreground/30 italic">Exercise</span>}
            </p>
            <TypeBadge type={row.exercise_type} />
          </div>
          {row.rep_range && (
            <p className="text-xs font-body text-primary/70 mt-0.5">{row.rep_range}</p>
          )}
        </div>
        <button onClick={() => setExpanded(e => !e)} type="button" className="flex-shrink-0 p-1">
          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-3 pb-3 space-y-2.5">
              {row.notes && (
                <p className="text-xs font-body text-muted-foreground/70 leading-relaxed whitespace-pre-wrap">{row.notes}</p>
              )}
              {/* Tutorial */}
              {hasLink && (
                hasOverride ? (
                  <a href={row.tutorial_link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold"
                    style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.2)', color: '#93C5FD' }}>
                    <PlayCircle className="w-3.5 h-3.5" /> Tutorial
                  </a>
                ) : (
                  <button onClick={() => onOpenModal(autoMatch)} type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all hover:scale-105"
                    style={{ background: 'rgba(79,157,255,0.08)', border: '1px solid rgba(79,157,255,0.2)', color: '#93C5FD' }}>
                    <PlayCircle className="w-3.5 h-3.5" /> {autoMatch?.title?.length > 24 ? 'Watch Tutorial' : autoMatch?.title}
                  </button>
                )
              )}
              {!hasLink && <span className="text-[10px] font-body text-muted-foreground/25 italic">Tutorial coming soon</span>}

              {!readOnly && (
                <div className="flex gap-2 pt-1 border-t border-border/15">
                  <button type="button" onClick={onDuplicate} className="text-[10px] font-heading text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <Copy className="w-3 h-3" /> Duplicate
                  </button>
                  <button type="button" onClick={onDelete} className="text-[10px] font-heading text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 ml-2">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── DESKTOP ROW ──────────────────────────────────────────────────────────────
function DesktopRow({ row, rowIndex, readOnly, onUpdate, onDelete, onDuplicate, onOpenModal, checked, onCheck }) {
  const cfg = getTypeConfig(row.exercise_type);
  const hasOverride = row.tutorial_link && row.tutorial_link !== '';
  const autoMatch = enrichMatch(getTutorialMatch(row.activity));

  return (
    <div className="group flex items-start gap-2 px-3 py-2.5 hover:bg-white/[0.025] transition-colors"
      style={{ borderLeft: `3px solid ${cfg.dot || 'transparent'}` }}>
      {readOnly ? (
        <button onClick={onCheck} type="button" className="mt-0.5 flex-shrink-0">
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'bg-green-500/20 border-green-400' : 'border-muted-foreground/25 group-hover:border-primary/50'}`}>
            {checked && <Check className="w-2.5 h-2.5 text-green-400" />}
          </div>
        </button>
      ) : (
        <GripVertical className="w-4 h-4 text-muted-foreground/20 group-hover:text-muted-foreground/40 flex-shrink-0 mt-1 cursor-grab" />
      )}
      <span className="text-[10px] font-heading text-muted-foreground/25 mt-1 w-5 text-right flex-shrink-0">{rowIndex + 1}</span>

      {/* Activity */}
      <div className="flex-1 min-w-0" style={{ minWidth: 140 }}>
        {readOnly ? (
          <p className={`text-sm font-body leading-snug ${checked ? 'line-through text-muted-foreground/40' : 'text-foreground/85'}`}>{row.activity}</p>
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
          <p className="text-xs font-body text-primary/65 leading-snug whitespace-pre-wrap font-semibold">{row.rep_range}</p>
        ) : (
          <textarea value={row.rep_range || ''} onChange={e => onUpdate('rep_range', e.target.value)}
            placeholder="Rep range..."
            className="w-full bg-transparent text-xs font-body text-muted-foreground/65 outline-none resize-none placeholder:text-muted-foreground/30 leading-snug"
            rows={1} style={{ fieldSizing: 'content' }} />
        )}
      </div>

      {/* Type */}
      <div className="w-32 flex-shrink-0">
        {readOnly ? <TypeBadge type={row.exercise_type} /> : <TypeCell value={row.exercise_type} onChange={v => onUpdate('exercise_type', v)} />}
      </div>

      {/* Notes */}
      <div className="flex-1 min-w-0">
        {readOnly ? (
          <p className="text-xs font-body text-muted-foreground/55 leading-relaxed whitespace-pre-wrap">{row.notes}</p>
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
          overrideLink={hasOverride ? row.tutorial_link : undefined}
          readOnly={readOnly}
          onOverride={v => onUpdate('tutorial_link', v)}
          onOpenModal={onOpenModal}
        />
      </div>

      {!readOnly && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button type="button" onClick={onDuplicate} className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Copy className="w-3 h-3" />
          </button>
          <button type="button" onClick={onDelete} className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Tab Header ───────────────────────────────────────────────────────────────
function TabHeader({ tab, isActive, onSelect, onRename, onDelete, onDuplicate, readOnly }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(tab.name);
  const commit = () => { onRename(val || tab.name); setEditing(false); };

  if (!readOnly && editing) {
    return (
      <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-primary/10 border border-primary/30 flex-shrink-0">
        <input autoFocus value={val} onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setVal(tab.name); setEditing(false); } }}
          className="bg-transparent text-sm font-heading font-bold text-foreground outline-none w-24" />
        <button onClick={commit} className="text-primary"><Check className="w-3.5 h-3.5" /></button>
        <button onClick={() => { setVal(tab.name); setEditing(false); }} className="text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
      </div>
    );
  }

  return (
    <div className={`group flex items-center gap-1 cursor-pointer rounded-xl px-3 sm:px-4 py-2.5 font-heading font-semibold text-sm transition-all border flex-shrink-0 whitespace-nowrap ${
      isActive ? 'gradient-bg-strong text-primary-foreground border-primary/40' : 'glass border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'
    }`} onClick={onSelect}>
      <span>{tab.name}</span>
      {!readOnly && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 ml-1 transition-opacity">
          <button type="button" onClick={e => { e.stopPropagation(); setEditing(true); }} className="w-4 h-4 flex items-center justify-center rounded hover:bg-white/10"><Edit3 className="w-2.5 h-2.5" /></button>
          <button type="button" onClick={e => { e.stopPropagation(); onDuplicate(); }} className="w-4 h-4 flex items-center justify-center rounded hover:bg-white/10"><Copy className="w-2.5 h-2.5" /></button>
          <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }} className="w-4 h-4 flex items-center justify-center rounded hover:bg-destructive/20 text-destructive/70"><X className="w-2.5 h-2.5" /></button>
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ProgramTable({ program, readOnly = false }) {
  const [tabs, setTabs] = useState(() => (program?.tabs || []).map(t => ({
    ...t, id: t.id || genId(),
    rows: (t.rows || []).map(r => ({ ...r, id: r.id || genId() })),
  })));
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState({}); // rowId → bool (student completion checkmarks)
  const [activeTutorial, setActiveTutorial] = useState(null); // enriched match to show in modal
  const dragRow = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const activeTab = tabs[activeTabIdx];

  // Track completion per tab
  const tabChecked = activeTab ? activeTab.rows.filter(r => checked[r.id]).length : 0;
  const tabTotal = activeTab ? activeTab.rows.length : 0;

  const updateRow = (rowId, field, value) => setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : {
    ...t, rows: t.rows.map(r => r.id === rowId ? { ...r, [field]: value } : r),
  }));
  const deleteRow = (rowId) => setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : { ...t, rows: t.rows.filter(r => r.id !== rowId) }));
  const duplicateRow = (rowId) => setTabs(prev => prev.map((t, ti) => {
    if (ti !== activeTabIdx) return t;
    const idx = t.rows.findIndex(r => r.id === rowId);
    const copy = { ...t.rows[idx], id: genId() };
    return { ...t, rows: [...t.rows.slice(0, idx + 1), copy, ...t.rows.slice(idx + 1)] };
  }));
  const addRow = () => setTabs(prev => prev.map((t, ti) => ti !== activeTabIdx ? t : {
    ...t, rows: [...t.rows, { id: genId(), activity: '', rep_range: '', exercise_type: '', notes: '', tutorial_link: '' }],
  }));
  const addTab = () => { const newTab = { id: genId(), name: `Tab ${tabs.length + 1}`, rows: [] }; setTabs(prev => [...prev, newTab]); setActiveTabIdx(tabs.length); };
  const renameTab = (idx, name) => setTabs(prev => prev.map((t, i) => i === idx ? { ...t, name } : t));
  const deleteTab = (idx) => { setTabs(prev => { const next = prev.filter((_, i) => i !== idx); if (activeTabIdx >= next.length) setActiveTabIdx(Math.max(0, next.length - 1)); return next; }); };
  const duplicateTab = (idx) => { setTabs(prev => { const copy = { ...prev[idx], id: genId(), name: prev[idx].name + ' (copy)', rows: prev[idx].rows.map(r => ({ ...r, id: genId() })) }; const next = [...prev.slice(0, idx + 1), copy, ...prev.slice(idx + 1)]; setActiveTabIdx(idx + 1); return next; }); };
  const autoMatchAll = () => setTabs(prev => prev.map(t => ({ ...t, rows: t.rows.map(r => ({ ...r, tutorial_link: '' })) })));
  const handleSave = async () => { setSaving(true); await base44.entities.StudentProgram.update(program.id, { tabs }); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };

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
    setDragOver(null); dragRow.current = null;
  };

  const toggleCheck = (rowId) => setChecked(prev => ({ ...prev, [rowId]: !prev[rowId] }));

  if (!tabs.length && readOnly) return <div className="text-center py-16 text-muted-foreground font-body text-sm">No program content yet.</div>;

  return (
    <div className="w-full">
      {/* Tutorial Modal */}
      {activeTutorial && <TutorialModal match={activeTutorial} onClose={() => setActiveTutorial(null)} />}

      {/* Tab bar */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {tabs.map((t, i) => (
          <TabHeader key={t.id} tab={t} isActive={i === activeTabIdx}
            onSelect={() => setActiveTabIdx(i)}
            onRename={name => renameTab(i, name)}
            onDelete={() => deleteTab(i)}
            onDuplicate={() => duplicateTab(i)}
            readOnly={readOnly} />
        ))}
        {!readOnly && (
          <>
            <button onClick={addTab} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-heading font-semibold text-muted-foreground hover:text-primary glass border border-dashed border-border/40 hover:border-primary/30 transition-all flex-shrink-0">
              <Plus className="w-3.5 h-3.5" /> Tab
            </button>
            <button onClick={autoMatchAll} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-heading font-semibold text-muted-foreground hover:text-primary glass border border-border/30 hover:border-primary/30 transition-all flex-shrink-0">
              <Wand2 className="w-3.5 h-3.5" /> Auto-Match
            </button>
            <button onClick={handleSave} disabled={saving}
              className="ml-auto flex items-center gap-2 px-5 py-2 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm disabled:opacity-60 flex-shrink-0"
              style={{ boxShadow: '0 0 16px rgba(79,157,255,0.2)' }}>
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Program'}
            </button>
          </>
        )}
      </div>

      {/* Session progress bar (read-only only) */}
      {readOnly && tabTotal > 0 && (
        <div className="mb-4 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-muted-foreground/50">Session Progress</span>
            <span className="text-[11px] font-heading font-bold text-primary">{tabChecked}/{tabTotal}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div animate={{ width: `${(tabChecked / tabTotal) * 100}%` }} transition={{ ease: 'easeOut', duration: 0.4 }}
              className="h-full rounded-full progress-glow" />
          </div>
        </div>
      )}

      {activeTab && (
        <>
          {/* MOBILE */}
          <div className="sm:hidden">
            {activeTab.rows.length === 0 && readOnly ? (
              <p className="text-center py-8 text-muted-foreground text-sm">No exercises in this tab.</p>
            ) : (
              activeTab.rows.map((row, rowIndex) => (
                <MobileRow key={row.id} row={row} rowIndex={rowIndex} readOnly={readOnly}
                  onUpdate={(field, val) => updateRow(row.id, field, val)}
                  onDelete={() => deleteRow(row.id)}
                  onDuplicate={() => duplicateRow(row.id)}
                  onOpenModal={m => setActiveTutorial(enrichMatch(m))}
                  checked={!!checked[row.id]}
                  onCheck={() => toggleCheck(row.id)}
                />
              ))
            )}
            {!readOnly && (
              <button onClick={addRow} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-heading font-semibold text-muted-foreground hover:text-primary glass border border-dashed border-border/40 hover:border-primary/30 transition-all mt-2">
                <Plus className="w-4 h-4" /> Add Exercise
              </button>
            )}
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:block rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30 bg-white/[0.02]"
              style={{ paddingLeft: readOnly ? 40 : 44 }}>
              <span className="flex-1 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/40">Activity</span>
              <span className="w-32 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/40 flex-shrink-0">Reps / Sets</span>
              <span className="w-32 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/40 flex-shrink-0">Type</span>
              <span className="flex-1 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/40">Notes</span>
              <span className="w-28 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-muted-foreground/40 flex-shrink-0">Tutorial</span>
              {!readOnly && <span className="w-14 flex-shrink-0" />}
            </div>

            <div className="divide-y divide-border/10">
              {activeTab.rows.map((row, rowIndex) => (
                <div key={row.id}
                  draggable={!readOnly}
                  onDragStart={() => onDragStart(row.id)}
                  onDragOver={e => onDragOver(e, row.id)}
                  onDrop={() => onDrop(row.id)}
                  style={{ opacity: dragOver === row.id ? 0.5 : 1, transition: 'opacity 0.15s' }}>
                  <DesktopRow row={row} rowIndex={rowIndex} readOnly={readOnly}
                    onUpdate={(field, val) => updateRow(row.id, field, val)}
                    onDelete={() => deleteRow(row.id)}
                    onDuplicate={() => duplicateRow(row.id)}
                    onOpenModal={m => setActiveTutorial(enrichMatch(m))}
                    checked={!!checked[row.id]}
                    onCheck={() => toggleCheck(row.id)}
                  />
                </div>
              ))}
            </div>

            {!readOnly && (
              <div className="px-3 py-2 border-t border-border/10">
                <button onClick={addRow} className="flex items-center gap-2 text-xs font-heading font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-primary/5">
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