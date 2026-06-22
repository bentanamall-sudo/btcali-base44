// Single source of truth: maps exercise names → Skill Library category + tutorial ID
// Uses the exact CATEGORY_DATA from SkillLibraryCategory.jsx

// Each entry: { keywords[], categoryId, tutorialId, title }
// categoryId + tutorialId → open exact tutorial modal in SkillLibraryCategory

const TUTORIAL_INDEX = [
  // ── Wrist ──
  { keywords: ['wrist warmup', 'wrist warm', 'wrist prep', 'wrist circle', 'wrist conditioning'], categoryId: 'handstand-foundations', tutorialId: 'hf-wrist-warmup', title: 'Wrist Warmup' },

  // ── Basics ──
  { keywords: ['l sit progressions', 'l-sit progressions', 'lsit progressions', 'l sit entry', 'l-sit entry', 'lsit entry'], categoryId: 'master-basics', tutorialId: 'core-lsit-entry', title: 'L-Sit Progressions & Entry' },
  { keywords: ['pull-up form', 'pullup form', 'pull up form'], categoryId: 'master-basics', tutorialId: 'pull-form', title: 'Pull-Up Form' },
  { keywords: ['dip form', 'dips form', 'ring dip', 'weighted dip', 'dips'], categoryId: 'master-basics', tutorialId: 'push-dip-form', title: 'Dip Form' },
  { keywords: ['bent knee pike', 'bent-knee pike'], categoryId: 'master-basics', tutorialId: 'push-bent-knee-pike', title: 'Bent Knee Pike Push-Ups' },
  { keywords: ['pike push-up', 'pike pushup', 'pike push up'], categoryId: 'master-basics', tutorialId: 'push-pike-pushup', title: 'Pike Push-Ups' },

  // ── Handstand Foundations ──
  { keywords: ['where to look', 'handstand eyes', 'handstand gaze'], categoryId: 'handstand-foundations', tutorialId: 'hf-where-to-look', title: 'Where to Look in a Handstand' },
  { keywords: ['handstand kick-up', 'handstand kickup', 'kick-up tutorial', 'kickup tutorial', 'kick up handstand'], categoryId: 'handstand-foundations', tutorialId: 'hf-kickup', title: 'Handstand Kick-Up Tutorial' },
  { keywords: ['handstand bail', 'bail tutorial', 'face the fear'], categoryId: 'handstand-foundations', tutorialId: 'hf-bail', title: 'Handstand Bail — Face the Fear' },
  { keywords: ['decline pike', 'declined pike'], categoryId: 'handstand-foundations', tutorialId: 'hf-decline-pike', title: 'Decline Pike Push-Ups' },
  { keywords: ['handstand toe tap', 'toe tap handstand', 'wall toe tap'], categoryId: 'handstand-foundations', tutorialId: 'hf-toe-taps', title: 'Handstand Toe Taps' },
  { keywords: ['floating pike', 'float pike'], categoryId: 'handstand-foundations', tutorialId: 'hf-floating-pike', title: 'Floating Pike Push-Ups' },
  { keywords: ['chest to wall hold', 'chest wall hold', 'chest to wall handstand hold'], categoryId: 'handstand-foundations', tutorialId: 'hf-chest-wall-hold', title: 'Handstand Chest to Wall Hold' },

  // ── L-Sit to Handstand (premium) ──
  { keywords: ['bent arm press raise', 'bent-arm press raise', 'bat press raise'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-bent-arm-raise', title: 'Bent Arm Press Raise' },
  { keywords: ['bent arm press cue', 'bent-arm press cue', 'bap cues', 'bat press cues'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-bent-arm-cues', title: 'Bent Arm Press Cues' },
  { keywords: ['bent arm tuck planche position', 'bat planche position', 'tuck position bent arm'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-bent-arm-tuck-pos', title: 'Bent Arm Tuck Planche Positions' },
  { keywords: ['bent arm press quick', 'quick bent arm', 'bat quick'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-bent-arm-quick', title: 'Bent Arm Press Quick Tutorial' },
  { keywords: ['momentum bent arm', 'momentum press', 'momentum bat'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-momentum-press', title: 'Momentum Bent Arm Press' },
  { keywords: ['momentum bent arm explanation', 'momentum press explanation', 'momentum bat explanation'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-momentum-press-exp', title: 'Momentum Bent Arm Press Explanation' },
  { keywords: ['clean form bent arm', 'clean bent arm', 'clean form press'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-clean-press', title: 'Clean Form Bent Arm Press' },
  { keywords: ['bent arm press raise progression', 'bat raise progression', 'bent arm raise progression'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-bent-arm-raise-prog', title: 'Bent Arm Press Raise Progressions' },
  { keywords: ['in-depth bent arm', 'indepth bent arm', 'in depth bent arm', 'detailed bent arm'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-indepth-press', title: 'In-Depth Bent Arm Press Tutorial' },
  { keywords: ['bent arm press', 'bent-arm press', 'bat press'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-bent-arm-cues', title: 'Bent Arm Press Cues' },
  { keywords: ['l-sit to handstand', 'lsit to handstand', 'l sit to handstand', 'lsit hs'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-lsit-to-hs', title: 'L-Sit to Handstand' },
  { keywords: ['straddle press to handstand', 'straddle press hs'], categoryId: 'l-sit-to-handstand', tutorialId: 'lshs-straddle-press', title: 'Straddle Press to Handstand' },

  // ── Planche Conditioning ──
  { keywords: ['scapular protraction', 'scapula protraction', 'scap protraction', 'scap retraction', 'scapular retraction'], categoryId: 'planche-conditioning', tutorialId: 'pc-scap-protract', title: 'Scapular Protraction & Retraction' },
  { keywords: ['scapular to normal pushup', 'scap to normal', 'scapular pushup'], categoryId: 'planche-conditioning', tutorialId: 'pc-scap-to-normal', title: 'Scapular to Normal Push-Ups' },
  { keywords: ['planche lean', 'planche-lean'], categoryId: 'planche-conditioning', tutorialId: 'pc-lean', title: 'The Planche Lean' },
  { keywords: ['planche lean press', 'lean press planche'], categoryId: 'planche-conditioning', tutorialId: 'pc-lean-press', title: 'Planche Lean Press' },
  { keywords: ["zanetti", "zanettis", "zanetti's", "zannetti", "zannettis"], categoryId: 'planche-conditioning', tutorialId: 'pc-zanettis', title: "Zanetti's" },
  { keywords: ['how to grip p-bar', 'p-bar grip', 'pbar grip', 'parallette grip'], categoryId: 'planche-conditioning', tutorialId: 'pc-pbars-grip', title: 'How to Properly Grip P-Bars' },
  { keywords: ['dolphin press', 'dolphin presses'], categoryId: 'planche-conditioning', tutorialId: 'pc-dolphin-press', title: 'Dolphin Press' },

  // ── Front Lever ──
  { keywords: ['hollow body hold', 'hollow hold', 'hollow body'], categoryId: 'front-lever', tutorialId: 'fl-hollow-body', title: 'Hollow Body Hold' },
  { keywords: ['front lever activation', 'fl activation', 'front lever activations', 'fl activations'], categoryId: 'front-lever', tutorialId: 'fl-activations', title: 'Front Lever Activations' },
  { keywords: ['tuck front lever', 'tuck fl', 'tuck lever', 'fl tuck'], categoryId: 'front-lever', tutorialId: 'fl-tuck', title: 'Tuck Front Lever' },
  { keywords: ['advanced tuck front lever', 'adv tuck front lever', 'advanced tuck fl', 'adv tuck fl', 'adv tuck lever', 'at front lever'], categoryId: 'front-lever', tutorialId: 'fl-adv-tuck', title: 'Advanced Tuck Front Lever' },
  { keywords: ['full banded fl entry', 'full banded front lever entry', 'banded fl entry', 'full fl entry'], categoryId: 'front-lever', tutorialId: 'fl-full-banded-entry', title: 'Full Banded FL Entry' },
  { keywords: ['band assisted front lever raise', 'band fl raise', 'banded fl raise', 'fl band raise', 'front lever band raise'], categoryId: 'front-lever', tutorialId: 'fl-band-raises', title: 'Band Assisted Front Lever Raises' },
  { keywords: ['front lever hip thrust', 'fl hip thrust', 'fl thrust'], categoryId: 'front-lever', tutorialId: 'fl-hip-thrust', title: 'Front Lever Hip Thrust' },
  { keywords: ['inverted deadlift', 'reverse deadlift', 'fl deadlift', 'front lever deadlift', 'inv deadlift'], categoryId: 'front-lever', tutorialId: 'fl-inv-deadlift', title: 'Inverted / Reverse Deadlifts' },

  // ── HSPU ──
  { keywords: ['chest to wall handstand pushup', 'chest wall hspu', 'ctw hspu', 'c2w hspu'], categoryId: 'handstand-pushups', tutorialId: 'hspu-chest-wall', title: 'Chest to Wall Handstand Push-Ups' },
];

function normalise(str) {
  return (str || '')
    .toLowerCase()
    .replace(/\bfl\b/g, 'front lever')
    .replace(/\bhs\b/g, 'handstand')
    .replace(/\bhspu\b/g, 'handstand pushup')
    .replace(/\bbap\b/g, 'bent arm press')
    .replace(/\bbat\b/g, 'bent arm')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchTutorial(exerciseName) {
  if (!exerciseName || !exerciseName.trim()) return null;
  const norm = normalise(exerciseName);

  let best = null;
  let bestScore = 0;

  for (const entry of TUTORIAL_INDEX) {
    for (const kw of entry.keywords) {
      const normKw = normalise(kw);
      if (norm === normKw) return entry; // exact match

      // Containment
      if (norm.includes(normKw) || normKw.includes(norm)) {
        const score = normKw.length;
        if (score > bestScore) { bestScore = score; best = entry; }
        continue;
      }

      // Word overlap
      const normWords = new Set(norm.split(' '));
      const kwWords = normKw.split(' ');
      const overlap = kwWords.filter(w => w.length > 2 && normWords.has(w)).length;
      const ratio = overlap / kwWords.length;
      if (ratio >= 0.65 && overlap > bestScore) { bestScore = overlap; best = entry; }
    }
  }

  return bestScore > 0 ? best : null;
}

// Returns { title, categoryId, tutorialId } or null
export function getTutorialMatch(exerciseName) {
  return matchTutorial(exerciseName);
}