import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── SECURITY RESET v5 — 2026-06-24 ──
// Only v5 codes are valid here. All previous codes rejected.
const VALID_CODES = new Set([
  'H7X-4KQ2-9RNVJW',
  'A3M-8PF5-2WKXTZ',
  'B9T-6LN1-5MQVRX',
  'C2R-7VK4-8PJFNW',
  'D5N-3WM9-6TXKQR',
  'E8K-2PV7-4RNLFX',
  'F4J-9TX3-7WMNKR',
  'G6W-5KN8-3PVJXT',
  'J1P-4MX6-9TNWKR',
  'K3V-8RN2-5XJWMQ',
  'L9X-7KT5-2NRWPJ',
  'M2N-3PW8-6XKVRT',
  'N5T-6XM1-4WJKRP',
  'P7R-2NV4-9KMWXT',
  'Q4K-9WX7-3TNRJM',
  'R6M-5JN3-8VXKTW',
  'S8W-1KP6-4XMNJR',
  'T3X-7NR2-9JWKMV',
  'U1J-4MK8-6RVXNW',
  'BTCALI-ADMIN-V5-8KX3M9PQZR',
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
    let body;
    try { body = await req.json(); } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders });
    }

    const { access_code } = body;

    if (!access_code || typeof access_code !== 'string') {
      return Response.json({ error: 'access_code required' }, { status: 400, headers: corsHeaders });
    }

    const code = access_code.trim().toUpperCase();

    if (!VALID_CODES.has(code)) {
      return Response.json({ error: 'Invalid access code', program: null }, { status: 200, headers: corsHeaders });
    }

    const base44 = createClientFromRequest(req);
    const results = await base44.asServiceRole.entities.StudentProgram.filter({ access_code: code });
    const program = results[0] || null;

    return Response.json({ program }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('getStudentProgram error:', error.message);
    return Response.json({ error: error.message, program: null }, { status: 200, headers: corsHeaders });
  }
});