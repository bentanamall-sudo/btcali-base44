export const quizQuestions = [
  {
    id: 'pushups',
    question: 'How many clean pushups can you do?',
    options: [
      { label: '0–5 reps', value: '0-5' },
      { label: '5–10 reps', value: '5-10' },
      { label: '10–20 reps', value: '10-20' },
      { label: '20–40 reps', value: '20-40' },
      { label: '40+ reps', value: '40+' },
    ],
  },
  {
    id: 'dips',
    question: 'How many clean dips can you do?',
    options: [
      { label: '0–10', value: '0-10' },
      { label: '10–20', value: '10-20' },
      { label: '20+', value: '20+' },
    ],
  },
  {
    id: 'pullups',
    question: 'How many clean pullups can you do?',
    options: [
      { label: '0–10', value: '0-10' },
      { label: '10–15', value: '10-15' },
      { label: '15+', value: '15+' },
    ],
  },
  {
    id: 'muscleup',
    question: 'What is your muscle-up level?',
    options: [
      { label: 'Never done', value: 'never' },
      { label: 'Band-assisted', value: 'band' },
      { label: 'Kipping', value: 'kipping' },
      { label: 'Clean muscle-up', value: 'clean' },
      { label: 'Multiple strict muscle-ups', value: 'strict_multiple' },
    ],
  },
  {
    id: 'handstand',
    question: 'What is your current handstand level?',
    options: [
      { label: 'Never tried', value: 'never' },
      { label: 'Tried but cannot kick up', value: 'no_kickup' },
      { label: 'Can kick up but cannot hold', value: 'kickup_no_hold' },
      { label: '3 second hold', value: '3s' },
      { label: '5–10 second hold', value: '5-10s' },
      { label: '15–30 second hold', value: '15-30s' },
      { label: '30+ second hold', value: '30+s' },
    ],
  },
  {
    id: 'planche_level',
    question: 'What is your highest planche progression?',
    options: [
      { label: 'Never tried', value: 'never' },
      { label: 'Tuck Planche', value: 'tuck' },
      { label: 'Advanced Tuck', value: 'adv_tuck' },
      { label: 'Straddle Planche', value: 'straddle' },
      { label: 'Full Planche', value: 'full' },
    ],
  },
  {
    id: 'planche_hold',
    question: 'How long can you hold it?',
    condition: (answers) => answers.planche_level && answers.planche_level !== 'never',
    options: [
      { label: '0–3 sec', value: '0-3s' },
      { label: '3–5 sec', value: '3-5s' },
      { label: '5–10 sec', value: '5-10s' },
      { label: '10+ sec', value: '10+s' },
    ],
  },
  {
    id: 'frontlever_level',
    question: 'What is your highest front lever progression?',
    options: [
      { label: 'Never tried', value: 'never' },
      { label: 'Tuck Front Lever', value: 'tuck' },
      { label: 'Advanced Tuck', value: 'adv_tuck' },
      { label: 'Full Front Lever with Band', value: 'band' },
      { label: 'Full Front Lever', value: 'full' },
    ],
  },
  {
    id: 'frontlever_band',
    question: 'Which band are you using?',
    condition: (answers) => answers.frontlever_level === 'band',
    options: [
      { label: 'Purple band', value: 'purple' },
      { label: 'Black band', value: 'black' },
      { label: 'Red band', value: 'red' },
    ],
  },
  {
    id: 'frontlever_hold',
    question: 'How long can you hold it?',
    condition: (answers) => answers.frontlever_level && answers.frontlever_level !== 'never',
    options: [
      { label: '0–3 sec', value: '0-3s' },
      { label: '3–5 sec', value: '3-5s' },
      { label: '5–10 sec', value: '5-10s' },
      { label: '10+ sec', value: '10+s' },
    ],
  },
  {
    id: 'lsit',
    question: 'How long can you hold an L-Sit?',
    options: [
      { label: '0–5 sec', value: '0-5s' },
      { label: '5–10 sec', value: '5-10s' },
      { label: '10–20 sec', value: '10-20s' },
      { label: '20+ sec', value: '20+s' },
    ],
  },
];

export function analyzeResults(answers) {
  const results = {};

  // Push Foundation
  const pushScore = (() => {
    const p = answers.pushups;
    const d = answers.dips;
    let score = 0;
    if (p === '40+') score += 5;
    else if (p === '20-40') score += 4;
    else if (p === '10-20') score += 3;
    else if (p === '5-10') score += 2;
    else score += 1;
    if (d === '20+') score += 5;
    else if (d === '10-20') score += 3;
    else score += 1;
    return Math.round((score / 10) * 100);
  })();

  results.push = {
    label: 'Push Foundation',
    score: pushScore,
    level: pushScore >= 80 ? 'Strong' : pushScore >= 50 ? 'Developing' : 'Beginner',
    weakness: pushScore < 50 ? 'Need to build basic pushing strength' : null,
    recommendations: pushScore >= 80
      ? ['Pike Pushups', 'Elevated Pike Pushups', 'L-Sit to Handstand', 'Bent Arm Press']
      : pushScore >= 50
        ? ['Increase pushup volume', 'Dip strength work', 'Pike Pushup progressions']
        : ['Build to 20+ pushups', 'Dip negatives', 'Push-up progressions'],
  };

  // Pull Foundation
  const pullScore = (() => {
    const p = answers.pullups;
    const m = answers.muscleup;
    let score = 0;
    if (p === '15+') score += 5;
    else if (p === '10-15') score += 3;
    else score += 1;
    if (m === 'strict_multiple') score += 5;
    else if (m === 'clean') score += 4;
    else if (m === 'kipping') score += 3;
    else if (m === 'band') score += 2;
    else score += 0;
    return Math.round((score / 10) * 100);
  })();

  results.pull = {
    label: 'Pull Foundation',
    score: pullScore,
    level: pullScore >= 80 ? 'Strong' : pullScore >= 40 ? 'Developing' : 'Beginner',
    weakness: pullScore < 40 ? 'Pulling foundation needs significant work' : null,
    recommendations: pullScore >= 80
      ? ['Front Lever progressions', 'Weighted Pullups', 'Muscle-up variations']
      : pullScore >= 40
        ? ['Build to 15+ pullups', 'Muscle-up skill work', 'Rows and negatives']
        : ['Pull-up progression program', 'Australian rows', 'Band-assisted pullups'],
  };

  // Handstand Control
  const hsScore = (() => {
    const h = answers.handstand;
    if (h === '30+s') return 90;
    if (h === '15-30s') return 75;
    if (h === '5-10s') return 55;
    if (h === '3s') return 40;
    if (h === 'kickup_no_hold') return 25;
    if (h === 'no_kickup') return 15;
    return 5;
  })();

  results.handstand = {
    label: 'Handstand Control',
    score: hsScore,
    level: hsScore >= 75 ? 'Advanced' : hsScore >= 40 ? 'Intermediate' : 'Beginner',
    weakness: hsScore < 40 ? 'Balance and overhead control need development' : null,
    recommendations: hsScore >= 75
      ? ['Handstand Pushup progressions', 'One-arm handstand training', 'Handstand walking']
      : hsScore >= 40
        ? ['Wall handstand endurance', 'Kick-up consistency', 'Balance drills']
        : ['Free Handstand Beginner Guide', 'Wall drills', 'Kick-up practice'],
  };

  // HSPU Readiness
  const hspuScore = Math.round((pushScore * 0.4 + hsScore * 0.6));
  results.hspu = {
    label: 'HSPU Readiness',
    score: hspuScore,
    level: hspuScore >= 70 ? 'Ready' : hspuScore >= 40 ? 'Approaching' : 'Not Ready',
    weakness: hspuScore < 40 ? 'Need stronger push foundation and handstand control' : null,
    recommendations: hspuScore >= 70
      ? ['Pike Pushups', 'Elevated Pike Pushups', 'Wall HSPU', 'Bent Arm Press']
      : hspuScore >= 40
        ? ['Pike Pushup volume', 'Handstand hold time', 'Elevated Pike progression']
        : ['Build pushing base', 'Handstand fundamentals first'],
  };

  // Planche Readiness
  const plancheScore = (() => {
    const l = answers.planche_level;
    const h = answers.planche_hold;
    if (l === 'full' && h === '10+s') return 100;
    if (l === 'full') return 90;
    if (l === 'straddle') return 70;
    if (l === 'adv_tuck') return 50;
    if (l === 'tuck') return 30;
    return 5;
  })();

  results.planche = {
    label: 'Planche Readiness',
    score: plancheScore,
    level: plancheScore >= 90 ? 'Elite' : plancheScore >= 50 ? 'Intermediate' : plancheScore >= 20 ? 'Developing' : 'Beginner',
    weakness: plancheScore < 30 ? 'Straight arm strength and scapula conditioning needed' : null,
    recommendations: plancheScore >= 70
      ? ['Straddle to Full progression', 'Planche leans endurance', 'Planche pushups']
      : plancheScore >= 30
        ? ['Advanced Tuck holds', 'Planche leans', 'Pseudo planche pushups']
        : ['Free Planche Conditioning', 'Wrist prep', 'Scapula strength work'],
  };

  // Front Lever Readiness
  const flScore = (() => {
    const l = answers.frontlever_level;
    const h = answers.frontlever_hold;
    if (l === 'full' && h === '10+s') return 100;
    if (l === 'full') return 85;
    if (l === 'band') return 55;
    if (l === 'adv_tuck') return 40;
    if (l === 'tuck') return 25;
    return 5;
  })();

  results.frontlever = {
    label: 'Front Lever Readiness',
    score: flScore,
    level: flScore >= 85 ? 'Advanced' : flScore >= 40 ? 'Intermediate' : flScore >= 20 ? 'Developing' : 'Beginner',
    weakness: flScore < 40 ? 'Pulling and core horizontal strength needs work' : null,
    recommendations: flScore >= 55
      ? ['Band-assisted full front lever', 'Front lever rows', 'Eccentric negatives']
      : flScore >= 20
        ? ['Tuck front lever holds', 'Ice cream makers', 'Pullup strength']
        : ['Front Lever Builder program', 'Tuck progressions', 'Row variations'],
  };

  // Recommended pathways
  const pathways = [];
  if (hsScore < 50) pathways.push({ name: 'Free Handstand Beginner Guide', to: '/tutorials/handstand' });
  if (plancheScore < 30) pathways.push({ name: 'Planche Conditioning', to: '/tutorials/planche' });
  if (pushScore < 50) pathways.push({ name: 'Beginner Push Foundation', to: '/skills' });
  if (flScore < 40) pathways.push({ name: 'Front Lever Builder', to: '/skills' });
  if (hspuScore >= 40) pathways.push({ name: 'HSPU Foundation Pathway', to: '/skills' });
  if (pathways.length === 0) pathways.push({ name: 'Advanced Skill Mastery', to: '/skills' });

  return { categories: results, pathways };
}