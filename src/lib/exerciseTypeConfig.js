// Exercise type colour coding + display labels
export const EXERCISE_TYPE_CONFIG = {
  'warmup':           { label: 'Warmup',          bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.35)',  text: '#FCD34D', dot: '#F59E0B' },
  'attempt':          { label: 'Attempt',          bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.35)',   text: '#FCA5A5', dot: '#EF4444' },
  'volume / intensity':{ label: 'Volume/Intensity', bg: 'rgba(79,157,255,0.12)', border: 'rgba(79,157,255,0.35)', text: '#93C5FD', dot: '#4F9DFF' },
  'volume':           { label: 'Volume',            bg: 'rgba(147,197,253,0.1)',  border: 'rgba(147,197,253,0.3)', text: '#BAE6FD', dot: '#93C5FD' },
  'intensity':        { label: 'Intensity',         bg: 'rgba(79,157,255,0.12)', border: 'rgba(79,157,255,0.35)', text: '#93C5FD', dot: '#4F9DFF' },
  'technique':        { label: 'Technique',         bg: 'rgba(167,139,250,0.12)',border: 'rgba(167,139,250,0.35)',text: '#C4B5FD', dot: '#A78BFA' },
  'basics':           { label: 'Basics',            bg: 'rgba(75,85,99,0.2)',    border: 'rgba(107,114,128,0.35)',text: '#9CA3AF', dot: '#6B7280' },
  'conditioning':     { label: 'Conditioning',      bg: 'rgba(148,163,184,0.08)',border: 'rgba(148,163,184,0.25)',text: '#CBD5E1', dot: '#94A3B8' },
  '':                 { label: '',                   bg: 'rgba(30,41,59,0.4)',    border: 'rgba(71,85,105,0.3)',   text: '#64748B', dot: '#475569' },
};

export function getTypeConfig(type) {
  const key = (type || '').toLowerCase().trim();
  return EXERCISE_TYPE_CONFIG[key] || EXERCISE_TYPE_CONFIG[''];
}