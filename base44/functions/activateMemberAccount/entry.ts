import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Valid access codes — new secure codes
const VALID_CODES = new Set([
  'HENRY-X7K91P',
  'HAEJUN-M4R82Q',
  'ANDEAS-T9V61L',
  'TANUSH-P3N74X',
  'RYAN-K8Q52M',
  'JULIAN-W6H93R',
  'MACK-F2T81Z',
  'MARCUS-L7P64N',
  'ALISTAIR-D5X29K',
  'JAYDEN-R8M41V',
  'LUKE-B9Q73T',
  'GAON-H4K86P',
  'SEAN-Z2N58L',
  'DANIEL-Y7R34M',
  'MATHEW-C8P61Q',
  'HAYDEN-J5V92T',
  'HUGO-N4T87X',
  'CEDRICK-Q6L53R',
  'LENNON-X9M72K',
  'BTCALI-ADMIN-84X7P',
]);

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

    if (!VALID_CODES.has(code)) {
      return Response.json({ error: 'Invalid access code. Please check and try again.' }, { status: 200, headers: corsHeaders });
    }

    // Check if this code has already been activated
    const existing = await base44.asServiceRole.entities.MemberAccount.filter({ access_code: code });
    if (existing.length > 0) {
      const acct = existing[0];
      if (acct.user_email !== user.email) {
        return Response.json({ error: 'This access code has already been activated by another account.' }, { status: 200, headers: corsHeaders });
      }
      // Same user re-activating — just return success
      return Response.json({ success: true, access_code: code, already_activated: true }, { status: 200, headers: corsHeaders });
    }

    // Check if this user already has a linked account
    const userExisting = await base44.asServiceRole.entities.MemberAccount.filter({ user_email: user.email });
    if (userExisting.length > 0) {
      return Response.json({ error: 'Your account is already linked to an access code.' }, { status: 200, headers: corsHeaders });
    }

    // Find the student program to get the student name
    const programs = await base44.asServiceRole.entities.StudentProgram.filter({ access_code: code });
    const studentName = programs[0]?.student_name || '';

    // Create the account link
    await base44.asServiceRole.entities.MemberAccount.create({
      access_code: code,
      user_email: user.email,
      student_name: studentName,
      activated: true,
      activated_at: new Date().toISOString(),
    });

    return Response.json({ success: true, access_code: code, student_name: studentName }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('activateMemberAccount error:', error.message);
    return Response.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
});