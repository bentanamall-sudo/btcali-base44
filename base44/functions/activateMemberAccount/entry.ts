import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// All valid codes live ONLY in backend — never exposed to frontend
const ADMIN_CODE = 'BTCALI-ADMIN-P7X92M';

const VALID_CODES = {
  'HENRY-Q8M47Z':    'Henry',
  'HAEJUN-L3X92V':   'Haejun',
  'ANDEAS-P6T81K':   'Andeas',
  'TANUSH-V9R24M':   'Tanush',
  'RYAN-N5C73Q':     'Ryan',
  'JULIAN-K2W68P':   'Julian',
  'MACK-Z7H31L':     'Mack',
  'MARCUS-T4N95X':   'Marcus',
  'ALISTAIR-B8Q52R': 'Alistair',
  'JAYDEN-X6P19V':   'Jayden',
  'LUKE-M3Z84K':     'Luke',
  'GAON-R7L26T':     'Gaon',
  'SEAN-W9C45N':     'Sean',
  'DANIEL-H2V68Q':   'Daniel',
  'MATHEW-K5X93L':   'Mathew',
  'HAYDEN-P8M41Z':   'Hayden',
  'HUGO-C6T72R':     'Hugo',
  'CEDRICK-L9N35V':  'Cedrick',
  'LENNON-Z4Q86P':   'Lennon',
  // Test codes
  'TEST-PAGE-1': 'Test User 1',
  'TEST-PAGE-2': 'Test User 2',
  'TEST-PAGE-3': 'Test User 3',
  'TEST-PAGE-4': 'Test User 4',
  'TEST-PAGE-5': 'Test User 5',
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

    // Check if this user already has a linked account
    const userExisting = await base44.asServiceRole.entities.MemberAccount.filter({ user_email: user.email });
    if (userExisting.length > 0) {
      return Response.json({ error: 'Your account is already linked to an access code.' }, { status: 200, headers: corsHeaders });
    }

    // For students: find the student program to get the name
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