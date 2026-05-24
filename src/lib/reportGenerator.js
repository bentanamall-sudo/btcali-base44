function parseRange(val) {
  if (!val) return 0;
  const s = String(val);
  if (s === '0' || s === '0 seconds') return 0;
  // e.g. "11–20" or "11-20" -> take upper bound
  const rangeMatch = s.match(/(\d+)[–\-](\d+)/);
  if (rangeMatch) return parseInt(rangeMatch[2]);
  // e.g. "50+" or "30+ sec" -> take the number
  const plusMatch = s.match(/(\d+)\+/);
  if (plusMatch) return parseInt(plusMatch[1]) + 1;
  // e.g. "1–5 sec" handled above; plain number
  return parseInt(s) || 0;
}

export function generateReport(data) {
  const pushups = parseRange(data.pushup_max);
  const pullups = parseRange(data.pullup_max);
  const dips = parseRange(data.dip_max);
  const pikepu = parseRange(data.pike_pushup_max);
  const hsHold = parseRange(data.handstand_hold);
  const lsit = parseRange(data.lsit_hold);
  const tuckPlanche = parseRange(data.tuck_planche_hold);
  const flLevel = data.front_lever_level || 'None';

  const flScore = { 'None': 0, 'Tuck FL': 1, 'Advanced Tuck FL': 2, 'One Leg FL': 3, 'Straddle FL': 4, 'Full FL': 5 }[flLevel] || 0;

  let score = 0;
  if (pushups >= 30) score += 2; else if (pushups >= 15) score += 1;
  if (pullups >= 15) score += 2; else if (pullups >= 8) score += 1;
  if (dips >= 20) score += 2; else if (dips >= 10) score += 1;
  if (hsHold >= 30) score += 2; else if (hsHold >= 5) score += 1;
  if (lsit >= 30) score += 2; else if (lsit >= 10) score += 1;
  if (tuckPlanche >= 5) score += 2; else if (tuckPlanche >= 1) score += 1;
  if (flScore >= 3) score += 3; else score += flScore;
  if (data.can_muscle_up === 'Yes') score += 2;
  if (data.can_hspu === 'Yes') score += 2;
  if (data.can_bent_arm_press === 'Yes') score += 2;
  if (data.can_lsit_to_hs === 'Yes') score += 2;

  let athlete_level;
  if (score >= 20) athlete_level = 'Advanced Foundation';
  else if (score >= 14) athlete_level = 'Strong Foundation';
  else if (score >= 9) athlete_level = 'Intermediate Foundation';
  else if (score >= 4) athlete_level = 'Developing Foundation';
  else athlete_level = 'Beginner Foundation';

  const strengths = [];
  const weaknesses = [];

  if (pushups >= 20) strengths.push('Push strength foundation');
  else weaknesses.push('Push strength needs work');
  if (pullups >= 10) strengths.push('Pull strength foundation');
  else weaknesses.push('Pull strength needs development');
  if (dips >= 15) strengths.push('Dip / tricep strength');
  else weaknesses.push('Dip strength lacking');
  if (hsHold >= 10) strengths.push('Handstand balance');
  else weaknesses.push('Handstand balance undeveloped');
  if (lsit >= 15) strengths.push('Core compression / L-sit');
  else weaknesses.push('Core compression / L-sit weak');
  if (tuckPlanche >= 3) strengths.push('Straight-arm strength');
  else weaknesses.push('Straight-arm planche strength lacking');
  if (flScore >= 2) strengths.push('Horizontal pulling strength');
  else weaknesses.push('Horizontal pulling / front lever needs development');

  const goals = data.goals || [];
  const recommended_programs = [];
  const next_steps = [];

  if (goals.includes('Handstand') || goals.includes('Handstand Push-Up')) {
    recommended_programs.push('Handstand Program');
    next_steps.push('Start handstand conditioning 5x/week');
  }
  if (goals.includes('Front Lever') || goals.includes('Front Lever Pull-Ups')) {
    const v = pullups < 8 ? 'Front Lever V1' : pullups < 12 ? 'Front Lever V2' : 'Front Lever V3';
    recommended_programs.push(v);
    next_steps.push('Prioritize lat activation and horizontal pulling');
  }
  if (goals.includes('Planche') || goals.includes('Planche Progressions')) {
    recommended_programs.push('Planche V1');
    next_steps.push('Build planche lean and scapula conditioning daily');
  }
  if (goals.includes('Muscle-Up')) {
    recommended_programs.push('Muscle-Up Program');
    next_steps.push('Work explosive pull-ups and false grip');
  }
  if (recommended_programs.length === 0) {
    recommended_programs.push('1-on-1 Coaching');
    next_steps.push('Book a coaching call to build a custom plan');
  }

  const recommended_focus = weaknesses.slice(0, 2).join(', ') || 'Build overall foundation';

  const exp = data.training_experience || 'Unknown';
  const athlete_summary = `${data.full_name} is at the ${athlete_level} stage with ${exp} of calisthenics training experience. ` +
    `They can perform ${pushups} push-ups, ${pullups} pull-ups, and ${dips} dips. ` +
    `${hsHold > 0 ? `Handstand hold: ${hsHold}s. ` : ''}` +
    `${tuckPlanche > 0 ? `Tuck planche: ${tuckPlanche}s. ` : ''}` +
    `Front lever level: ${flLevel}. ` +
    `Goals: ${goals.join(', ') || 'General improvement'}. ` +
    `Key weaknesses to address: ${weaknesses.slice(0, 2).join(', ')}.`;

  return { athlete_level, strengths, weaknesses, recommended_focus, recommended_programs, athlete_summary, next_steps };
}

export function buildEmailBody(data, report) {
  return `
NEW BTCALI ATHLETE DIAGNOSTIC REPORT
=====================================
Athlete: ${data.full_name}
Email: ${data.email}
Age: ${data.age} | Height: ${data.height || 'N/A'} | Weight: ${data.weight || 'N/A'} | Country: ${data.country} | Instagram: @${data.instagram}

ATHLETE LEVEL: ${report.athlete_level}

--- TRAINING BACKGROUND ---
Experience: ${data.training_experience}
Days/week: ${data.training_days}
Location: ${data.training_location}
Followed program before: ${data.followed_program}
Currently has coach: ${data.has_coach}

--- CURRENT STRENGTH ---
Push-ups: ${data.pushup_max}
Pull-ups: ${data.pullup_max}
Dips: ${data.dip_max}
Pike Push-ups: ${data.pike_pushup_max}
Handstand hold: ${data.handstand_hold}s
L-sit hold: ${data.lsit_hold}s
Tuck Planche hold: ${data.tuck_planche_hold}s
Front Lever level: ${data.front_lever_level}
Muscle-Up: ${data.can_muscle_up}
HSPU: ${data.can_hspu}
Bent Arm Press: ${data.can_bent_arm_press}
L-Sit to Handstand: ${data.can_lsit_to_hs}

--- GOALS ---
${(data.goals || []).join(', ')}

--- MOBILITY & RECOVERY ---
Wrist mobility: ${data.wrist_mobility}
Shoulder mobility: ${data.shoulder_mobility}
Hamstring mobility: ${data.hamstring_mobility}
Injuries: ${data.injuries}
Pain areas: ${data.pain_areas}
Sleep quality: ${data.sleep_quality}
Recovery quality: ${data.recovery_quality}

--- COACHING QUALIFICATION ---
Willing to invest: ${data.coaching_investment}
Payment option: ${data.payment_option}
Consistency commitment: ${data.consistency_answer}
Seriousness: ${data.seriousness}
Why BTCALI: ${data.why_btcali}

--- EQUIPMENT AVAILABLE ---
${data.equipment_available || 'Not provided'}

--- CURRENT SKILLS / SKILL LEVEL ---
${data.exact_current_skills || 'Not provided'}

--- ADDITIONAL NOTES ---
${data.additional_notes || 'Not provided'}

--- CONSENT ---
Media consent: ${data.media_consent ? 'YES' : 'NO'}
Serious applicant: ${data.serious_applicant ? 'YES' : 'NO'}

--- GENERATED REPORT ---
Athlete Level: ${report.athlete_level}
Strengths: ${report.strengths.join(', ')}
Weaknesses: ${report.weaknesses.join(', ')}
Recommended Focus: ${report.recommended_focus}
Recommended Programs: ${report.recommended_programs.join(', ')}
Next Steps: ${report.next_steps.join(' | ')}

FULL SUMMARY:
${report.athlete_summary}
  `.trim();
}