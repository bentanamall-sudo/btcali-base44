import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── SECURITY RESET v6 — 2026-06-24 ──
// All code validation is done via MemberAccount lookup.
// No hardcoded code list needed — we trust the DB-linked code.

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
    if (!user) {
      return Response.json({ error: 'Unauthorized', program: null }, { status: 401, headers: corsHeaders });
    }

    let body;
    try { body = await req.json(); } catch {
      return Response.json({ error: 'Invalid JSON body', program: null }, { status: 400, headers: corsHeaders });
    }

    const { access_code } = body;
    if (!access_code || typeof access_code !== 'string') {
      return Response.json({ error: 'access_code required', program: null }, { status: 400, headers: corsHeaders });
    }

    const code = access_code.trim().toUpperCase();

    // Verify this code is actually linked to the requesting user (security check)
    if (!user.role || user.role !== 'admin') {
      const accounts = await base44.asServiceRole.entities.MemberAccount.filter({ user_email: user.email, access_code: code });
      if (accounts.length === 0) {
        return Response.json({ error: 'Access denied', program: null }, { status: 200, headers: corsHeaders });
      }
    }

    const results = await base44.asServiceRole.entities.StudentProgram.filter({ access_code: code });
    const program = results[0] || null;

    return Response.json({ program }, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('getStudentProgram error:', error.message);
    return Response.json({ error: error.message, program: null }, { status: 200, headers: corsHeaders });
  }
});