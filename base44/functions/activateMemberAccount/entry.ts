import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── SECURITY RESET v6 — 2026-06-24 ──
const ADMIN_CODE = 'BTCALI-ADMIN-V6-QX9M3RKPTZ';

const VALID_CODES = {
  'Q7MX-9TWP-K2VR-H8NC': 'Henry',
  'R4ZD-W8KY-M7QP-T2XF': 'Haejun',
  'N9VC-H3TR-P8KM-W6QJ': 'Andeas',
  'T5BW-X2NR-G9KH-P4MV': 'Tanush',
  'K8HN-M4VQ-W3XR-B7TZ': 'Ryan',
  'W2PZ-T6BN-H9MX-C5KR': 'Julian',
  'X4KR-N8WZ-T3VH-M6PB': 'Mack',
  'B6TH-P3MX-N7KW-R9VZ': 'Marcus',
  'C9WV-K5TR-B2NX-H8MQ': 'Alistair',
  'H3MZ-B7NV-P4KT-W6XR': 'Jayden',
  'P5XN-W9KZ-R6BM-T3VH': 'Luke',
  'V7KT-R2MH-X5NB-P9WZ': 'Gaon',
  'M4NR-H8VX-B6KZ-W2PT': 'Sean',
  'Z6BW-P4NK-M9XH-T7RV': 'Daniel',
  'G8VX-T5RN-K3WB-H6MZ': 'Mathew',
  'F3KH-W7MV-N2XR-B5TZ': 'Hayden',
  'J9MT-B4WX-P7KN-R3VH': 'Hugo',
  'L2XR-N6TH-W8VM-K4BZ': 'Cedrick',
  'Y7WB-K3XN-T9VH-M5RZ': 'Lennon',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const base44 = createClientFromRequest(req);

    // Must be authenticated
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

    let body;
    try { body = await req.json(); } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400, headers: corsHeaders });
    }

    const { access_code } = body;
    if (!access_code) return Response.json({ error: 'access_code required' }, { status: 400, headers: corsHeaders });

    const code = access_code.trim().toUpperCase();
    const isAdmin = code === ADMIN_CODE;
    const studentName = VALID_CODES[code];

    if (!isAdmin && !studentName) {
      return Response.json({ error: 'Invalid access code. Please check and try again.' }, { status: 200, headers: corsHeaders });
    }

    // Check if this code has already been activated by someone else
    const existing = await base44.asServiceRole.entities.MemberAccount.filter({ access_code: code });
    if (existing.length > 0) {
      const acct = existing[0];
      if (acct.user_email !== user.email) {
        return Response.json({ error: 'This access code has already been activated by another account.' }, { status: 200, headers: corsHeaders });
      }
      // Already linked to THIS user — success
      return Response.json({ success: true, already_activated: true, student_name: acct.student_name }, { status: 200, headers: corsHeaders });
    }

    // Check if this user already has a linked account
    const userExisting = await base44.asServiceRole.entities.MemberAccount.filter({ user_email: user.email });
    if (userExisting.length > 0) {
      return Response.json({ error: 'Your account is already linked to an access code.' }, { status: 200, headers: corsHeaders });
    }

    // Resolve name from StudentProgram if available
    let resolvedName = studentName || 'Admin';
    if (!isAdmin) {
      const programs = await base44.asServiceRole.entities.StudentProgram.filter({ access_code: code });
      if (programs[0]?.student_name) resolvedName = programs[0].student_name;
    }

    await base44.asServiceRole.entities.MemberAccount.create({
      access_code: code,
      user_email: user.email,
      student_name: resolvedName,
      activated: true,
      activated_at: new Date().toISOString(),
    });

    return Response.json({ success: true, student_name: resolvedName }, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('activateMemberAccount error:', error.message);
    return Response.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
});