// BTCALI Tutorial Matching System
// Single source of truth for exercise → tutorial URL mapping.
// Priority: exact match → alias match → fuzzy keyword match
// URL = 'COMING_SOON' means show "Tutorial coming soon"

const TUTORIAL_DB = [
  // ─── HANDSTAND & PRESSING — BEGINNER ───────────────────────────────────────
  {
    title: 'Wrist Warmup',
    url: 'https://youtube.com/shorts/A1YPZdLyXPI?si=NTII3TIGbomjKChN',
    aliases: ['wrist warmup', 'warmup wrist', 'wrist conditioning', 'basic wrist warmup', 'wrist warm up', 'wrist prep'],
  },
  {
    title: 'L Sit Progressions and Entry',
    url: 'https://youtube.com/shorts/JV2QPQFlpZQ?feature=share',
    aliases: ['l sit', 'l-sit', 'l sit progressions', 'l sit entry', 'lsit entry', 'lsit progressions', 'bent knee l sit', 'elevated l sit', 'tuck l sit', 'floor l sit raises', 'max l sit raises', 'l sit compression', 'l-sit progressions', 'l-sit entry', 'l-sit compression', 'l sit raises'],
  },
  {
    title: 'Bent Knee Pike Pushups',
    url: 'https://youtube.com/shorts/5HRq7xpcBkw?feature=share',
    aliases: ['bent knee pike pushups', 'bent knee pike push-ups', 'knee pike pushup', 'bent knee pike', 'bent-knee pike'],
  },
  {
    title: 'Pike Pushups',
    url: 'https://youtube.com/shorts/PSHF4b99J0Q?feature=share',
    aliases: ['pike pushup', 'pike pushups', 'pike push-up', 'pike push-ups', 'pike pushup max', 'pike push up max'],
  },
  {
    title: 'Where To Look In A Handstand',
    url: 'https://youtube.com/shorts/pgKP61v2kz8?si=6GKzfB-gWxyLo8UA',
    aliases: ['where to look in handstand', 'handstand gaze', 'handstand head position', 'where to look in a handstand', 'where to look'],
  },
  {
    title: 'Handstand Kick Up Tutorial',
    url: 'https://youtube.com/shorts/8GLA_c0jueA?si=dIFucwXfHV7ZIbl2',
    aliases: ['handstand kick up', 'handstand attempts', 'back to wall handstand attempts', 'handstand holds', 'handstand hold', 'handstand kick-up', 'kickup tutorial', 'back to wall handstand', 'freestanding handstand hold', 'max handstand hold'],
  },
  {
    title: 'Handstand Hold Chest To Wall',
    url: 'COMING_SOON',
    aliases: ['handstand hold chest to wall', 'chest to wall handstand hold', 'ctw handstand hold', 'chest to wall hs hold'],
  },
  {
    title: 'Handstand Bail',
    url: 'https://youtube.com/shorts/81mBKvzbyTQ?feature=share',
    aliases: ['handstand bail', 'face the fear of handstand', 'how to bail handstand', 'bail tutorial', 'face the fear'],
  },
  // ─── HANDSTAND & PRESSING — INTERMEDIATE ───────────────────────────────────
  {
    title: 'Decline Pike Pushups',
    url: 'https://youtube.com/shorts/3OfR0Kd1u-Q?feature=share',
    aliases: ['decline pike pushup', 'decline pike pushups', 'decline pike pushup max', 'decline pike pushup max reps', 'declined pike', 'decline pike', 'decline pike push-up'],
  },
  {
    title: 'Handstand Toe Taps',
    url: 'https://youtube.com/shorts/yDYk7w7uqTA?si=7pU1huvvbtV2TSig',
    aliases: ['handstand toe taps', 'chest to wall handstand toe taps', 'wall drills', 'toe taps', 'handstand toe tap', 'wall toe taps'],
  },
  {
    title: 'Floating Pike Pushups',
    url: 'https://youtube.com/shorts/AfLQJ-cCF2I?feature=share',
    aliases: ['floating pike pushups', 'floating pike pushup', 'floating pike', 'float pike pushup'],
  },
  {
    title: 'Chest To Wall Handstand Pushups',
    url: 'https://youtube.com/shorts/GwHgAPqMMq0?feature=share',
    aliases: ['chest to wall handstand pushups', 'chest to wall hspu', 'wall hspu', 'wall hspu max', 'hspu wall', 'deep wall hspu', 'chest to wall handstand pushup max', 'wall handstand pushup', 'wall handstand push up'],
  },
  {
    title: 'Bent Arm Press Cues',
    url: 'https://youtube.com/shorts/jD7JOlacCgg?si=-iFxIMqEvEgp_Gl8',
    aliases: ['bent arm press cues', 'bent arm press attempts', 'bent arm press spam', 'bent arm press max', 'clean bent arm press attempt', 'bap attempts', 'bap cues', 'bap spam'],
  },
  {
    title: 'Bent Arm Tuck Planche Positions',
    url: 'https://youtube.com/shorts/WRflJHXBIrA?feature=share',
    aliases: ['bent arm tuck planche', 'bent arm tuck planche positions', 'bat tuck planche', 'bent arm tuck raises'],
  },
  {
    title: 'Bent Arm Press Quick Tutorial',
    url: 'https://youtube.com/shorts/6MpY6iLDtQM?si=XSjEG60mxk7WmO7D',
    aliases: ['quick bent arm press', 'bent arm press quick tutorial', 'bent arm quick', 'quick bap'],
  },
  // ─── HANDSTAND & PRESSING — ADVANCED ───────────────────────────────────────
  {
    title: 'In Depth Bent Arm Press Tutorial',
    url: 'https://youtu.be/UO7pBH4FnOI?si=1NMIkv6NZsraT3UH',
    aliases: ['in depth bent arm press tutorial', 'bent arm press tutorial', 'in-depth bent arm press', 'detailed bent arm press', 'full bent arm press tutorial', 'bent arm press', 'bent-arm press', 'clean bent arm press'],
  },
  {
    title: 'Bent Arm Press Raise',
    url: 'https://youtube.com/shorts/jUYGq7sBxI0?si=1CKwTFtBmCnhlGw_',
    aliases: ['bent arm press raise', 'bent arm tuck planche raises', 'bent arm press raises', 'bap raise', 'bap raises'],
  },
  {
    title: 'Momentum Bent Arm Press',
    url: 'https://youtube.com/shorts/cIZRmKLMlQ4?si=pQW6REEtDVNTmAcS',
    aliases: ['momentum bent arm press', 'bent arm press momentum', 'momentum bap'],
  },
  {
    title: 'Momentum Bent Arm Press Explanation',
    url: 'https://youtube.com/shorts/yLn96dEdHWE?si=sb-RxwRVGOrYyMSi',
    aliases: ['momentum bent arm press explanation', 'bap momentum explanation'],
  },
  {
    title: 'Clean Form Bent Arm Press',
    url: 'https://youtube.com/shorts/BouVt_LNI7k?si=AvlmbGfqFgFMxtjHL',
    aliases: ['clean form bent arm press', 'clean bap'],
  },
  {
    title: 'Bent Arm Press Raise Progressions',
    url: 'https://youtube.com/shorts/qAuVf2KGFUI?si=mWYBPemCaHx68Qhh',
    aliases: ['bent arm press raise progressions', 'bap raise progressions'],
  },
  {
    title: 'L Sit To Handstand',
    url: 'https://youtube.com/shorts/8SOeZroRebI?feature=share',
    aliases: ['l sit to handstand', 'l-sit to handstand', 'l sit to handstand on p bars', 'lsit to handstand', 'lsit hs', 'l-sit to hs'],
  },
  // ─── FRONT LEVER — BEGINNER ─────────────────────────────────────────────────
  {
    title: 'Hollow Body Hold',
    url: 'https://youtube.com/shorts/DQu4UNPY8BU?feature=share',
    aliases: ['hollow body hold', 'hollow hold', 'hollow body', 'hollow body holds'],
  },
  {
    title: 'Front Lever Activations',
    url: 'https://youtube.com/shorts/QVqbRvkFlx0?si=tRLp6kAqHFP45wrA',
    aliases: ['front lever activations', 'fl activations', 'scapular front lever', 'front lever activation', 'fl activation'],
  },
  {
    title: 'Tuck Front Lever',
    url: 'https://youtube.com/shorts/08DECfSNf8Y?si=k9pi6_KTnvwthoG4',
    aliases: ['tuck front lever', 'tuck fl', 'max tuck fl', 'tuck front lever max', 'tuck fl max', 'fl tuck', 'tuck lever'],
  },
  {
    title: 'Advanced Tuck Front Lever',
    url: 'https://youtube.com/shorts/9FBurAs5q58?si=82RBgG_NVRHfHdBh',
    aliases: ['adv tuck fl', 'advanced tuck fl', 'adv tuck front lever', 'advanced tuck front lever', 'max adv tuck', 'max adv tuck lever', 'at front lever', 'advanced tuck fl max', 'adv tuck lever'],
  },
  // ─── FRONT LEVER — INTERMEDIATE ─────────────────────────────────────────────
  {
    title: 'Full Banded FL Entry',
    url: 'https://youtube.com/shorts/xeNxL7ygiHg?si=1jxYXlji2rz1CGsQ',
    aliases: [
      'full banded fl entry', 'banded full fl', 'banded fl', 'full banded fl',
      'red banded fl', 'black banded fl', 'purple banded fl', 'green banded fl', 'yellow banded fl', 'orange banded fl',
      'red band assisted full fl', 'black band assisted full fl', 'purple banded full fl', 'green banded full fl',
      'yellow banded full fl', 'orange banded full fl',
      'any colour banded fl', 'any banded fl', 'full front lever attempt', 'full fl attempt',
      'banded fl entry', 'full fl entry', 'full front lever', 'band assisted full fl',
      'red banded full fl', 'black banded full fl', 'purple band assisted full fl', 'green band assisted full fl',
      'half red band fl', 'half red banded fl', 'half red band full fl',
    ],
  },
  {
    title: 'Band Assisted Front Lever Raises',
    url: 'https://youtube.com/shorts/aku6BVmhuck?feature=share',
    aliases: [
      'band assisted front lever raises', 'fl raises', 'front lever raises', 'banded fl raises',
      'red band fl raises', 'black band fl raises', 'purple band fl raises', 'green band fl raises',
      'yellow band fl raises', 'orange band fl raises',
      'red banded fl raises', 'black banded fl raises', 'purple banded fl raises',
      'green banded fl raises', 'yellow banded fl raises', 'orange banded fl raises',
      'red band assisted fl raises', 'black band assisted fl raises', 'black band assisted full fl raises',
      'purple band assisted fl raises', 'banded full fl raises', 'band fl raises', 'front lever raise',
    ],
  },
  {
    title: 'Front Lever Hip Thrust',
    url: 'https://youtube.com/shorts/IEbuq-vlXgs?si=TF8ooitV8ZUgnwar',
    aliases: ['front lever hip thrust', 'fl hip thrust', 'fl hip thrusts', 'banded fl hip thrusts', 'front lever hip thrusts'],
  },
  {
    title: 'Inverted / Reverse Deadlifts',
    url: 'https://youtube.com/shorts/VT77Hlo1uoM?si=JLo5thTZHJqFNcDu',
    aliases: ['front lever deadlifts', 'fl deadlifts', 'reverse deadlifts', 'inverted deadlifts', 'banded reverse deadlifts', 'inverted deadlift', 'fl deadlift', 'front lever deadlift', 'reverse deadlift', 'banded reverse deadlift'],
  },
  // ─── PLANCHE ─────────────────────────────────────────────────────────────────
  {
    title: 'Scapular Protraction and Retraction',
    url: 'https://youtube.com/shorts/QppuGF94PLc?si=u8maK1wFk3E2d_CT',
    aliases: ['scapular protraction', 'scapular retraction', 'protraction and retraction', 'scap protraction', 'scap retraction', 'scapular protraction and retraction'],
  },
  {
    title: 'Scapular To Normal Pushups',
    url: 'https://youtube.com/shorts/D_8_yzV6Jdk?feature=share',
    aliases: ['scapular pushups to normal pushups', 'scapular pushups', 'scapular to normal pushups', 'scap to normal pushups', 'scap pushups'],
  },
  {
    title: 'Planche Lean',
    url: 'https://youtube.com/shorts/-cGOxgIccqU?si=XOzPg4iHUxQP9YcK',
    aliases: ['planche lean', 'the planche lean', 'planche leans'],
  },
  {
    title: 'Planche Lean Press',
    url: 'https://youtube.com/shorts/pAn5RJZCvR0?feature=share',
    aliases: ['planche lean press', 'planche lean presses', 'planche presses', 'planche press'],
  },
  {
    title: "Zanneti's",
    url: 'https://youtube.com/shorts/IsiqiYLuVdA?feature=share',
    aliases: ["zanneti", "zanneti's", "zanetti", "zanetti's", "zanettis", "zannettis"],
  },
  {
    title: 'Dolphin Press',
    url: 'https://youtube.com/shorts/SWJn6e7Kc50?si=YrVUbNtS-eJimEJ1',
    aliases: ['dolphin press', 'dolphin presses'],
  },
  {
    title: 'How To Properly Grip P Bars',
    url: 'https://youtube.com/shorts/boazomcMT7c?feature=share',
    aliases: ['p bar grip', 'p bars grip', 'how to properly grip p bars', 'pbar grip', 'parallette grip', 'p-bar grip'],
  },
  {
    title: 'Tuck Planche Floor',
    url: 'COMING_SOON',
    aliases: ['tuck planche floor', 'floor tuck planche', 'tuck planche on floor', 'floor tuck planche hold'],
  },
  // ─── BASICS ──────────────────────────────────────────────────────────────────
  {
    title: 'Pushups',
    url: 'COMING_SOON',
    aliases: ['pushup tutorial', 'pushups', 'pushup', 'max pushups', 'push-ups max', 'knee push-ups', 'max push ups', 'push up max', 'push ups'],
  },
  {
    title: 'Dip Form',
    url: 'https://youtube.com/shorts/qG4dnoWpr94?si=ntBBA2jldlCWdzpH',
    aliases: ['dip tutorial', 'dips', 'max dips', 'weighted dips', 'weighted dip program', 'dip form', 'ring dip'],
  },
  {
    title: 'Pullups',
    url: 'https://youtube.com/shorts/DzU28xYSCjU?si=Td9RT1rX13tPRfJJ',
    aliases: ['pullups', 'pull-ups', 'max pullups', 'weighted pullups', 'weighted pull-ups', 'normal pullups', 'max normal pullups', 'pullup', 'pull up', 'pull-up'],
  },
  {
    title: 'High Pullup Tutorial',
    url: 'COMING_SOON',
    aliases: ['high pullups', 'max high pullups', 'high pull-ups', 'high pullup'],
  },
  {
    title: 'Scapular Pullups',
    url: 'COMING_SOON',
    aliases: ['scapular pullups', 'max scapular pullups', 'scap pullups', 'scapular pull-ups'],
  },
  {
    title: 'Pullups Top ROM Partials',
    url: 'COMING_SOON',
    aliases: ['top rom pullups', 'partial rep pullups top rom', 'max half rom pullups top rom', 'pullups top rom partials', 'top rom pull-ups'],
  },
  {
    title: 'Pullups Bottom ROM Partials',
    url: 'COMING_SOON',
    aliases: ['bottom rom pullups', 'partial rep pullups bottom rom', 'max half rom pullups bottom rom', 'pullups bottom rom partials', 'bottom rom pull-ups'],
  },
  {
    title: 'Pullup Hold',
    url: 'COMING_SOON',
    aliases: ['pullup hold', 'max pullup hold', 'hold at top', 'pull-up hold', 'pull up hold'],
  },
  {
    title: 'L Sit Raises',
    url: 'COMING_SOON',
    aliases: ['l sit raises', 'lsit raises', 'l-sit raises', 'floor l sit raises', 'max l sit raises'],
  },
  {
    title: 'Muscle Up Cues',
    url: 'COMING_SOON',
    aliases: ['muscle up cues', 'muscle up tutorial', 'muscle ups', 'muscle up', 'no dip muscle ups', 'no-dip muscle up'],
  },
];

function normalise(str) {
  return (str || '')
    .toLowerCase()
    // Expand common abbreviations
    .replace(/\bfl\b/g, 'front lever')
    .replace(/\bhspu\b/g, 'chest to wall handstand pushup')
    .replace(/\bhs\b/g, 'handstand')
    .replace(/\bbap\b/g, 'bent arm press')
    .replace(/\bbat\b/g, 'bent arm')
    .replace(/\badv\b/g, 'advanced')
    // Normalise punctuation
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getTutorialMatch(exerciseName) {
  if (!exerciseName || !exerciseName.trim()) return null;
  const norm = normalise(exerciseName);

  // 1. Try exact match against all aliases
  for (const entry of TUTORIAL_DB) {
    for (const alias of entry.aliases) {
      if (norm === normalise(alias)) return entry;
    }
  }

  // 2. Try substring containment (exercise contains alias or alias contains exercise)
  let best = null;
  let bestScore = 0;

  for (const entry of TUTORIAL_DB) {
    for (const alias of entry.aliases) {
      const normAlias = normalise(alias);
      if (norm.includes(normAlias) || normAlias.includes(norm)) {
        const score = normAlias.length;
        if (score > bestScore) { bestScore = score; best = entry; }
      }
    }
  }
  if (best) return best;

  // 3. Fuzzy word overlap
  const normWords = new Set(norm.split(' ').filter(w => w.length > 2));
  for (const entry of TUTORIAL_DB) {
    for (const alias of entry.aliases) {
      const aliasWords = normalise(alias).split(' ').filter(w => w.length > 2);
      if (!aliasWords.length) continue;
      const overlap = aliasWords.filter(w => normWords.has(w)).length;
      const ratio = overlap / aliasWords.length;
      if (ratio >= 0.7 && overlap > bestScore) { bestScore = overlap; best = entry; }
    }
  }

  return best;
}

// Returns true if no real URL (coming soon)
export function isComingSoon(entry) {
  return !entry || !entry.url || entry.url === 'COMING_SOON';
}