import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── SECURITY RESET v5 — 2026-06-24 ──
const ADMIN_CODE = 'BTCALI-ADMIN-V5-8KX3M9PQZR';

const VALID_CODES = {
  'H7X-4KQ2-9RNVJW': 'Henry',
  'A3M-8PF5-2WKXTZ': 'Haejun',
  'B9T-6LN1-5MQVRX': 'Andeas',
  'C2R-7VK4-8PJFNW': 'Tanush',
  'D5N-3WM9-6TXKQR': 'Ryan',
  'E8K-2PV7-4RNLFX': 'Julian',
  'F4J-9TX3-7WMNKR': 'Mack',
  'G6W-5KN8-3PVJXT': 'Marcus',
  'J1P-4MX6-9TNWKR': 'Alistair',
  'K3V-8RN2-5XJWMQ': 'Jayden',
  'L9X-7KT5-2NRWPJ': 'Luke',
  'M2N-3PW8-6XKVRT': 'Gaon',
  'N5T-6XM1-4WJKRP': 'Sean',
  'P7R-2NV4-9KMWXT': 'Daniel',
  'Q4K-9WX7-3TNRJM': 'Mathew',
  'R6M-5JN3-8VXKTW': 'Hayden',
  'S8W-1KP6-4XMNJR': 'Hugo',
  'T3X-7NR2-9JWKMV': 'Cedrick',
  'U1J-4MK8-6RVXNW': 'Lennon',
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
      return Response.json({ success: true, already_activated: true, student_name: acct.student_name }, { status: 200, headers: corsHeaders });
    }

    // Check if this user already has a linked account (with a v5 code)
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