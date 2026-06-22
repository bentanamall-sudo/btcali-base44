// Auto-match exercise names to tutorials in the Skill Library
// Matching is fuzzy: case-insensitive, ignores plurals, handles FL/Front Lever aliases

const TUTORIAL_MAP = [
  // ── Wrist / warmup ──
  { keywords: ['wrist warmup', 'wrist warm', 'wrist prep', 'wrist conditioning'], title: 'Wrist Warmup', url: 'https://youtube.com/shorts/A1YPZdLyXPI?si=NTII3TIGbomjKChN', internal: null },

  // ── Handstand ──
  { keywords: ['handstand bail', 'bail tutorial', 'how to bail'], title: 'Handstand Bail Tutorial', url: 'https://www.youtube.com/shorts/81mBKvzbyTQ', internal: '/tutorials/handstand-beginner-guide#bail_tutorial' },
  { keywords: ['handstand kick', 'kick-up', 'kickup', 'kick up'], title: 'Handstand Kick-Up', url: null, internal: '/tutorials/handstand-beginner-guide#kickup_tutorial' },
  { keywords: ['wall drill', 'toe tap', 'chest to wall', 'handstand toe tap'], title: 'Wall Drills & Toe Taps', url: null, internal: '/tutorials/handstand-beginner-guide#wall_drills' },
  { keywords: ['handstand hold', 'freestanding hold', 'handstand attempt', 'max handstand'], title: 'Handstand Holds', url: null, internal: '/tutorials/handstand-beginner-guide#holds' },
  { keywords: ['back to wall handstand', 'back wall handstand'], title: 'Back-to-Wall Handstand', url: null, internal: null },

  // ── HSPU / Pressing ──
  { keywords: ['bent arm press', 'bent-arm press'], title: 'Bent Arm Press Tutorial', url: 'https://www.youtube.com/watch?v=uMyv-LMlR0o', internal: '/tutorials/handstand-beginner-guide#bent_arm_press' },
  { keywords: ['pike pushup', 'pike push-up', 'pike push up'], title: 'Pike Pushup', url: null, internal: null },
  { keywords: ['decline pike', 'declined pike'], title: 'Decline Pike Pushup', url: null, internal: null },
  { keywords: ['wall hspu', 'wall handstand push', 'chest to wall hspu'], title: 'Wall HSPU', url: null, internal: null },
  { keywords: ['90 degree hspu', '90 degree handstand', '90degree'], title: '90° HSPU', url: null, internal: null },
  { keywords: ['p bar hspu', 'parallette hspu', 'p-bar hspu'], title: 'P-Bar HSPU', url: null, internal: null },
  { keywords: ['hspu attempt', 'handstand pushup attempt', 'handstand push-up attempt'], title: 'HSPU Attempts', url: null, internal: null },
  { keywords: ['scapular pushup', 'scapula pushup', 'protraction', 'retraction'], title: 'Scapular Pushups', url: null, internal: null },

  // ── Planche ──
  { keywords: ['planche lean', 'planche-lean'], title: 'Planche Lean', url: null, internal: '/tutorials/planche-conditioning-guide#planche_leans' },
  { keywords: ['dolphin press', 'dolphin presses'], title: 'Dolphin Presses', url: null, internal: '/tutorials/planche-conditioning-guide' },
  { keywords: ['planche press', 'planche presses'], title: 'Planche Presses', url: null, internal: '/tutorials/planche-conditioning-guide' },
  { keywords: ['zanneti', 'zanetti', 'zannettis'], title: "Zannetti's", url: null, internal: '/tutorials/planche-conditioning-guide' },
  { keywords: ['pseudo planche', 'pseudo lean'], title: 'Pseudo Planche Lean', url: null, internal: '/tutorials/planche-conditioning-guide' },
  { keywords: ['tuck planche', 'tuck-planche'], title: 'Tuck Planche', url: null, internal: null },
  { keywords: ['adv tuck planche', 'advanced tuck planche', 'adv tuck', 'advanced tuck'], title: 'Advanced Tuck Planche', url: null, internal: null },
  { keywords: ['straddle planche', 'straddle attempt', 'straddle hold', 'straddle press'], title: 'Straddle Planche', url: null, internal: null },
  { keywords: ['full planche', 'full-planche'], title: 'Full Planche', url: null, internal: null },
  { keywords: ['bent arm tuck planche raise', 'tuck planche raise', 'tuck raise'], title: 'Tuck Planche Raises', url: null, internal: null },

  // ── Front Lever ──
  { keywords: ['front lever activation', 'fl activation'], title: 'Front Lever Activations', url: null, internal: '/tutorials/l-sit-to-handstand-guide' },
  { keywords: ['fl hip thrust', 'front lever hip thrust', 'fl thrust'], title: 'Front Lever Hip Thrusts', url: null, internal: null },
  { keywords: ['fl deadlift', 'front lever deadlift', 'reverse deadlift', 'banded reverse deadlift'], title: 'Front Lever Deadlifts', url: null, internal: null },
  { keywords: ['tuck front lever', 'tuck fl', 'tuck lever'], title: 'Tuck Front Lever', url: null, internal: null },
  { keywords: ['adv tuck fl', 'adv tuck front lever', 'advanced tuck fl', 'advanced tuck front lever', 'adv tuck lever'], title: 'Advanced Tuck Front Lever', url: null, internal: null },
  { keywords: ['full front lever', 'full fl', 'full front lever hold', 'full fl hold'], title: 'Full Front Lever', url: null, internal: null },
  { keywords: ['banded full fl', 'band assisted full fl', 'band assisted front lever', 'red band', 'black band', 'purple band', 'fl hold', 'fl raises', 'band fl'], title: 'Band-Assisted Front Lever', url: null, internal: null },
  { keywords: ['fl raise', 'front lever raise', 'fl raises'], title: 'Front Lever Raises', url: null, internal: null },

  // ── L-sit ──
  { keywords: ['l sit to handstand', 'l-sit to handstand', 'lsit to handstand'], title: 'L-Sit to Handstand', url: null, internal: '/tutorials/l-sit-to-handstand-guide' },
  { keywords: ['l sit', 'l-sit', 'lsit', 'l sit attempt', 'l sit max'], title: 'L-Sit', url: null, internal: null },
  { keywords: ['bent knee l sit', 'bent-knee l sit', 'bent knee lsit'], title: 'Bent Knee L-Sit', url: null, internal: null },
  { keywords: ['l sit raise', 'l-sit raise', 'lsit raise'], title: 'L-Sit Raises', url: null, internal: null },
  { keywords: ['tuck l sit', 'tuck lsit'], title: 'Tuck L-Sit', url: null, internal: null },
  { keywords: ['elevated l sit', 'elevated lsit'], title: 'Elevated L-Sit', url: null, internal: null },
  { keywords: ['l sit compression', 'compression hold', 'compression raise'], title: 'L-Sit Compression', url: null, internal: null },

  // ── Pullups ──
  { keywords: ['weighted pullup', 'weighted pull-up', 'weighted pull up'], title: 'Weighted Pullups', url: null, internal: null },
  { keywords: ['max pullup', 'max pull-up', 'high pullup'], title: 'Max Pullups', url: null, internal: null },
  { keywords: ['scapular pullup', 'scapula pullup'], title: 'Scapular Pullups', url: null, internal: null },
  { keywords: ['chin up', 'chinup', 'chin-up'], title: 'Chin-Ups', url: null, internal: null },
  { keywords: ['muscle up', 'muscle-up'], title: 'Muscle-Up', url: null, internal: null },

  // ── Other ──
  { keywords: ['dip', 'dips', 'weighted dip'], title: 'Dips', url: null, internal: null },
  { keywords: ['hollow body', 'hollow hold'], title: 'Hollow Body Hold', url: null, internal: null },
  { keywords: ['plank hold', 'plank'], title: 'Plank Hold', url: null, internal: null },
  { keywords: ['bicep curl', 'bicep curls'], title: 'Bicep Curls', url: null, internal: null },
];

// Normalise: lowercase, replace FL→front lever, trim
function normalise(str) {
  return (str || '')
    .toLowerCase()
    .replace(/\bfl\b/g, 'front lever')
    .replace(/\bhs\b/g, 'handstand')
    .replace(/\bhspu\b/g, 'handstand pushup')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchTutorial(exerciseName) {
  if (!exerciseName || !exerciseName.trim()) return null;
  const norm = normalise(exerciseName);

  let best = null;
  let bestScore = 0;

  for (const entry of TUTORIAL_MAP) {
    for (const kw of entry.keywords) {
      const normKw = normalise(kw);
      // Exact match
      if (norm === normKw) return entry;
      // Contains keyword
      if (norm.includes(normKw) || normKw.includes(norm)) {
        const score = normKw.length;
        if (score > bestScore) { bestScore = score; best = entry; }
        continue;
      }
      // Word overlap score
      const normWords = new Set(norm.split(' '));
      const kwWords = normKw.split(' ');
      const overlap = kwWords.filter(w => w.length > 2 && normWords.has(w)).length;
      const score = overlap / kwWords.length;
      if (score >= 0.6 && overlap > bestScore) { bestScore = overlap; best = entry; }
    }
  }

  return bestScore > 0 ? best : null;
}

export function getTutorialLink(exerciseName) {
  const match = matchTutorial(exerciseName);
  if (!match) return null;
  return { title: match.title, url: match.url, internal: match.internal };
}